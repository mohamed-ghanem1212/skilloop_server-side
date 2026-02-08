import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { requestUser } from "../../types/user.types";
import * as skillService from "../services/Skill.service";
import { BadRequestError, NotFoundError } from "../../utils/errors";
import { SkillOffer, statusEnumOffer } from "../../types/skills.types";
import mongoose from "mongoose";
import { SkillOfferCreator } from "../../validation/skillOffer.validator";
import { SECTION } from "../../types/skillData.types";
export const createSkillOffer = asyncHandler(
  async (req: requestUser, res: Response) => {
    const offerData = SkillOfferCreator.safeParse(req.body);
    if (!offerData.success) {
      throw new BadRequestError(offerData.error.issues[0].message);
    }

    const userId = req.user?.id;
    if (!userId) {
      throw new BadRequestError("please pass your ID.");
    }
    const skillOffer: SkillOffer = {
      userId,
      wantSkill: offerData.data.wantSkill,
      level: offerData.data.level,
      section: offerData.data.section,
      description: offerData.data.description,
      status: offerData.data.status ?? statusEnumOffer.Open,
    };
    const createOffer = await skillService.createSkill(skillOffer);
    return res.status(201).json({
      message: "Your offer has been created sucessfully",
      success: true,
      createOffer,
    });
  },
);

export const getAllSkillOffers = asyncHandler(
  async (req: Request, res: Response) => {
    const skillOffers = await skillService.getAllSkills();
    return res.status(200).json({ sucess: "Fetched sucessfully", skillOffers });
  },
);

export const skillIdGetter = asyncHandler(
  async (req: Request, res: Response) => {
    const { skillOfferId } = req.params;
    if (!skillOfferId) {
      throw new BadRequestError("please pass your skillOffer ID");
    }
    const skillOfferGetter = await skillService.getSkillById(skillOfferId);
    return res.status(200).json({ succes: "Success", skillOfferGetter });
  },
);

export const updateSkillOffer = asyncHandler(
  async (req: Request, res: Response) => {
    const { skillOfferId } = req.params;
    const { wantSkill, description, status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(skillOfferId)) {
      throw new BadRequestError("invalid skill offer ID");
    }
    const skillModifier = await skillService.updateSkill(
      wantSkill,
      description,
      status,
      skillOfferId,
    );
    if (!skillOfferId) {
      throw new BadRequestError("please pass your skill ID");
    }
    return res.status(200).json({
      success: "Skill offer has been updated successfully",
      skillModifier,
    });
  },
);
export const removeSkillOffer = asyncHandler(
  async (req: Request, res: Response) => {
    const { skillOfferId } = req.params;
    if (!skillOfferId) {
      throw new BadRequestError("please pass your skill ID");
    }
    const removeSkill = await skillService.removeSkillOffer(skillOfferId);
    return res
      .status(200)
      .json({ success: "Skill offer has been removed", removeSkill });
  },
);

export const filterSkillOffersBySection = asyncHandler(
  async (req: Request, res: Response) => {
    const { section } = req.query;
    if (
      !section ||
      typeof section !== "string" ||
      !Object.values(SECTION).includes(section as SECTION)
    ) {
      throw new BadRequestError("please pass a valid section");
    }
    const skillOffers = await skillService.getSkillOffersBySection(
      section as SECTION,
    );
    return res.status(200).json({
      message: "Discover skill offers with your interests",
      success: true,
      skillOffers,
    });
  },
);
