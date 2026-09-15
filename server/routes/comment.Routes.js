import express from "express";
import { createComment, deleteComment, getComments, getSingleComment, updateComment } from "../controllers/commentController.js";



const router = express.Router();


// Create comment / reply
router.post("/", createComment);

// Get all comments for recipe
router.get("/recipe/:recipeId", getComments);

// Get single comment
router.get("/:commentId", getSingleComment);

router.put("/:commentId", updateComment);

router.delete("/:commentId", deleteComment);


export default router;