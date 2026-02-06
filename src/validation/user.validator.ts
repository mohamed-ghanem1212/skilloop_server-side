import { z } from "zod";

export const UserCreator = z.object({
  username: z.string().min(1, "Skill is required"),

  email: z
    .string()
    .regex(
      /@(gmail|yahoo|outlook|hotmail)\.com$/,
      "please use the correct email format",
    ),
  title: z.string().min(2, "please provide a proper title for your skills"),
  password: z.string().min(3, "please provide the missing information"),
  bio: z.string(),
});
export const UserVerifier = z.object({
  email: z
    .string()
    .regex(
      /@(gmail|yahoo|outlook|hotmail)\.com$/,
      "please use the correct email format",
    ),
  password: z.string().min(3, "please provide the missing information"),
});
