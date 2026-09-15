import mongoose from "mongoose";
import recipeModel from "../models/recipeModel.js";
import LikeModel from "../models/likeModel.js";
import SaveModel from "../models/saveRecipeModel.js";
import Comment from "../models/commentModel.js";

export const dashBoardControllers = async (req, res) => {
  try {
    let userId = req.user?.id;
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    userId = new mongoose.Types.ObjectId(userId);

    // MY TOTAL RECIPES
    let myPosts = await recipeModel.find({}, { owner: 1, _id: 0 });
    myPosts = myPosts.length ;
    

    // TOTAL LIKES ON MY RECIPES
    const likesOnMyPosts = await LikeModel.countDocuments({
      recipeOwnerId: userId,
    });

    // TOTAL SAVES ON MY RECIPES
    const savesOnMyPosts = await SaveModel.countDocuments({
      recipeOwnerId: userId,
    });

    const totalComments = await Comment.countDocuments(
      {
        recipeOwnerId : userId 
      }
    )


    // TOTAL ENGAGEMENT
    const totalEngagement =
      likesOnMyPosts +
      savesOnMyPosts 

    // RECENT RECIPES
    const recentPosts = await recipeModel
      .find({ userId })
      .sort({ createdAt: -1 })
      .limit(5)
      .select("recipeName imageURL categoryType createdAt");

    return res.status(200).json({
      success: true,

      stats: {
        myPosts,
        likesOnMyPosts,
        savesOnMyPosts,
        totalEngagement,
        totalComments
      },

      recentPosts,
    });
  } catch (error) {
    // console.error("Dashboard Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard details",
      error: error.message,
    });
  }
};