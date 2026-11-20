import SaveModel from "../models/saveRecipeModel.js";

// SAVE / UNSAVE RECIPE
export const toggleSaveRecipe = async (req, res) => {
  try {
    
    const { recipeId, userId, recipeOwnerId } = req.body;
   
    if (!recipeId || !userId || !recipeOwnerId) {
     
      return res.status(400).json({
        success: false,
        message: "recipeId and userId are required",
      });
      
    }

    const existingSave = await SaveModel.findOne({
      recipeId,
      userId,
    });

    // Already saved -> remove
    if (existingSave) {
      await SaveModel.findByIdAndDelete(existingSave._id);

      return res.status(200).json({
        success: true,
        saveStatus: false,
        message: "Recipe removed from saved",
      });
    }

    // Not saved -> save
    await SaveModel.create({
      recipeId,
      userId,
      recipeOwnerId
    });

    return res.status(201).json({
      success: true,
      saveStatus: true,
      message: "Recipe saved successfully",
    });
  } catch (error) {
    console.log("SAVE RECIPE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};


// CHECK SAVE STATUS
export const getSaveStatus = async (req, res) => {
  try {
    const { recipeId, userId } = req.query;

    if (!recipeId || !userId) {
      return res.status(400).json({
        success: false,
        message: "recipeId and userId are required",
      });
    }

    const saved = await SaveModel.findOne({
      recipeId,
      userId,
    });

    return res.status(200).json({
      success: true,
      saveStatus: !!saved,
    });
  } catch (error) {
    // console.log("GET SAVE STATUS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


// GET ALL SAVED RECIPES OF USER
export const getSavedRecipes = async (req, res) => {
  try {
    const userId = req.user?.id ;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "userId is required",
      });
    }

    const savedRecipes = await SaveModel.find({
      userId,
    }).populate("recipeId" ," name categoryType imageURL owner ").sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: savedRecipes,
    });
  } catch (error) {
    // console.log("GET SAVED RECIPES ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};