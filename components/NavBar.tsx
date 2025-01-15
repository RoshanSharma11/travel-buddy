"use client";

// import { useUser } from "@/hooks/useUser";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { ExternalLink } from "lucide-react";
import { SignedOut, SignedIn, useClerk } from "@clerk/nextjs";

const NavBar = () => {
  const { signOut } = useClerk();
  // const user = useUser();


  const handleSignOut = async () => {
    try {
      await signOut({redirectUrl: "/"});
      // await signOut({redirectUrl: "/"});
      window.location.replace("/")

    } catch (err) {
      console.log(err);
      
    }
  };


  return (
    <div className="flex justify-between items-center px-32 pb-5 pt-5 bg-white">
      <Link href="/">
        <div className="flex items-center gap-3">
          <Image
            src="https://flowbite.com/docs/images/logo.svg"
            alt="Logo"
            width={35}
            height={35}
          />
          <h2 className="text-xl font-semibold">TravelBuddy</h2>
        </div>
      </Link>
      <ul className="flex items-center gap-5">
        <SignedOut>
          <li>
            <Link
              href="/sign-in"
              className="text-gray-900 text-[18px] hover:underline transition-all font-medium"
            >
              Log In
            </Link>
          </li>
          <li>
            <Link href="/sign-up">
              <Button className="h-10 text-[15px] px-3 rounded-md bg-primary-600 text-white transition-all">
                Get Started
                <ExternalLink />
              </Button>
            </Link>
          </li>
        </SignedOut>
        {/* <li>
          <SignedIn>
            <button
              className="mx-5 text-gray-700 text-[18px] hover:underline transition-all font-medium"
              // onClick={() => user.logout()}
              onClick={() => handleSignOut()}
            >
              Log Out
            </button>
            <Link
              href="/dashboard"
              className="py-2 px-4 rounded-full hover:bg-white hover:text-primary-600 border-primary-600 border-2  bg-primary-600 text-white transition-all"
            >
              Dashboard
            </Link>
          </SignedIn>
        </li> */}
      </ul>
    </div>
  );
};

export default NavBar;
