// components/ChannelsManager.tsx
"use client";

import React, { useState } from "react";
import { ChevronDown, MoreVertical, Trash2, Edit2 } from "lucide-react";

interface Channel {
  id: string;
  name: string;
  isActive: boolean;
}

export default function ChannelsManager() {
  const [channelName, setChannelName] = useState("");
  const [status, setStatus] = useState<"Active" | "Inactive">("Active");
  const [channels, setChannels] = useState<Channel[]>([
    { id: "1", name: "Chain Pharmacy", isActive: false },
    { id: "2", name: "Doctors", isActive: true },
    { id: "3", name: "Hospitals", isActive: true },
    { id: "4", name: "Medical Stores", isActive: false },
  ]);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const handleAddChannel = () => {
    if (channelName.trim()) {
      setChannels([
        ...channels,
        {
          id: Date.now().toString(),
          name: channelName.trim(),
          isActive: status === "Active",
        },
      ]);
      setChannelName("");
      setStatus("Active");
    }
  };

  const toggleStatus = (id: string) => {
    setChannels(channels.map((ch) => (ch.id === id ? { ...ch, isActive: !ch.isActive } : ch)));
  };

  const deleteChannel = (id: string) => {
    setChannels(channels.filter((ch) => ch.id !== id));
    setOpenMenuId(null);
  };

  return (
    <div className="w-full">
      {/* Add Channel Form */}
      {/* <div className="p-8 border-b border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Add Channels</h2>
        <p className="text-sm text-gray-500 mb-8">
          Unlock the potential of your candidates
        </p>

        <div className="flex items-end gap-6">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Channels name
            </label>
            <input
              type="text"
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAddChannel()}
              placeholder="e.g: john doe"
              className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <div className="w-64">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as "Active" | "Inactive")}
                className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              >
                <option>Active</option>
                <option>Inactive</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <button
            onClick={handleAddChannel}
            className="px-8 py-3.5 bg-blue-600 text-white font-medium text-sm rounded-full hover:bg-blue-700 hover:shadow-lg transition-all duration-200 shadow-md"
          >
            Add to list
          </button>
        </div>
      </div> */}

      {/* Channels List */}
      <div className="p-4 space-y-3">
        {channels.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No channels added yet. Start by adding one above!
          </div>
        ) : (
          channels.map((channel) => (
            <div
              key={channel.id}
              className={`
                group relative flex items-center justify-between 
                px-6 py-3 rounded-2xl border border-gray-200 transition-all duration-200 cursor-pointer
               
              `}
            >
              <div className="flex items-center gap-4 flex-1">
                <div className="text-lg w-40 font-medium text-gray-900">{channel.name}</div>
                <div className="w-30">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleStatus(channel.id);
                    }}
                    className={`
                    px-9 py-1 rounded-full text-sm font-medium transition-all shadow-sm
                    ${
                      channel.isActive
                        ? "bg-emerald-200 text-green-500 hover:bg-green-300"
                        : "bg-gray-300 text-gray-400 hover:bg-gray-200"
                    }
                  `}
                  >
                    {channel.isActive ? "Active" : "Inactive"}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* Status Badge */}

                {/* 3-Dot Menu */}
                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenMenuId(openMenuId === channel.id ? null : channel.id);
                    }}
                    className="p-2 rounded-lg "
                  >
                    <MoreVertical className="w-5 h-5 text-gray-500" />
                  </button>

                  {openMenuId === channel.id && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setOpenMenuId(null)} />
                      <div className="absolute right-3 top-7 mt-2 w-48 py-2 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                        <button className="w-full flex items-center gap-3 px-4 py-1 text-sm hover:bg-gray-50">
                          Add New Campaign
                        </button>
                        <button className="w-full flex items-center gap-3 px-4 py-1 text-sm hover:bg-gray-50">
                          Edit Channel
                        </button>
                        <button
                          onClick={() => deleteChannel(channel.id)}
                          className="w-full flex items-center  px-4 py-1 text-sm text-red-600 hover:bg-red-50"
                        >
                          Delete Channal
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
