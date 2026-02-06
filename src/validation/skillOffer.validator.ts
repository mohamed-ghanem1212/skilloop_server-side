import { z } from "zod";
import { statusEnumOffer } from "../types/skills.types";
import { SECTION } from "../types/skillData.types";
import { SkillLvl } from "../types/user.types";

export const SkillOfferCreator = z.object({
  wantSkill: z.string().min(2, "Provide the skill you're willing to learn!"),
  level: z.enum(SkillLvl, "Specify your level"),
  section: z.enum(SECTION, "Please choose among the following sections"),
  description: z
    .string()
    .min(2, "Let us know what you really need to enhance your skills!"),
  status: z.enum(statusEnumOffer).optional(),
});
