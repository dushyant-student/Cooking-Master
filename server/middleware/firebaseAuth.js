// middleware/firebaseAuth.js 

import { firebaseAuth } from "../config/firebaseAdmin.js";

export const verifyFirebaseToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Firebase token missing",
      });
    }

    const token = authHeader.split("Bearer ")[1];

    const decodedToken = await firebaseAuth.verifyIdToken(token);

    req.firebaseUser = decodedToken;

    next();

  } catch (error) {
    // console.error("Firebase verification error:", error);

    return res.status(401).json({
      success: false,
      message: "Invalid Firebase token",
    });
  }
};