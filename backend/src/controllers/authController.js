import { generateToken } from "../lib/utils.js";
import userModel from "../models/userModel.js";
import bcrypt from "bcrypt"

export const signUp = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    if (!fullName || !email || !password) {
      return res
        .status(400)
        .json({ message: "All fields are requied", success: false });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({
          message: "Password must be atleast 6 characters long.",
          success: false,
        });
    }

    // check for valid email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ message: "Invalie email format", success: false });
    }

    // check for existing user
    const user = await userModel.findOne({email})

    if(user){
        return res.status(400).json({success: false, message: "User already exists with this email"})
    }
    
    // insert a new user to database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const newUser = new userModel({
        fullName,
        email,
        password: hashedPassword,
    })
    
    if(newUser){
        const token =  generateToken(newUser._id, res);
        await newUser.save();

        return res.status(200).json({
            success: true,
            _id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email,
            profilePic: newUser.profilePic,
        })
    }
    else{
        return res.status(400).json({success: false, message: "Invalid user data"})
    }

  } catch (error) {
    console.log("Error in SignUp Controller : ", error);
    return res.status(500).json({message: "Internal Server Error"})
  }
};
