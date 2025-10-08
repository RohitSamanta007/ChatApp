import jwt from "jsonwebtoken"

export async function  generateToken(userId, res ) {

    const {JWT_SECRET, NODE_ENV} = process.env;
    if(!JWT_SECRET){
        throw new Error("JWT_SECRET is not configured.");
    }

    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: "7d"
    })

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // (take input in ms)
        httpOnly: true, // prevenet xss attacks: cross site sctipting
        sameSite: "strict", // prevent CSRF attacks
        secure: process.env.NODE_ENV === "production"
    })

    return token;
}