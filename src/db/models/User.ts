import { Schema, Document } from "mongoose";

import mongoose from "mongoose";
import { User } from "../../types/user.types";
import { string } from "zod";
const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: regex,
  },
  title: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "Password must be at least 6 characters long"],
    maxlength: [128, "Password cannot exceed 128 characters"],
  },

  bio: {
    type: String,
    maxlength: [600, "Bio cannot exceed 500 characters"],
    required: true,
  },
  profilePicture: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

export const userSchema = mongoose.model<User>("User", UserSchema);
