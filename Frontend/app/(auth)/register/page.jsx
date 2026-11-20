"use client";

import { registerUser } from "@/services/authServices";
import { Button } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, ChefHat, CheckCircle2, } from "lucide-react";
import { useAuth } from "@/context/AuthProvider";

export default function RegisterPage() {
  const { user } = useAuth();
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  });
  
  
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();

  
  if (user && user?._id ) {
    router.push("/")
  }
  
  const handleChange = (key, value) => {
    setRegisterData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!registerData.name.trim()) {
      toast.error("Please enter your name");
      return;
    }

    if (!registerData.email.trim()) {
      toast.error("Please enter your email");
      return;
    }

    if (!registerData.password) {
      toast.error("Please enter your password");
      return;
    }

    if (registerData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {

      setLoading(true);

      const response = await registerUser(registerData);

      if (response.success) {
        setRegisterData({
          name: "",
          email: "",
          password: "",
        });

        toast.success("Registration successful!");
        router.push("/login");
      } else {
        toast.error(response.message || "Registration failed");
      }
    } catch (err) {
      console.log(err)
      toast.error(
        err.response?.data?.message || "Internal server error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#fffaf5] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-190 max-w-6xl overflow-hidden rounded-[30px] bg-white shadow-2xl">

        {/* //LEFT SIDE - IMAGE / BRAND */}
        <div className="relative hidden w-1/2 overflow-hidden lg:block">

          {/* <img
            src="/logo.svg"
            alt="Delicious food"
            className="absolute inset-0 h-full w-full object-cover"
          /> */}

          {/* Overlay */}
          <div className="absolute inset-0 bg-orange-500" />

          {/* Content */}
          <div className="relative z-10 flex h-full flex-col justify-start p-12 text-white">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-300 backdrop-blur-md">
                <ChefHat size={26} />
              </div>

              <div>
                <h2 className="text-xl font-bold">
                  Foodie
                </h2>
                <p className="text-xs text-white/70">
                  Discover. Cook. Enjoy.
                </p>
              </div>
            </Link>

            {/* Main Text */}
            <div className="max-w-md">
              <p className="mb-4 text-sm font-medium uppercase tracking-[3px] text-orange-300">
                Welcome to Foodie
              </p>

              <h1 className="text-5xl font-bold leading-tight">
                Discover recipes.
                <br />
                Create memories.
              </h1>
            <div className="mt-50 ml-10">
            
              <p className="mt-6 text-lg leading-8 text-white/80">
                Join our community of food lovers and discover thousands
                of delicious recipes from around the world.
              </p>

              {/* Benefits */}
              <div className="mt-8 space-y-4">

                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-orange-300" size={20} />
                  <span>Thousands of delicious recipes</span>
                </div>

                <div className="flex items-center gap-3 pb-10">
                  <CheckCircle2 className="text-orange-300" size={20} />
                  <span>Save your favorite recipes</span>
                </div>

              </div>
              </div>
            </div>

            <p className="text-sm text-white/60">
              © 2026 Foodie. All rights reserved.
            </p>
          </div>
        </div>

        {/* =========================================
            RIGHT SIDE - REGISTER FORM
        ========================================= */}
        <div className="flex w-full items-center justify-center px-6 py-12 sm:px-12 lg:w-1/2">

          <div className="w-full max-w-md">

            {/* Mobile Logo */}
            <div className="mb-8 flex items-center gap-3 lg:hidden">
              <img
                src="/logo.svg"
                alt="Foodie"
                className="h-12 w-12 object-contain"
              />

              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Foodie
                </h2>
                <p className="text-xs text-gray-500">
                  Discover. Cook. Enjoy.
                </p>
              </div>
            </div>

            {/* Heading */}
            <div className="mb-8">
              <p className="mb-2 text-sm font-semibold text-orange-500">
                CREATE YOUR ACCOUNT
              </p>

              <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                Join our food community
              </h1>

              <p className="mt-3 text-gray-500">
                Create your account and start exploring delicious recipes.
              </p>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* Name */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Full Name
                </label>

                <div className="relative">
                  <User
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    value={registerData.name}
                    onChange={(e) =>
                      handleChange("name", e.target.value)
                    }
                    placeholder="Enter your name"
                    className="h-14 w-full rounded-xl border border-gray-200 bg-gray-50 pl-12 pr-4 text-sm outline-none transition focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="email"
                    value={registerData.email}
                    onChange={(e) =>
                      handleChange("email", e.target.value)
                    }
                    placeholder="you@example.com"
                    className="h-14 w-full rounded-xl border border-gray-200 bg-gray-50 pl-12 pr-4 text-sm outline-none transition focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Password
                </label>

                <div className="relative">
                  <Lock
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    value={registerData.password}
                    onChange={(e) =>
                      handleChange("password", e.target.value)
                    }
                    placeholder="Create a password"
                    className="h-14 w-full rounded-xl border border-gray-200 bg-gray-50 pl-12 pr-12 text-sm outline-none transition focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-700"
                  >
                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>
                </div>

                <p className="mt-2 text-xs text-gray-400">
                  Password must contain at least 6 characters.
                </p>
              </div>

              {/* Terms */}
              <div className="flex items-start gap-3 rounded-xl bg-orange-50 p-4">
                <CheckCircle2
                  size={18}
                  className="mt-0.5 shrink-0 text-orange-500"
                />

                <p className="text-xs leading-5 text-gray-600">
                  By creating an account, you agree to our{" "}
                  <Link
                    href="/terms"
                    className="font-semibold text-orange-500 hover:underline"
                  >
                    Terms
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="font-semibold text-orange-500 hover:underline"
                  >
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>

              {/* Button */}
              <Button
                type="submit"
                isDisabled={loading}
                className="h-14 w-full rounded-xl bg-orange-500 text-base font-semibold text-white shadow-lg shadow-orange-200 transition hover:bg-orange-600 disabled:opacity-60"
              >
                {loading ? (
                  "Creating account..."
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Create Account
                    <ArrowRight size={19} />
                  </span>
                )}
              </Button>
            </form>

            {/* Login */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-semibold text-orange-500 hover:text-orange-600 hover:underline"
                >
                  Sign In
                </Link>
              </p>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}