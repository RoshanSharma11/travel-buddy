'use client'

import LoadingSpinner from "@/components/LoadingSpinner";
import NavBar from "@/components/NavBar";
// import { useUser } from "@/hooks/useUser";
import { useAuth, useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  // const user = useUser()
  const {isLoaded, isSignedIn} = useUser()

  if (!isLoaded) {
    return  <LoadingSpinner />
  }

  if (isLoaded && isSignedIn) {
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
