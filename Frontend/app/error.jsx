
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { RefreshCw, Home, AlertCircle } from "lucide-react";

export default function Error({ error, reset }) {
    const router = useRouter();

    useEffect(() => {
        console.error("Application Error:", error);
    }, [error]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-5 py-10">

            <div className="w-full max-w-2xl bg-white rounded-3xl border border-slate-200 shadow-sm p-8 md:p-12 text-center">

                {/* Icon */}
                <div className="mx-auto mb-8 w-24 h-24 rounded-full bg-red-50 flex items-center justify-center">
                    <AlertCircle
                        size={55}
                        className="text-red-500"
                    />
                </div>

                {/* Heading */}
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
                    Oops! Something went wrong
                </h1>

                <p className="mt-4 text-slate-500 text-base md:text-lg">
                    We encountered an unexpected error while processing
                    your request.
                </p>

                {/* Error Message */}
                <div className="mt-6 p-4 rounded-xl bg-red-50 border border-red-100 text-left">
                    <p className="text-sm font-semibold text-red-600 mb-1">
                        Error Details
                    </p>

                    <p className="text-sm text-red-500 wrap-break-words">
                        {error?.message || "Something went wrong. Please try again."}
                    </p>
                </div>

                {/* Buttons */}
                <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">

                    <button
                        onClick={() => reset()}
                        className="flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                    >
                        <RefreshCw size={18} />
                        Try Again
                    </button>

                    <button
                        onClick={() => router.push("/")}
                        className="flex items-center justify-center gap-2 px-7 py-3 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-100 transition"
                    >
                        <Home size={18} />
                        Go Home
                    </button>

                </div>

                <p className="mt-10 text-sm text-slate-400">
                    If the problem persists, please try again later.
                </p>

            </div>
        </div>
    );
}
