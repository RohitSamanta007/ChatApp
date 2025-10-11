import jwt from "jsonwebtoken"
import userModel from "../models/userModel.js";


export const socketAuthMiddleware = async(socket , next) =>{
    try {

        // extract the token
        const token = socket.handshake.headers.cookie?.split("; ").find((row) => row.startsWith("jwt="))?.split("=")[1];

        // verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded){
            console.log("Socket connection rejected: Invalid token");
            return next(new Error("Unauthorized -Invalid Token"))
        }

        // find user from db
        const user = await userModel.findById(decoded.userId).select("-password")
        if(!user){
            console.log("Socket connection rejected: User not found")
            return next(new Error("User not found"))
        }
         
        socket.user = user;
        socket.userId = user._id.toString();
        console.log("Socket authenticated for user : " + user.fullName + " - " + user._id)
        next();
    } catch (error) {
        console.log("Error in socket authentication : ", error.message)
        next(new Error("Unauthorized - Authentication failed"));
    }
}