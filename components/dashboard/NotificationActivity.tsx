"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { generateNotificationData, type NotificationItem } from "./notificationActivityData";

interface NotificationActivityProps {
  notifications?: NotificationItem[];
  className?: string;
}

export default function NotificationActivity({
  notifications,
  className,
}: NotificationActivityProps) {
  const notificationData = notifications || generateNotificationData();

  return (
    <Card className={cn("shadow-soft", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="t-h4 text-(--gray-9)">Notifications & Recent Activities</CardTitle>
      </CardHeader>

      <CardContent className="pt-0 pb-0">
        {/* Notification List - Scrollable */}
        <div className="space-y-4 max-h-[400px] overflow-y-auto scrollbar-hide">
          {notificationData.map((notification) => (
            <div
              key={notification.id}
              className="flex items-start justify-between gap-4 p-3 rounded-8 hover:bg-(--gray-0) transition-colors"
            >
              {/* Left Side - Title and Description */}
              <div className="flex-1 min-w-0">
                <h4 className="t-label-b text-(--gray-9) mb-1">{notification.title}</h4>
                <p className="t-sm text-(--gray-5)">{notification.description}</p>
              </div>

              {/* Right Side - Timestamp */}
              <div className="flex-shrink-0">
                <span className="t-cap text-(--gray-5)">{notification.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
