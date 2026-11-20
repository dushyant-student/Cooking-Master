"use client"

import Link from "next/link"
import { SaveButton } from "./saveButton"
import { LikeButton } from "./LikeButton"
import { useAuth } from "@/context/AuthProvider"



export const Card = ({ item }) => {
    const { user } = useAuth();
    
    return (

        <div className="w-85   flex flex-col justify-between transition-all duration-300 ease-in-out hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl ">
            <div className="relative">
                <img src={item?.imageURL} className=" w-full h-60  " />
                <SaveButton recipeId={item?._id} userId={user?._id} recipeOwnerId={item?.owner} />
            </div>
            <div className="py-2">
                <h1 className="px-4 font-bold text-2xl ">{item?.name}.</h1>
                <p className=" px-4 text-sm ">{(item?.about).slice(0, 40)}...</p>
            </div>
            <div className="px-4 py-5 flex justify-around items-center">
                <div className="flex gap-12 justify-center items-center">

                    <LikeButton recipeId={item?._id} userId={user?._id} recipeOwnerId={item?.owner} />

                    <Link href={`/about-recipe/${item?._id}`} >
                    <button className="px-10 py-1 bg-gray-200 hover:bg-green-100 hover:text-green-600"  >
                        View
                    </button>
                    </Link>
                </div>

            </div>
        </div>

    )
}