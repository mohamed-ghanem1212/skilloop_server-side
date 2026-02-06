import { HydratedDocument } from "mongoose";
import { ChatRoom } from "../../types/chatRoom.types";
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
} from "../../utils/errors";
import { chatRoomSchema } from "../../db/models/chatRoom";
import { getOfferRegisterById } from "./offerRegistration.service";
import { Registeration } from "../../types/offerRegister.types";
import { Skill } from "../../types/skillData.types";
import { userSchema } from "../../db/models/User";

export const createChatRoom = async (
  userId: string,
  providerId: string,
): Promise<HydratedDocument<ChatRoom>> => {
  const findUsers = await userSchema.findById(providerId);
  if (!findUsers) {
    throw new NotFoundError("User not found");
  }
  if (userId === providerId) {
    throw new BadRequestError("you can't chat with yourself");
  }
  const participants = [userId, providerId].sort();
  const findChatRoom = await chatRoomSchema.findOne({
    participants: { $all: participants },
  });
  if (findChatRoom) {
    throw new BadRequestError(
      "You already have a chat room for this provider go to the chat page",
    );
  }
  console.log(participants.length);

  const createChatRoom = await chatRoomSchema.create({
    participants,
  });

  await createChatRoom.populate({
    path: "participants",
    select: "username _id profilePicture",
  });
  return createChatRoom;
};
export const getChatUsers = async (userId: string) => {
  const findUsers = await chatRoomSchema
    .find({ participants: userId })
    .populate<{
      chatRoomId: string;
      participants: { _id: string; username: string; profilePicture: string }[];
    }>({
      path: "participants",
      select: "username profilePicture email title",
    })

    .sort({ updatedAt: -1 });
  if (findUsers.length == 0) {
    throw new BadRequestError("list is empty");
  }
  const chatUsers = findUsers
    .map((room) => {
      const otherUser = room.participants.find(
        (p) => p._id.toString() !== userId,
      );

      if (!otherUser) return null;

      return {
        chatRoomId: room._id.toString(),
        user: otherUser,
      };
    })
    .filter(Boolean);

  console.log();
  return chatUsers;
};

export const getChatRoomById = async (
  id: string,
): Promise<HydratedDocument<ChatRoom>> => {
  const findChatRoom = await chatRoomSchema.findById(id);
  if (!findChatRoom) {
    throw new NotFoundError("Chat Room not found");
  }
  return findChatRoom;
};
export const getAllChatRooms = async (): Promise<
  HydratedDocument<ChatRoom>[]
> => {
  const findChatRooms = await chatRoomSchema.find();
  if (!findChatRooms) {
    throw new NotFoundError("Chat Room not found");
  }
  return findChatRooms;
};
