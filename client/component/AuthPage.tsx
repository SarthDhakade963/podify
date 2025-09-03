"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleCredentialsLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const emailValid = emailRegex.test(email);
    const passwordValid = passwordRegex.test(password);

    setIsValidEmail(emailValid);
    setIsValidPassword(passwordValid);

    if (!emailValid || !passwordValid) {
      console.log("Form invalid");
      return;
    }

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: true,
        callbackUrl: "/topics",
      });

      console.log(res);

      if (res?.error) {
        console.log("Login failed : ", res.error);
      } else {
        router.push(res?.url || "/topics");
      }
    } catch (error) {
      console.error("Auth error", error);
      alert("Authentication Failed. Please check your credentials.");
    }

    // Proceed with form submission
    console.log("Form submitted: ", { email, password });
  };

  return (
    <div className="flex h-[100vh]">
      {/* Left Side - Product Showcase */}
      <div>
        <div className="flex-1 bg-gradient-to-br from-black via-gray-900 to-slate-800 flex flex-col items-center justify-center p-8 relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute top-20 left-20 w-32 h-32 bg-orange-500 rounded-full opacity-10 blur-3xl"></div>
          <div className="absolute bottom-32 right-16 w-40 h-40 bg-orange-400 rounded-full opacity-10 blur-2xl"></div>

          <div className="text-center text-white z-10">
            {/* App Name */}
            <h1 className="text-6xl font-extrabold mb-6 bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent drop-shadow-lg">
              🎧 Podify
            </h1>

            {/* Image with glow */}
            <div className="relative mb-8">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-orange-500/40 to-pink-500/40 blur-3xl opacity-30 animate-pulse"></div>
              <Image
                src="/auth-image.jpg"
                alt="podcast image"
                height={400}
                width={400}
                className="mx-auto rounded-full shadow-2xl border-4 border-gray-800"
              />
            </div>

            {/* Tagline */}
            <p className="text-2xl font-light text-gray-300 max-w-md mx-auto leading-relaxed">
              <div>
                <span className="font-semibold text-orange-400">
                  Your Podcasts
                </span>{" "}
                and
                <span className="font-semibold text-orange-500">
                  {" "}
                  Your Topics
                </span>{" "}
                -
              </div>
              All in{" "}
              <span className="font-semibold text-orange-600">One Place</span>
            </p>
          </div>
        </div>
      </div>
      {/* Right Side - Auth Form */}
      <div className="flex-1 bg-gradient-to-bl from-gray-900 to-black flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-gray-800">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">
                Welcome Back
              </h1>
              <p className="text-gray-400">Sign in to your Podify account</p>
            </div>

            {/* Google Login */}
            <button
              onClick={() => signIn("google", { callbackUrl: "/topics" })}
              className="w-full mb-6 py-3 px-4 bg-white text-black font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285f4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34a853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#fbbc05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#ea4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </button>

            <div className="flex items-center my-6">
              <hr className="flex-grow border-gray-700" />
              <span className="mx-4 text-gray-500 text-sm">OR</span>
              <hr className="flex-grow border-gray-700" />
            </div>

            {/* Credentials Form */}
            <form onSubmit={handleCredentialsLogin} className="space-y-5">
              <div className="flex flex-col space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-300 tracking-wide"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full px-4 py-3 bg-gray-800/50 rounded-xl 
                text-white placeholder-gray-400  focus:outline-none 
                  transition-all duration-300
                  border
                  focus:ring-1
                  ${
                    isValidEmail
                      ? "focus:ring-orange-500"
                      : "focus:ring-red-900"
                  }`}
                  required
                />

                {!isValidEmail && (
                  <p className="text-red-600 text-sm mt-1 text-left">
                    Invalid email format
                  </p>
                )}
              </div>

              <div className="flex flex-col space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-300 tracking-wide"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full px-4 py-3 bg-gray-800/50 border rounded-xl 
                  text-white placeholder-gray-400 focus:outline-none 
                    transition-all duration-300 
                    focus:ring-1 ${
                      isValidPassword
                        ? "focus:ring-orange-500"
                        : "focus:ring-red-500"
                    }`}
                    required
                  />

                  {password && (
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-transparent focus:outline-none"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-600" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-600" />
                      )}
                    </button>
                  )}
                </div>

                {!isValidPassword && (
                  <p className="text-red-600 text-sm mt-1 text-left">
                    Invalid password format
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-black font-bold rounded-xl hover:from-orange-400 hover:to-orange-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-orange-500/25"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
