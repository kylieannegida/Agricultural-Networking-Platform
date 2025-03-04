import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../models/userModel";
import { Otp } from "../models/otpModel";
import { JWT_SECRET } from "../config/config";
import { validateUser } from "../validations/userValidation";
import mongoose from "mongoose";
import { generateOTP, sendOTP } from "../services/otpService";

class AuthController {

  // User Login
async login(req: Request, res: Response): Promise<void> {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "Email and password are required" });
      return;
    }

    

    // Find the user
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid password" });
      return;
    }

    // Check if the user is verified
    if (!user.isVerified) {
      res.status(400).json({ message: "User is not verified. Please verify your email first." });
      return;
    }

    // Generate access and refresh tokens
    const accessToken = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "10m" });
    const refreshToken = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "24h" });

    res.json({
      message: "Login successful.",
      accessToken,
      refreshToken,
      user: { id: user._id, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: "Error during login", error });
  }
}
  //User Logout
   async logout(req: Request, res: Response): Promise<void> {
    try {
      res.json({ message: "Logout successful." });
    } catch (error) {
      res.status(500).json({ message: "Error during logout", error });
    }
  }

  // User Registration
  async register(req: Request, res: Response): Promise<void> {
    try {
      const { error, value: payload } = validateUser(req.body);
      if (error) {
        res.status(400).json({ message: error.details.map((err) => err.message) });
        return;
      }

      const { email, password } = payload;

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        res.status(400).json({ message: "User already exists" });
        return;
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create and save the user
      const user = new User({ email, password: hashedPassword, isVerified: false });
      await user.save();

      // Generate OTP and store it in MongoDB
      const otp = generateOTP();
      await Otp.findOneAndUpdate({ email }, { otp, createdAt: new Date() }, { upsert: true, new: true });

      // Send OTP via email
      const result = await sendOTP(email, otp);
      if (!result.success) {
        res.status(500).json({ message: "Error sending OTP" });
        return;
      }

      res.status(201).json({
        message: "User registered successfully. Please verify your email with the OTP sent to your inbox.",
        user: { email },
      });
    } catch (error) {
      res.status(500).json({ message: "Error during registration", error });
    }
  }

  // OTP Verification and Token Generation
  async verifyOTPHandler(req: Request, res: Response): Promise<void> {
    const { email, otp } = req.body;
    if (!email || !otp) {
      res.status(400).json({ message: "Email and OTP are required" });
      return;
    }

    // Fetch OTP from MongoDB
    const otpRecord = await Otp.findOne({ email });

    if (!otpRecord || otpRecord.otp !== otp) {
      res.status(400).json({ message: "Invalid or expired OTP" });
      return;
    }

    // Verify user and delete OTP
    try {
      const user = await User.findOneAndUpdate(
        { email },
        { isVerified: true },
        { new: true }
      );

      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      await Otp.deleteOne({ email });

      // Generate access and refresh tokens
      const accessToken = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "10m" });
      const refreshToken = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "24h" });

      res.json({
        message: "OTP verified successfully. Login successful.",
        accessToken,
        refreshToken,
        user: { id: user._id, email: user.email },
      });
    } catch (error) {
      res.status(500).json({ message: "Error updating user verification status", error });
    }
  }

  // Resend OTP
  async resendOTPHandler(req: Request, res: Response): Promise<void> {
    const { email } = req.body;

    if (!email) {
      res.status(400).json({ message: "Email is required" });
      return;
    }

    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    if (user.isVerified) {
      res.status(400).json({ message: "User is already verified" });
      return;
    }

    // Generate a new OTP
    const otp = generateOTP();
    await Otp.findOneAndUpdate({ email }, { otp, createdAt: new Date() }, { upsert: true, new: true });

    // Send OTP via email
    const result = await sendOTP(email, otp);
    if (!result.success) {
      res.status(500).json({ message: "Error sending OTP" });
      return;
    }

    res.json({ message: "OTP resent successfully" });

    
  }
}

export default new AuthController();