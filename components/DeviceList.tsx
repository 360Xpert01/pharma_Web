"use client";

import React, { useState } from "react";
import { Smartphone, Trash2 } from "lucide-react";

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
    <div className="w-full bg-white rounded-2xl shadow-soft border border-gray-100 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Devices</h2>

      <div className="space-y-3">
        {devices.map((device) => (
          <div
            key={device.id}
            className="flex items-center p-4 border border-gray-200 rounded-xl hover:border-gray-300 transition-colors"
          >
            {/* Left: Device Info */}
            <div className="flex items-center gap-4 w-[280px]">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <Smartphone className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{device.deviceName}</h3>
                <p className="text-sm text-gray-600">{device.platform}</p>
              </div>
            </div>

            {/* Center: Device ID */}
            <div className="flex-1 flex flex-col items-center justify-center">
              <p className="text-xs text-gray-500 mb-1">Device ID</p>
              <p className="text-base font-semibold text-gray-900">{device.deviceId}</p>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-3 justify-end w-[280px]">
              {device.status === "pending" ? (
                <>
                  <button
                    onClick={() => approveDevice(device.id)}
                    className="px-5 py-2 bg-blue-600 cursor-pointer text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => rejectDevice(device.id)}
                    className="px-5 py-2 border border-red-300 cursor-pointer text-red-600 text-sm font-medium rounded-lg hover:bg-red-50 transition"
                  >
                    Reject
                  </button>
                </>
              ) : (
                <>
                  <span className="px-5 py-2 bg-green-50 cursor-pointer text-green-700 text-sm font-medium rounded-lg">
                    Approved
                  </span>
                  <button
                    onClick={() => removeDevice(device.id)}
                    className="p-2 text-red-500 hover:bg-red-50 cursor-pointer rounded-lg transition"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {devices.length === 0 && (
        <div className="text-center py-12">
          <Smartphone className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <p className="text-lg text-gray-500">No devices registered</p>
        </div>
      )}
    </div>
  );
}
