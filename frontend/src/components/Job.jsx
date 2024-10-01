import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const Job = () => {
  const navigate = useNavigate();
  const jobId = "ldkjflsdjfkds";
  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500"> 2 days ago</p>
        <Button variant="outline" className="rounded-full">
          <Bookmark />
        </Button>
      </div>

      <div className="flex items-center gap-2 my-2">
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src="https://www.shutterstock.com/shutterstock/photos/2487834049/display_1500/stock-vector-growth-logo-technology-software-finance-investment-etc-logo-template-for-businesses-2487834049.jpg" />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg">company name</h1>
          <p className="text-sm text-gray-500">India</p>
        </div>
      </div>

      <div>
        <h1 className="font-bold text-lg my-2">title</h1>
        <p className="text-sm text-gray-600">Lorem ipsum dolor sit amet.</p>
      </div>

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

      <div className="flex items-center gap-4 mt-4">
        <Button
          variant="outline"
          onClick={()=>navigate(`/description/${jobId}`)}
        >
          Details
        </Button>
        <Button className="bg-[#7296a3]">Save For Later</Button>
      </div>
    </div>
  );
};

export default Job;
