import express from "express";
import { getLikedRecipes, getLikeStatus, toggleLike } from "../controllers/likeControllers.js";
import { protect } from "../middleware/authMiddleware.js";


const likeRoutes = express.Router();

likeRoutes.post("/toggle", toggleLike);

likeRoutes.get("/status", getLikeStatus);

likeRoutes.get("/my-like-recipes", protect, getLikedRecipes);

export default likeRoutes;


 