"use client";

import React, { useEffect } from "react";
import { Smartphone, Trash2, CheckCircle, Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/index";
import { getUserDevices } from "@/store/slices/device/getUserDevicesSlice";

export default function DeviceList() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");
  const dispatch = useAppDispatch();

  const { devices, loading, error } = useAppSelector((state) => state.userDevices);

  useEffect(() => {
    if (userId) {
      dispatch(getUserDevices(userId));
    }
  }, [dispatch, userId]);

  const approveDevice = (id: string) => {
    // TODO: Implement API call to approve device
    console.log("Approve device:", id);
  };

  const rejectDevice = (id: string) => {
    // TODO: Implement API call to reject/delete device
    console.log("Reject device:", id);
  };

  const removeDevice = (id: string) => {
    // TODO: Implement API call to remove device
    console.log("Remove device:", id);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-4" />
        <p className="text-gray-500 font-medium">Loading devices...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 bg-red-50 rounded-2xl border-2 border-dashed border-red-200 mx-4">
        <p className="text-red-500 font-medium">{error}</p>
        <button
          onClick={() => userId && dispatch(getUserDevices(userId))}
          className="mt-4 text-blue-600 hover:underline font-bold"
        >
          Try Again
        </button>
      </div>
    );
  }

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
                  <p className="text-xs text-gray-500">{device.deviceType}</p>
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
                {device.status !== "approved" ? (
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
          <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 mx-4">
            <Smartphone className="w-12 h-12 mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500 font-medium">No devices registered</p>
          </div>
        )}
      </div>
    </div>
  );
}
