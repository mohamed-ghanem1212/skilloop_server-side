import { skillSchema } from "../../db/models/skillData";
import { SECTION, Skill } from "../../types/skillData.types";
import { SkillLvl } from "../../types/user.types";
import { BadRequestError, NotFoundError } from "../../utils/errors";

export const createSkillData = async (
  userId: string,
  skill: string,
  image: string,
  level: SkillLvl,
  section: SECTION,
  description: string,
) => {
  const newSkill = await skillSchema.create({
    userId,
    skill,
    image,
    level,
    section,
    description,
  });
  await newSkill.populate("userId", "username email role profilePicture");
  return newSkill;
};

export const getSkill = async (id: string) => {
  const findSkill = await skillSchema
    .findById(id)
    .populate("userId", "username email role profilePicture");
  if (!findSkill) {
    throw new NotFoundError("Skill not found");
  }
  return findSkill;
};

export const getAllSkillData = async () => {
  const getSkills = await skillSchema
    .find()
    .populate("userId", "username email role profilePicture");
  if (!getSkills) {
    throw new NotFoundError("Skill not found");
  }
  return getSkills;
};

export const updateSkill = async (id: string, skillData: Skill) => {
  const newSkill = await skillSchema
    .findByIdAndUpdate(id, skillData)
    .populate("userId", "username email role profilePicture");
  if (!newSkill) {
    throw new BadRequestError("Skill not found or can't be updated");
  }
  return newSkill;
};

export const removeSkill = async (id: string) => {
  const removeSkill = await skillSchema.findByIdAndDelete(id);
  if (!removeSkill) {
    throw new NotFoundError("Skill not found");
  }
  return removeSkill;
};

export const getAllSkillsBySection = async (section: SECTION) => {
  const getSkills = await skillSchema
    .find({ section })
    .populate("userId", "username email role profilePicture");
  if (!getSkills) {
    throw new NotFoundError("Skill not found");
  }
  return getSkills;
};
