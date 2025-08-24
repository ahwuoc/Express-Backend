import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGODB_URL = process.env.MONGODB_URL;

export default async function connectMongo() {
  try {
    if (!MONGODB_URL) {
      return console.log(
        "\x1b[41m\x1b[37mKhông có thông tin MONGODB_URL trong .env\x1b[0m"
      );
    }
    console.log("\x1b[33mĐang cố gắng connect đến MongoDB...\x1b[0m");
    await mongoose.connect(MONGODB_URL);
    console.log("\x1b[42m\x1b[30mMongoDB connected successfully!\x1b[0m");
  } catch (err: any) {
    console.log("\x1b[41m\x1b[37mMongoDB connection error:\x1b[0m", err);
  }
}
