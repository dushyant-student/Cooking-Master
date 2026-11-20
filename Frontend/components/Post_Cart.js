import { Edit } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function Post_Cart({ post }) {

  const router = useRouter();
  return (
    <>
    <div className=" full h-70 w-70 border rounded-2xl border-r-3 relative ">
    
      <Edit onClick={()=>router.push(`/upload/?id=${post?._id}`)} className="absolute top-5 right-5 text-3xl bg-white text-black "/>
    
      <img src={post?.imageURL} className=" w-full h-full rounded-2xl"  />
      <Link  href={`about-recipe/${post?._id}` }  className="position: absolute bottom-2 right-4 px-2 py-2 text-blue-600 bg-amber-50 " >
          Post View
      </Link>
      <div className="text-black font-extrabold" >{ (post?.name).slice(0, 60)}</div>
    </div>
    </>
  );
}