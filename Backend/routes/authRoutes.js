import express from "express";
import { getServerProfile, GoogleLogin, Login, Logout, Register, updateProfile } from "../controllers/authControllers.js";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/multer.js";
import { verifyFirebaseToken } from "../middleware/firebaseAuth.js";
import { forgotPassword } from "../controllers/forgotPassControllers.js";
import { resetPassword } from "../controllers/reset-passControllers.js";
import { getMe } from "../controllers/getMeControllers.js";



const authRoutes = express.Router()


authRoutes.get("/me", getMe);

authRoutes.post("/register" ,Register);
authRoutes.post("/login" ,Login);

authRoutes.post("/google",verifyFirebaseToken,GoogleLogin); 

authRoutes.get("/profile",protect,getServerProfile);

authRoutes.put("/update-profile",protect,upload.single("imageURL"), updateProfile);


authRoutes.get("/logout",Logout);

authRoutes.post("/forgot-password", forgotPassword);

authRoutes.post("/reset-password/:token", resetPassword);


export default authRoutes;
