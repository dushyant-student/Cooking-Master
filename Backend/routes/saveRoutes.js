import express from "express";
import {  getSavedRecipes, getSaveStatus, toggleSaveRecipe } from "../controllers/saveControllers.js";
import { protect } from "../middleware/authMiddleware.js";

const saveRoutes = express.Router();

saveRoutes.post("/toggle", toggleSaveRecipe);

saveRoutes.get("/status", getSaveStatus);

saveRoutes.get("/recipes", protect, getSavedRecipes);

export default saveRoutes;