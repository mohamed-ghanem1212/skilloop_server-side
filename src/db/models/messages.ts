import { Schema } from "mongoose";
import mongoose from "mongoose";
import { Message } from "../../types/message";

const MessageSchema: Schema = new Schema(
  {
    chatRoomId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "ChatRoom",
    },
    senderId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    text: {
      type: String,
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export const messageSchema = mongoose.model<Message>("Message", MessageSchema);
