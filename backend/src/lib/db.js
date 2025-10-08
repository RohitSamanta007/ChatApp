import mongoose from "mongoose"

export const connectDB = async() =>{
    try {
        const { MONOGBDB_URL } = process.env;
        if(!MONOGBDB_URL) throw new Error("MONGODB_URL is not set")

        const conn = await mongoose.connect(process.env.MONOGBDB_URL);
        console.log("Mongodb connected successfully : ", conn.connection.host);
    } catch (error) {
        console.log("Mongodb connection failed : ", error);
        process.exit(1);
    }
}