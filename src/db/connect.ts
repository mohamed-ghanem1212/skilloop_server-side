import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/SkillSwap");
    console.log("Connected to the database successfully");
  } catch (error: any) {
    console.error("Error connecting to the database:", error.message);
  }
};
