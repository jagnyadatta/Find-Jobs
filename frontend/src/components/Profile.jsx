import React from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import Navbar from "./shared/Navbar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";

const skills = [
  "Java",
  "Html",
  "CSS",
  "JavaScript",
  "ReactJs",
  "Express.Js",
  "Node.js",
  "MongoDB",
];
const Profile = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src="https://via.placeholder.com/150"
                alt="Profile Photo"
              />
            </Avatar>
            <div>
              <h1 className="font-medium text-xl">Full Name</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Consectetur, nobis?
              </p>
            </div>
          </div>
          <Button className="text-right" variant="outline">
            <Pen />
          </Button>
        </div>
        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>demo@gmail.com</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span>+91-7606976736</span>
          </div>
        </div>
        <div className="my-5">
          <h1>Skills</h1>
          <div className="flex items-center gap-1">
            {skills.length != 0 ? (
              skills.map((item, index) => <Badge key={index}>{item}</Badge>)
            ) : (
              <span>NA</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
