import nodemailer from "nodemailer";
import otpGenerator from "otp-generator";
import dotenv from "dotenv";

dotenv.config();

// Ensure environment variables are loaded
const EMAIL_USER = process.env.EMAIL_USER!;
const EMAIL_PASS = process.env.EMAIL_PASS!;

if (!EMAIL_USER || !EMAIL_PASS) {
  throw new Error("Missing EMAIL_USER or EMAIL_PASS in environment variables");
}

/**
 * Creates a Nodemailer transporter using Gmail SMTP.
 */
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465, // Use 587 if 465 doesn't work
  secure: true, // true for port 465, false for 587
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

/**
 * Generates a 6-digit numeric OTP.
 */
export function generateOTP(): string {
  return otpGenerator.generate(6, {
    digits: true,
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });
}

/**
 * Sends OTP via email using Gmail SMTP.
 */
export async function sendOTP(email: string, otp: string) {
  try {
    const mailOptions = {
      from: `Your OTP Code<${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is: ${otp}. It will expire in 5 minutes.`,
    };

    await transporter.sendMail(mailOptions);
    return { success: true, message: "OTP sent successfully" };
  } catch (error) {
    console.error("Error sending OTP:", error);
    return { success: false, message: "Failed to send OTP", error };
  }
}