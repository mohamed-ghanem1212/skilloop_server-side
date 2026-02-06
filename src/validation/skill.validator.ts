import z from "zod";
import { SECTION } from "../types/skillData.types";
import { SkillLvl } from "../types/user.types";

export const SkillCreator = z.object({
  skill: z.string().min(2, "Provide your skill to discover more"),
  level: z.enum(SkillLvl, "Specify your level"),
  description: z
    .string()
    .min(2, "Talk more about your skill and share it with others"),
  section: z.enum(SECTION, "Please choose among the following sections"),
});
