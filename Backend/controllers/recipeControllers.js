import { v2 as cloudinary } from "cloudinary";
import recipeModel from "../models/recipeModel.js";
import client from "../config/algolia.js";
import { addRecipeToAlgolia, deleteRecipeFromAlgolia, updateRecipeInAlgolia } from "../utils/algoliyaRecipe.js";


//ADD recipe in MongoDB 

export const addRecipe = async (req, res) => {
  try {
    const owner = req.user?.id;
    const {
      name,
      about,
      ingredients,
      recipieDescription,
      categoryType,
      categoryTypeId,
    
    } = req.body;


    if (
      !name ||
      !about ||
      !ingredients ||
      !recipieDescription ||
      !categoryType ||
      !req.file ||
      !categoryTypeId 
      
    ) {
      return res.status(400).send({
        message: "Please Fill all Details",
        success: false,
      });
    }


    //Upload image in Cloudinary

    const imageURL = await cloudinary.uploader.upload(req.file.path);
    const recipe = await recipeModel.create({
      name,
      about,
      ingredients,
      recipieDescription,
      categoryType,
      categoryTypeId,
      imageURL: imageURL.secure_url,
      public_id: imageURL.public_id,
      owner,
    });



  //  Algolia  create recipe 
    await addRecipeToAlgolia(recipe);
    
    //Final Response from backend 
    return res.status(201).send({
      message: "Recipe Successfully Added",
      recipe,
      success: true,
    });

  } catch (err) {
    // console.error("ADD RECIPE ERROR:", err);

    return res.status(500).send({
      message: err.message,
      success: false,
    });
  }
};



//  GET SINGLE RECIPE from MONGODB

export const recipeById = async (req, res) => {
  try {
    const { id } = req.params;

    const recipe = await recipeModel.findById(id).populate("owner","-password -email");

    if (!recipe) {
      return res.status(404).send({
        message: "Recipe Not Found",
        success: false,
        data: null,
      });
    }

    return res.status(200).send({
      data: recipe,
      success: true,
    });

  } catch (err) {
    return res.status(500).send({
      message: err.message,
      success: false,
    });
  }
};


//Home Recipes 
export const getHomeRecipes = async (req, res) => {
  try {
    
    let recipes;
    recipes = await recipeModel
      .find()
      .sort({ createdAt: -1 });
    
      recipes.map(recipe => ({
        name: recipe.name,
        createdAt: recipe.createdAt
      }))

    return res.status(200).json({
      success: true,
      data: recipes
    });

  } catch (error) {
    // console.log("ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message
    }) }
   } ;
 



//  UPDATE RECIPE from Mongo Db

export const updateRecipe = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      about,
      ingredients,
      recipieDescription,
      categoryType,
      categoryTypeId,
    } = req.body;

  
    const findRecipe = await recipeModel.findById(id);

    if (!findRecipe) {
      return res.status(404).send({
        message: "Recipe Not Found",
        success: false,
      });
    }


    if (name) {
      findRecipe.name = name;
    }

    if (about) {
      findRecipe.about = about;
    }

    if (ingredients) {
      findRecipe.ingredients = ingredients;
    }

    if (recipieDescription) {
      findRecipe.recipieDescription = recipieDescription;
    }

    if (categoryType) {
      findRecipe.categoryType = categoryType;
    }

    if (categoryTypeId) {
      findRecipe.categoryTypeId = categoryTypeId;
    }

    //  Update image from CLoud

    if (req.file) {
      const previousImageId = findRecipe.public_id;

      if (previousImageId) {
        await cloudinary.uploader.destroy(previousImageId);
      }

      const uploaded = await cloudinary.uploader.upload(req.file.path);

      findRecipe.imageURL = uploaded.secure_url;
      findRecipe.public_id = uploaded.public_id;
    }

    const recipe = await findRecipe.save();

    
  // ==================== Update Algolia  recipe=============
    await updateRecipeInAlgolia(recipe);



    return res.status(200).send({
      message: "Recipe Successfully Updated",
      data: recipe,
      success: true,
    });

  } catch (err) {
    // console.error("UPDATE RECIPE ERROR:", err);

    return res.status(500).send({
      message: err.message,
      success: false,
    });
  }
};



/* =========================================================
   FILTER RECIPES
========================================================= */

export const getfilterRecipes = async (req, res) => {
  try {
    const { type } = req.params;

    if (!type) {
      return res.status(400).send({
        message: "Type is Required",
        success: false,
      });
    }

    const filterRecipes = await recipeModel.find({
      categoryType: type,
    });

    return res.status(200).send({
      message: "All filter recipes",
      data: filterRecipes,
      success: true,
    });

  } catch (err) {
    // console.error("FILTER ERROR:", err);

    return res.status(500).send({
      message: "Server error",
      success: false,
    });
  }
};


  //  DELETE RECIPE

export const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await recipeModel.findById(id);

    if (!recipe) {
      return res.status(404).send({
        message: "Recipe Not Found For Deletion",
        success: false,
      });
    }

    // Delete Recipe from MongoDB 
    await recipeModel.findByIdAndDelete(id);
    await deleteRecipeFromAlgolia(id)

    await client.deleteObject({
      indexName: process.env.ALGOLIA_INDEX_NAME,
      objectID: recipe._id.toString(),
    });

    return res.status(200).send({
      message: "Recipe Deleted Successfully",
      success: true,
    });
    

  } catch (err) {
    // console.error("DELETE RECIPE ERROR:", err);

    return res.status(500).send({
      message: err.message,
      success: false,
    });
  }
};




