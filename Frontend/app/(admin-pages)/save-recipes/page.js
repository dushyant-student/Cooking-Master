"use client";

import { useAuth } from "@/context/AuthProvider";
import { Bookmark, ChefHat, Clock, RefreshCw, Star } from "lucide-react";
import Link from "next/link";
import timeAgo from "./timeConverter";
import { SaveButton } from "@/components/saveButton";
import { useEffect } from "react";


export default function SavedRecipes() {
    const { saveData, saveError, saveisLoading, user, loading } = useAuth();
   
    const savedRecipes = saveData?.data || [];
  
    useEffect(()=>{
        if (saveError) {
            return (
                <div className="flex justify-center items-center p-10 text-red-300">
                    Something went wrong saved recipes ,Try Again later...
                    <button
                        onClick={() => reset()}
                        className="flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                    >
                        <RefreshCw size={18} />
                        Try Again
                    </button>
                </div>
            );
        }

    },[saveError])
    

    if (saveisLoading || loading ) {
        return (
            <div className="flex justify-center items-center p-10">
                Loading saved recipes...
            </div>
        );
    }
    
    
    return (
        <>
            { ( savedRecipes?.length === 0  ) ? (
                <div className="flex flex-col gap-8 items-center justify-center p-10 text-gray-500">
                    
                    <Bookmark size={50} />

                    <h2 className="text-xl font-extrabold mt-4">
                        Currently, You Have No Saved Recipes
                    </h2>

                    <p className="mt-2 font-bold">
                        Recipes you save will appear here.
                    </p>

                    <div className="mt-20 flex gap-14">
                        <button onClick={() => window.history.back()}
                        className="py-2 px-4 rounded-sm bg-green-400 text-white font-bold" >
                            Back
                        </button>

                        <Link
                            href="/"
                            className="py-2 px-4 rounded-sm bg-orange-500 text-white font-light"
                        >
                            Back to Home
                        </Link>
                    </div>
                </div>
            ) 

            : 
            
            (
                <div className="p-6">
                    <div className="flex gap-4 border-b-2">
                        <h1 className="text-3xl font-bold mt-2 mb-6">
                            My Saved Recipes
                        </h1>

                        <Bookmark className="text-blue-300 fill-red-300" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">

                        {savedRecipes?.map((savedRecipe) => {
                            const recipe = savedRecipe.recipeId;
                            

                            // Safety check
                            if (!recipe) return null;

                            return (
                                <div
                                    key={savedRecipe._id}
                                    className="bg-white relative w-70 rounded-xl overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-2 hover:scale-[1.06] hover:shadow-2xl"
                                >
                                    {/* Image */}
                                    <img src={recipe.imageURL} alt={recipe.name} className="w-full h-52 object-cover"    />

                                    {/* Content */}
                                    <div className="p-2">
                                        <div className="flex justify-between items-start">
                                            <h2 className="text-lg font-bold">
                                                {recipe.name}
                                            </h2>
                                            
                                            <SaveButton recipeId={recipe._id} userId={user._id} recipeOwnerId={recipe.owner}  />
                                            <Bookmark
                                                size={20}
                                                className="fill-yellow-400 text-yellow-500"
                                            />
                                        </div>

                                        <p className="flex gap-2 text-sm text-gray-500 mt-2 items-center">
                                            <ChefHat />

                                            <span className="text-lg text-gray-600">
                                                {recipe.categoryType || "Chef"}
                                            </span>
                                        </p>
                                            <h1 className="text-red">{recipe?.recipeOwnerId}</h1>
                                        

                                        <div className="flex items-baseline justify-evenly mt-4 text-sm text-gray-600">

                                            <div className="flex items-center gap-1">
                                                <Clock size={16} />
                                                <h1>
                                                    {timeAgo(recipe.createdAt)}
                                                </h1>

                                            </div>

                                            <div className="flex items-center gap-1">
                                                <Star
                                                    size={16}
                                                    className="fill-yellow-400 text-yellow-400"
                                                />
                                                4.8
                                            </div>

                                            <div className="px-1">
                                                <Link
                                                    className="px-10 py-1 bg-amber-200 rounded-sm border hover:bg-green-200 hover:text-black"
                                                    href={`/about-recipe/${recipe._id}`}
                                                >
                                                    View
                                                </Link>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                    </div>
                </div>
            )}
        </>
    );
}
