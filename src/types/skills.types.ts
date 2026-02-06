import { SECTION } from "./skillData.types";
import { SkillLvl } from "./user.types";

export interface SkillOffer {
  userId: string;
  wantSkill: string;
  level: SkillLvl;
  section: SECTION;
  description: string;
  status: statusEnumOffer;
}

export enum statusEnumOffer {
  Open = "Open",
  Matched = "Matched",
  Closed = "Closed",
}
