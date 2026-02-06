import { SkillLvl } from "./user.types";

export interface Skill {
  userId: string;
  skill: string;
  image: string;
  level: SkillLvl;
  description: string;
  section: SECTION;
}

export enum SECTION {
  DEVELOPMENT = "Development",
  ART_DESING = "Art & Design",
  BUSINESS = "Business",
  MARKETING = "Marketing",
  OTHER = "Other",
}
