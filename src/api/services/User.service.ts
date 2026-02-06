import { HydratedDocument } from "mongoose";
import { userSchema } from "../../db/models/User";
import { User } from "../../types/user.types";
import { BadRequestError, NotFoundError } from "../../utils/errors";
import bcrypt from "bcryptjs";
import "dotenv/config";
export const createUser = async (
  user: User,
): Promise<HydratedDocument<User>> => {
  const { username, email, password, bio, profilePicture, title } = user;
  const newUser = await userSchema.create({
    username,
    email,
    title,
    password,
    bio,
    profilePicture,
  });

  return newUser;
};

export const getUserByEmail = async (
  email: string,
): Promise<HydratedDocument<User>> => {
  const user = await userSchema.findOne({ email });
  if (!user) {
    throw new BadRequestError("User not found");
  }
  return user;
};

export const loginUser = async (email: string, password: string) => {
  const user = await getUserByEmail(email);

  const hashedPassword = user.password;
  if (!bcrypt.compareSync(password, hashedPassword)) {
    throw new BadRequestError("Invalid password");
  }
  const loggedInUser = user;

  const { password: pwd, ...userWithoutPassword } = loggedInUser.toObject();
  return { userInfo: userWithoutPassword };
};

export const getUserById = async (id: string) => {
  const user = await userSchema.findById(id);
  if (!user) {
    throw new NotFoundError("User not found");
  }
  const { password: pwd, ...userWithoutPassword } = user.toObject();
  return userWithoutPassword;
};

export const getAllUsers = async () => {
  const users = await userSchema.find();
  return users.map((user) => {
    const { password, ...userWithoutPassword } = user.toObject();
    return userWithoutPassword;
  });
};

export const deleteUserById = async (id: string) => {
  const user = await userSchema.findByIdAndDelete(id);
  if (!user) {
    throw new NotFoundError("User not found");
  }
  const { password: pwd, ...userWithoutPassword } = user.toObject();
  return userWithoutPassword;
};

export const updateUserById = async (user: any, id: string) => {
  const updatedUser = await userSchema.findByIdAndUpdate(id, user, {
    new: true,
  });
  if (!updatedUser) {
    throw new NotFoundError("User not found");
  }
  const { password: pwd, ...userWithoutPassword } = updatedUser.toObject();
  return userWithoutPassword;
};
