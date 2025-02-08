import express from 'express';
import { resendOtp, sendOtp, verifyOtp } from '../controllers/otp.controller.js';

const router = express.Router();

// Route to send OTP
router.route("/send-otp").post(sendOtp);

// Route to verify OTP
router.route("/verify-otp").post(verifyOtp);

// Route to resend OTP
router.route("/resend-otp").post(resendOtp);

export default router;
