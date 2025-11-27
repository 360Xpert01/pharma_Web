"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function AddChannelsCard() {
  const [channelName, setChannelName] = useState("");
  const [status, setStatus] = useState("Active");

  return (
    <div className="w-full ">
      <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="px-8 py-10">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Add Channels</h2>
            <p className="text-sm text-gray-500 mt-1">Unlock the potential of your candidates</p>
          </div>

          {/* Form Row */}
          <div className="flex items-center gap-6">
            {/* Channel Name Input */}
            <div className="flex-1 ">
              <label className="block text-sm font-medium text-gray-700 mb-2">Channels name</label>
              <input
                type="text"
                value={channelName}
                onChange={(e) => setChannelName(e.target.value)}
                placeholder="e.g: john doe"
                className="w-70 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            {/* Status Dropdown */}
            <div className="w-64">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition cursor-pointer"
                >
                  <option>Active</option>
                  <option>Inactive</option>
                  <option>Pending</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Add Button */}
            <div className="flex items-end">
              <button className="px-8 py-3 bg-blue-600 text-white font-medium text-sm rounded-full hover:bg-blue-700 hover:shadow-lg transition-all duration-200 shadow-md">
                Add to list
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
