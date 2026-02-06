import { userSchema } from "../../db/models/User";
import { SkillOffer, statusEnumOffer } from "../../types/skills.types";
import { HydratedDocument } from "mongoose";
import { BadRequestError, NotFoundError } from "../../utils/errors";
import { skillOfferSchema } from "../../db/models/Skills";

export const createSkill = async (
  skills: SkillOffer,
): Promise<HydratedDocument<SkillOffer>> => {
  const newSkillOffer = await skillOfferSchema.create(skills);
  const skilledUser = newSkillOffer.populate({
    path: "userId",
    select: "username profilePicture email",
  });
  return skilledUser;
};

export const getSkillBySections = async (section: string) => {
  const skillSection = await skillOfferSchema
    .find({ section })
    .populate("userId");
  if (!skillSection) {
    throw new NotFoundError("Section not found.");
  }
  return skillSection;
};
export const getAllSkills = async () => {
  const getSkills = await skillOfferSchema
    .find()
    .populate("userId", "username email profilePicture role");
  if (!getSkills) {
    throw new NotFoundError("skill offers not found.");
  }
  return getSkills;
};

export const getSkillById = async (id: string) => {
  const findSkill = await skillOfferSchema.findById(id).populate("userId");
  if (!findSkill) {
    throw new NotFoundError("Skill not found");
  }
  return findSkill;
};

export const updateSkill = async (
  wantSkill: string,
  description: string,
  status: statusEnumOffer,
  id: string,
) => {
  const findSkill = await skillOfferSchema
    .findByIdAndUpdate(id, { wantSkill, description, status }, { new: true })
    .populate("userId", "username email profilePicture role");
  if (!findSkill) {
    throw new BadRequestError(
      "Can't update your current skill offer try again later",
    );
  }
  return findSkill;
};

export const removeSkillOffer = async (id: string) => {
  const findSkillOffer = await skillOfferSchema.findByIdAndDelete(id);
  if (!findSkillOffer) {
    throw new NotFoundError("Skill not found");
  }
  return findSkillOffer;
};
