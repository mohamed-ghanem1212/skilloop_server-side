import { Request } from "express";

export interface User {
  id?: string;
  username: string;
  title: string;
  email: string;
  password: string;

  bio: string;
  profilePicture: string;

  role?: string;
}
export enum SkillLvl {
  BEGINNER = "Beginner",
  INTERMEDIATE = "Intermediate",
  ADVANCED = "Advanced",
}

export interface requestUser extends Request {
  user?: User;
}
