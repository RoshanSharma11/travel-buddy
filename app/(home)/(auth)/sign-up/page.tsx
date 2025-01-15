"use client";

// import { useUser } from "@/hooks/useUser";
import { redirect, useRouter } from "next/navigation";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useAuth, useSignUp, useUser } from "@clerk/nextjs";
import LoadingSpinner from "@/components/LoadingSpinner";
import { toast } from "@/hooks/use-toast";

const SignUp = () => {
  // const user = useUser();
  const { isLoaded, signUp, setActive } = useSignUp();
  const auth = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
  });
  const [signupDisabled, setSignupDisabled] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [code, setCode] = useState("");
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setSignupDisabled(true);
      if (formData.email === "" || formData.password === "") {
        alert("please fill all the required fields");
        return;
      }
      // user?.register(formData.email, formData.password, formData.name);
      await signUp?.create({
        emailAddress: formData.email,
        password: formData.password,
        firstName: formData.name,
      });

      // Send the user an email with the verification code
      await signUp?.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      // Set 'verifying' true to display second form
      // and capture the OTP code
      setVerifying(true);
    } catch (error:any) {
      console.log(error.message);
      toast({
        title:error.message,
        variant:"destructive"
      })
    } finally {
      setSignupDisabled(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    // if (!isLoaded) return

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp?.attemptEmailAddressVerification({
        code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt?.status === "complete") {
        await setActive!({ session: signUpAttempt.createdSessionId });
        window.location.replace("/dashboard")
        // router.push("/dashboard");
        // redirect('/dashboard')
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error("Error:", JSON.stringify(err, null, 2));
      toast({
        title:err.message,
        variant:"destructive"
      })
    }
  };

  // if (user?.current) {
  //   redirect("/");
  // }

  if (!isLoaded) return <LoadingSpinner />;
  if (auth.isLoaded && auth.userId) {
    router.push("/dashboard");
  }

  // Display the verification form to capture the OTP code
  //  if (verifying) {
  //   return (
  //     <>
  //       {/* <h1>Verify your email</h1>
  //       <form onSubmit={handleVerify}>
  //         <label id="code">Enter your verification code</label>
  //         <input value={code} id="code" name="code" onChange={(e) => setCode(e.target.value)} />
  //         <button type="submit">Verify</button>
  //       </form> */}
  //       <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-full ">
  //           <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
  //             <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
  //               <h1 className="text-xl font-semibold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
  //                 Verify your account
  //               </h1>
  //               <form className="space-y-4 md:space-y-6" onSubmit={handleVerify}>
  //                 <div>
  //                   <label
  //                     htmlFor="email"
  //                     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
  //                   >
  //                     Your Code
  //                   </label>
  //                   <input
  //                     type="text"
  //                     name="code"
  //                     id="code"
  //                     className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
  //                     placeholder="name@company.com"
  //                     value={code}
  //                     onChange={(e) => setCode(e.target.value)}
  //                     required={true}
  //                   />
  //                 </div>
  //                 <button
  //                   type="submit"
  //                   className={cn(
  //                     "w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800",
  //                     {
  //                       // "opacity-50 cursor-not-allowed": signinDisabled,
  //                     }
  //                   )}
  //                   // disabled={}
  //                 >
  //                   Verify
  //                 </button>

  //               </form>
  //             </div>
  //           </div>
  //         </div>
  //     </>
  //   )
  // }

  return (
    <>
      {verifying ? (
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-full ">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-semibold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Verify your account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleVerify}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your Code
                  </label>
                  <input
                    type="text"
                    name="code"
                    id="code"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter 6-digit code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    required={true}
                  />
                  <p className="text-sm text-gray-600">Sent to your email</p>
                </div>
                <button
                  type="submit"
                  className={cn(
                    "w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800",
                    {
                      // "opacity-50 cursor-not-allowed": signinDisabled,
                    }
                  )}
                  // disabled={}
                >
                  Verify
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : (
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
                  className={cn(
                    "w-full py-2 px-4 bg-primary-600 hover:bg-primary-700 text-white rounded focus:outline-none focus:ring focus:ring-blue-500",
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
      )}
    </>
  );
};

export default SignUp;
