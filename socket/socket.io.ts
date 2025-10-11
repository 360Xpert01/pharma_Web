import { io, type Socket } from "socket.io-client";
import { socketConfig } from "./config";
import { logger } from "@/logger/logger";

let socket: Socket | null = null;

export function getSocketIO(): Socket {
  if (!socket) {
    socket = io(socketConfig.socketIOUrl, {
      autoConnect: socketConfig.autoConnect,
      withCredentials: true,
      reconnection: socketConfig.reconnection,
      reconnectionAttempts: socketConfig.reconnectionAttempts,
      reconnectionDelay: socketConfig.reconnectionDelay,
      reconnectionDelayMax: 5000,
      randomizationFactor: 0.5,
      timeout: 20000,
      pingTimeout: 30000,
      pingInterval: 25000,
      transports: ["websocket", "polling"],
      upgrade: true,
      auth: {
        token: process.env.NEXT_PUBLIC_SOCKET_TOKEN || "anonymous",
      },
      extraHeaders: {
        "X-Client-Version": "1.0.0",
        "X-Environment": process.env.NODE_ENV || "development",
      },
      forceNew: false,
      rememberUpgrade: true,
      closeOnBeforeunload: true,
      autoUnref: false,
      parser: undefined,
      perMessageDeflate: true,
    });

    socket.on("connect", () => {
      logger.info("[Socket.IO] Connected", { id: socket?.id });
    });

    socket.on("connecting", () => {
      logger.info("[Socket.IO] Connecting...");
    });

    socket.on("connect_error", (err) => {
      logger.error("[Socket.IO] Connection Error", { error: err?.message });
    });

    socket.on("disconnect", (reason) => {
      logger.warn("[Socket.IO] Disconnected", { reason });
    });

    socket.io.on("reconnect_attempt", (attempt) => {
      logger.info("[Socket.IO] Reconnect Attempt", { attempt });
    });

    socket.io.on("reconnect_error", (err) => {
      logger.error("[Socket.IO] Reconnection Error", { error: err?.message });
    });

    socket.io.on("reconnect_failed", () => {
      logger.error("[Socket.IO] Reconnection Failed - giving up");
    });

    socket.io.on("reconnect", (attempt) => {
      logger.info("[Socket.IO] Successfully Reconnected", { attempt });
    });

    socket.io.on("ping", () => {
      logger.debug("[Socket.IO] Ping sent to server");
    });

    socket.io.on("pong", (latency) => {
      logger.debug("[Socket.IO] Pong received", { latency });
    });

    socket.onAny((event, ...args) => {
      logger.debug(`[Socket.IO] Event received: ${event}`, args);
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
