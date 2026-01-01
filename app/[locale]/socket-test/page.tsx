// app/socket-dashboard/page.tsx
"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  initializeSocket,
  getActiveSocket,
  closeSocketConnection,
  isSocketConnected,
  type UniversalSocket,
} from "@/socket";
import { socketConfig } from "@/socket/config";
import { logger } from "@/logger/logger";
import { Socket } from "socket.io-client";

interface LogEntry {
  timestamp: string;
  level: string;
  message: string;
  details?: any;
}

const SOCKET_MODE = socketConfig.mode;

export default function SocketDashboardPage() {
  const socketRef = useRef<UniversalSocket>(null);
  const [connected, setConnected] = useState(isSocketConnected());
  const [mode] = useState(SOCKET_MODE);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [messageInput, setMessageInput] = useState("");
  const [reconnectAttempts, setReconnectAttempts] = useState(0);
  const listenersRef = useRef<{ remove?: () => void }>({});

  const addLog = useCallback((level: string, message: string, details?: any) => {
    const entry: LogEntry = {
      timestamp: new Date().toLocaleTimeString(),
      level,
      message,
      details,
    };
    setLogs((prev) => [entry, ...prev.slice(0, 99)]); // Limit to 100 logs
    // Log to console with proper typing
    switch (level) {
      case "error":
        logger.error({ ...details }, message);
        break;
      case "warn":
        logger.warn({ ...details }, message);
        break;
      case "info":
        logger.info({ ...details }, message);
        break;
      case "debug":
        logger.debug({ ...details }, message);
        break;
      default:
        logger.info({ ...details }, message);
    }
  }, []);

  useEffect(() => {
    // Ensure singleton is initialized
    const socket = getActiveSocket();
    if (!socket) {
      initializeSocket();
    }
    socketRef.current = getActiveSocket();

    const handleConnectionChange = () => {
      setConnected(isSocketConnected());
    };

    // Global connection status listener (since singleton)
    const interval = setInterval(handleConnectionChange, 1000);

    if (mode === "socketio" && socket && socketConfig.mode === "socketio") {
      const ioSocket = socket as Socket;

      // Add event listeners only if not already added (singleton safety)
      if (!listenersRef.current.remove) {
        const onConnect = () => {
          setConnected(true);
          setReconnectAttempts(0);
          addLog("info", `Socket.IO Connected (ID: ${ioSocket.id})`);
        };

        const onDisconnect = (reason: string) => {
          setConnected(false);
          addLog("warn", `Socket.IO Disconnected: ${reason}`);
        };

        const onReconnect = (attempt: number) => {
          setReconnectAttempts(attempt);
          addLog("info", `Socket.IO Reconnected (Attempt: ${attempt})`);
        };

        const onWelcome = (data: any) => {
          addLog("info", `Welcome received: ${JSON.stringify(data)}`);
        };

        const onMessage = (data: any) => {
          addLog("info", `Message received: ${JSON.stringify(data)}`);
        };

        const onAny = (event: string, ...args: any[]) => {
          addLog("debug", `Event: ${event}`, { args });
        };

        ioSocket.on("connect", onConnect);
        ioSocket.on("disconnect", onDisconnect);
        ioSocket.on("reconnect", onReconnect);
        ioSocket.on("welcome", onWelcome);
        ioSocket.on("message", onMessage);
        ioSocket.onAny(onAny);

        listenersRef.current.remove = () => {
          ioSocket.off("connect", onConnect);
          ioSocket.off("disconnect", onDisconnect);
          ioSocket.off("reconnect", onReconnect);
          ioSocket.off("welcome", onWelcome);
          ioSocket.off("message", onMessage);
          ioSocket.offAny(onAny);
        };
      }
    } else if (mode === "websocket" && socket && socketConfig.mode === "websocket") {
      // COMMENTED OUT: WebSocket logic for now
      /*
      const ws = socket as WebSocket;

      // For WebSocket, listeners are set in the singleton, but we can add custom ones here if needed
      // Since onopen/onclose are set in singleton, we just monitor readyState
      const onOpen = () => {
        setConnected(true);
        setReconnectAttempts(0);
        addLog("info", "WebSocket Connected");
      };

      const onClose = (event: CloseEvent) => {
        setConnected(false);
        addLog("warn", `WebSocket Closed (Code: ${event.code}, Reason: ${event.reason})`);
      };

      // Since singleton sets them, we can override or add additional handling
      // But to avoid duplication, we'll poll readyState instead for status
      // For messages, use the custom event
      const handleWsMessage = (e: CustomEvent) => {
        addLog("info", "WebSocket Message", e.detail);
      };

      ws.addEventListener("open", onOpen);
      ws.addEventListener("close", onClose);
      window.addEventListener("ws:message", handleWsMessage as EventListener);

      listenersRef.current.remove = () => {
        ws.removeEventListener("open", onOpen);
        ws.removeEventListener("close", onClose);
        window.removeEventListener("ws:message", handleWsMessage as EventListener);
      };
      */
    }

    return () => {
      clearInterval(interval);
      if (listenersRef.current.remove) {
        listenersRef.current.remove();
      }
      // Do not close singleton on page unmount to keep it global
    };
  }, [mode, addLog]); // No dependency on socket to avoid re-init

  useEffect(() => {
    // Poll for connection status changes (for both modes)
    const pollInterval = setInterval(() => {
      const newConnected = isSocketConnected();
      if (newConnected !== connected) {
        setConnected(newConnected);
        if (newConnected) {
          addLog("info", `${mode.toUpperCase()} Reconnected via singleton`);
        } else {
          addLog("warn", `${mode.toUpperCase()} Disconnected`);
        }
      }
    }, 2000);

    return () => clearInterval(pollInterval);
  }, [connected, mode, addLog]);

  const sendMessage = () => {
    const socket = getActiveSocket();
    if (!socket || !isSocketConnected()) {
      addLog("warn", "Not connected, cannot send message");
      return;
    }

    const payload = {
      text: messageInput || "Hello from SaaS Dashboard",
      ts: Date.now(),
      mode,
      url: socketConfig[socketConfig.mode === "socketio" ? "socketIOUrl" : "webSocketUrl"],
    };
    try {
      if (mode === "socketio") {
        (socket as Socket).emit("message", payload);
      } else {
        // COMMENTED OUT: WebSocket send logic for now
        /*
        (socket as WebSocket).send(JSON.stringify(payload));
        */
      }
      addLog("info", `Sent via ${mode}: ${JSON.stringify(payload)}`);
      setMessageInput("");
    } catch (err) {
      addLog("error", "Failed to send message", { error: err });
    }
  };

  const toggleConnection = () => {
    if (isSocketConnected()) {
      closeSocketConnection();
      setConnected(false);
      addLog("info", "Singleton connection closed manually");
    } else {
      initializeSocket();
      addLog(
        "info",
        `Singleton ${mode} initialized with URL: ${socketConfig[socketConfig.mode === "socketio" ? "socketIOUrl" : "webSocketUrl"]}`
      );
    }
  };

  const clearLogs = () => setLogs([]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Socket Testing</h1>
          <p className="text-lg text-gray-600">
            Professional real-time communication hub with singleton socket management
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Using config URL:{" "}
            {socketConfig[socketConfig.mode === "socketio" ? "socketIOUrl" : "webSocketUrl"]}
          </p>
        </div>

        {/* Mode Display (read-only since from config) */}
        <div className="bg-(--background) rounded-lg shadow-soft border border-gray-200 p-6 mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Socket Mode (from Config)
          </label>
          <p className="text-lg font-medium text-gray-900">{mode.toUpperCase()}</p>
        </div>

        {/* Status Card */}
        <div className="bg-(--background) rounded-lg shadow-soft border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Singleton Connection Status</h2>
              <p className="text-sm text-gray-600 mt-1">
                Mode: <span className="font-medium">{mode.toUpperCase()}</span> | Reconnects:{" "}
                <span className="font-medium">{reconnectAttempts}</span> | Auto-Connect:{" "}
                <span className="font-medium">
                  {socketConfig.autoConnect ? "Enabled" : "Disabled"}
                </span>
              </p>
            </div>
            <div
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                connected ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              }`}
            >
              {connected ? "🟢 Connected" : "🔴 Disconnected"}
            </div>
          </div>
          <button
            onClick={toggleConnection}
            className="mt-4 w-full sm:w-auto px-4 py-2 border border-transparent rounded-md shadow-soft text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {connected ? "Close Singleton" : "Init Singleton"}
          </button>
        </div>

        {/* Message Sender */}
        <div className="bg-(--background) rounded-lg shadow-soft border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Send Message via Singleton</h2>
          <div className="flex gap-3">
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder="Enter message..."
              className="flex-1 px-3 py-2 border border-gray-300 text-black rounded-md shadow-soft focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              disabled={!connected}
              className="px-4 py-2 border border-transparent rounded-md shadow-soft text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Send
            </button>
          </div>
        </div>

        {/* Logs Section */}
        <div className="bg-(--background) rounded-lg shadow-soft border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Singleton Event Logs</h2>
            <div className="flex gap-2">
              <button
                onClick={clearLogs}
                className="px-3 py-1 text-xs text-gray-500 hover:text-gray-700"
              >
                Clear
              </button>
              <span className="text-xs text-gray-500">({logs.length} entries)</span>
            </div>
          </div>
          <div className="max-h-96 overflow-y-auto space-y-2">
            {logs.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No events yet. Initialize singleton to start logging.
              </div>
            ) : (
              logs.map((log, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-md text-sm ${
                    log.level === "error"
                      ? "bg-red-50 border border-red-200 text-red-800"
                      : log.level === "warn"
                        ? "bg-yellow-50 border border-yellow-200 text-yellow-800"
                        : log.level === "info"
                          ? "bg-blue-50 border border-blue-200 text-blue-800"
                          : "bg-gray-50 border border-gray-200 text-gray-800"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{log.timestamp}</span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        log.level === "error"
                          ? "bg-red-100 text-red-800"
                          : log.level === "warn"
                            ? "bg-yellow-100 text-yellow-800"
                            : log.level === "info"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {log.level.toUpperCase()}
                    </span>
                  </div>
                  <div className="mt-1">{log.message}</div>
                  {log.details && (
                    <details className="mt-2">
                      <summary className="text-xs cursor-pointer text-gray-600 hover:text-gray-900">
                        Details
                      </summary>
                      <pre className="mt-1 text-xs bg-gray-100 p-2 rounded text-gray-700 overflow-auto">
                        {JSON.stringify(log.details, null, 2)}
                      </pre>
                    </details>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
