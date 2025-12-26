// components/ChannelsManager.tsx
"use client";

import React, { useState, useEffect } from "react";
import { ChevronDown, MoreVertical, Trash2, Edit2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/index";
import { getAllChannels } from "@/store/slices/channel/getAllChannelsSlice";
import TableColumnHeader from "@/components/TableColumnHeader";

interface Channel {
  id: string;
  name: string;
  legacyCode: string;
  pulseCode: string;
  isActive: boolean;
}

export default function ChannelsManager() {
  const dispatch = useAppDispatch();
  const { channels, loading, error } = useAppSelector((state) => state.allChannels);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  // Fetch channels on component mount
  useEffect(() => {
    dispatch(getAllChannels());
  }, [dispatch]);

  const toggleStatus = (id: string) => {
    // TODO: Implement API call to update channel status
    console.log("Toggle status for channel:", id);
  };

  const deleteChannel = (id: string) => {
    // TODO: Implement API call to delete channel
    console.log("Delete channel:", id);
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
      <div className="px-6">
        <TableColumnHeader
          columns={[
            { label: "Pulse Code", className: "flex-1" },
            { label: "Channel Name", className: "flex-1" },
            { label: "Status", className: "flex-1 text-right pr-[100px]" },
          ]}
          containerClassName="flex items-center gap-6"
        />
      </div>
      <div className="p-4 space-y-3">
        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading channels...</div>
        ) : error ? (
          <div className="text-center py-12 text-red-500">Error: {error}</div>
        ) : channels.length === 0 ? (
          <div className="text-center py-12 text-gray-500">No channels found.</div>
        ) : (
          channels.map((channel) => (
            <div
              key={channel.id}
              className={`
                group relative flex items-center justify-between 
                px-6 py-3 rounded-2xl border border-gray-200 transition-all duration-200 cursor-pointer
               
              `}
            >
              <div className="flex items-center w-full gap-6">
                <div className="text-sm text-black flex-1">{channel.pulseCode}</div>
                <div className="text-sm font-normal text-black flex-1">{channel.name}</div>

                <div className="flex items-center flex-1 justify-end">
                  <div className="inline-flex border border-gray-300 rounded-full p-1 bg-gray-50 overflow-hidden">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleStatus(channel.id);
                      }}
                      className={`px-6 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                        channel.isActive ? "bg-blue-600 text-white" : "text-black hover:bg-gray-100"
                      }`}
                    >
                      Active
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleStatus(channel.id);
                      }}
                      className={`px-6 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                        !channel.isActive
                          ? "bg-blue-600 text-white"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      Inactive
                    </button>
                  </div>
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
                    className="p-2 rounded-lg cursor-pointer"
                  >
                    <MoreVertical className="w-5 h-5 text-gray-500" />
                  </button>

                  {openMenuId === channel.id && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setOpenMenuId(null)} />
                      <div className="absolute right-3 top-7 mt-2 w-48 py-2 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                        <button className="w-full flex items-center gap-3 px-4 py-1 text-sm hover:bg-gray-50 cursor-pointer">
                          Add New Campaign
                        </button>
                        <button className="w-full flex items-center gap-3 px-4 py-1 text-sm hover:bg-gray-50 cursor-pointer">
                          Edit Channel
                        </button>
                        <button
                          onClick={() => deleteChannel(channel.id)}
                          className="w-full flex items-center  px-4 py-1 text-sm text-red-600 hover:bg-red-50 cursor-pointer"
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
