"use client";

import { useUser } from "@/hooks/useUser";
import { redirect } from "next/navigation";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const SignUp = () => {
  const user = useUser();
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
  });
  const [signupDisabled, setSignupDisabled] = useState(false);


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setSignupDisabled(true)
      if (formData.email === "" || formData.password === "") {
        alert("please fill all the required fields");
        return;
      }
      user?.register(formData.email, formData.password, formData.name);
    } catch (error) {
      console.log(error);
    } finally {
      setSignupDisabled(false);
    }
  };

  if (user?.current) {
    redirect("/");
  }

  return (
    <div className=" dark:bg-gray-900 h-full flex items-center justify-center">
      <div className="max-w-6xl bg-white w-full flex dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        {/* Form Section */}
        <div className="w-1/2 p-8 py-10">
          <h2 className="text-3xl font-semibold dark:text-white">
            Create your Account
          </h2>
          <p className="mt-2 text-gray-700 dark:text-white">
            Already have an account?{" "}
            <a
              href="/sign-in"
              className="font-medium text-primary-600 hover:underline"
            >
              Login here.
            </a>
          </p>
          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-900 dark:text-white"
              >
                Your email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                required
                onChange={handleChange}
                value={formData.email}
                placeholder="name@company.com"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-900 dark:text-white"
              >
                Full Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                required
                onChange={handleChange}
                value={formData.name}
                placeholder="e.g. Bonnie Green"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                required
                onChange={handleChange}
                value={formData.password}
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <p className="text-gray-900 text-sm mt-1">
                Password must be of atleast 8 characters.
              </p>
            </div>
            <div className="mt-4 mb-2">
              <label className="flex items-center text-gray-700 space-x-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-500 bg-gray-700 rounded focus:ring focus:ring-blue-500"
                />
                <span className="text-[15px]">
                  By signing up, you agree to our
                  <Link href="#" className="text-primary-600">
                    {" "}
                    Terms of Use
                  </Link>{" "}
                  and{" "}
                  <Link href="#" className="text-primary-600">
                    Privacy Policy.
                  </Link>
                </span>
              </label>
            </div>
            <button
              type="submit"
              className={cn("w-full py-2 px-4 bg-primary-600 hover:bg-primary-700 text-white rounded focus:outline-none focus:ring focus:ring-blue-500", 
                {
                  "opacity-50 cursor-not-allowed": signupDisabled,
                }
              )}

              disabled={signupDisabled}
            >
              Create an account
            </button>
          </form>
        </div>
        <div className="relative w-1/2 bg-gray-700 flex items-center justify-center">
          <Image
            src="/illustration.svg"
            alt="Illustration"
            width={450}
            height={450}
            // layout='fill'
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
