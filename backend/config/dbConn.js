import mongoose from "mongoose";

export const connectDB = async() => {
    try {
        await mongoose.connect(process.env.DB_CONNECT)
    } catch (error) {
        console.log(error)
    }
}