import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    about: {
      type: String,
      required: true,
    },

    ingredients: {
      type: String,
      required: true,
    },

    recipieDescription: {
      type: String,
      required: true,
    },

    imageURL: {
      type: String,
      required: true,
    },

    categoryType: {
      type: String,
      required: true,
    },

    public_id: {
      type: String,
      required: true,
    },

    categoryTypeId: {
      type: String,
      required: true,
    },
    owner:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
      required:true
    }
  },
  {
    timestamps: true,
  }
);

const recipeModel = mongoose.model("recipe", recipeSchema);

export default recipeModel;