'use client'

import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { useUser } from "@/hooks/useUser";
import { redirect } from "next/navigation";
import React, { useState } from "react";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [sidebarHidden, setSidebarHidden] = useState(false)
  const user = useUser()

  if (!user?.current) {
    return redirect("/")
  }

  return <>
    <main className="flex h-screen w-full font-inter">
        <Sidebar sidebarHidden={sidebarHidden} />
        <div className="flex-1 flex flex-col">
                <Topbar setSidebarHidden={setSidebarHidden} />
            <div className="max-h-full overflow-auto">
                {children}
            </div>
        </div>
    </main>
  </>
};

export default Layout;
