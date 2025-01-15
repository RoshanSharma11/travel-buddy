"use client";

import LoadingSpinner from "@/components/LoadingSpinner";
import { toast } from "@/hooks/use-toast";
// import { useUser } from "@/hooks/useUser";
import { cn } from "@/lib/utils";
import { useAuth, useSignIn } from "@clerk/nextjs";
import { redirect, useRouter } from "next/navigation";
import React, { useState } from "react";

const SignIn = () => {
  const auth = useAuth();
  const { isLoaded, signIn, setActive } = useSignIn();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signinDisabled, setSigninDisabled] = useState(false);
  // const user = useUser();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSigninDisabled(true);
    try {
      // if (!isLoaded) return
      if (email === "" || password === "") {
        alert("please fill all the required fields");
        return;
      }
      if (isLoaded) {
        // await user?.login(email, password);
        const signInAttempt = await signIn?.create({
          identifier: email,
          password,
        });
        // console.log(signInAttempt);

        if (signInAttempt?.status === "complete") {
          await setActive!({ session: signInAttempt.createdSessionId });
          console.log("session activated");
          window.location.replace("/dashboard")

          // router.push('/dashboard')
          // return;
          // redirect('/dashboard')
        } else {
          // If the status is not complete, check why. User may need to
          // complete further steps.
          // console.error(JSON.stringify(signInAttempt, null, 2))
          console.log(signInAttempt);
        }
      }
    } catch (error:any) {
      console.log(error.message);
      toast({
        title:error.message,
        variant:'destructive',
      })
    } finally {
      console.log('finally');
      setSigninDisabled(false);
    }
  };

  // if (user?.current) {
  //   redirect("/");
  // }
  if (!isLoaded) return <LoadingSpinner />
  if (auth.isLoaded && auth.userId) {
    redirect("/dashboard");
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-full ">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-semibold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required={true}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required={true}
                />
              </div>
              <div className="flex items-center justify-between">
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className={cn(
                  "w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800",
                  {
                    "opacity-50 cursor-not-allowed": signinDisabled,
                  }
                )}
                disabled={signinDisabled}
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-600 dark:text-gray-400">
                Don&apos;t have an account yet?{" "}
                <a
                  href="/sign-up"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
