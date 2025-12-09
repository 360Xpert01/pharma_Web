"use client";

import React, { useState } from "react";
import { Plus, X } from "lucide-react";

interface Channel {
  id: string;
  channelName: string;
  pulseCode: string;
  legacyCode: string;
}

export default function AddChannelsCard() {
  const [channelName, setChannelName] = useState("");
  const [pulseCode, setPulseCode] = useState(""); // ← Naya state
  const [legacyCode, setLegacyCode] = useState(""); // ← Naya state
  const [channelsList, setChannelsList] = useState<Channel[]>([]);

  const generatePulseCode = () => {
    // Auto generate Pulse Code (example format)
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `PULSE-${random}`;
  };

  const handleAddChannel = () => {
    if (!channelName.trim()) return;

    const newChannel: Channel = {
      id: Date.now().toString(),
      channelName: channelName.trim(),
      pulseCode: pulseCode || generatePulseCode(), // agar khali ho to auto generate
      legacyCode: legacyCode.trim() || "-",
    };

    setChannelsList([...channelsList, newChannel]);

    // Reset form
    setChannelName("");
    setPulseCode("");
    setLegacyCode("");
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

            {/* Pulse Generated Code */}
            <div className="flex-1 min-w-64">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pulse Generated Code
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={pulseCode || generatePulseCode()}
                  readOnly
                  className="w-full px-5 py-4 bg-gray-100 border border-gray-200 rounded-xl font-mono text-gray-700 cursor-not-allowed"
                />
                <button
                  onClick={() => setPulseCode(generatePulseCode())}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-600 hover:text-blue-700 text-xs font-medium"
                >
                  Regenerate
                </button>
              </div>
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
                disabled={!channelName.trim()}
                className="px-10 py-4 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 shadow-lg flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add to list
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
