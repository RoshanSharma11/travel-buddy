'use client'

import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAxiosClient } from "@/lib/axios-client";
import { toast } from "@/hooks/use-toast";

const JoinGroupDialog = () => {
  const [code, setCode] = useState('')
  const axiosClient = useAxiosClient()

  const handleJoin =  async() => {
    try {
      const response = await axiosClient.post(`/travel/${code}/join`);
      console.log(response);
      if (response.status === 200) {
        console.log("Group joined successfully");
        toast({
          title: "Group joined successfully.",
          className: "bg-primary-500 text-white",
        })
      }
    } catch (err) {
      console.log(err);
      
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Link />
          Join the Group
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Join the group</DialogTitle>
          <DialogDescription>
            Enter the code for the group you wish to join.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Code
            </Label>
            <Input id="link" placeholder="Enter a code for the group" value={code} onChange={e => setCode(e.target.value)} />
          </div>
          {/* <Button type="submit" size="sm" className="px-3">
                  <span className="sr-only">Code</span>
                  <Hash />
                </Button> */}
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary" className="bg-primary-600 text-white" onClick={handleJoin}>
              Join
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default JoinGroupDialog;
