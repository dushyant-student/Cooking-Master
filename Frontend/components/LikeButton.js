"use client";

import {  ThumbsUp } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { toggleLike, getLikeStatus } from "@/services/likeService";
import { useAuth } from "@/context/AuthProvider";


export const LikeButton = ({ recipeId ,userId ,recipeOwnerId }) => {
  
  const router = useRouter();
  const [likePost, setLikePost] = useState(false);
  const { likeMutate } = useAuth() ;

  // CHECK LIKE STATUS
  useEffect(() => {
    const checkLikeStatus = async () => {
      try {
        const response = await getLikeStatus(
          recipeId,
          userId
        );
        
        setLikePost(
          response?.likeStatus || false
        );

      } catch (error) {
        console.log("Like status error:", error);
      }
    };

    if (recipeId && userId) {
      checkLikeStatus();
    }
  }, [recipeId, userId]);


  // LIKE / UNLIKE
  const handleLike = async () => {
    try {
      if (!userId) {
        toast.error("Please Login");
        router.push("/login");
        return;
      }

      const response = await toggleLike( recipeId, userId , recipeOwnerId);
  
      likeMutate("/like/my-like-recipes") ;
      const status = response?.likeStatus;
      setLikePost(status);
      
      
    } catch (error) {
      console.log("Like error:", error);

      if (error.response?.status === 401) {
        toast.error("Please Login");
        router.push("/login");
      }
    }
  };



  return (
    <ThumbsUp
      size={24}
      onClick={handleLike}
      className={`cursor-pointer ${
        likePost
          ? " fill-green-300 text-black-500 "
          : "text-black"
      }`}
    />
  );
};