import { io, type Socket } from "socket.io-client";
import { socketConfig } from "./config";
import { logger } from "@/lib/logger"; 

let socket: Socket | null = null;

export function getSocketIO(): Socket {
  if (!socket) {
    socket = io(socketConfig.socketIOUrl, {
      autoConnect: socketConfig.autoConnect,
      withCredentials: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socket.on("connect", () => {
      logger.info("[Socket.IO] Connected", { id: socket?.id });
    });

    socket.on("disconnect", (reason) => {
      logger.warn("[Socket.IO] Disconnected", { reason });
    });

    socket.on("connect_error", (err) => {
      logger.error("[Socket.IO] Connection error", { error: err.message });
    });
  }
  return socket;
}

export function closeSocketIO() {
  if (socket) {
    socket.disconnect();
    logger.info("[Socket.IO] Connection closed manually");
    socket = null;
  }
}
