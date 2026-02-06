import { Schema } from "mongoose";
import mongoose from "mongoose";
import { SkillOffer } from "../../types/skills.types";

const SkillOfferSchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    wantSkill: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      required: true,
      enum: ["Beginner", "Intermediate", "Advanced"],
    },
    section: {
      type: String,
      required: true,
      enum: ["Development", "Art & Design", "Business", "Marketing", "Other"],
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Open", "Matched", "Closed"],
      default: "Open",
    },
  },
  { timestamps: true },
);

export const skillOfferSchema = mongoose.model<SkillOffer>(
  "SkillOffer",
  SkillOfferSchema,
);
