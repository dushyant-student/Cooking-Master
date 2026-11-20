"use client";

import Link from "next/link";
import { ChefHat, Home, ArrowLeft  } from "lucide-react";

export default function Page() {
  return (
    <div className="flex min-h-[70vh] w-full items-center justify-center px-5">
      <div className="w-full max-w-lg text-center">
        {/* Icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-orange-100">
          <ChefHat size={40} className="text-orange-500" />
        </div>

        {/* 404 */}
    
        <h2 className="mt-3 text-2xl font-bold text-gray-800">
          Opps ! You Write Wrong URL ,Page Not Available
        </h2>
        
        <p className="mt-3 text-gray-500">
          Sorry, the page you are looking in Progress,
          so currently unavailable
          <span className="text-green-500">
            this page Freature Comming Soon...
          </span>
        </p>

        {/* Buttons */}
        <div className="mt-7 flex flex-wrap justify-center gap-3">

          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg bg-orange-500 px-5 py-3 font-medium text-white transition hover:bg-orange-600"
          >
            <Home size={18} />
            Go Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-5 py-3 font-medium text-gray-700 transition hover:bg-gray-100"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>

        </div>

      </div>
    </div>
  );
}

