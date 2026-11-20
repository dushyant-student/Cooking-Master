"use client";
import { Button } from "@heroui/react";
import Link from "next/link";
import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import { loginUser } from "@/services/authServices";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import GoogleLoginButton from "@/components/GoogleLoginButton";
import { useAuth } from "@/context/AuthProvider";

export default function LoginPage() {
  const { refreshUser } = useAuth() ;
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [Error,setError ]= useState("")
  const [loginData, setLoginData] = useState(
    {
      email: "",
      password: "",
    }
  );
  const router = useRouter();



  const handleData = (key, value) => {
    setError("")
    setLoginData((prevData) => (
      {
        ...prevData,
        [key]: value,
      }
    )
    );
  };


 
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);

    const response = await loginUser(loginData);

    if (!response.success) {
      toast.error(response.message);
      setError("Invalid Email or Password");
      return;
    }

    toast.success("Login Successful");

    setLoginData({
      email: "",
      password: "",
    });

    await refreshUser();

    router.replace("/");
    router.refresh();

  } catch (err) {
    setError("Invalid Email or Password");

    toast.error(
      err.response?.data?.message || "Login failed"
    );
  } finally {
    setLoading(false);
  }
};


  return (
    <main className="min-h-screen w-full flex items-center justify-center px-4 py-10 bg-linear-to-br from-orange-50 via-white to-amber-100 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute -top-32 -left-32 w-80 h-80 bg-orange-300/30 rounded-full blur-3xl" />

      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-yellow-300/30 rounded-full blur-3xl" />

      <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-pink-200/20 rounded-full blur-3xl" />

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-5xl bg-white/60 backdrop-blur-2xl border border-white/70 shadow-2xl rounded-3xl overflow-hidden grid md:grid-cols-2">
        <div className="hidden md:flex relative min-h-155 overflow-hidden">
          {/* //here left side image  */}
          <img
            src="/LoginLogo.svg"
            alt="Delicious food"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-black/10" />
          <div className="relative z-10 flex flex-col justify-end p-10 text-white">

            {/* <img
              src="/logo.svg"
              alt="Logo"
              className="w-28 mb-5 brightness-0 invert"
            /> */}

            <h2 className="text-4xl font-bold leading-tight">
              Discover.
              <br />
              Cook. Enjoy.
            </h2>

            <p className="mt-4 text-white/80 max-w-md">
              Login to explore delicious recipes, save your favourite
              dishes and discover something new every day.
            </p>

            <div className="flex gap-3 mt-6">

              <span className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-sm">
                🍕 Recipes
              </span>

              <span className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-sm">
                ❤️ Favorites
              </span>

            </div>
          </div>
        </div>

        {/* Right Login */}
        <div className="flex items-center justify-center p-7 sm:p-10 md:p-12">

          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md"
          >

            {/* Header */}
            <div className="mb-8">

              <div className="flex items-center gap-3 mb-5 md:hidden">
                <img
                  src="/logo.svg"
                  alt="Logo"
                  className="w-20"
                />
              </div>
              <p className="text-red-300" >{}</p>
              <p className="text-orange-500 font-semibold text-sm mb-2">
                WELCOME BACK 👋
              </p>

              <h1 className="text-4xl font-extrabold text-gray-900">
                Login
              </h1>

              <p className="text-gray-500 mt-2">
                Welcome back! Please enter your details.
              </p>

            </div>

            {/* Email */}
            <div className="mb-5">

              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>

              <div className="relative group">

                <Mail
                 size={20}
                 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition"
                />

                <input
                  type="email"
                  required
                  value={loginData.email}
                  onChange={(e) =>
                    handleData("email", e.target.value)
                  }
                  placeholder="Enter your email"
                  className="w-full h-13 pl-12 pr-4 rounded-xl border border-gray-200 bg-white/80 outline-none transition-all focus:border-orange-400 focus:ring-4 focus:ring-orange-100 placeholder:text-gray-400"
                />

              </div>
            </div>


            {/* Password */}
            <div className="mb-3">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>

              <div className="relative group">

                <Lock
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition"
                />

                <input
                  type={showPassword ? "password" : "text"}
                  required
                  value={loginData.password}
                  onChange={(e) =>
                    handleData("password", e.target.value)
                  }
                  placeholder="Enter your password"
                  className="w-full h-13 pl-12 pr-12 rounded-xl border border-gray-200 bg-white/80 outline-none transition-all focus:border-orange-400 focus:ring-4 focus:ring-orange-100 placeholder:text-gray-400"
                />

                {/* //Show password icon Button */}
                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-500 transition"
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>

              </div>
            </div>


            {/* Forgot Password */}
            <div className="flex justify-between mb-6">
              <p className="font-sm text-red-800 " >{Error}</p>

              <Link
                href="/forgot-password"
                className="text-sm font-semibold text-orange-500 hover:text-orange-600 transition"
              >
                Forgot Password?
              </Link>
            </div>


            {/* Login Button */}
            <Button
              type="submit"
              isDisabled={loading}
              className="w-full h-13 rounded-xl bg-linear-to-r from-orange-500 to-amber-500 text-white font-bold text-base shadow-lg shadow-orange-200 hover:shadow-orange-300 hover:scale-[1.01] transition-all"
            >
              {loading ? (
                <div className="flex items-center gap-2">

                  <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />

                  Logging in...

                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">

                  Login

                  <ArrowRight size={19} />

                </div>
              )}
            </Button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-7">

              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-xs text-gray-400">
                OR CONTINUE WITH
              </span>
              <div className="h-px flex-1 bg-gray-200" />

            </div>


            {/* Google */}
            <GoogleLoginButton/>
      

            {/* Register */}
            <p className="text-center text-sm text-gray-500 mt-7">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="font-bold text-orange-500 hover:text-orange-600 transition"
              >
                Create Account
              </Link>
            </p>

          </form>
        </div>
      </div>
    </main>
  );
}


