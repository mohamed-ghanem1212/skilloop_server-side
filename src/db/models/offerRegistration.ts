import mongoose from "mongoose";
import { Schema } from "mongoose";
import { Registeration } from "../../types/offerRegister.types";

const OfferRegistrationSchema: Schema = new Schema(
  {
    offerId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "SkillOffer",
    },

    providerId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    ownerId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected"],
      default: "Pending",
    },
    description: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

export const offerRegistrationSchema = mongoose.model<Registeration>(
  "OfferRegistration",
  OfferRegistrationSchema,
);
