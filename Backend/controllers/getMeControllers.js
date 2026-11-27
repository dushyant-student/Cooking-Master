import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const getMe = async (req, res) => {
  try {
    const token = req.cookies?.token;
    console.log("token Assign:-...",token)
    
    if (!token) {
      return res.status(201).json({
        success: false,
        user: null,
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
        user: null,
        
      });
    }

    return res.status(200).json({
      success: true,
      user,
      
    });

  } catch (error) {
    // Token invalid/expired hai
    console.log(error)
    return res.status(200).json({
      success: false,
      user: null,
     
    });
  }
}