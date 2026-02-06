import { Request, Response } from "express";
import "dotenv/config";
import { v2 as cloudinary } from "cloudinary";

import { asyncHandler } from "../../utils/asyncHandler";
import { BadRequestError, NotFoundError } from "../../utils/errors";
import { userSchema } from "../../db/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  createUser,
  getUserById,
  loginUser,
  getAllUsers,
  deleteUserById,
  updateUserById,
} from "../services/User.service";
import { uploadFromBuffer } from "../../utils/uploadImage";
import { requestUser } from "../../types/user.types";
import { UserCreator } from "../../validation/user.validator";
export const createNewUser = asyncHandler(
  async (req: Request, res: Response) => {
    const userData = UserCreator.safeParse(req.body);
    if (!userData.success) {
      throw new BadRequestError(userData.error.issues[0].message);
    }
    const existingUser = await userSchema.findOne({
      email: userData.data.email,
    });
    if (existingUser) {
      throw new BadRequestError("Email is already registered");
    }
    const hashedPassword = bcrypt.hashSync(userData.data.password, 10);

    let profilePicture: string;

    if (req.file) {
      const result = await uploadFromBuffer(req.file.buffer, "users");
      profilePicture = result.secure_url;
    } else {
      profilePicture = process.env.DEFAULT_PROFILE_PIC as string;
    }

    const newUser = await createUser({
      username: userData.data.username,
      email: userData.data.email,
      title: userData.data.title,
      password: hashedPassword,
      bio: userData.data.bio,
      profilePicture: profilePicture,
    });
    const token = jwt.sign(
      {
        id: newUser.id,
        email: newUser.email,
        role: newUser.role,
        username: newUser.username,
      },
      process.env.JWT_SECRET as string,
    );
    const { password: pwd, ...userWithoutPassword } = newUser.toObject();
    return res
      .status(201)
      .cookie("access_token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
      })
      .json({ message: "User Created", success: true, newUser });
  },
);

export const signInUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Missing Information");
  }
  const user = await loginUser(email, password);
  const token = jwt.sign(
    {
      id: user.userInfo._id,
      email: user.userInfo.email,
      role: user.userInfo.role,
      username: user.userInfo.username,
    },
    process.env.JWT_SECRET as string,
  );
  return res
    .status(200)
    .cookie("access_token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    })
    .json({ user: user.userInfo, token, message: "Welcome to skilloop" });
});
export const getUserByToken = asyncHandler(
  async (req: requestUser, res: Response) => {
    const userId = req.user?.id;
    if (!userId) {
      throw new BadRequestError("please sign in or create an account");
    }
    const findUser = await userSchema.findById(userId).select("-password");
    if (!findUser) {
      throw new NotFoundError("User not found");
    }

    return res
      .status(200)
      .json({ message: "User found", success: true, findUser });
  },
);

export const getUserProfile = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.params.id;
    if (!userId) {
      throw new BadRequestError("User ID is required");
    }
    const user = await getUserById(userId);
    return res.status(200).json({ user, sucess: true, message: "User Found!" });
  },
);

export const usersGetter = asyncHandler(async (req: Request, res: Response) => {
  const users = await getAllUsers();

  return res.status(200).json({ users });
});

export const userDeleter = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.params.id;
  if (!userId) {
    throw new BadRequestError("User ID is required");
  }
  const removeUser = await deleteUserById(userId);
  return res.status(200).json({ removeUser });
});

export const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.params.id;
  const { username, email, skills, bio, profilePicture } = req.body;
  if (!userId) {
    throw new BadRequestError("User ID is required");
  }
  const updatedUser = await updateUserById(
    { username, email, skills, bio, profilePicture },
    userId,
  );
  return res.status(200).json({ updatedUser });
});

export const logoutUser = (req: Request, res: Response) => {
  res.cookie("access_token", "", {
    httpOnly: true,
    sameSite: "strict",
    expires: new Date(0),
  });

  return res.status(200).json({ message: "Logged out successfully" });
};
