import { User } from "../models/user.model.js";
import { generateOtp, sendOtpEmail } from '../utils/otpGenerate.js';


export const sendOtp = async (req, res) => {
    const { email } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
  
      const otp = generateOtp();
      const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 minutes
  
      user.otp = otp;
      user.otpExpiry = otpExpiry;
      await user.save();
  
      const emailResponse = await sendOtpEmail(email, otp);
  
      if (emailResponse.success) {
        return res.status(200).json({ success: true, message: 'OTP sent successfully' });
      } else {
        return res.status(500).json({ success: false, message: emailResponse.message });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Something went wrong' });
    }
  };


  // Verify otp

  export const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;
  
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
  
      if (user.otp !== otp) {
        return res.status(400).json({ success: false, message: 'Invalid OTP' });
      }
  
      if (user.otpExpiry < new Date()) {
        return res.status(400).json({ success: false, message: 'OTP expired' });
      }
  
      user.otp = null; // Clear OTP after successful verification
      user.otpExpiry = null;
      await user.save();
  
      res.status(200).json({ success: true, message: 'OTP verified successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Something went wrong' });
    }
  }

  