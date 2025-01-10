// filepath: /home/deviant/code/crypto_price_tracker/src/config/database.ts
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGODB_URI;
    if (!mongoURI) {
      throw new Error("MONGODB_URI environment variable is not defined");
    }

    await mongoose.connect(mongoURI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error(`Mongo db connection error: `, error);
    process.exit(1);
  }
};

export default connectDB;