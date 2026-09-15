//  GET ALL RECIPES ADMINs Recipes
import recipeModel from "../../models/recipeModel.js";


export const getAdminRecipes = async (req, res) => {
  try {

    const { type } = req.params;
    const owner = req.user?.id ;
    let recipes;
    
    if (type === "latest") {
      recipes = await recipeModel
        .find({owner})
        .sort({ createdAt: -1 });
    }

    else if (type === "oldest") {
      recipes = await recipeModel
        .find({owner})
        .sort({ createdAt: 1 });
    }
    else {
      return res.status(400).json({
        success: false,
        message: "Invalid type"
      });
    }

    
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
 