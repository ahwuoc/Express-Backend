import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const MONGODB_URL = process.env.MONGODB_URL;

export default async function connectMongo() {
  try {
    if (!MONGODB_URL) {
      return console.log(
        "\x1b[31m⚠️ Không có thông tin MONGODB_URL trong .env\x1b[0m"
      );
    }
    await mongoose.connect(MONGODB_URL);
    console.log("\x1b[32m🎉 MongoDB connected successfully!\x1b[0m");
  } catch (err) {
    console.error("\x1b[31m🔥 MongoDB connection error:\x1b[0m");
    throw err;
  }
}
