"use client";

import LoadingSpinner from "@/components/LoadingSpinner";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
// import { useUser } from "@/hooks/useUser";
import { useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React, { useState } from "react";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { isLoaded, userId } = useAuth();
  const [sidebarHidden, setSidebarHidden] = useState(false);
  // const user = useUser()

  if (!isLoaded) {
    return <LoadingSpinner />;
  }

  if (isLoaded && !userId) {
    redirect("/");
  }

  return (
    <>
      <main className="flex h-screen w-full font-inter">
        <Sidebar sidebarHidden={sidebarHidden} />
        <div className="flex-1 flex flex-col">
          <Topbar setSidebarHidden={setSidebarHidden} />
          <div className="max-h-full h-full overflow-auto">{children}</div>
        </div>
      </main>
    </>
  );
};

export default Layout;
