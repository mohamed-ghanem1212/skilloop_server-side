// import { HydratedDocument } from "mongoose";
// import { Match } from "../../types/match.types";
// import { matchSchema } from "../../db/models/Matches";
// import { BadRequestError, NotFoundError } from "../../utils/errors";
// import { userSchema } from "../../db/models/User";
// import { skillOfferSchema } from "../../db/models/Skills";
// import { statusEnum } from "../../types/skills.types";
// export const createMatch = async (
//   match: Match
// ): Promise<HydratedDocument<Match>> => {
//   const providerIds = [match.authorId, match.providerId];
//   const findUsers = await userSchema.find({ _id: { $in: providerIds } });
//   if (!findUsers) {
//     throw new NotFoundError("User not found");
//   }
//   const findOffer = await skillOfferSchema.findById(match.offerId);
//   if (!findOffer) {
//     throw new NotFoundError("Offer not found");
//   }
//   const createMatch = await matchSchema.create(match);
//   return createMatch;
// };

// export const getMatchById = async (
//   id: string
// ): Promise<HydratedDocument<Match>> => {
//   const findMatch = await matchSchema.findById(id);
//   if (!findMatch) {
//     throw new NotFoundError("Match not found");
//   }
//   return findMatch;
// };

// export const getAllMatches = async (): Promise<HydratedDocument<Match>[]> => {
//   const findMatches = await matchSchema.find();
//   if (!findMatches) {
//     throw new NotFoundError("Matches are empty");
//   }
//   return findMatches;
// };

// export const updateMatches = async (id: string, status: statusEnum) => {
//   const updateMatch = await matchSchema.findByIdAndUpdate(
//     id,
//     { status },
//     { new: true }
//   );
//   if (!updateMatch) {
//     BadRequestError("Match not found or can't be updated");
//   }
//   return updateMatch;
// };
