import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useSelector } from "react-redux";

const UpdateProfileDialoge = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector(store => store.auth);

    const [input, setInput] = useState({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.map(skill => skill) || "",
        file: user?.profile?.resume || ""
    });
    const changeEventHandler = (e)=>{
      setInput({...input, [e.target.name]: e.target.value});
    }
    const submitHandler = (e) =>{
      e.preventDefault();
      console.log(input);
    }
  return (
    <div>
      <Dialog open={open}>
        <DialogContent
          className="sm:max-w-[425px]"
          onInteractOutside={() => setOpen(false)}
        >
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
          </DialogHeader>
          <form onSubmit={submitHandler}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name:
                </Label>
                <Input id="name" type="text" name="name" onChange={changeEventHandler} value={input.fullname} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email:
                </Label>
                <Input id="email" type="email" name="email" onChange={changeEventHandler} value={input.email} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="number" className="text-right">
                  Number:
                </Label>
                <Input id="number" type="number" name="number" onChange={changeEventHandler} value={input.phoneNumber} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="bio" className="text-right">
                  Bio:
                </Label>
                <Input id="bio" name="bio" onChange={changeEventHandler} value={input.bio} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="skills" className="text-right">
                  Skills:
                </Label>
                <Input id="skills" name="skills" onChange={changeEventHandler} value={input.skills} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="file" className="text-right">
                  Resume:
                </Label>
                <Input
                  id="file"
                  name="file"
                  type="file"
                  accept="application/pdf"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              {loading ? (
                <Button className="w-full my-4 bg-[#04c40a] hover:bg-[#2a8212] outline:none">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                  !
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="w-full my-4 bg-[#04c40a] hover:bg-[#2a8212] outline:none"
                >
                  Update
                </Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateProfileDialoge;
