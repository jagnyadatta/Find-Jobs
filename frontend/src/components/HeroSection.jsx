import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";

const HeroSection = () => {
  const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }
  return (
    <div className="text-center">
      <div className="flex flex-col gap-5 my-10">
        <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#0279e8] text-medium">
          No 1. Job Hunt Website
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold">
          Search, Apply & <br /> Get Your{" "}
          <span className="text-[#04c40a]">Dream Jobs</span>
        </h1>
        <div className='flex w-[80%] sm:w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
                    <input
                        type="text"
                        placeholder='Find your dream jobs'
                        onChange={(e) => setQuery(e.target.value)}
                        className='outline-none border-none focus:ring-0 w-full rounded-full'
                    />
                    <Button onClick={searchJobHandler} className="rounded-r-full bg-[#04c40a]">
                        <Search className='h-5 w-5 ' />
                    </Button>
                </div>
      </div>
    </div>
  );
};

export default HeroSection;
