import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["student", "recruiter"],
      required: true,
    },
    profile: {
      bio: { type: String },
      skills: [{ type: String }],
      resume: { type: String }, //URL to resume file
      resumeOriginalName: { type: String },
      company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
      profilePhoto: {
        type: String,
        default: "",
      },
    },
    otp: {
      type: String,  // Stores the OTP sent to the user
      required: false, // OTP is not always needed
    },
    otpExpiry: {
      type: Date, // Stores the expiry time of the OTP
      required: false, // OTP expiry is not always set
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
