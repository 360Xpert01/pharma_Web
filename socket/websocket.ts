// lib/socket/websocket.ts
import { socketConfig } from "./config";
import { logger } from "@/logger/logger";

let ws: WebSocket | null = null;
let reconnectTimer: NodeJS.Timeout | null = null;
let reconnectAttempts = 0;

export function getWebSocket(): WebSocket | null {
  if (typeof window === "undefined") return null; // SSR guard

  if (!ws || ws.readyState === WebSocket.CLOSED) {
    if (reconnectAttempts >= socketConfig.reconnectionAttempts) {
      logger.error("[WebSocket] Max reconnection attempts reached");
      return null;
    }
    ws = new WebSocket(socketConfig.webSocketUrl);

    ws.onopen = () => {
      logger.info("[WebSocket] Connected");
      reconnectAttempts = 0;
      if (reconnectTimer) clearTimeout(reconnectTimer);
      reconnectTimer = null;
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        logger.debug("[WebSocket] Message received", { data });
        // Emit events similar to Socket.IO for compatibility
        window.dispatchEvent(new CustomEvent("ws:message", { detail: data }));
      } catch (err) {
        logger.debug("[WebSocket] Raw message received", { data: event.data });
      }
    };

    ws.onclose = (event) => {
      logger.warn("[WebSocket] Disconnected", { code: event.code, reason: event.reason });
      reconnectAttempts++;
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
  if (reconnectTimer || reconnectAttempts >= socketConfig.reconnectionAttempts) return;

  const delay = Math.min(
    socketConfig.reconnectionDelay *
      Math.pow(2, reconnectAttempts) *
      (Math.random() * socketConfig.randomizationFactor + 1),
    socketConfig.reconnectionDelayMax
  );

  reconnectTimer = setTimeout(() => {
    logger.info("[WebSocket] Attempting reconnect...", { attempt: reconnectAttempts + 1 });
    ws = null;
    getWebSocket();
  }, delay);
}

export function closeWebSocket() {
  if (ws) {
    ws.close(1000, "Manual close");
    logger.info("[WebSocket] Connection closed manually");
    ws = null;
    reconnectAttempts = 0;
    if (reconnectTimer) {
      clearTimeout(reconnectTimer);
      reconnectTimer = null;
    }
  }
}
