"use client";

import { useUser } from "@/hooks/useUser";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const NavBar = () => {
  const user = useUser();

  return (
    <div className="flex justify-between items-center px-10 pb-5 pt-7 bg-white">
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
        <li>
          {user?.current ? (
            <>
              <button
                className="mx-5 text-gray-700 text-[18px] hover:underline transition-all font-medium"
                onClick={() => user.logout()}
              >
                Log Out
              </button>
              <Link
                href="/dashboard"
                className="py-2 px-4 rounded-full hover:bg-white hover:text-primary-600 border-primary-600 border-2  bg-primary-600 text-white transition-all"
              >
                Dashboard
              </Link>
            </>
          ) : (
            <Link
              href="/sign-in"
              className="text-gray-900 text-[18px] hover:underline transition-all font-medium"
            >
              Log In
            </Link>
          )}
        </li>
        {user?.current ? null : (
          <li>
            <Link
              href="/sign-up"
              className="py-2 px-4 text-[17px] font-medium rounded-full hover:bg-white hover:text-primary-600 border-primary-600 border-2  bg-primary-600 text-white transition-all"
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
