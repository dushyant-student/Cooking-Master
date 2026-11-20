"use client";

import { deleteRecipeById } from "@/services/uploadServices";
import { Eye, RefreshCw, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useState } from "react";
import { Button } from "@heroui/react";
import { useAuth } from "@/context/AuthProvider";

export default function PostTable() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { totalPost, totalPostError, totalPostisLaoding, totalPostMutate, type, setType } = useAuth();

  const posts = totalPost?.data || [];

  const deletePost = async (id) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this post?");

      if (!confirmDelete) {
        return;
      }

      setLoading(true);
      const response = await deleteRecipeById(id);
     

      if (!response?.success) {

        toast.error(err.response?.data?.message || "Something Went Wrong");

      }

      toast.success(response?.message);
      totalPostMutate(`/recipe/admins/all/${type}`);


    } catch (err) {
      if (err.response?.status === 401) {
        toast.error("Please login first");
        router.push("/login");

      }

      console.log("error in total post:-", err)
    } finally {
      setLoading(false)
    }

  }
  if (totalPostisLaoding) {
    return <div className="flex justify-center  items-center" >
      <h1 className="font-bold pt-30"> Loading Please wait...</h1>
    </div>;
  }

  if (posts?.length === 0) {
    return <div className="flex justify-center  items-center" >
      <h1 className="font-bold pt-30">You Did Not Upload Any post</h1>
    </div>;
  }

  if (totalPostError) {

    return (
      <div className="flex flex-col justify-center items-center gap-6" >
        <h1>Failed to load posts</h1>
        <button
          onClick={() => reset()}
          className="flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
        >
          <RefreshCw size={18} />
          Try Again
        </button>
      </div>
    )
  }


  return (
    <div className="w-full p-5 h-150 overflow-y-auto ">

      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Total Posts
          </h2>

          <p className="text-sm text-gray-500">
            {posts.length} posts available
          </p>
        </div>

        <div className="flex gap-8 pl-17">
          <button onClick={() => setType("latest")} className={`rounded-sm px-4 py-1 font-bold ${type === "latest"
              ? "bg-blue-500 text-white"
              : "bg-gray-50 text-blue-400"
            }`}
          >

            Latest
          </button>

          <button onClick={() => setType("oldest")} className={`rounded-sm px-4 py-1 font-bold ${type === "oldest"
              ? "bg-blue-500 text-white"
              : "bg-gray-50 text-blue-400"
            }`}
          >
            Oldest
          </button>
        </div>


      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm  ">

        <div className="overflow-x-auto ">
          <table className="w-full text-left">

            {/* Table Head */}
            <thead className="bg-sky-100">
              <tr>
                <th className="px-5 py-4 text-sm font-semibold text-gray-700">
                  S.No
                </th>

                <th className="px-5 py-4 text-sm font-semibold text-gray-700">
                  Image
                </th>

                <th className="px-5 py-4 text-sm font-semibold text-gray-700">
                  Name
                </th>

                <th className="px-5 py-4 text-center text-sm font-semibold text-gray-700">
                  View
                </th>

                <th className="px-5 py-4 text-center text-sm font-semibold text-gray-700">
                  Delete
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-gray-100 ">

              {posts.length > 0 ? (
                posts.map((post, index) => (
                  <tr key={post._id} className="transition hover:bg-gray-100"  >

                    {/* S.No */}
                    <td className="px-5 py-4 text-sm text-gray-600">
                      {index + 1}
                    </td>

                    {/* Image */}
                    <td className="px-5 py-4">
                      <img src={post.imageURL} alt={post.name || "Post"} className="h-14 w-14 rounded-lg object-cover" />
                    </td>

                    {/* Name */}
                    <td className="px-5 py-4">
                      <p className="font-medium text-gray-800">
                        {post.name}
                      </p>
                    </td>

                    {/* View */}
                    <td className="px-5 py-4 text-center">
                      <Link href={`/about-recipe/${post._id}`} >
                        <button className="inline-flex items-center justify-center rounded-lg p-2 text-white-300 transition hover:bg-green-200" title="View Post">
                          <Eye size={20} />
                        </button>
                      </Link>
                    </td>

                    {/* Delete */}
                    <td className="px-5 py-4 text-center">
                      <Button
                        isDisabled={loading}
                        onClick={() => deletePost(post._id)}
                        className="bg-white inline-flex items-center justify-center rounded-lg p-3 text-red-600 transition hover:bg-red-100"
                        title="Delete Post"
                      >
                        <Trash2 size={20} />
                      </Button>
                    </td>

                  </tr>
                ))
              ) : (

                /* Empty State */
                <tr>
                  <td
                    colSpan="5"
                    className="px-5 py-12 text-center text-gray-500"
                  >
                    No posts available
                  </td>
                </tr>

              )}

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}