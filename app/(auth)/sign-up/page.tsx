"use client";

import { useUser } from "@/hooks/useUser";
import { redirect } from "next/navigation";
import Image from "next/image";
import { ChangeEvent, useState } from "react";

const SignUp = () => {
  const user = useUser();
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    country: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.email === "" || formData.password === "") {
      alert("please fill all the required fields");
      return;
    }
    user?.register(formData.email, formData.password, formData.name);
  };

  if (user?.current) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="max-w-6xl w-full flex bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        {/* Form Section */}
        <div className="w-1/2 p-8">
          <h2 className="text-3xl font-semibold text-white">
            Create your Account
          </h2>
          <p className="mt-2 text-gray-900 dark:text-white">
            Already have an account?{" "}
            <a href="/sign-in" className="text-blue-500 hover:underline">
              Login here.
            </a>
          </p>
          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm text-gray-900 dark:text-white"
              >
                Your email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                onChange={handleChange}
                value={formData.email}
                placeholder="name@company.com"
                className="w-full mt-1 px-4 py-2 bg-gray-700 border border-gray-600 text-gray-200 rounded focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="name"
                className="block text-sm text-gray-900 dark:text-white"
              >
                Full Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                onChange={handleChange}
                value={formData.name}
                placeholder="e.g. Bonnie Green"
                className="w-full mt-1 px-4 py-2 bg-gray-700 border border-gray-600 text-gray-200 rounded focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="country"
                className="block text-sm text-gray-900 dark:text-white"
              >
                Country
              </label>
              <select
                id="country"
                className="w-full mt-1 px-4 py-2 bg-gray-700 border border-gray-600 text-gray-200 rounded focus:outline-none focus:ring focus:ring-blue-500"
                name="country"
                onChange={handleChange}
                value={formData.country}
              >
                <option value="">Choose a country</option>
                <option value="United States">United States</option>
                <option value="India">India</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Canada">Canada</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                onChange={handleChange}
                value={formData.password}
                placeholder="••••••••"
                className="w-full mt-1 px-4 py-2 bg-gray-700 border border-gray-600 text-gray-200 rounded focus:outline-none focus:ring focus:ring-blue-500"
              />
              <p className="text-gray-400 text-sm mt-1">Password must be of atleast 8 characters.</p>
            </div>
            <div className="mt-4 mb-2">
              <label className="flex items-center text-gray-400 space-x-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-500 bg-gray-700 rounded focus:ring focus:ring-blue-500"
                />
                <span className="text-[15px]">
                  By signing up, you agree to our Terms of Use and Privacy
                  Policy.
                </span>
              </label>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500"
            >
              Create an account
            </button>
          </form>
        </div>
        {/* Illustration Section */}
        <div className="relative w-1/2 bg-gray-700 flex items-center justify-center">
          <Image
            src="/illustration.svg" // Replace this with the actual illustration image
            alt="Illustration"
            width={500}
            height={500}
            // layout='fill'
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
