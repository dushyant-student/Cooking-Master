import mongoose from "mongoose";

const saveSchema = new mongoose.Schema(
  {
    recipeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "recipe", // 👈 important
      required: true,
      index: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user", // optional, but recommended
      required: true,
      index: true,
    },
    recipeOwnerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Same user same recipe cannot save multiple times
saveSchema.index(
  { userId: 1, recipeId: 1 },
  { unique: true }
);

const SaveModel = mongoose.model("Save", saveSchema);

export default SaveModel;