import { Schema, Types } from "mongoose";
import mongoose from "mongoose";
import { ChatRoom } from "../../types/chatRoom.types";
const ChatRoomSchema: Schema = new Schema(
  {
    participants: {
      type: [Schema.Types.ObjectId],
      ref: "User",
      required: true,
      validate: {
        validator: function (v: Types.ObjectId[]) {
          return v.length === 2;
        },
      },
    },

    meta: {
      from: {
        type: String,
        enum: ["skill", "offer"],
        required: false,
      },
    },

    // lastMessage: {
    //   type: Schema.Types.ObjectId,
    //   ref: "Message",
    // },
  },
  { timestamps: true },
);

ChatRoomSchema.index(
  { "participants.0": 1, "participants.1": 1 },
  { unique: true },
);
export const chatRoomSchema = mongoose.model<ChatRoom>(
  "ChatRoom",
  ChatRoomSchema,
);
