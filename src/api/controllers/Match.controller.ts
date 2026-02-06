// import { asyncHandler } from "../../utils/asyncHandler";
// import { Request, Response } from "express";
// import { requestUser } from "../../types/user.types";
// import { BadRequestError } from "../../utils/errors";
// import * as matchService from "../services/Match.service";
// export const createProviderMatch = asyncHandler(
//   async (req: requestUser, res: Response) => {
//     const authorId = req.user?.id;
//     const { providerId } = req.body;
//     const { offerId } = req.params;
//     if (!authorId || !providerId || !offerId) {
//       throw new BadRequestError("please fill the required data");
//     }
//     const matchData = { authorId, providerId, offerId };
//     const createMatch = await matchService.createMatch(matchData);
//     return res.status(201).json({
//       success: "matched created successfully",
//       createMatch,
//     });
//   },
// );

// export const findMatchById = asyncHandler(
//   async (req: Request, res: Response) => {
//     const { matchId } = req.params;
//     if (!matchId) {
//       throw new BadRequestError("please fill the required data");
//     }
//     const findMatch = await matchService.getMatchById(matchId);
//     return res.status(200).json({ success: "Match found!", findMatch });
//   },
// );
// export const findAllMatches = asyncHandler(
//   async (req: Request, res: Response) => {
//     const Matches = await matchService.getAllMatches();
//     return res.status(200).json({ success: "Match found!", Matches });
//   },
// );

// export const updateMatch = asyncHandler(async (req: Request, res: Response) => {
//   const { matchId } = req.params;
//   const { status } = req.body;
//   if (!matchId || !status) {
//     throw new BadRequestError("please fill the required data");
//   }
//   const newMatch = await matchService.updateMatches(matchId, status);
//   return res.status(200).json({ success: "match has been updated", newMatch });
// });
