"use client";

import { Heart } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useAuth } from "@/context/AuthProvider";
import { LikeButton } from "@/components/LikeButton";


export default function LikedPage() {

  let { likeData, likeError, likeisLoading, user } = useAuth();

  useEffect(() => {
    if (likeError) {
      return toast.error("Internet issue, try again later");
    }
  }, [likeError]);

  const likeRecipesData = likeData?.data || [];

  if (likeisLoading) {
    return (
      <div className="flex justify-center items-center p-10">
        Loading liked recipes...
      </div>
    );
  }


  return (
    <main className="bg-gray-50 p-6 h-150 overflow-y-auto">

      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">

          <div>
            <h1 className="text-3xl font-bold">
              Liked Recipes
            </h1>

            <p className="text-gray-500 mt-1">
              Recipes you've liked
            </p>
          </div>

        </div>


        {/* Recipe Grid */}
        {likeRecipesData?.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {likeRecipesData?.map((likedRecipe) => {

              const recipe = likedRecipe?.recipeId;

              // Agar recipe delete ho chuki hai
              if (!recipe) return null;

              return (
                <div key={likedRecipe._id}
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-md transition-all duration-300 ease-in-out hover:-translate-y-2 hover:scale-[1.02]" >

                  {/* Thumbnail */}
                  <div className="relative group">
                    <img src={recipe.imageURL} alt={recipe.name} className="w-full h-56 object-cover" />
                  </div>


                  {/* Content */}
                  <div className="p-4">
                    <div className="flex items-start justify-between">

                      <div>
                        <h2 className="font-semibold text-lg line-clamp-1">
                          {recipe.name}
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                          {recipe.owner || "Chef"}
                        </p>
                      </div>

                      <Heart size={21} fill="red" className="text-red-500" />

                    </div>


                    <div className="flex justify-between items-center">

                      <div className=" flex gap-2 text-lg mt-3">
                        <LikeButton recipeId={recipe?._id} userId={user?._id} recipeOwnerId={recipe?.owner} />
                        <h1 className="font-bold">Like</h1>
                      </div>

                      <Link className="px-4 py-1 bg-amber-100 hover:bg-green-200 border " href={`/about-recipe/${recipe._id}`}>
                        View
                      </Link>

                    </div>

                  </div>

                </div>
              );
            })}

          </div>
        )}


        {/* Empty State */}
        {likeRecipesData?.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24">

            <Heart
              size={60}
              className="text-gray-300"
            />

            <h2 className="text-xl font-semibold mt-4">
              No liked recipes yet
            </h2>

            <p className="text-gray-500 mt-2">
              Recipes you like will appear here.
            </p>

          </div>
        )}

      </div>

    </main>
  );
}