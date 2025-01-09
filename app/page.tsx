"use client";

import { useUser } from "@/hooks/useUser";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
  const user = useUser();


    useEffect(() => {
      console.log(user?.current);
      
    }, [user?.current])
    
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      {user?.current ? (
        <button
          className="bg-slate-600 p-3 rounded-md"
          onClick={() => user?.logout()}
        >
          Log Out
        </button>
      ) : (
       <>
         <button
          className="bg-slate-600 p-3 rounded-md"
        >
          <a href="/sign-in">
            Login
          </a>
        </button>
        <button
          className="bg-slate-600 p-3 rounded-md"
        >
          <a href="/sign-up">
            Register
          </a>
        </button>
       </>
      )}
    </div>
  );
}
