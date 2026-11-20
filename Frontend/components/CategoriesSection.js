"use client";

import { useEffect } from "react";
import { useAuth } from "@/context/AuthProvider";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function CategoriesSection() {
  const { allTypesCategories, categoryError, categoryisLoading,} = useAuth();

  const allCategories = allTypesCategories?.allCategories;

  // doesnt call toast during render
  useEffect(() => {
    if (categoryError) {
      toast.error("Internet issue");
    }
  }, [categoryError]);



  if (categoryisLoading) {
    return (
      <div className="w-full py-10 flex justify-center items-center">
        <h1>Loading...</h1>
      </div>
    );
  }



  if (categoryError) {
    return null;
  }



  return (
    <div className=" z-0 w-full overflow-x-auto overflow-y-hidden scrollbar-hide " >
      <div className="   flex   gap-5 sm:gap-8   px-4 sm:px-6   py-6 sm:py-8   w-max   min-w-full ">
        {allCategories?.map((data) => (
          <ImageSection
            key={data._id || data.categoryType}
            data={data}
          />
        ))}
      </div>
    </div>
  );
}



const ImageSection = ({ data }) => {
  const router = useRouter();

  const handleImageClick = () => {

    router.push(`/category/${data.categoryType}`);

    };

  const categoryName =
    data?.categoryType ?.charAt(0) ?.toUpperCase() +data?.categoryType?.slice(1)?.toLowerCase();

  return (
    <div className=" shrink-0 w-20 sm:w-24 md:w-28 text-center z-0" >
      
      <img
        onClick={handleImageClick}
        src={data?.imageURL}
        alt={data?.categoryType || "Category"}
        className=" w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-lg object-cover cursor-pointer transition-all duration-300 ease-in-out hover:-translate-y-2 hover:scale-[1.02] hover:shadow-xl"/>

      {/* Category name */}
      <Link
        href={`/category/${data?.categoryType}`}
        className=" block mt-2 text-sm sm:text-base font-medium truncate">
        {categoryName}
      </Link>
    </div>
  );
};

