import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const getMe = async (req, res) => {
  try {
    let token = req.cookies?.token;

    if (!token && req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    console.log("getMe token exists:", !!token);

    if (!token) {
      return res.status(401).json({ success: false, user: null, message: "No token" });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({ success: false, user: null, message: "User not found" });
    }

    return res.status(200).json({ success: true, user });


    
  } catch (error) {
    console.log("getMe error:", error.message);
    return res.status(401).json({ success: false, user: null, message: error.message });
  }
};