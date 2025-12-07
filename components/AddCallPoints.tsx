"use client";

import React, { useState } from "react";
import { MapPin } from "lucide-react";

export default function AddCallPointForm() {
  const [locationTitle, setLocationTitle] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  return (
    <div className="w-full ">
      <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="p-5 space-y-10">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Add Call Point</h1>
            <p className="text-sm text-gray-500 mt-2">Unlock the potential of your candidates</p>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-4 gap-8">
            {/* Location Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  Location Title
                </span>
              </label>
              <input
                type="text"
                value={locationTitle}
                onChange={(e) => setLocationTitle(e.target.value)}
                placeholder="e.g 360Xpert Solution"
                className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 placeholder-gray-400"
              />
            </div>

            {/* Latitude */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Latitude</label>
              <input
                type="text"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                placeholder="e.g 24.924371,67"
                className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 placeholder-gray-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Longitude</label>
              <input
                type="text"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                placeholder="e.g 0900777141"
                className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 placeholder-gray-400"
              />
            </div>
            <div className="">
              <button className="px-4 py-4 bg-blue-600 mt-7 text-white font-semibold rounded-full">
                Add Call Point
              </button>
            </div>
          </div>

          {/* Submit Button */}
        </div>
      </div>
    </div>
  );
}
