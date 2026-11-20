"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { createCategory, updateCategory } from "@/services/catgoryServices";
import { Button } from "@heroui/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthProvider";


const EMPTY_CATEGORY = {
  categoryType: "",
  imageURL: "",
};

export default function CreateCategoryForm() {
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [category, setCategory] = useState(EMPTY_CATEGORY);
  const { user } = useAuth();

  const searchParams = useSearchParams();
  const recipeId = searchParams.get("id");

  const isEditMode = Boolean(recipeId); // fetch id from Params 
 
  const { data, error, isLoading: categoryLoading, mutate } = useSWR( isEditMode ? `/category/${recipeId}` : null, fetcher );
 
  const categoryData = data?.category || data;

  // ERROR HANDLING
  useEffect(() => {
    if (!error) return;

    toast.error( error.response?.data?.message || "Failed to load category Internet Issue" );
  }, [error]);


  // SET FORM DATA
  useEffect( () => {
    if (!isEditMode) {
      setCategory(EMPTY_CATEGORY);
      return;
    }

    // Owner Can only Edit Category 
    if (categoryData && ( user?._id === categoryData?.userId )) {
      setCategory({ categoryType: categoryData?.categoryType || "", imageURL: categoryData?.imageURL || "",});}
  }, [categoryData, isEditMode]

);


  // Change Input Values 
  const handleCategoryForm = (key, value) => {
    setCategory((prev) => ({
      ...prev,
      [key]: value,
    }));
  };


  //Chanege Image
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    handleCategoryForm("imageURL", file);

    const previewUrl = URL.createObjectURL(file);

    setImagePreview((oldPreview) => {
      if (oldPreview) {
        URL.revokeObjectURL(oldPreview);
      }

      return previewUrl;
    });
  };

 
  // CREATE
  const createNewCategory = async () => {
    try {
      setLoading(true);

      const formData = new FormData();

      formData.append( "imageURL", category.imageURL );
      formData.append("categoryType", category.categoryType );

      const response = await createCategory(formData);

      if (!response.success) {
        throw new Error( response?.message || "Failed to create category");
      }

      toast.success( "Category Successfully Created" );
      mutate("/category/admins/all");
      setCategory(EMPTY_CATEGORY);
      setImagePreview("");

      

    } catch (err) {
      console.log("Err in createory:- ",err)
      toast.error( err.response?.data?.message || err.message || "Something went wrong");

    } finally {
      setLoading(false);
    }
  };


  // Update Category
  const handleUpdate = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("imageURL", category.imageURL);
      formData.append( "categoryType",category.categoryType);

      const response = await updateCategory( recipeId, formData );

      if (!response.success) {
        throw new Error( response.message || "Failed to update category" );
      }

      // Refresh Category data
      toast.success( "Category Successfully Updated");
      await mutate("/category/admins/all") ;
 
      setCategory(EMPTY_CATEGORY);
      setImagePreview("");


    } catch (err) {
      toast.error( err.response?.data?.message || err.message || "Something went wrong");

      console.log("Err in Updating Category:- ",err);
    } finally {
      setLoading(false);
    }
  };


  //Final Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!category.categoryType.trim()) { 
      toast.error("Category name is required");
       return;
      }

    if (!isEditMode && !category.imageURL) {
       toast.error("Category image is required");
        return;
      }

    if (isEditMode) {
      await handleUpdate();
    } else {
      await createNewCategory();
    }
  };


  // LOADING
  if (isEditMode && categoryLoading) {
    return (
      <div className="p-10">
        Loading category...
      </div>
    );
  }

  

  return (
    <div className="px-5 overflow-y-auto w-full">
      <h1 className="py-6 text-2xl font-bold">
        {isEditMode ? "Update" : "Create"}
      </h1>

      <form  onSubmit={handleSubmit}  className="flex flex-col gap-4">
        {/* IMAGE */}

        <div className="flex flex-col gap-2 px-5">
          <label htmlFor="image">
            Category Image
          </label>

          {(imagePreview || category.imageURL) && (
            <div className="flex justify-center">
              <img src={ imagePreview ||  category.imageURL } className="h-20 w-25 object-cover rounded-lg" alt="Category preview"/>
            </div>
          )}

          <input  id="image"  type="file"  accept="image/*"  required={!isEditMode}  onChange={handleImageChange}  className="px-4 py-2 border-2 rounded-xl"/>
          
        </div>

        {/* CATEGORY NAME */}

        <div className="flex flex-col gap-2 px-5">
          <label htmlFor="categoryType">
            Name
          </label>

          <input required id="categoryType" value={category.categoryType} onChange={(e) =>handleCategoryForm( "categoryType", e.target.value ) } type="text"
            className="px-4 py-2 border-2 rounded-xl"
          />
        </div>

        {/* BUTTON */}

        <div className="flex flex-col gap-2 py-10 px-5">
          <Button
            type="submit"
            isDisabled={
              loading || categoryLoading
            }
            className="w-full"
          >
            {loading?
              isEditMode
                  ? "Updating..."
                  : "Creating..."

              : 
              
              isEditMode
                ? "Update"
                : "Create"}
          </Button>
        </div>
      </form>
    </div>
  );
}