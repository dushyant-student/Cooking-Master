"use client";

import { useAuth } from "@/context/AuthProvider";
import { getSaveStatus, toggleSaveRecipe } from "@/services/saveService";
import { Bookmark, Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const SaveButton = ({ recipeId , userId ,recipeOwnerId ,saveFlage=false }) => {

  const router = useRouter();
  const [savePost, setSavePost] = useState(false);
  const {  saveRefresh } = useAuth() ;


  // CHECK SAVE STATUS
  useEffect(() => {
    const checkSaveStatus = async () => {
      try {
        const response = await getSaveStatus(recipeId, userId );

        setSavePost(response.data?.saveStatus || false);
      } catch (error) {
        // console.log("Save status error:", error);

        if (error.response?.status === 401) {
          setSavePost(false);
        }
      }
    };

    if (recipeId && userId) {
      checkSaveStatus();
    }
  }, [recipeId, userId]);


  // ==============================
  // SAVE / UNSAVE
  // ==============================

  const handleSave = async () => {

    try {
      if (!userId) {
        toast.error("Please Login");
        router.push("/login");
        return;
      }

      const response = await toggleSaveRecipe(recipeId, userId , recipeOwnerId);
      const status = response.data?.saveStatus;
      setSavePost(status);

    } catch (error) {
      // console.log("Save error:", error);

      if (error.response?.status === 401) {
        toast.error("Please Login");
        router.push("/login");
      }
    }finally{
      saveRefresh("/save/recipes")
    }
  };


  // ==============================
  // UI
  // ==============================

  return (
    <>
      {saveFlage ? (
        <Bookmark
          onClick={handleSave}
          className={
            savePost
              ? "fill-green-400 text-black cursor-pointer"
              : "text-black cursor-pointer"
          }
        />
      ) : (
        <Heart
          onClick={handleSave}
          className={`absolute top-5 right-5 cursor-pointer ${
            savePost
              ? "fill-red-400"
              : "text-black"
          }`}
        />
      )}
    </>
  );
};