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
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });
  io.use((socket, next) => {
    try {
      const rawCookies = socket.handshake.headers.cookie || "";
      // console.log("📋 Raw cookies:", rawCookies);

      const cookies = cookie.parse(rawCookies);
      // console.log("🍪 Parsed cookies:", cookies);

      const token = cookies["access_token"];
      console.log("🔑 Token value:", token);
      console.log("🔑 Token type:", typeof token);
      console.log("🔑 Token length:", token?.length);

      if (!token) {
        return next(new UnauthorizedError("Your session expired"));
      }

      // Check if token looks like a JWT (should have 2 dots)
      const parts = token.split(".");
      // console.log("🔍 Token parts:", parts.length);

      const payload = jwt.verify(token, process.env.JWT_SECRET as string);
      socket.data.user = payload;
      next();
    } catch (error) {
      console.error("❌ Auth error:", error);
      next(new InternalServerError(`Authentication failed: ${error}`));
    }
  });

  io.on(SOCKET_EVENTS.CONNECT, (socket: Socket) => {
    console.log("User has been connected: ", socket.data.user);
    socket.on(SOCKET_EVENTS.JOIN_ROOM, (chatRoomId) => {
      socket.join(chatRoomId);
      console.log(`User ${socket.data.user.id} joined room ${chatRoomId}`);
    });
    socket.on(SOCKET_EVENTS.SEND_MESSAGE, async (chatRoomId, text) => {
      try {
        console.log("📥 Message received on server:");
        console.log("  - Room ID:", chatRoomId);
        console.log("  - User ID:", socket.data.user.id);
        console.log("  - Text:", text);

        // ✅ Correct parameter order: chatRoomId, userId, text
        const newMessage = await createMessage(
          chatRoomId,
          socket.data.user.id, // userId second
          text, // text third
        );

        console.log("✅ Message saved and populated:", newMessage);

        // ✅ Emit only once, here in the socket handler
        io.to(chatRoomId).emit(SOCKET_EVENTS.NEW_MESSAGE, newMessage);
        console.log("📤 Message emitted to room:", chatRoomId);
      } catch (err: any) {
        console.error("❌ Error saving message:", err);
        socket.emit(SOCKET_EVENTS.ERROR, { message: err.message });
      }
    });
    socket.on("disconnect", () => {
      console.log("User disconnected: ", socket.data.user.id);
    });
  });
  return io;
};
