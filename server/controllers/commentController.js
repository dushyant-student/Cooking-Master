import Comment from "../models/commentModel.js";

// CREATE COMMENT / REPLY

export const createComment = async (req, res) => {
  try {

    const { recipeId, userId, username, profile, comment, recipeOwnerId, parentComment,} = req.body;

    if (!recipeId || !userId || !username || !comment || !recipeOwnerId) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing",
      });
    }

    const newComment = await Comment.create({
      recipeId,
      userId,
      username,
      profile,
      comment: comment.trim(),
      recipeOwnerId ,
      parentComment: parentComment || null,
    });

    return res.status(201).json({
      success: true,
      message: "Comment added successfully",
      data: newComment,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


/*
GET ALL COMMENTS OF ONE RECIPE
*/

export const getComments = async (req, res) => {
  try {
    const { recipeId } = req.params;

    const comments = await Comment.find({
      recipeId,
    })
      .sort({ createdAt: 1 })
      .lean();

    return res.status(200).json({
      success: true,
      count: comments.length,
      data: comments,
    });
  } catch (error) {
    // console.error("GET COMMENTS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};


/*
GET SINGLE COMMENT
*/

export const getSingleComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    const comment = await Comment.findById(commentId).lean();

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: comment,
    });
  } catch (error) {
    // console.error("GET SINGLE COMMENT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};


/*

UPDATE COMMENT
*/

export const updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { comment } = req.body;

    if (!comment?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Comment text is required",
      });
    }

    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      {
        comment: comment.trim(),
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedComment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Comment updated successfully",
      data: updatedComment,
    });
  } catch (error) {
    // console.error("UPDATE COMMENT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};


/*
DELETE COMMENT + ALL REPLIES

*/

export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    /*
      Find all descendants recursively.
    */

    const deleteChildren = async (parentId) => {
      const children = await Comment.find({
        parentComment: parentId,
      }).select("_id");

      for (const child of children) {
        await deleteChildren(child._id);
      }

      await Comment.deleteMany({
        parentComment: parentId,
      });
    };

    await deleteChildren(commentId);

    /*
      Delete main comment
    */

    await Comment.findByIdAndDelete(commentId);

    return res.status(200).json({
      success: true,
      message: "Comment and replies deleted successfully",
    });
  } catch (error) {
    // console.error("DELETE COMMENT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};