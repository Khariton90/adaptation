export interface ChatUser {
  userId: string;
  userName: string;
}

export interface Message {
  user: ChatUser;
  timeSent: string;
  message: string;
}

export interface ServerToClientEvents {
  chat: (e: Message) => void;
}

export interface ClientToServerEvents {
  chat: (e: Message) => void;
}