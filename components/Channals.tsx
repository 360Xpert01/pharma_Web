"use client";

import React, { useState, useEffect } from "react";
import { Plus, X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/index";
import { createChannel, resetChannelState } from "@/store/slices/channel/createChannelSlice";
import { getAllChannels } from "@/store/slices/channel/getAllChannelsSlice";
import {
  generatePrefix,
  resetGeneratePrefixState,
} from "@/store/slices/preFix/generatePrefixSlice";

interface Channel {
  id: string;
  channelName: string;
  pulseCode: string;
  legacyCode: string;
}

export default function AddChannelsCard() {
  const dispatch = useAppDispatch();
  const { loading, success, error, message } = useAppSelector((state) => state.createChannel);
  const {
    generatedPrefix,
    loading: prefixLoading,
    error: prefixError,
  } = useAppSelector((state) => state.generatePrefix);

  const [channelName, setChannelName] = useState("");
  const [legacyCode, setLegacyCode] = useState("");
  const [channelsList, setChannelsList] = useState<Channel[]>([]);

  // Generate prefix on mount
  useEffect(() => {
    // 🔥 Always call generate for "Channel" entity
    // Channel forms create channels (business logic, not dynamic)
    // The /generate API is idempotent - handles existence automatically
    dispatch(generatePrefix({ entity: "Channel" }));

    return () => {
      dispatch(resetGeneratePrefixState());
    };
  }, [dispatch]);

  // Reset state and refresh channels list on success
  useEffect(() => {
    if (success) {
      // Clear form
      setChannelName("");
      setLegacyCode("");

      // Refresh channels list
      dispatch(getAllChannels());

      // Regenerate prefix for next channel
      dispatch(generatePrefix({ entity: "Channel" }));

      // Reset state after a delay
      setTimeout(() => {
        dispatch(resetChannelState());
      }, 3000);
    }
  }, [success, dispatch]);

  const handleAddChannel = async () => {
    if (!channelName.trim()) return;

    // Validate pulse code is generated
    if (!generatedPrefix) {
      console.error("Pulse code not generated yet");
      return;
    }

    const channelData = {
      name: channelName.trim(),
      pulseCode: generatedPrefix, // Use API-generated prefix
      legacyCode: legacyCode.trim() || "",
      isActive: true,
    };

    // Dispatch to API
    dispatch(createChannel(channelData));
  };

  const removeChannel = (id: string) => {
    setChannelsList(channelsList.filter((ch) => ch.id !== id));
  };

  return (
    <div className="w-full ">
      <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="px-8 py-10 space-y-8">
          {/* Header */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Add Channels</h2>
            <p className="text-sm text-gray-500 mt-1">Unlock the potential of your candidates</p>
          </div>

          {/* Add New Channel Form */}
          <div className="flex flex-wrap items-end gap-6">
            {/* Pulse Generated Code */}
            <div className="flex-1 min-w-64">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pulse Generated Code
              </label>
              <input
                type="text"
                value={generatedPrefix || ""}
                placeholder={prefixLoading ? "Generating..." : "PLS_CH_000001"}
                readOnly
                className="w-full px-5 py-4 bg-gray-100 border border-gray-200 rounded-xl font-mono text-gray-700 cursor-not-allowed"
                title={prefixError || "Auto-generated pulse code (read-only)"}
              />
            </div>

            {/* Channel Name */}
            <div className="flex-1 min-w-64">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Channel Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={channelName}
                onChange={(e) => setChannelName(e.target.value)}
                placeholder="e.g. Doctor Channel"
                className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            {/* Legacy Code */}
            <div className="flex-1 min-w-64">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Legacy Code (Optional)
              </label>
              <input
                type="text"
                value={legacyCode}
                onChange={(e) => setLegacyCode(e.target.value)}
                placeholder="e.g. OLD-CH-001"
                className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            {/* Add Button */}
            <div>
              <button
                onClick={handleAddChannel}
                disabled={!channelName.trim() || loading}
                className="px-10 py-4 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 shadow-lg flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                {loading ? "Adding..." : "Add to list"}
              </button>
            </div>
          </div>

          {/* Added Channels List */}
          {channelsList.length > 0 && (
            <div className="mt-10">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Added Channels ({channelsList.length})
              </h3>
              <div className="space-y-3">
                {channelsList.map((channel) => (
                  <div
                    key={channel.id}
                    className="flex items-center justify-between p-5 bg-gray-50 rounded-xl border border-gray-200"
                  >
                    <div className="grid grid-cols-3 gap-8 flex-1">
                      <div>
                        <p className="text-sm text-gray-500">Channel Name</p>
                        <p className="font-medium">{channel.channelName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Pulse Code</p>
                        <p className="font-mono text-sm">{channel.pulseCode}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Legacy Code</p>
                        <p className="text-sm">{channel.legacyCode}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeChannel(channel.id)}
                      className="ml-6 text-red-500 hover:bg-red-50 p-2 rounded-lg transition"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
