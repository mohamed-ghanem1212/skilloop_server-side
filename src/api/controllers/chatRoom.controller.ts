import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { BadRequestError } from "../../utils/errors";
import * as chatRoom from "../../api/services/chatRoom.service";
import { requestUser } from "../../types/user.types";
export const createChat = asyncHandler(
  async (req: requestUser, res: Response) => {
    const providerId = req.body.providerId;
    if (!req.user?.id || !providerId) {
      throw new BadRequestError("please fill the required data");
    }

    const createRoom = await chatRoom.createChatRoom(providerId, req.user?.id);
    return res
      .status(201)
      .json({
        success: true,
        message: "chat room has been created",
        createRoom,
      });
  },
);

export const getChat = asyncHandler(async (req: Request, res: Response) => {
  const { chatRoomId } = req.params;
  if (!chatRoomId) {
    throw new BadRequestError("please fill the required data");
  }
  const getChatRoom = await chatRoom.getChatRoomById(chatRoomId);
  return res.status(200).json({ success: "Room has been found", getChatRoom });
});
export const getChatUsersList = asyncHandler(
  async (req: requestUser, res: Response) => {
    const userId = req.user?.id;
    if (!userId) {
      throw new BadRequestError("please fill the required data");
    }
    const findUsers = await chatRoom.getChatUsers(userId);
    return res
      .status(200)
      .json({ message: "Users found", success: true, findUsers });
  },
);
export const getAllchats = asyncHandler(async (req: Request, res: Response) => {
  const getAllChatRoom = await chatRoom.getAllChatRooms();
  return res
    .status(200)
    .json({ success: "Room has been found", getAllChatRoom });
});
