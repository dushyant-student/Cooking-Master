"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, LockKeyhole, Mail } from "lucide-react";
import { Button, Input } from "@heroui/react";
import { toast } from "react-toastify";
import { forgotPassword } from "@/services/authServices";

export default function ForgotPassword() {

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email.trim()) {
            toast.error("Please enter your email");
            return;
        }

        try {
            setLoading(true);

            const result = await forgotPassword(email.trim());
            if (!result?.success) {
                toast.error( result?.message || "Unable to send reset link"    );
                return;
            }

            toast.success( result.message || "Reset link sent successfully"  );
            setEmail("");

        } catch (error) {
            console.log("err in:- ",error)
            toast.error(  error?.response?.data?.message ||  "Something went wrong. Please try again.");

        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-linear-to-br from-sky-50 via-white to-blue-50 flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                <div className="bg-white border border-gray-100 rounded-2xl shadow-xl p-8">

                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                            <LockKeyhole
                                size={30}
                                className="text-blue-600"
                            />
                        </div>
                    </div>

                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-gray-800">
                            Forgot Password?
                        </h1>
                        <p className="text-sm text-gray-500 mt-2 leading-6">
                            Enter your registered email address and
                            we'll send you a link to reset your password.
                        </p>
                    </div>

                    <form  onSubmit={handleSubmit}  className="space-y-5" >

                        <input type="email" label="Email Address" placeholder="Enter your email" value={email} 
                        onChange={(e) =>setEmail(e.target.value) } 
                        className="py-1 outline-1 rounded-xl text-center w-full" variant="bordered" required
                        />

                        <Button type="submit" color="primary" size="lg" className="w-full font-semibold"
                            isLoading={loading}
                            isDisabled={loading}
                        >
                            {loading
                                ? "Sending Reset Link..."
                                : "Send Reset Link"}
                        </Button>

                    </form>

                    <div className="mt-7 text-center">

                        <Link
                            href="/login"
                            className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800"
                        >
                            <ArrowLeft size={16} />
                            Back to Login
                        </Link>

                    </div>

                </div>

                <p className="text-center text-xs text-gray-400 mt-5">
                    Don't worry, we'll help you get back into your account.
                </p>

            </div>

        </main>
    );
}