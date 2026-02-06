import { HydratedDocument } from "mongoose";
import { Message } from "../../types/message";
import { getChatRoomById } from "./chatRoom.service";
import { NotFoundError } from "../../utils/errors";
import { messageSchema } from "../../db/models/messages";

export const createMessage = async (
  chatRoomId: string,
  userId: string,
  text: string,
): Promise<HydratedDocument<Message>> => {
  console.log("📝 Creating message:", { chatRoomId, userId, text });

  const chatRoom = await getChatRoomById(chatRoomId);

  const receiverId = chatRoom.participants.find(
    (id) => id.toString() !== userId,
  ) as string;

  const sendMessage = await messageSchema.create({
    chatRoomId: chatRoomId,

    senderId: userId,
    text: text,
  });

  console.log("✅ Message created:", sendMessage._id);

  const populatedMessage = await messageSchema
    .findById(sendMessage._id)
    .populate("senderId", "username email profilePicture title");

  console.log("✅ Message populated:", populatedMessage);

  return populatedMessage!;
};

export const getMessageById = async (id: string) => {
  const findMessage = await messageSchema
    .findById(id)
    .populate("senderId", "username email profilePicture title");

  if (!findMessage) {
    throw new NotFoundError("Message not found");
  }
  return findMessage;
};

export const getAllMessage = async () => {
  const findMessages = await messageSchema
    .find()
    .populate("senderId", "username email profilePicture title")

    .sort({ createdAt: 1 });

  if (!findMessages || findMessages.length === 0) {
    throw new NotFoundError("Chat is empty");
  }
  return findMessages;
};

export const getMessagesByChatRoom = async (chatRoomId: string) => {
  const messages = await messageSchema
    .find({ chatRoomId })
    .populate("senderId", "username email profilePicture title")

    .sort({ createdAt: 1 }); // Oldest first

  return messages;
};
