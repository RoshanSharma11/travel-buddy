"use client";

import { useUser } from "@/hooks/useUser";
import { cn } from "@/lib/utils";
import {
  Backpack,
  BookImage,
  LayoutDashboard,
  LogOut,
  Settings,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Sidebar = ({ sidebarHidden }: { sidebarHidden: boolean }) => {
  const user = useUser();
  const sidebarLinks = [
    { label: "Dashboard", route: "/dashboard", icon: LayoutDashboard },
    { label: "Packages", route: "/packages", icon: Backpack },
    { label: "Photos", route: "/photos", icon: BookImage },
    { label: "Settings", route: "/settings", icon: Settings },
  ];

  return (
    <>
      <section
        className={cn(
          "sticky left-0 top-0 flex h-screen min-w-[250px] w-fit flex-col justify-between border-r border-gray-200 bg-white pt-8  max-md:hidden sm:p-4 xl:p-6 2xl:w-[355px]",
          {
            'hidden': sidebarHidden,
          }
        )}
      >
        <nav className="flex flex-col gap-4 h-full">
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
          <div className="flex-1 flex flex-col gap-2">
            {sidebarLinks.map((item, ind) => {
              return (
                <Link
                  href={item.route}
                  key={ind}
                  className="flex items-center gap-3 transition py-3 px-2 rounded-md cursor-pointer text-gray-800 hover:bg-primary-600 hover:text-white"
                >
                  <item.icon size={23} />
                  <span className="font-medium text-lg ">{item.label}</span>
                </Link>
              );
            })}
          </div>
          <button
            className="flex items-center gap-3 transition py-3 px-2 rounded-md cursor-pointer text-gray-800 hover:bg-primary-600 hover:text-white"
            onClick={() => user?.logout()}
          >
            <LogOut size={23} />
            <span className="font-medium text-lg ">Log Out</span>
          </button>
        </nav>
      </section>
    </>
  );
};

export default Sidebar;
