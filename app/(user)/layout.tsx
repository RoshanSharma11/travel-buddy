'use client'

import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { useUser } from "@/hooks/useUser";
import React from "react";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const user = useUser()

  if (!user?.current) {
    return <p>Loading...</p>
  }

  return <>
    <main className="flex h-screen w-full font-inter">
        <Sidebar />
        <div className="flex-1">
            <div className="flex flex-col">
                <Topbar />
                {children}
            </div>
        </div>
    </main>
  </>
};

export default Layout;
