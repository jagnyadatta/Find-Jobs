import nodemailer from 'nodemailer';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.SMTP_EMAIL, // Your email
    pass: process.env.SMTP_PASSWORD, // Your email password or app password
  },
});

// Function to generate a 6-digit OTP
export const generateOtp = () => {
  return crypto.randomInt(100000, 999999).toString(); // Random 6-digit number
};

// Function to send OTP via email
export const sendOtpEmail = async (email, otp) => {
  const mailOptions = {
    from: process.env.SMTP_EMAIL,
    to: email,
    subject: 'Your OTP for Verification',
    html: `
      <h1>OTP Verification</h1>
      <p>Your OTP is: <b>${otp}</b></p>
      <p>This OTP will expire in 10 minutes.</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true, message: 'OTP sent successfully!' };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, message: 'Failed to send OTP. Please try again.' };
  }
};
