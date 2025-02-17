import React from "react";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { LogOut, User2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { setUser } from "@/redux/authSlice";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
          <h1 className="text-2xl font-bold">
            Find<span className="text-[#04c40a]">Job</span>
          </h1>
          {/* <h1 className="text-2xl font-bold">
            Find<span className="text-[#0279e8]">Job</span>
          </h1> */}
        </div>
        <div className="flex items-center gap-12">
          <ul className="hidden font-medium items-center gap-5 sm:flex">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link to="/admin/companies">Companies</Link>
                </li>
                <li>
                  <Link to="/admin/jobs">Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/jobs">Jobs</Link>
                </li>
                <li>
                  <Link to="/browse">Browse</Link>
                </li>
              </>
            )}
          </ul>
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline" className="p-2 sm:p-4">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#0279e8] hover:bg-[#055199] outline:none p-2 sm:p-4">
                  SignUp
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="@shadcn"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="flex flex-rows gap-3">
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt="@shadcn"
                    />
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{user?.fullname}</h4>
                    <p className="text-sm text-muted-foreground">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col my-2 text-grey-600">
                  {user && user.role === "student" && (
                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <User2 />
                      <Button
                        variant="link"
                        className="form-radio h-4 w-20 text-blue-600 border-none"
                      >
                        <Link to="/profile">View Profile</Link>
                      </Button>
                    </div>
                  )}

                  <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <LogOut />
                    <Button
                      onClick={logoutHandler}
                      variant="link"
                      className="form-radio h-4 w-20 text-blue-600 border-none"
                    >
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
      <div className="flex items-center justify-center">
        <ul className="flex font-medium items-center gap-3 sm:hidden">
          {user && user.role === "recruiter" ? (
            <>
              <li className="border-2 rounded-lg p-1 border-blue-500 hover:bg-slate-500 hover:text-white">
                <Link to="/admin/companies">Companies</Link>
              </li>
              <li className="border-2 rounded-lg p-1 border-blue-500 hover:bg-slate-500 hover:text-white">
                <Link to="/admin/jobs">Jobs</Link>
              </li>
            </>
          ) : (
            <>
              <li className="border-2 rounded-lg p-1 border-blue-500 hover:bg-slate-500 hover:text-white">
                <Link to="/">Home</Link>
              </li>
              <li className="border-2 rounded-lg p-1 border-blue-500 hover:bg-slate-500 hover:text-white">
                <Link to="/jobs">Jobs</Link>
              </li>
              <li className="border-2 rounded-lg p-1 border-blue-500 hover:bg-slate-500 hover:text-white">
                <Link to="/browse">Browse</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
