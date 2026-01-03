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
import { FormInput } from "@/components/form";
import { Button } from "@/components/ui/button/button";

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
    <div className="w-full">
      <div className="bg-[var(--background)] rounded-8 shadow-soft border border-[var(--gray-1)] overflow-hidden">
        <div className="px-8 py-10 space-y-8">
          {/* Header */}
          <div>
            <h2 className="t-h2">Add Channels</h2>
            <p className="t-sm mt-1">Unlock the potential of your candidates</p>
          </div>

          {/* Add New Channel Form */}
          <div className="flex gap-6 items-end">
            {/* Input Fields Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
              {/* Pulse Code */}
              <FormInput
                label="Pulse Code"
                name="pulseCode"
                type="text"
                value={generatedPrefix || ""}
                onChange={() => {}} // Read-only, no-op
                placeholder={prefixLoading ? "Generating..." : "CH_000001"}
                readOnly
                required
              />

              {/* Channel Name */}
              <FormInput
                label="Channel Name"
                name="channelName"
                type="text"
                value={channelName}
                onChange={setChannelName}
                placeholder="e.g. Doctor Channel"
                required
              />

              {/* Legacy Code */}
              <FormInput
                label="Legacy Code (Optional)"
                name="legacyCode"
                type="text"
                value={legacyCode}
                onChange={setLegacyCode}
                placeholder="e.g. OLD-CH-001"
              />
            </div>

            {/* Add Button */}
            <Button
              onClick={handleAddChannel}
              disabled={!channelName.trim() || loading}
              variant="primary"
              size="lg"
              icon={Plus}
              loading={loading}
              className="h-12 px-8"
            >
              {loading ? "Adding..." : "Add to list"}
            </Button>
          </div>

          {/* Added Channels List */}
          {channelsList.length > 0 && (
            <div className="mt-10">
              <h3 className="t-h4 mb-4">Added Channels ({channelsList.length})</h3>
              <div className="space-y-3">
                {channelsList.map((channel) => (
                  <div
                    key={channel.id}
                    className="flex items-center justify-between p-5 bg-[var(--gray-0)] rounded-8 border border-[var(--gray-2)]"
                  >
                    <div className="grid grid-cols-3 gap-8 flex-1">
                      <div>
                        <p className="t-cap">Channel Name</p>
                        <p className="t-label-b">{channel.channelName}</p>
                      </div>
                      <div>
                        <p className="t-cap">Pulse Code</p>
                        <p className="t-val-sm">{channel.pulseCode}</p>
                      </div>
                      <div>
                        <p className="t-cap">Legacy Code</p>
                        <p className="t-label-b">{channel.legacyCode}</p>
                      </div>
                    </div>
                    <Button
                      onClick={() => removeChannel(channel.id)}
                      variant="ghost"
                      size="icon"
                      icon={X}
                      className="ml-6 text-[var(--destructive)] hover:bg-[var(--destructive-0)]"
                    />
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
