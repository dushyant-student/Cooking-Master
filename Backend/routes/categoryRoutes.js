import express from "express";
import upload from "../middleware/multer.js";
import { protect } from "../middleware/authMiddleware.js";
import { getAdminsCategories } from "../controllers/(AdminsAccess)/AdminCategoryControllers.js";
import { addCategory, deleteCategory, getCategories, getCategoryById, updateCategory } from "../controllers/categoryControllers.js";

const categoryRoute = express.Router();


categoryRoute.get("/all",getCategories);
categoryRoute.get("/:id",getCategoryById);
categoryRoute.post("/add",protect,upload.single("imageURL"),addCategory);
categoryRoute.put("/update/:id",protect,upload.single("imageURL"),updateCategory);
categoryRoute.delete("/delete/:id",protect,deleteCategory);

//Admins Category 
categoryRoute.get("/admins/all",protect ,getAdminsCategories);


export default categoryRoute;