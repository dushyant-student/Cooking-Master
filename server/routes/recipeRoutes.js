import express, { Router } from "express";
import { addRecipe, deleteRecipe, getfilterRecipes, getHomeRecipes, recipeById, updateRecipe } from "../controllers/recipeControllers.js";
import upload from "../middleware/multer.js";
import { protect } from "../middleware/authMiddleware.js";
import { getAdminRecipes } from "../controllers/(AdminsAccess)/AdminRecipeControllers.js";



const recipeRoute = express.Router();


recipeRoute.post("/add",protect, upload.single("imageURL"), addRecipe);

recipeRoute.put("/update/:id",protect, upload.single("imageURL"), updateRecipe);

recipeRoute.get("/type/:type",getfilterRecipes);

recipeRoute.get("/all/latest" , getHomeRecipes); // all recipe For Home page according to latest always 

recipeRoute.delete("/delete/:id",protect, deleteRecipe);

recipeRoute.get("/:id", recipeById);



//Get Recipes only admins Own recipes

recipeRoute.get("/admins/all/:type",protect , getAdminRecipes); // all recipe

export default recipeRoute;