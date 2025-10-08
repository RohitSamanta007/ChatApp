import mongoose from "mongoose"

export const connectDB = async() =>{
    try {
        const conn = await mongoose.connect(process.env.MONOGBDB_URL);
        console.log("Mongodb connected successfully : ", conn.connection.host);
    } catch (error) {
        console.log("Mongodb connection failed : ", error);
        process.exit(1);
    }
}