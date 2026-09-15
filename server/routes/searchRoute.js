import express from "express";

import { searchRecipes } from "../controllers/searchController.js";

const serachRoute = express.Router();

serachRoute.get("/recipes", searchRecipes);


export default serachRoute;