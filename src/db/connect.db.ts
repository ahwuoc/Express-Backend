import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const MONGODB_URL = process.env.MONGODB_URL;
export default async function connectMongo() {
  try {
    console.log("🔌 Connecting to MongoDB...");
    if (!MONGODB_URL) return console.log("Khong co ton tain env mongodb");
    await mongoose.connect(MONGODB_URL);
    console.log("✅ MongoDB connected successfully!");
  } catch (err) {
    console.error("❌ MongoDB connection error:");
    throw err;
  }
}
