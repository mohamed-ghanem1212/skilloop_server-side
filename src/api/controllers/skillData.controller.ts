import { Request, Response } from "express";
import { requestUser } from "../../types/user.types";
import { BadRequestError, NotFoundError } from "../../utils/errors";
import {
  createSkillData,
  getAllSkillData,
  getAllSkillsBySection,
  removeSkill,
  updateSkill,
} from "../services/skillData.service";
import { getSkillById } from "../services/Skill.service";
import { uploadFromBuffer } from "../../utils/uploadImage";
import { SkillCreator } from "../../validation/skill.validator";
import { SECTION } from "../../types/skillData.types";
import { asyncHandler } from "../../utils/asyncHandler";

export const createNewSkill = asyncHandler(
  async (req: requestUser, res: Response) => {
    const userId = req.user?.id;
    const { skill, description, section, level } = req.body;
    const skillData = SkillCreator.safeParse(req.body);

    if (!skillData.success) {
      throw new BadRequestError(skillData.error.issues[0].message);
    }
    if (!userId) {
      throw new BadRequestError("please provide the required data");
    }
    let image: string;
    if (req.file) {
      const result = await uploadFromBuffer(req.file.buffer, "skills");
      image = result.secure_url;
    } else {
      image = process.env.DEFAULT_PROFILE_PIC as string;
    }
    const newSkill = await createSkillData(
      userId,
      skill,
      image,
      level,
      section,
      description,
    );
    return res.status(201).json({
      message: "your skill has been created",
      success: true,
      newSkill,
    });
  },
);

export const getSkill = async (req: Request, res: Response) => {
  const { skillId } = req.params;
  if (!skillId) {
    throw new BadRequestError("please provide the required data");
  }
  const findSkill = await getSkillById(skillId);

  return res.status(200).json({ message: "skill found", findSkill });
};

export const getAllSkills = async (req: Request, res: Response) => {
  const getSkills = await getAllSkillData();
  return res
    .status(200)
    .json({ message: "All skills shown", success: true, getSkills });
};

export const updateSkillData = async (req: Request, res: Response) => {
  const { skillId } = req.params;
  const { skillData } = req.body;
  const updatedSkill = await updateSkill(skillId, skillData);
  return res.status(200).json({
    message: "skill updated successfully",
    success: true,
    updatedSkill,
  });
};

export const deleteSkill = async (req: Request, res: Response) => {
  const { skillId } = req.params;
  if (!skillId) {
    throw new BadRequestError("please provide the required data");
  }
  const skillDeleter = await removeSkill(skillId);
  res
    .status(200)
    .json({ message: "Skill removed", success: true, skillDeleter });
};

export const filterSkillsBySection = asyncHandler(
  async (req: Request, res: Response) => {
    const { section } = req.query;
    if (
      !section ||
      typeof section !== "string" ||
      !Object.values(SECTION).includes(section as SECTION)
    ) {
      throw new BadRequestError("please pass a valid section");
    }
    const skills = await getAllSkillsBySection(section as SECTION);
    return res.status(200).json({
      message: "Discover provider with your interests",
      success: true,
      skills,
    });
  },
);
