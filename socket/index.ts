export type SocketMode = "socketio" | "websocket";

export interface SocketConfig {
  mode: SocketMode;
  socketIOUrl: string;
  webSocketUrl: string;
  autoConnect: boolean;
}

export const socketConfig: SocketConfig = {
  mode: (process.env.NEXT_PUBLIC_SOCKET_MODE as SocketMode) || "socketio",
  socketIOUrl: process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:4000",
  webSocketUrl: process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:4000",
  autoConnect: true,
};
