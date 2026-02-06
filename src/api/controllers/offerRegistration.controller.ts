import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { requestUser } from "../../types/user.types";
import { BadRequestError } from "../../utils/errors";
import * as offerRegistration from "../services/offerRegistration.service";
import { getUserAllRegister } from "../services/offerRegistration.service";
export const createRegistration = asyncHandler(
  async (req: requestUser, res: Response) => {
    const { offerId } = req.params;
    const providerId = req.user?.id;
    const description = req.body.description;
    if (!offerId || !providerId || !description) {
      throw new BadRequestError("please fill the requirements");
    }

    const register = await offerRegistration.createOfferRegister({
      description,
      providerId,
      offerId,
    });

    return res.status(201).json({
      success: true,
      register,
      message: "Your proposal has been sent please be in touch",
    });
  },
);

export const getRegisterById = asyncHandler(
  async (req: Request, res: Response) => {
    const { registerId } = req.params;
    if (!registerId) {
      throw new BadRequestError("please pass the required data");
    }
    const findRegister =
      await offerRegistration.getOfferRegisterById(registerId);
    return res
      .status(200)
      .json({ success: "found successfully", findRegister });
  },
);
export const getRegistersHistory = asyncHandler(
  async (req: Request, res: Response) => {
    const findRegisterHistory = await offerRegistration.getAllOfferRegisters();
    return res
      .status(200)
      .json({ success: "found successfully", findRegisterHistory });
  },
);
export const updateRegister = asyncHandler(
  async (req: Request, res: Response) => {
    const { registerId } = req.params;

    if (!registerId) {
      throw new BadRequestError("please pass the required data");
    }
    const updateRegister =
      await offerRegistration.updateRegisteration(registerId);
    return res
      .status(200)
      .json({
        message: "Proposal has been accepted",
        updateRegister,
        success: true,
      });
  },
);

export const getUserProposals = asyncHandler(
  async (req: requestUser, res: Response) => {
    const userId = req.user?.id;
    if (!userId) {
      throw new BadRequestError("Please Sign In");
    }
    const getAllUsersProposals = await getUserAllRegister(userId);
    return res.status(200).json({
      message: "All proposals from different providers",
      success: true,
      getAllUsersProposals,
    });
  },
);
