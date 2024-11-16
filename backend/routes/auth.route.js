import express from 'express';
import { sendOtp, verifyOtp } from '../controllers/otp.controller.js';

const router = express.Router();

// Route to send OTP
router.route("/send-otp").post(sendOtp);

// Route to verify OTP
router.route("/verify-otp").post(verifyOtp);

export default router;
