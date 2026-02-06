import { Router } from "express";
import { auth } from "../middleware/token";
import {
  createChat,
  getAllchats,
  getChat,
  getChatUsersList,
} from "../controllers/chatRoom.controller";

const router = Router();
/**
 * @swagger
 * /api/v1/chat/createChatRoom:
 *   post:
 *     summary: Create a chat room after offer acceptance
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - providerId
 *             properties:
 *               providerId:
 *                 type: string
 *                 example: "65af123abc456def789"
 *     responses:
 *       201:
 *         description: Chat room created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: string
 *                   example: chat room has been created
 *       400:
 *         description: Missing or invalid data
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Not allowed
 */

router.post("/createChatRoom", auth, createChat);
/**
 * @swagger
 * /api/v1/chat/getChatRoom/{chatRoomId}:
 *   get:
 *     summary: Get a specific chat room by ID
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: chatRoomId
 *         required: true
 *         schema:
 *           type: string
 *         description: Chat room ID
 *     responses:
 *       200:
 *         description: Chat room found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: string
 *                   example: Room has been found

 *       400:
 *         description: Missing chatRoomId
 *       404:
 *         description: Chat room not found
 */

router.get("/getChatRoom/:chatRoomId", auth, getChat);
/**
 * @swagger
 * /api/v1/chat/getUsersList:
 *   get:
 *     summary: Get list of users the current user can chat with
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Chat users found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Users found
 *                 findUsers:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       chatRoomId:
 *                         type: string
 *                         example: 65ab1234abc
 *                       user:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           username:
 *                             type: string
 *                           profilePicture:
 *                             type: string
 *                       lastMessage:
 *                         type: string
 *                         example: Hello, how are you?
 *       401:
 *         description: Unauthorized
 */

router.get("/getUsersList", auth, getChatUsersList);
/**
 * @swagger
 * /api/v1/chat/getAllChatRooms:
 *   get:
 *     summary: Get all chat rooms (admin or debug use)
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All chat rooms retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: string
 *                   example: Room has been found
 *                 getAllChatRoom:
 *                   type: array
 *       401:
 *         description: Unauthorized
 */

router.get("/getAllChatRooms", auth, getAllchats);
export default router;
