import LikeModel from "../models/likeModel.js";

// LIKE / UNLIKE
export const toggleLike = async (req, res) => {
  try {
    const { recipeId, userId, recipeOwnerId } = req.body;

    if (!recipeId || !userId || !recipeOwnerId) {
      return res.status(400).send({
        success: false,
        message: "recipeId and userId are required",
      });
    }

    const existingLike = await LikeModel.findOne({
      recipeId,
      userId,
    });
    if (existingLike) {
      await LikeModel.findByIdAndDelete(existingLike._id);

      return res.status(200).send({
        success: true,
        likeStatus: false,
        message: "Recipe unliked",
      });
    }

    await LikeModel.create({
      recipeId,
      userId,
      recipeOwnerId
    });


    return res.status(201).send({
      success: true,
      likeStatus: true,
      message: "Recipe liked",
    });

  } catch (error) {
    // console.log("LIKE ERROR:", error);

    return res.status(500).send({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};


// CHECK LIKE STATUS
export const getLikeStatus = async (req, res) => {
  try {
    const { recipeId, userId } = req.query;

    if (!recipeId || !userId) {
      return res.status(400).send({
        success: false,
        message: "recipeId and userId are required",
      });
    }

    const liked = await LikeModel.findOne({
      recipeId,
      userId,
    });

    return res.status(200).send({
      success: true,
      likeStatus: !!liked,
    });

  } catch (error) {
    // console.log("GET LIKE STATUS ERROR:", error);

    return res.status(500).send({
      success: false,
      message: "Server error",
    });
  }
};


//get user Liked Revipes 
export const getLikedRecipes = async (req, res) => {
  try {
    const userId = req.user?.id;
    // console.log("USER ID:", userId);
    if (!userId) {
      return res.status(400).send({
        success: false,
        message: "userId is required",
      });
    }
    // recipeOwnerId

    const likedRecipes = await LikeModel.find(
      {
        userId
      },
      {
        recipeId: 1 ,
        userId:1,
      }
    )
    .populate("recipeId" ,"_id name imageURL owner updatedAt"  )



    return res.status(200).send({
      success: true,
      data: likedRecipes,
    });

  } catch (error) {
    // console.log("GET LIKED RECIPES ERROR:", error);

    return res.status(500).send({
      success: false,
      message: "Server error",
    });
  }
};