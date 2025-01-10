"use client";

import { Backpack, BookImage, LayoutDashboard, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Sidebar = () => {
  const sidebarLinks = [
    { label: "Dashboard", route: "/", icon: LayoutDashboard },
    { label: "Plans", route: "/about", icon: Backpack },
    { label: "Photos", route: "/services", icon: BookImage },
    { label: "Settings", route: "/contact", icon: Settings },
  ];

  return (
    <>
      <section className="sticky left-0 top-0 flex h-screen min-w-[250px] w-fit flex-col  justify-between border-r border-gray-200 bg-white pt-8  max-md:hidden sm:p-4 xl:p-6 2xl:w-[355px]">
        <nav className="flex flex-col gap-4">
          <Link
            href="/"
            className="mb-5 cursor-pointer flex items-center gap-2"
          >
            <Image
              src="https://flowbite.com/docs/images/logo.svg"
              width={34}
              height={34}
              alt="Horizon logo"
              className="size-[24px] max-xl:size-14"
            />
            <h1 className="font-semibold text-lg">TravelBuddy</h1>
          </Link>

          {sidebarLinks.map((item, ind) => {
            return (
              <Link
                href="#"
                key={ind}
                className="flex items-center gap-3 transition py-3 px-2 rounded-md cursor-pointer text-gray-800 hover:bg-primary-600 hover:text-white"
              >
                <item.icon />
                <span className="font-medium text-lg ">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </section>
    </>
  );
};

export default Sidebar;
