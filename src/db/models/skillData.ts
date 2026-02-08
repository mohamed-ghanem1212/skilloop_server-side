import { Schema } from "mongoose";
import mongoose from "mongoose";
import { Skill } from "../../types/skillData.types";
const SkillSchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    skill: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
    },
    description: {
      type: String,
      required: String,
    },
    section: {
      type: String,
      required: true,
      enum: ["Development", "Art_Design", "Business", "Marketing", "Other"],
    },
  },
  { timestamps: true },
);

export const skillSchema = mongoose.model<Skill>("Skill", SkillSchema);
