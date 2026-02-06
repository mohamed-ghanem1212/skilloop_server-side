export type ChatContextType = "skill" | "offer";

export interface ChatRoom {
  _id: string;
  participants: string[];

  lastMessage: string;
  createdAt: Date;
  updatedAt: Date;
}
