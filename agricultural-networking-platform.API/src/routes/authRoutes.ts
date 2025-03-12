import { Router } from "express";
import AuthController from "../controllers/authController";
import authController from "../controllers/authController";
import auditTrailMiddleware from "../middleware/auditTrailMiddleware";

const router = Router();

// User registration route
router.post("/register", AuthController.register);

// OTP verification route
router.post("/verify-otp", AuthController.verifyOTPHandler);

// User login route
router.post("/login",auditTrailMiddleware, AuthController.login);

// Optionally, you can add the refresh token route
router.post("/refresh-token", AuthController.refreshToken);

// Resend OTP route
router.post("/resend-otp", authController.resendOTPHandler);

// User logout route
router.post("/logout", authController.logout);


export default router;