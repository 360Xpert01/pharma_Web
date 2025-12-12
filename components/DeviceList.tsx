"use client";

import React, { useState } from "react";
import { Plus, Trash2, Smartphone } from "lucide-react";

interface Device {
  id: string;
  deviceId: string;
  made: string;
  status: "registered" | "unregistered";
}

export default function DeviceList() {
  const [devices, setDevices] = useState<Device[]>([
    { id: "1", deviceId: "DEV-2025-001", made: "Samsung A 12", status: "registered" },
    { id: "2", deviceId: "DEV-2025-002", made: "Xiaomi redX ", status: "registered" },
    { id: "3", deviceId: "DEV-2025-003", made: "Apple 13 pro", status: "unregistered" },
    { id: "4", deviceId: "DEV-2025-004", made: "OnePlus 3 E1", status: "registered" },
    { id: "5", deviceId: "DEV-2025-005", made: "Google pixel 2", status: "unregistered" },
  ]);

  const addDevice = () => {
    const newDevice: Device = {
      id: Date.now().toString(),
      deviceId: `DEV-2025-${String(devices.length + 1).padStart(3, "0")}`,
      made: "New Device",
      status: "unregistered",
    };
    setDevices([...devices, newDevice]);
  };

  const removeDevice = (id: string) => {
    setDevices(devices.filter((d) => d.id !== id));
  };

  const toggleStatus = (id: string) => {
    setDevices(
      devices.map((d) =>
        d.id === id
          ? { ...d, status: d.status === "registered" ? "unregistered" : "registered" }
          : d
      )
    );
  };

  return (
    <div className="w-full mt-4">
      <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                Mobile Register
              </h2>
              <p className="text-gray-500 mt-1">{devices.length} devices connected</p>
            </div>

            <button
              onClick={addDevice}
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition flex items-center gap-2 shadow-lg"
            >
              <Plus className="w-5 h-5" />
              Add Device
            </button>
          </div>

          {/* Device List */}
          <div className="space-y-4">
            {devices.map((device) => (
              <div
                key={device.id}
                className="bg-white border border-gray-200 rounded-2xl p-4 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  {/* Device Info */}
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-md">
                      <Smartphone className="w-8 h-8 text-white" />
                    </div>

                    <div>
                      <h3 className="font-bold text-gray-900">{device.deviceId}</h3>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">{device.made}</span>
                      </p>
                    </div>
                  </div>

                  {/* Status + Actions */}
                  <div className="flex items-center gap-4">
                    {/* Status Badge */}
                    <button
                      onClick={() => toggleStatus(device.id)}
                      className={`px-5 py-2.5 rounded-full font-medium text-sm transition-all ${
                        device.status === "registered"
                          ? "bg-green-100 text-green-700 hover:bg-green-200"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {device.status === "registered" ? "Registered" : "Unregistered"}
                    </button>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeDevice(device.id)}
                      className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {devices.length === 0 && (
            <div className="text-center py-20">
              <Smartphone className="w-20 h-20 mx-auto text-gray-300 mb-4" />
              <p className="text-xl text-gray-500">No devices added yet</p>
              <p className="text-gray-400 mt-2">Click "Add Device" to get started</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
