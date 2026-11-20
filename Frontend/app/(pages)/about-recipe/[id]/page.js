"use client"

import { useAuth } from "@/context/AuthProvider";
import AboutOptions from "./components/AboutOptions";
import CommentSection from "./components/comment/CommentSection";
import RecipeDetail from "./components/RecipeDetail";
// import { aboutRecipe } from "@/services/uploadServices";
import { use, useEffect } from "react";
import { toast } from "react-toastify";


export default function Page({ params }) {
  let { aboutData, aboutError, aboutisLaoding, setRecipeId, } = useAuth();
  aboutData = aboutData?.data;
  const { id } = use(params);

  useEffect(() => {

    if (id) {
      setRecipeId(id);
    }
    if (aboutError){
      return toast.error("some thing Went Wrong !")
    }

  }, [id, setRecipeId,aboutError]);


  if (aboutisLaoding) {
    return
  }

  if (!aboutData) {
    return (
      <div className="p-10 text-center">
        Recipe not found
      </div>
    );
  }

  return (
    <main className="mt-35 py-5 px-5 grid grid-cols-1  2xl:grid-cols-2 2xl:gap-8  ">

      {/* Recipe Image + Author */}
      <div >
        <div className="flex justify-center ">
          <img

            src={aboutData?.imageURL}
            alt={aboutData?.name || "Recipe"}
            className=" w-full aspect-video object-cover rounded-lg " />
        </div>

        <h1 className="text-4xl font-bold py-4">
          {aboutData?.name}
        </h1>

        {/* Actions */}
        <AboutOptions aboutData={aboutData} recipeId={id} />

        <CommentSection recipeId={id} recipeOwnerId={aboutData?.owner?._id} />

      </div>

      <RecipeDetail aboutData={aboutData} />

    </main >
  );
}