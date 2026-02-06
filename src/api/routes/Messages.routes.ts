import { Router } from "express";
import { auth } from "../middleware/token";
import {
  fetchAllMessages,
  fetchMessageByID,
  fetchMessagesByChatRoom,
} from "../controllers/Messages.controller";

const router = Router();
/**
 * @swagger
 * /api/v1/messages/getMessage/{messageId}:
 *   get:
 *     summary: Get a message by ID
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: messageId
 *         required: true
 *         description: Message ID
 *         schema:
 *           type: string
 *           example: 65af123abc456def789
 *     responses:
 *       200:
 *         description: Message fetched successfully
 *       400:
 *         description: Message ID missing
 *       404:
 *         description: Message not found
 */
router.get("/getMessage/:messageId", auth, fetchMessageByID);
/**
 * @swagger
 * /api/v1/messages/getAllMessages:
 *   get:
 *     summary: Get all skills
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All messages returned
 *       401:
 *         description: Unauthorized
 */
router.get("/getAllMessages", auth, fetchAllMessages);
router.get("/getMessagesByChatRoom/:chatRoomId", auth, fetchMessagesByChatRoom);
/**
 * @swagger
 * /api/v1/messages/getMessagesByChatRoom/{chatRoomId}:
 *   get:
 *     summary: Get messages by chat room ID
 *     description: Retrieve all messages belonging to a specific chat room. Requires authentication.
 *     tags:
 *       - Messages
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: chatRoomId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the chat room
 *     responses:
 *       200:
 *         description: Messages retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: number
 *                   example: 5
 *                 messages:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 65f2c9a12e9f3a0012345678
 *                       chatRoomId:
 *                         type: string
 *                         example: 65f2c8a12e9f3a0012345678
 *                       sender:
 *                         type: string
 *                         example: 65f2b7a12e9f3a0012345678
 *                       text:
 *                         type: string
 *                         example: Hello, how are you?
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: 2024-02-15T12:30:00.000Z
 *       401:
 *         description: Unauthorized - user not authenticated
 *       404:
 *         description: Chat room not found
 *       500:
 *         description: Internal server error
 */

export default router;
