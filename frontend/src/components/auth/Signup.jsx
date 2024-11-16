import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { OTP_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
    otp: "", // Added state for OTP input
  });
  const [otpSent, setOtpSent] = useState(false); // Track if OTP is sent
  const [otpVerified, setOtpVerified] = useState(false); // Track OTP verification status
  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  // Send OTP function
  const sendOtp = async () => {
    if (!input.email) {
      toast.error("Please enter your email.");
      return;
    }

    try {
      const res = await axios.post(`${OTP_API_END_POINT}/send-otp`, {
        email: input.email,
      });
      if (res.data.success) {
        toast.success("OTP sent to your email.");
        setOtpSent(true);
      } else {
        toast.error(res.data.message || "Failed to send OTP.");
      }
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong.");
    }
  };

  // Verify OTP function
  const verifyOtp = async () => {
    if (!input.otp) {
      toast.error("Please enter the OTP.");
      return;
    }

    try {
      const res = await axios.post(`${OTP_API_END_POINT}/verify-otp`, {
        email: input.email,
        otp: input.otp,
      });
      if (res.data.success) {
        toast.success("OTP verified successfully!");
        setOtpVerified(true);
      } else {
        toast.error(res.data.message || "Invalid OTP.");
      }
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong.");
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    // Gmail validation
    if (!input.email.endsWith("@gmail.com")) {
      toast.error("Only @gmail.com email addresses are allowed.");
      return; // Stop form submission if validation fails
    }

    if (!otpVerified) {
      toast.error("Please verify the OTP before proceeding.");
      return;
    }

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">Sign Up</h1>
          <div className="my-2">
            <Label>Full Name</Label>
            <Input
              type="text"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
              placeholder="Jagnyadatta Dalai"
            />
          </div>
          <div className="my-2">
            <Label>Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="demo123@gmail.com"
            />
          </div>

          {/* Added Send OTP Button */}
          <div className="my-2">
            <Button
              type="button"
              onClick={sendOtp}
              disabled={loading}
              className="bg-blue-600 text-white w-full mt-2"
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </Button>
          </div>

          {/* OTP Input Field */}
          {otpSent && (
            <div className="my-2">
              <Label>OTP</Label>
              <Input
                type="text"
                value={input.otp}
                name="otp"
                onChange={changeEventHandler}
                placeholder="Enter OTP"
              />
              <Button
                type="button"
                onClick={verifyOtp}
                className="bg-green-600 text-white w-full mt-2"
              >
                Verify OTP
              </Button>
            </div>
          )}

          <div className="my-2">
            <Label>Phone No</Label>
            <Input
              type="text"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              placeholder="7070707709"
            />
          </div>
          <div className="my-2">
            <Label>Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="**********"
            />
          </div>
          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer form-radio h-2 w-2 text-blue-600 border-black-1"
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  value="recruiter"
                  className="cursor-pointer form-radio h-2 w-2 text-blue-600 border-black-1"
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
            <div className="flex items-center gap-2">
              <Label>Profile</Label>
              <Input
                accept="image/*"
                onChange={changeFileHandler}
                type="file"
                className="cursor-pointer"
              />
            </div>
          </div>
          {loading ? (
            <Button className="w-full my-4 bg-[#04c40a] hover:bg-[#2a8212] outline:none">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait !
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full my-4 bg-[#04c40a] hover:bg-[#2a8212] outline:none"
            >
              Signup
            </Button>
          )}
          <span className="text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600">
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
