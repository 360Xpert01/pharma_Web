import { socketConfig } from "./config";
import { logger } from "@/lib/logger"; 

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

    ws.onclose = () => {
      logger.warn("[WebSocket] Disconnected");
      scheduleReconnect();
    };

    ws.onerror = (err) => {
      logger.error("[WebSocket] Error", { error: err });
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
  }, 3000);
}

export function closeWebSocket() {
  if (ws) {
    ws.close();
    logger.info("[WebSocket] Connection closed manually");
    ws = null;
  }
}
