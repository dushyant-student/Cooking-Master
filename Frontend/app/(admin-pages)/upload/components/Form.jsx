"use client"
import { useEffect, useState } from "react"
import { Button } from "@heroui/react"
import useSWR from "swr";
import { aboutRecipe, updateRecipe, uploadsData } from "@/services/uploadServices"
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { fetcher } from "@/lib/fetcher";
import { useAuth } from "@/context/AuthProvider.js";


export default function Form() {
  const [dropdown, setDropdown] = useState([]);
  const [loading, setLoading] = useState(false)
  const [preViewImage, setPreViewImage] = useState("");
  let { allTypesCategories, categoryError ,user } = useAuth();

  // if (categoryError) {
  //   toast.error("internet issue");
  //   console.log("Error from Upload Form:- ",categoryError)
  //   return
  // }

 

  allTypesCategories = allTypesCategories?.allCategories;
  const { data, error, mutate } = useSWR("/auth/profile", fetcher); //logi here inclued owner object id 

  const searchParms = useSearchParams();
  //id = recipe id from url params
  const id = searchParms.get("id")
  const [recipe, setRecipe] = useState(
    {
      imageURL: "",
      name: "",
      ingredients: "",
      about: "",
      recipieDescription: "",
      categoryType: ""

    }
  )

  const recipeAccordingParamsId = async (id) => {

    if (!id) {
      setRecipe(
        {
          imageURL: "",
          name: "",
          ingredients: "",
          about: "",
          recipieDescription: "",
          categoryType: ""
        }
      )
      return
    }

    // Authintication only User Can Edit His Recipe
    const recipeById = await aboutRecipe(id);
   
    if (user?._id === recipeById?.owner?._id){
      setRecipe(recipeById);

    }


  }

  useEffect(() => {
    recipeAccordingParamsId(id)
  }, [id]);


  const handleForm = (key, val) => {

    setRecipe(preData => {
      return {
        ...(preData ?? {}),
        [key]: val
      }
    }
    )
  }


  const handleCreate = async () => {
    try {
      setLoading(true);

      if (error) {
        toast.error("Network Error !");
        return;
      }

      const profile = data?.profile || [];
      const formData = new FormData();
      formData.append("imageURL", recipe.imageURL);
      formData.append("name", recipe.name);
      formData.append("ingredients", recipe.ingredients);
      formData.append("about", recipe.about);
      formData.append("recipieDescription", recipe.recipieDescription);
      formData.append("categoryType", recipe.categoryType);
      formData.append("owner", profile.name);
      const dataChange = dropdown.find((item) => item.categoryType === recipe.categoryType)._id

      formData.append("categoryTypeId", dataChange);
      
      const response = await uploadsData(formData);

      if (response.success) {
        toast.success(response.message || "Upload SuccesFully");
        mutate("/recipe/add") // Update the SWR cache for the list of recipes
        setRecipe(
          {
            imageURL: "",
            name: "",
            ingredients: "",
            about: "",
            recipieDescription: "",
            categoryType: ""
          }
        )
      } else {
        toast.error(err.response.data?.message || "Somthing Went Wrong");
      }

    } catch (err) {
      // console.log("Err in Creating recipe :-",err);
      toast.error(err.response?.message?.data || "Recipe Upload Failed");
    } finally {
      setLoading(false);
    }
  };


  const handleUpdate = async (id) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("imageURL", recipe.imageURL);
      formData.append("name", recipe.name);
      formData.append("ingredients", recipe.ingredients);
      formData.append("about", recipe.about);
      formData.append("recipieDescription", recipe.recipieDescription);
      formData.append("categoryType", recipe.categoryType);
      formData.append("categoryTypeId", dropdown.find((item) => item.categoryType === recipe.categoryType)._id);
      const response = await updateRecipe(id, formData);

      if (response.success) {
        toast.success("SuccessFully Updated");
        mutate("/recipe/add");
        setRecipe(
          {
            imageURL: "",
            name: "",
            ingredients: "",
            about: "",
            recipieDescription: "",
            categoryType: ""
          }
        )

      } else {
        toast.error(response.message)
      }

    } catch (err) {
      // console.log(err);
      toast.error("Internal server error")
    } finally {
      setLoading(false);
    }
  };



  const handleOption = async () => {
    setDropdown(allTypesCategories);
  }

  useEffect(() => {
    handleOption()
  }, [allTypesCategories]);


  return (
    <div className="px-2 py-2 text-semibold w-full  lg:w-2/3  min-h-0  h-full  overflow-y-auto  overflow-x-hidden  border-b  lg:border-b-0  lg:border-r  border-gray-200 ">
      <h1 className="text-2xl p-3 color text-green-500">{id ? "Update" : "Create"}</h1>
      <form onSubmit={
        (e) => {
          e.preventDefault()
          if (!id) {
            handleCreate()
          } else {
            handleUpdate(id)
          }
        }} className="flex flex-col gap-5">

        <div className="flex flex-col gap-2 px-5">
          <label htmlFor="image">Image</label>
          {recipe.imageURL
            && <div className=" flex justify-center ">
              <img src={preViewImage || recipe?.imageURL} className="h-25 w-35 rounded-xl " alt="/" />
            </div>}
          <input required onChange={(e) => { handleForm("imageURL", e.target?.files[0]), setPreViewImage(URL.createObjectURL(e.target?.files[0])) }} id="image" type="file" className="px-4 py-2 border-2 rounded-xl" />
        </div>

        <div className="flex flex-col gap-2 px-5">
          <label htmlFor="name">Name</label>
          <input required value={recipe?.name || ""} onChange={(e) => handleForm("name", e.target.value)} id="name" type="text" name="upload" className="px-4 py-2 border-2 rounded-xl" />
        </div>

        <div className="flex flex-col gap-2 px-5">
          <label htmlFor="about" >About recipe</label>
          <textarea value={recipe?.about || ""} required onChange={(e) => handleForm("about", e.target.value)} id="description" type="text" name="description" className="px-4 py-2 border-2 rounded-xl" />
        </div>

        <div className="flex flex-col gap-2 px-5">
          <label htmlFor="ingredients">Ingredients</label>
          <textarea required value={recipe?.ingredients || ""} onChange={(e) => handleForm("ingredients", e.target.value)} id="ingredients" type="text" name="ingredients" className="px-4 py-2 border-2 rounded-xl" />
        </div>

        <div className="flex flex-col gap-2 px-5">
          <label htmlFor="recipieDescription" >Recipie description</label>
          <textarea value={recipe?.recipieDescription || ""} required onChange={(e) => { handleForm("recipieDescription", e.target.value) }} id="recipieDescription" type="text" className="px-4 py-2 border-2 rounded-xl" />
        </div>


        < div className="flex flex-col gap-2 px-5">

          <label htmlFor="RecipeType">Choose food type</label>
          <select
            id="RecipeType"
            required
            name="RecipeType"
            value={recipe?.categoryType || ""}
            className="w-full border-2 border-gray-400 rounded-lg p-2"
            onChange={(e) => handleForm("categoryType", e.target.value)}
          >
            <option value="" disabled>
              Choose food type
            </option>

            {dropdown?.map((opt) => (
              <option key={opt._id} value={opt.categoryType}>
                {opt.categoryType}
              </option>
            ))}
          </select>
        </div>




        <div className="flex flex-col pt-3 mb-10 pb-5 gap-2 px-5">
          {loading &&
            <h1 className="text-red-500 text-sm">{loading ? "please wait !" : ""}</h1>
          }
          <Button isDisabled={loading} type="submit" className="w-full " >{id ? loading ? "updating..." : "Update" : loading ? "Creating..." : "Create"}</Button>
        </div>

      </form>
    </div>
  )
}