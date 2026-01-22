"use client";

import React, { useState } from "react";
import { Smartphone, Trash2, CheckCircle } from "lucide-react";
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
    {
      id: "4",
      deviceName: "Remdi Note 12",
      platform: "Android",
      deviceId: "123495648",
      status: "pending",
    },
    {
      id: "5",
      deviceName: "Galaxy Tab S8",
      platform: "Android",
      deviceId: "456789012",
      status: "approved",
    },
    {
      id: "6",
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
    <div className="w-full">
      <div className="mt-3">
        <h2 className="text-xl font-bold mb-6 text-gray-800">Devices</h2>

        {/* Grid Layout: Ek line mein 3 devices */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {devices.map((device) => (
            <div
              key={device.id}
              className="flex flex-col justify-between bg-white rounded-xl border border-gray-100 shadow-sm p-4 hover:shadow-md transition-shadow min-h-[160px]"
            >
              {/* Top Section: Device Info */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <Smartphone className="w-6 h-6 text-blue-600" />
                </div>
                <div className="overflow-hidden">
                  <h3 className="font-bold text-gray-900 text-sm truncate">{device.deviceName}</h3>
                  <p className="text-xs text-gray-500">{device.platform}</p>
                </div>
              </div>

              {/* Middle Section: Device ID */}
              <div className="bg-gray-50 rounded-lg p-2 mb-4">
                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                  Device ID
                </p>
                <p className="text-sm font-mono font-medium text-gray-700">{device.deviceId}</p>
              </div>

              {/* Bottom Section: Actions */}
              <div className="flex items-center gap-2 mt-auto pt-2 border-t border-gray-50">
                {device.status === "pending" ? (
                  <>
                    <button
                      onClick={() => approveDevice(device.id)}
                      className="flex-1 bg-blue-600 text-white text-xs font-bold py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => rejectDevice(device.id)}
                      className="flex-1 bg-white border border-red-200 text-red-600 text-xs font-bold py-2 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      Reject
                    </button>
                  </>
                ) : (
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-1 text-emerald-600">
                      <CheckCircle size={14} />
                      <span className="text-xs font-bold uppercase tracking-tighter">Approved</span>
                    </div>
                    <button
                      onClick={() => removeDevice(device.id)}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {devices.length === 0 && (
          <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
            <Smartphone className="w-12 h-12 mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500 font-medium">No devices registered</p>
          </div>
        )}
      </div>
    </div>
  );
}
