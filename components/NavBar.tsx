"use client";

import { useUser } from "@/hooks/useUser";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const NavBar = () => {
  const user = useUser();

  return (
    <div className="flex justify-between items-center px-10 pb-5 pt-7 bg-white">
      <div className="flex items-center gap-3">
        <Image
          src="https://flowbite.com/docs/images/logo.svg"
          alt="Logo"
          width={40}
          height={40}
        />
        <h2 className="text-2xl font-semibold">TravelBuddy</h2>
      </div>
      <ul className="flex items-center gap-5">
        <li className="text-[19px]">
          {user?.current ? (
            <button
              className="text-gray-700 text-[18px] hover:underline transition-all font-medium"
              onClick={() => user.logout()}
            >
              Log Out
            </button>
          ) : (
            <Link
              href="/sign-in"
              className="text-gray-900 hover:underline transition-all font-medium"
            >
              Log In
            </Link>
          )}
        </li>
        {user?.current ? null: (
          <li className="text-[18px] hover:text-slate-50 font-medium">
            <Link
              href="/sign-up"
              className="py-2 px-4 rounded-full hover:bg-white hover:text-primary-600 border-primary-600 border-2  bg-primary-600 text-white transition-all"
            >
              Get Started
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default NavBar;
