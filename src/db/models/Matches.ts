// import { Schema } from "mongoose";
// import mongoose from "mongoose";
// import { Match } from "../../types/match.types";

// const MatchSchema: Schema = new Schema(
//   {
//     authorId: {
//       type: Schema.Types.ObjectId,
//       required: true,
//       ref: "User",
//     },
//     providerId: {
//       type: Schema.Types.ObjectId,
//       required: true,
//       ref: "User",
//     },
//     registerId: {
//       type: Schema.Types.ObjectId,
//       required: true,
//       ref: "OfferRegistration",
//     },
//     status: {
//       type: String,
//       enum: ["Pending", "Accepted", "Rejected"],
//       default: "Pending",
//     },
//   },
//   { timestamps: true },
// );

// export const matchSchema = mongoose.model<Match>("Match", MatchSchema);
