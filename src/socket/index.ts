import { Server, Socket } from "socket.io";
import "dotenv/config";
import http from "http";
import { InternalServerError, UnauthorizedError } from "../utils/errors";
import jwt from "jsonwebtoken";
import { SOCKET_EVENTS } from "./events/events";
import { createMessage } from "../api/services/Messages.service";
import * as cookie from "cookie";

export const initSocket = (server: http.Server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });
  io.use((socket, next) => {
    try {
      const rawCookies = socket.handshake.headers.cookie || "";

      const cookies = cookie.parse(rawCookies);

      const token = cookies["access_token"];

      if (!token) {
        return next(new UnauthorizedError("Your session expired"));
      }

      const parts = token.split(".");

      const payload = jwt.verify(token, process.env.JWT_SECRET as string);
      socket.data.user = payload;
      next();
    } catch (error) {
      console.error("❌ Auth error:", error);
      next(new InternalServerError(`Authentication failed: ${error}`));
    }
  });

  io.on(SOCKET_EVENTS.CONNECT, (socket: Socket) => {
    socket.on(SOCKET_EVENTS.JOIN_ROOM, (chatRoomId) => {
      socket.join(chatRoomId);
    });
    socket.on(SOCKET_EVENTS.SEND_MESSAGE, async (chatRoomId, text) => {
      try {
        const newMessage = await createMessage(
          chatRoomId,
          socket.data.user.id,
          text,
        );

        // ✅ Emit only once, here in the socket handler
        io.to(chatRoomId).emit(SOCKET_EVENTS.NEW_MESSAGE, newMessage);
      } catch (err: any) {
        console.error("❌ Error saving message:", err);
        socket.emit(SOCKET_EVENTS.ERROR, { message: err.message });
      }
    });
    socket.on("disconnect", () => {});
  });
  return io;
};
