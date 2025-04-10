import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const MONGODB_URL = process.env.MONGODB_URL;

export default async function connectMongo() {
  try {
    if (!MONGODB_URL)
      return console.log("⚠️ Không có thông tin MONGODB_URL trong .env");
    await mongoose.connect(MONGODB_URL);
    console.log("🎉 MongoDB connected successfully!");
  } catch (err) {
    console.error("🔥 MongoDB connection error:");
    throw err;
  }
}
