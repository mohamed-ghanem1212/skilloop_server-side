export interface Message {
  chatRoomId: string;
  senderId: string;
  receiverId: string;
  text: string;
  isRead: boolean;
}
