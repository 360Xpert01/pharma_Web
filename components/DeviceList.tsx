"use client";

import React, { useState } from "react";
import { Smartphone, Trash2 } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button/button";

interface Device {
  id: string;
  deviceName: string;
  platform: string;
  deviceId: string;
  status: "pending" | "approved";
}

export default function DeviceList() {
  const [devices, setDevices] = useState<Device[]>([
    {
      id: "1",
      deviceName: "Remdi Note 12",
      platform: "Android",
      deviceId: "123495648",
      status: "pending",
    },
    {
      id: "2",
      deviceName: "Galaxy Tab S8",
      platform: "Android",
      deviceId: "456789012",
      status: "approved",
    },
    {
      id: "3",
      deviceName: "Pixel 7a",
      platform: "Android",
      deviceId: "321654987",
      status: "approved",
    },
  ]);

  const approveDevice = (id: string) => {
    setDevices(devices.map((d) => (d.id === id ? { ...d, status: "approved" as const } : d)));
  };

  const rejectDevice = (id: string) => {
    setDevices(devices.filter((d) => d.id !== id));
  };

  const removeDevice = (id: string) => {
    setDevices(devices.filter((d) => d.id !== id));
  };

  return (
    <div className="">
      <div className="mt-3">
        <h2 className="t-h3 mb-6">Devices</h2>

        <div className="space-y-3">
          {devices.map((device) => (
            <div
              key={device.id}
              className="flex items-center rounded-8 shadow-soft border border-(--gray-1) bg-(--background) p-3"
            >
              {/* Left: Device Info */}
              <div className="flex items-center gap-4 w-[280px]">
                <div className="relative">
                  <div className="w-14 h-14 rounded-8 overflow-hidden border-2 border-white shadow-soft flex items-center justify-center bg-(--primary-0)">
                    <Smartphone className="w-6 h-6 text-(--primary)" />
                  </div>
                </div>

                <div>
                  <h3 className="t-label-b">{device.deviceName}</h3>
                  <p className="t-sm">{device.platform}</p>
                </div>
              </div>

              {/* Center: Device ID */}
              <div className="flex-1 flex justify-center">
                <div className="text-center">
                  <p className="t-cap">Device ID</p>
                  <p className="t-val-sm">{device.deviceId}</p>
                </div>
              </div>

              {/* Right: Actions */}
              <div className="flex items-center gap-3 justify-end w-[280px]">
                {device.status === "pending" ? (
                  <>
                    <Button
                      onClick={() => approveDevice(device.id)}
                      variant="primary"
                      size="sm"
                      rounded="xl"
                      className="px-5 shadow-soft"
                    >
                      Approve
                    </Button>
                    <Button
                      onClick={() => rejectDevice(device.id)}
                      variant="outline"
                      size="sm"
                      rounded="xl"
                      className="px-5 border-(--destructive-1) text-(--destructive) hover:bg-(--destructive-light) hover:text-(--destructive) hover:border-(--destructive)"
                    >
                      Reject
                    </Button>
                  </>
                ) : (
                  <>
                    <span className="px-5 py-2 bg-(--success-light) cursor-pointer text-(--success) text-sm font-medium rounded-8">
                      Approved
                    </span>
                    <Button
                      onClick={() => removeDevice(device.id)}
                      size="icon"
                      variant="ghost"
                      rounded="lg"
                      className="text-(--destructive)"
                    >
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {devices.length === 0 && (
          <div className="text-center py-12">
            <Smartphone className="w-16 h-16 mx-auto text-(--gray-3) mb-4" />
            <p className="t-lg">No devices registered</p>
          </div>
        )}
      </div>
    </div>
  );
}
