import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT, OTP_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";
import Footer from "../shared/Footer";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
    otp: "", // State for OTP input
  });
  const [isOTPRequested, setIsOTPRequested] = useState(false); // State to track OTP request
  const [isOTPVerified, setIsOTPVerified] = useState(false); // State to track OTP verification
  const [resendCooldown, setResendCooldown] = useState(false);
  const [countdown, setCountdown] = useState(60);

  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  // Function to send OTP to email
  const sendOTPHandler = async (e) => {
    e.preventDefault();
    if (!input.email.endsWith("@gmail.com")) {
      toast.error("Only @gmail.com email addresses are allowed.");
      return; // Stop if email is not Gmail
    }
    
    try {
      dispatch(setLoading(true));
      const otpRes = await axios.post(
        `${OTP_API_END_POINT}/send-otp`, 
        { email: input.email }
      );
      
      if (otpRes.data.success) {
        setIsOTPRequested(true); // Mark OTP as requested
        setResendCooldown(true);
        setCountdown(60);
        toast.success("OTP sent to your email. Please check your inbox.");
      } else {
        toast.error("Failed to send OTP.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred.");
    } finally {
      dispatch(setLoading(false));
    }
  };

  //function for resend OTP
  const resendOTPHandler = async (e) => {
    e.preventDefault();
    
    try {
      dispatch(setLoading(true));
      const resendRes = await axios.post(`${OTP_API_END_POINT}/resend-otp`, { email: input.email });
      if (resendRes.data.success) {
        setIsOTPRequested(true);
        setIsOTPVerified(false);
        setResendCooldown(true);
        setCountdown(60);
        toast.success("New OTP sent successfully.");
      } else {
        toast.error("Failed to resend OTP.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred.");
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Function to verify OTP
  const verifyOTPHandler = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));
      const verifyRes = await axios.post(
        `${OTP_API_END_POINT}/verify-otp`,
        { email: input.email, otp: input.otp }
      );

      if (verifyRes.data.success) {
        setIsOTPVerified(true); // Mark OTP as verified
        toast.success("OTP verified successfully. You can now fill the form.");
      } else {
        toast.error("Invalid OTP. Please try again.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred.");
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Submit form after OTP verification
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!isOTPVerified) {
      toast.error("Please verify the OTP first.");
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

  //useEffect for resend otp timer
  useEffect(() => {
    let timer;
    if (resendCooldown) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(timer);
            setResendCooldown(false);
            return 60;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendCooldown]);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="sm:w-1/2 border border-gray-200 rounded-md p-4 my-10"
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
            <div className="flex items-center">
              <Input
                type="email"
                value={input.email}
                name="email"
                onChange={changeEventHandler}
                placeholder="demo123@gmail.com"
                className="flex-1"
              />
              {/* <Button
                type="button"
                onClick={sendOTPHandler}
                className="ml-2 bg-blue-600 text-white"
                disabled={isOTPRequested}
              >
                Send OTP
              </Button> */}

              {isOTPRequested ? (
                <div className="my-2 flex flex-col items-center">
                  <Button
                    type="button"
                    onClick={resendOTPHandler}
                    disabled={resendCooldown || isOTPVerified}
                    className="ml-2 text-white bg-red-500 hover:bg-red-800 outline-none"
                  >
                    {!isOTPVerified && (loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> :"")}Resend
                  </Button>

                </div>
              ) : (
                <Button
                  type="button"
                  onClick={sendOTPHandler}
                  className="ml-2 bg-blue-600 text-white"
                  disabled={isOTPRequested}
                >
                  {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> :"Send OTP"}
                </Button>
              )}
            </div>
          </div>

          {resendCooldown && (isOTPRequested && (
            <p className="text-gray-600 text-sm mt-1 ">
              You can request a new OTP in <span className="text-red-600 font-semibold">{countdown}</span> seconds.
            </p>
          ))}


          {isOTPRequested && (
            <div className="my-2">
              <Label>Enter OTP</Label>
              <div className="flex items-center">
                <Input
                  type="text"
                  value={input.otp}
                  name="otp"
                  onChange={changeEventHandler}
                  placeholder="Enter OTP"
                  className="flex-1"
                />
                <Button
                  type="button"
                  onClick={verifyOTPHandler}
                  className={`ml-2 bg-green-600 text-white ${
                    isOTPVerified ? "cursor-not-allowed" : "bg-green-700"
                  } `}
                  disabled={isOTPVerified}
                >
                  Verify OTP
                </Button>
              </div>
            </div>
          )}

          {isOTPVerified && (
            <>
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
            </>
          )}

          {isOTPVerified && (loading ? (
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
          ))}

          <span className="text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600">
              Login
            </Link>
          </span>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;
