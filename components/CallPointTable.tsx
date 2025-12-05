"use client";

import React from "react";
import { MoreVertical, MapPin } from "lucide-react";

interface CallPoint {
  id: string;
  name: string;
  latitude: string;
  longitude: string;
}

const callPointsData: CallPoint[] = [
  { id: "1", name: "360 Xpert Solutions", latitude: "24.924371167", longitude: "0900777141" },
  { id: "2", name: "UBL Sports Complex", latitude: "24.91121", longitude: "67.084682" },
  { id: "3", name: "Tech Innovations LLC", latitude: "24.948231", longitude: "2023434.587" },
  { id: "4", name: "Green Energy Corp", latitude: "24.935672", longitude: "1400567.899" },
  { id: "5", name: "Urban Health Services", latitude: "24.920004", longitude: "0530423.434" },
  { id: "6", name: "Creative Minds Agency", latitude: "24.950412", longitude: "0738923.456" },
  { id: "7", name: "NextGen Robotics", latitude: "24.940489", longitude: "0612345.678" },
  { id: "8", name: "Culinary Arts Institute", latitude: "24.952189", longitude: "0887645.123" },
];

export default function CallPointsList() {
  return (
    <div className="w-full mt-3 bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Call Points</h2>

        {/* List */}
        <div className="space-y-4">
          {callPointsData.map((point) => (
            <div
              key={point.id}
              className="flex items-center justify-between p-6 bg-gray-50/50 rounded-2xl hover:bg-gray-100/70 transition-all duration-200 border border-gray-200"
            >
              {/* Left: Name + Coordinates */}
              <div className=" flex items-center gap-8">
                <div className="flex items-center gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">{point.name}</h3>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-12 text-sm text-gray-600">
                <span>{point.latitude}</span>
              </div>
              <div className="flex items-start justify-start text-start gap-12 text-sm text-gray-600">
                <span>{point.longitude}</span>
              </div>

              {/* Right: More Options */}
              <button className="text-gray-400 hover:text-gray-700 transition">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
