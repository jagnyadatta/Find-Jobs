import React from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

const JobsDescription = () => {
  const isApplied = true;
  return (
    <div>
      <div className="max-w-7xl mx-auto my-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-bold text-xl">Frontend Developer</h1>
            <div className="flex items-center gap-2 mt-4">
              <Badge className={"text-blue-700 font-bold"} variant="ghost">
                12 Positions
              </Badge>
              <Badge className={"text-[#04c40a] font-bold"} variant="ghost">
                FullTime
              </Badge>
              <Badge className={"text-[#F83002] font-bold"} variant="ghost">
                11LPA
              </Badge>
            </div>
          </div>
          <Button
            disabled={isApplied}
            className={`rounded-lg ${
              isApplied
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-[#0279e8] hover:bg-[#055199]"
            }`}
          >
            {isApplied ? "Already Applied" : "Apply Now"}
          </Button>
        </div>
        <h1 className="border-b-2 border-b-gray-300 font-medium py-4">Job Description</h1>
        <div className='my-4'>
                <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>Title</span></h1>
                <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>Location</span></h1>
                <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-800'>Description</span></h1>
                <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-800'>2 yrs</span></h1>
                <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-800'>12LPA</span></h1>
                <h1 className='font-bold my-1'>Total Applicants: <span className='pl-4 font-normal text-gray-800'>322</span></h1>
                <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal text-gray-800'>12-09-2024</span></h1>
            </div>
      </div>
    </div>
  );
};

export default JobsDescription;
