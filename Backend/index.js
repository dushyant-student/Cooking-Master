import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import connectCloudinary from "./config/cloudinary.js";
import authRoutes from "./routes/authRoutes.js";
import dashboardRoute from "./routes/dashboardRoute.js";
import recipeRoute from "./routes/recipeRoutes.js";
import categoryRoute from "./routes/categoryRoutes.js";
import commentRoute from "./routes/comment.Routes.js";
import mailRoute from "./routes/mailRoutes.js";
import likeRoutes from "./routes/likeRoutes.js";
import saveRoutes from "./routes/saveRoutes.js";
import "./config/firebaseAdmin.js";
import serachRoute from "./routes/searchRoute.js";




export const app = express();

connectDB();
connectCloudinary();

app.use(express.json());

app.use(cors({
  origin: [
    
    "https://cooking-master-ck.vercel.app",
    
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
}));

app.use(cookieParser());


// app.use((req, res, next) => {
//     console.log("========== INCOMING REQUEST ==========");
//     console.log("METHOD:", req.method);
//     console.log("ORIGINAL URL:", req.originalUrl);
//     console.log("URL:", req.url);
//     console.log("BASE URL:", req.baseUrl);
//     console.log("======================================");

//     next();
// });




app.use("/api/auth",authRoutes);
app.use("/api/category", categoryRoute);
app.use("/api/recipe", recipeRoute); 
app.use("/api/dashboard-details", dashboardRoute);
app.use("/api/like", likeRoutes);
app.use("/api/save", saveRoutes);
app.use("/api/comments", commentRoute);
app.use("/api", mailRoute);
app.use("/api/search", serachRoute);



app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
