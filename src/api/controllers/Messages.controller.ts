import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { requestUser } from "../../types/user.types";
import { BadRequestError } from "../../utils/errors";
import {
  createMessage,
  getAllMessage,
  getMessageById,
  getMessagesByChatRoom,
} from "../services/Messages.service";

export const sendMessage = asyncHandler(
  async (req: requestUser, res: Response) => {
    const { chatRoomId } = req.params;
    const { text } = req.body;
    const userId = req.user?.id;

    if (!chatRoomId || !text || !userId) {
      throw new BadRequestError("please fill the required data");
    }
    const messageSender = await createMessage(chatRoomId, text, userId);
    return res
      .status(201)
      .json({ success: "Message has been sent", messageSender });
  },
);

export const fetchMessageByID = asyncHandler(
  async (req: Request, res: Response) => {
    const { messageId } = req.params;
    if (!messageId) {
      throw new BadRequestError("please fill the required data");
    }
    const getMessage = await getMessageById(messageId);
    return res.status(200).json({ success: "Message found", getMessage });
  },
);
export const fetchAllMessages = asyncHandler(
  async (req: Request, res: Response) => {
    const getMessages = await getAllMessage();
    return res.status(200).json({ success: "Message found", getMessages });
  },
);
export const fetchMessagesByChatRoom = asyncHandler(
  async (req: Request, res: Response) => {
    const { chatRoomId } = req.params;

    const messages = await getMessagesByChatRoom(chatRoomId);

    return res.status(200).json({
      success: true,
      messages,
      count: messages.length,
    });
  },
);
