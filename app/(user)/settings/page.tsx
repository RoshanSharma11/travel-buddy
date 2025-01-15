"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import { useUser } from "@/hooks/useUser";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

export default function Settings() {
  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
  });
  // const auth = useUser();
  const {isLoaded, user} = useUser()

  useEffect(() => {
    if (isLoaded) {
      console.log(user?.emailAddresses[0].emailAddress);
      
      setCurrentUser({
        email: user?.emailAddresses[0].emailAddress || "",
        name: user?.fullName || "",
      });
    }
  }, []);

  return (
      <div className="px-4 space-y-6 md:px-8 my-4">
        <header className="space-y-1.5">
          <div className="flex items-center space-x-4">
            <img
              src="https://g-mespdnkyjpf.vusercontent.net/placeholder.svg"
              alt="Avatar"
              width="96"
              height="96"
              className="border rounded-full"
              style={{ aspectRatio: "96/96", objectFit: "cover" }}
            />
            {/* <div className="space-y-1.5">
              <h1 className="text-2xl font-bold">Catherine Grant</h1>
              <p className="text-gray-500 dark:text-gray-400">j</p>
            </div> */}
          </div>
        </header>
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Personal Information</h2>
            <form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    className="h-11"
                    name="name"
                    value={currentUser.name}
                    onChange={(e) =>
                      setCurrentUser((prev) => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }))
                    }
                    placeholder="Enter your name"
                    type="text"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    className="h-11"
                    name="email"
                    value={currentUser.email}
                    onChange={(e) =>
                      setCurrentUser((prev) => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }))
                    }
                    placeholder="Enter your email"
                    type="email"
                  />
                </div>
              </div>

              <div className="mt-4">
                <Button type="submit" size="lg">
                  Save
                </Button>
              </div>
            </form>
          </div>
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Change Password</h2>
            <form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input
                    className="h-11"
                    id="current-password"
                    placeholder="Enter your current password"
                    type="password"
                  />
                </div>
                <div>
                  <Label htmlFor="new-password">New Password</Label>
                  <Input
                    className="h-11"
                    id="new-password"
                    placeholder="Enter your new password"
                    type="password"
                  />
                </div>
                <div>
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input
                    className="h-11"
                    id="confirm-password"
                    placeholder="Confirm your new password"
                    type="password"
                  />
                </div>
              </div>
              <div className="mt-4">
                <Button size="lg">Update</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
  );
}
