import express from "express";
import { Router } from "express";
import { dashBoardControllers } from "../controllers/dashBoardControllers.js";
import { protect } from "../middleware/authMiddleware.js";


const dashboardRoute = express.Router();

dashboardRoute.get("/all",protect,dashBoardControllers);

export default dashboardRoute ;