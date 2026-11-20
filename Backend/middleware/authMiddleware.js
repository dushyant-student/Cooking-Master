import jwt from "jsonwebtoken";
// import userModel from "../models/userModel.js";
import User from "../models/userModel.js";

export const protect = async (req, res, next) => {

  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Please Login",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.SECRET_KEY
    );

    const user = await User 
      .findById(decoded.id)
      .select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    req.user = user; // each req having user information {name, email,id }
    
    next();

  } catch (error) {
    // console.log("JWT ERROR:", error.message);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};