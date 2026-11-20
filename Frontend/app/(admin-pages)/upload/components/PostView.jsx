
"use client";

import Post_Cart from "@/components/Post_Cart";
import { useAuth } from "@/context/AuthProvider";
import { ArrowUp, ArrowDown } from "lucide-react";
import { useEffect, useState } from "react";

export default function PostView() {
  const [view, setView] = useState(true);
  useEffect(() => {
  const mediaQuery = window.matchMedia("(min-width: 768px)");

  const handleResize = (e) => {
    if (e.matches) {
      setView(true);
    }
  };

  mediaQuery.addEventListener("change", handleResize);

  // Initial check
  if (mediaQuery.matches) {
    setView(true);
  }

  return () => {
    mediaQuery.removeEventListener("change", handleResize);
  };
}, []);



  const {  totalPost,  totalPostError,  totalPostisLaoding,  setType,  type, } = useAuth();

  const posts = totalPost?.data || [];
 
  return (
    <>
      {/* POSTS PANEL */}
      <div
        className={`
          fixed bottom-0 left-0 z-40
          md:static md:bottom-auto md:left-auto
          w-full lg:w-1/3
          h-[85vh] lg:h-full
          flex flex-col
          bg-white shadow-xl
          rounded-t-2xl lg:rounded-none
          transition-transform duration-500 ease-in-out
          ${view ? "translate-y-0" : "translate-y-full"}
        `}
      >
        {/* HEADER */}
        <div className="sticky top-0 z-20 flex shrink-0 items-center justify-between gap-3 border-b bg-white px-4 py-3">

          <div className="flex gap-2">
            <button
              onClick={() => setType("latest")}
              className={`rounded-md px-4 py-2 font-semibold ${
                type === "latest"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              Latest
            </button>

            <button
              onClick={() => setType("oldest")}
              className={`rounded-md px-4 py-2 font-semibold ${
                type === "oldest"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              Oldest
            </button>
          </div>

          <button
            onClick={() => setView(false)}
            className="rounded-md  bg-blue-500 p-2 text-white md:hidden"
          >
            <ArrowDown size={20}  />
          </button>
        </div>

        {/* POSTS */}
        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5">
          {totalPostisLaoding ? (
            <p className="text-center">Loading posts...</p>
          ) : totalPostError ? (
            <p className="text-center text-red-500">
              Failed to load posts
            </p>
          ) : posts.length === 0 ? (
            <p className="text-center">
              You did not upload any posts
            </p>
          ) : (
            <div className="flex flex-wrap gap-6 ">
              {posts.map((post) => (
                <Post_Cart key={post._id} post={post} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* FIXED VIEW BUTTON */}
      {!view && (
        <button
          onClick={() => setView(true)}
          className="
          md:hidden
            fixed bottom-4 left-1/2 -translate-x-1/2
            z-50 flex items-center gap-2
            rounded-full bg-blue-600 px-4 py-1
            font-semibold text-white shadow-xl
            transition-all duration-300
            hover:bg-blue-700 active:scale-95
          "
        >
          <ArrowUp size={20} />
          View Posts
        </button>
      )}
    </>
  );
}
