// index.ts
import { socketConfig } from "./config";
import { getSocketIO, closeSocketIO } from "./socket.io";
import { getWebSocket, closeWebSocket } from "./websocket";
import { logger } from "@/logger/logger";

export type UniversalSocket = ReturnType<typeof getSocketIO> | WebSocket | null;

let activeSocket: UniversalSocket = null;

export function initializeSocket(): UniversalSocket {
  if (socketConfig.mode === "socketio") {
    logger.info("[Socket Manager] Initializing Socket.IO connection...");
    activeSocket = getSocketIO();
  } else if (socketConfig.mode === "websocket") {
    logger.info("[Socket Manager] Initializing native WebSocket connection...");
    activeSocket = getWebSocket();
  } else {
    logger.error("[Socket Manager] Invalid socket mode");
  }

  return activeSocket;
}

export function closeSocketConnection() {
  if (socketConfig.mode === "socketio") {
    closeSocketIO();
  } else {
    closeWebSocket();
  }
  activeSocket = null;
  logger.info("[Socket Manager] Connection closed");
}
