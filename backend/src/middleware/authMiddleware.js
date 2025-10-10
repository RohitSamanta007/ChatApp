import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized! - Please login to continue",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized! - Invalid token",
      });
    }

    const user = await userModel.findById(decoded.userId).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in AuthMiddleware of protect route : ", error);
    return res.status(500).json({
      success: false,
      message: "Interanl server error",
    });
  }
};
