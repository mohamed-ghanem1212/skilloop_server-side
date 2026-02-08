import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL as string);
  } catch (error: any) {
    console.error("Error connecting to the database:", error.message);
  }
};
