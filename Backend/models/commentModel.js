import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    recipeId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    username: {
      type: String,
      required: true,
      trim: true,
    },

    profile: {
      type: String,
      default: "",
    },

    comment: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },

    /*
      null = main comment

      commentId = reply
    */

    parentComment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
      index: true,
    },
    recipeOwnerId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required:true,
    }
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;