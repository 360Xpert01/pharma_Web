"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { io, Socket } from "socket.io-client";
import { DASHBOARD_TEXTS } from "@/constants/dashboard";
import { logger } from "@/lib/logger";

interface RealTimeData {
  metrics?: {
    totalUsers: number;
    activeSessions: number;
    revenue: number;
    conversionRate: number;
    orders: number;
    growth: number;
    bounceRate: number;
    pageViews: number;
  };
  activities?: Array<{
    id: string;
    user: string;
    action: string;
    timestamp: string;
    type: "user" | "order" | "system";
  }>;
  notifications?: Array<{
    id: string;
    title: string;
    message: string;
    type: "info" | "success" | "warning" | "error";
    timestamp: string;
  }>;
}

interface RealTimeContextType {
  socket: Socket | null;
  isConnected: boolean;
  data: RealTimeData;
  connectionStatus: string;
  lastUpdate: Date | null;
}

const RealTimeContext = createContext<RealTimeContextType>({
  socket: null,
  isConnected: false,
  data: {},
  connectionStatus: "disconnected",
  lastUpdate: null,
});

export const useRealTime = () => {
  const context = useContext(RealTimeContext);
  if (!context) {
    throw new Error("useRealTime must be used within a RealTimeProvider");
  }
  return context;
};

interface RealTimeProviderProps {
  children: ReactNode;
}

export function RealTimeProvider({ children }: RealTimeProviderProps) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [data, setData] = useState<RealTimeData>({});
  const [connectionStatus, setConnectionStatus] = useState("disconnected");
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  useEffect(() => {
    // Initialize socket connection
    // Note: Replace with your actual WebSocket server URL
    const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001";

    const newSocket = io(socketUrl, {
      transports: ["websocket", "polling"],
      timeout: 5000,
      forceNew: true,
    });

    // Connection event handlers
    newSocket.on("connect", () => {
      logger.info("Connected to real-time server", { socketId: newSocket.id });
      setIsConnected(true);
      setConnectionStatus(DASHBOARD_TEXTS.notifications.realTimeConnected);
      setSocket(newSocket);
    });

    newSocket.on("disconnect", () => {
      logger.info("Disconnected from real-time server");
      setIsConnected(false);
      setConnectionStatus(DASHBOARD_TEXTS.notifications.realTimeDisconnected);
    });

    newSocket.on("connect_error", (error) => {
      logger.error("Real-time connection error", { error: error.message, stack: error.stack });
      setIsConnected(false);
      setConnectionStatus("Connection failed");
    });

    // Data event handlers
    newSocket.on("metrics_update", (metricsData) => {
      setData((prev) => ({ ...prev, metrics: metricsData }));
      setLastUpdate(new Date());
    });

    newSocket.on("activity_update", (activities) => {
      setData((prev) => ({ ...prev, activities }));
      setLastUpdate(new Date());
    });

    newSocket.on("notification", (notification) => {
      setData((prev) => ({
        ...prev,
        notifications: [notification, ...(prev.notifications || [])].slice(0, 10),
      }));
      setLastUpdate(new Date());
    });

    // Cleanup on unmount
    return () => {
      newSocket.disconnect();
    };
  }, []);

  // Simulate real-time data updates when no WebSocket server is available
  useEffect(() => {
    if (!isConnected) {
      const interval = setInterval(() => {
        // Simulate metrics updates
        const mockMetrics = {
          totalUsers: Math.floor(Math.random() * 1000) + 12000,
          activeSessions: Math.floor(Math.random() * 500) + 2000,
          revenue: Math.floor(Math.random() * 10000) + 40000,
          conversionRate: Math.round((Math.random() * 2 + 2) * 100) / 100,
          orders: Math.floor(Math.random() * 200) + 1800,
          growth: Math.round((Math.random() * 10 + 10) * 100) / 100,
          bounceRate: Math.round((Math.random() * 10 + 30) * 100) / 100,
          pageViews: Math.floor(Math.random() * 10000) + 90000,
        };

        // Simulate activity updates
        const mockActivities = [
          {
            id: Date.now().toString(),
            user: "John Doe",
            action: "Created new order #1234",
            timestamp: new Date().toISOString(),
            type: "order" as const,
          },
          {
            id: (Date.now() + 1).toString(),
            user: "Jane Smith",
            action: "Updated profile information",
            timestamp: new Date().toISOString(),
            type: "user" as const,
          },
        ];

        setData((prev) => ({
          ...prev,
          metrics: mockMetrics,
          activities: mockActivities,
        }));
        setLastUpdate(new Date());
        setConnectionStatus("Simulated data");
      }, 10000); // Update every 10 seconds

      return () => clearInterval(interval);
    }
  }, [isConnected]);

  const value: RealTimeContextType = {
    socket,
    isConnected,
    data,
    connectionStatus,
    lastUpdate,
  };

  return <RealTimeContext.Provider value={value}>{children}</RealTimeContext.Provider>;
}

// Real-time status indicator component
export function RealTimeStatus() {
  const { isConnected, connectionStatus, lastUpdate } = useRealTime();

  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <div className={`w-2 h-2 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"}`} />
      <span>{connectionStatus}</span>
      {lastUpdate && (
        <span className="text-xs">Last update: {lastUpdate.toLocaleTimeString()}</span>
      )}
    </div>
  );
}

// Recent activities component
export function RecentActivities() {
  const { data } = useRealTime();
  const activities = data.activities || [];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{DASHBOARD_TEXTS.sections.dataLists}</h3>
      <div className="space-y-2">
        {activities.length === 0 ? (
          <p className="text-muted-foreground text-sm">{DASHBOARD_TEXTS.placeholders.noData}</p>
        ) : (
          activities.slice(0, 5).map((activity) => (
            <div key={activity.id} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
              <div
                className={`w-2 h-2 mt-2 rounded-full ${
                  activity.type === "order"
                    ? "bg-blue-500"
                    : activity.type === "user"
                      ? "bg-green-500"
                      : "bg-yellow-500"
                }`}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{activity.user}</p>
                <p className="text-sm text-muted-foreground">{activity.action}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(activity.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// Real-time notifications component
export function RealTimeNotifications() {
  const { data } = useRealTime();
  const notifications = data.notifications || [];

  if (notifications.length === 0) return null;

  return (
    <div className="space-y-2">
      {notifications.slice(0, 3).map((notification) => (
        <div
          key={notification.id}
          className={`p-3 rounded-lg border ${
            notification.type === "success"
              ? "bg-green-50 border-green-200"
              : notification.type === "warning"
                ? "bg-yellow-50 border-yellow-200"
                : notification.type === "error"
                  ? "bg-red-50 border-red-200"
                  : "bg-blue-50 border-blue-200"
          }`}
        >
          <h4 className="font-medium text-sm">{notification.title}</h4>
          <p className="text-sm text-muted-foreground">{notification.message}</p>
          <p className="text-xs text-muted-foreground mt-1">
            {new Date(notification.timestamp).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}
