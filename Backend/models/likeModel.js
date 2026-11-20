import mongoose from "mongoose";

const likeSchema = new mongoose.Schema(
  {
    recipeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "recipe",
      required: true,
      index: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
    },
    recipeOwnerId:{
      type : mongoose.Schema.Types.ObjectId,
      required:true,
      index:true,
    }
  },
  {
    timestamps: true,
  }
);

likeSchema.index(
  { userId: 1, recipeId: 1 },
  { unique: true }
);

const LikeModel = mongoose.model("Like", likeSchema);

export default LikeModel;