import { socketConfig } from "./config";
import { getSocketIO, closeSocketIO } from "./socket.io";
import { getWebSocket, closeWebSocket } from "./websocket";
import { logger } from "@/logger/logger";

export type UniversalSocket = ReturnType<typeof getSocketIO> | WebSocket | null;

let activeSocket: UniversalSocket = null;
let isInitialized = false;

export function initializeSocket(): UniversalSocket {
  if (isInitialized) {
    logger.info("[Socket Manager] Socket already initialized, returning existing instance");
    return activeSocket;
  }

  if (socketConfig.mode === "socketio") {
    logger.info("[Socket Manager] Initializing Socket.IO connection...");
    activeSocket = getSocketIO();
  } else if (socketConfig.mode === "websocket") {
    logger.info("[Socket Manager] Initializing native WebSocket connection...");
    activeSocket = getWebSocket();
  } else {
    logger.error("[Socket Manager] Invalid socket mode");
    activeSocket = null;
  }

  isInitialized = true;
  return activeSocket;
}

export function getActiveSocket(): UniversalSocket {
  if (!isInitialized) {
    logger.warn("[Socket Manager] Socket not initialized, auto-initializing...");
    return initializeSocket();
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
  isInitialized = false;
  logger.info("[Socket Manager] Connection closed and reset");
}

export function isSocketConnected(): boolean {
  if (!activeSocket) return false;
  if (socketConfig.mode === "socketio") {
    return (activeSocket as ReturnType<typeof getSocketIO>).connected;
  } else {
    return (activeSocket as WebSocket).readyState === WebSocket.OPEN;
  }
}
