"use client"
import React from 'react'

import { ChefHat, Clock3, MessageCircle, Share2 } from 'lucide-react'
import { SaveButton } from '@/components/saveButton';
import { LikeButton } from '@/components/LikeButton';
import { useAuth } from '@/context/AuthProvider';
import { TimeConverter } from '@/components/TimeConverter';

export default function AboutOptions({ aboutData, recipeId }) {
  const { user } = useAuth();
  let saveFlage = true;

let dataLength = []
  
  return (
    <>
      {/* Author */}
      <div className="flex flex-wrap gap-2 lg:gap-6 mt-6 text-gray-600">
        <img
          src={aboutData?.owner?.imageURL}
          alt="Chef"
          className="w-10 h-10 object-cover rounded-full border-2"
        />
        <div className="flex items-center gap-2">
          <ChefHat size={18} />
          {aboutData?.owner?.name || "Chef"}
        </div>
        <div className="flex items-center gap-2">
          <Clock3 size={18} />
          { TimeConverter(aboutData?.updatedAt || aboutData?.updatedAt)}
        </div>
      </div>


      <div className="flex gap-4 mt-8 justify-around border-y py-5">
        <div className="flex relative  items-center gap-2">
          <LikeButton userId = {user?._id} recipeId={recipeId}  recipeOwnerId={aboutData?.owner?._id}  />
          {(dataLength?.[0])?.totalLikes || 0 } 
          <span className='hidden sm:block' >Likes</span>
        </div>

        <button className="flex items-center gap-2 hover:text-blue-500">
          <MessageCircle />
          {dataLength?.[0]?.totalComments || 0 } 
          <span className='hidden sm:block' >Comments</span>
        </button>

        <button className=" sm:flex items-center gap-2 hover:text-green-600">
          <Share2 />
          <span className="hidden sm:block" >Share</span>
        </button>

        <div className="flex relative  items-center gap-2">
          <SaveButton recipeId={recipeId} userId={user?._id} recipeOwnerId={aboutData?.owner?._id} saveFlage={saveFlage}  />
          {dataLength?.[0]?.totalSave || 0}
          <span className="hidden sm:block" >Save</span>
        </div>
      </div>
    </>
  )
}
