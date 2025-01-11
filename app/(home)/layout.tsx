'use client'

import NavBar from "@/components/NavBar";
import { useUser } from "@/hooks/useUser";
import { redirect } from "next/navigation";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const user = useUser()

  if (user?.current) {
    redirect('/dashboard')
  }

  return (
    <>
      <main className="h-screen flex flex-col">
        <NavBar />
        <div className="relative flex-1 bg-gray-50">
          {children}
        </div>
      </main>
    </>
  );
}
