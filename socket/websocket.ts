// websocket.ts
import { socketConfig } from "./config";
import { logger } from "@/logger/logger";

let ws: WebSocket | null = null;
let reconnectTimer: NodeJS.Timeout | null = null;

export function getWebSocket(): WebSocket | null {
  if (typeof window === "undefined") return null; // SSR guard

  if (!ws || ws.readyState === WebSocket.CLOSED) {
    ws = new WebSocket(socketConfig.webSocketUrl);

    ws.onopen = () => {
      logger.info("[WebSocket] Connected");
      if (reconnectTimer) clearTimeout(reconnectTimer);
    };

    ws.onmessage = (event) => {
      logger.debug("[WebSocket] Message received", { data: event.data });
    };

    ws.onclose = (event) => {
      logger.warn("[WebSocket] Disconnected", { code: event.code, reason: event.reason });
      scheduleReconnect();
    };

    ws.onerror = (err) => {
      logger.error("[WebSocket] Error occurred", { error: err });
      ws?.close();
    };
  }

  return ws;
}

function scheduleReconnect() {
  if (reconnectTimer) return;

  reconnectTimer = setTimeout(() => {
    logger.info("[WebSocket] Attempting reconnect...");
    ws = null;
    getWebSocket();
  }, socketConfig.reconnectionDelay * 3); // Slightly slower than Socket.IO
}

export function closeWebSocket() {
  if (ws) {
    ws.close();
    logger.info("[WebSocket] Connection closed manually");
    ws = null;
  }
}
