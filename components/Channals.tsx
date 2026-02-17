"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Plus, X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/index";
import { createChannel, resetChannelState } from "@/store/slices/channel/createChannelSlice";
import { getAllChannels } from "@/store/slices/channel/getAllChannelsSlice";
import { updateChannel, resetUpdateChannelState } from "@/store/slices/channel/updateChannelSlice";
import {
  generatePrefix,
  resetGeneratePrefixState,
} from "@/store/slices/preFix/generatePrefixSlice";
import { FormInput } from "@/components/form";
import { Button } from "@/components/ui/button/button";
import StatusToggle from "@/components/form/StatusToggle";

interface Channel {
  id: string;
  channelName: string;
  pulseCode: string;
  code: string;
}

interface AddChannelsCardProps {
  updateId?: string | null;
  onUpdateComplete?: () => void;
}

export default function AddChannelsCard({
  updateId = null,
  onUpdateComplete,
}: AddChannelsCardProps) {
  const dispatch = useAppDispatch();
  const { loading, success, error, message } = useAppSelector((state) => state.createChannel);
  const {
    loading: updateLoading,
    success: updateSuccess,
    error: updateError,
    message: updateMessage,
  } = useAppSelector((state) => state.updateChannel);
  const { channels } = useAppSelector((state) => state.allChannels);
  const {
    generatedPrefix,
    loading: prefixLoading,
    error: prefixError,
  } = useAppSelector((state) => state.generatePrefix);

  // Get channel data from allChannels store by updateId
  const channelData = useMemo(() => {
    if (updateId && channels) {
      return channels.find((ch: any) => ch.id === updateId);
    }
    return null;
  }, [updateId, channels]);

  const [channelName, setChannelName] = useState("");
  const [pulseCode, setPulseCode] = useState("");
  const [channelCode, setChannelCode] = useState("");
  const [status, setStatus] = useState<"active" | "inactive">("active");
  const [channelsList, setChannelsList] = useState<Channel[]>([]);
  const isUpdateMode = !!updateId;

  // Generate prefix only when not in update mode
  useEffect(() => {
    if (!isUpdateMode) {
      dispatch(generatePrefix({ entity: "Channel" }));
    }

    return () => {
      dispatch(resetGeneratePrefixState());
    };
  }, [dispatch, isUpdateMode]);

  // Populate form when channel data is loaded in update mode
  useEffect(() => {
    if (isUpdateMode && channelData) {
      console.log("Populating form with channel data:", channelData);
      setChannelName(channelData.name || "");
      setPulseCode(channelData.pulseCode || "");
      setChannelCode(channelData.code || "");
      setStatus(channelData.isActive ? "active" : "inactive");
    }
  }, [isUpdateMode, channelData]);

  // Handle create success
  useEffect(() => {
    if (success) {
      setChannelName("");
      setChannelCode("");
      setPulseCode("");
      setStatus("active");
      dispatch(getAllChannels());
      dispatch(generatePrefix({ entity: "Channel" }));
      setTimeout(() => {
        dispatch(resetChannelState());
      }, 2000);
    }
  }, [success, dispatch]);

  // Handle update success
  useEffect(() => {
    if (updateSuccess) {
      setChannelName("");
      setChannelCode("");
      setPulseCode("");
      setStatus("active");
      dispatch(getAllChannels());
      dispatch(resetUpdateChannelState());
      if (onUpdateComplete) {
        onUpdateComplete();
      }
    }
  }, [updateSuccess, dispatch, onUpdateComplete]);

  const handleSubmit = async () => {
    if (!channelName.trim()) return;

    try {
      if (isUpdateMode && updateId) {
        // Update existing channel - send name, code, legacyCode, and status
        await dispatch(
          updateChannel({
            id: updateId,
            data: {
              name: channelName.trim(),
              code: channelCode.trim() || "",
              legacyCode: "",
              isActive: status === "active",
            },
          })
        ).unwrap();
      } else {
        // Create new channel - validate pulse code and send all fields
        if (!generatedPrefix) {
          console.error("Pulse code not generated yet");
          return;
        }

        await dispatch(
          createChannel({
            name: channelName.trim(),
            pulseCode: generatedPrefix,
            code: channelCode.trim() || "",
            isActive: status === "active",
          })
        ).unwrap();
      }
    } catch (err: any) {
      console.error(`Failed to ${isUpdateMode ? "update" : "create"} channel:`, err);
    }
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
            <h2 className="t-h2">{isUpdateMode ? "Update Channel" : "Add Channels"}</h2>
            <p className="t-sm text-[var(--subheading-color)] mt-1">
              {isUpdateMode
                ? "Update the channel information below"
                : "Unlock the potential of your candidates"}
            </p>
          </div>

          {/* Add/Update Channel Form */}
          <div className="flex gap-6 items-end">
            {/* Input Fields Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 flex-1">
              {/* Pulse Code - Read-only, show only in create mode or when data exists */}
              {(!isUpdateMode || pulseCode) && (
                <FormInput
                  label="Pulse Code"
                  name="pulseCode"
                  type="text"
                  value={isUpdateMode ? pulseCode : generatedPrefix || ""}
                  onChange={() => {}}
                  placeholder={prefixLoading ? "Generating..." : "CH_000001"}
                  readOnly
                />
              )}

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

              {/* Channel Code */}
              <FormInput
                label="Prefix"
                name="channelCode"
                type="text"
                value={channelCode}
                onChange={setChannelCode}
                placeholder="e.g. KEY"
                required
              />

              {/* Status - Show in both modes */}
              <div className="flex flex-col gap-2">
                <label className="t-label">Status</label>
                <StatusToggle
                  status={status === "active" ? "Active" : "Inactive"}
                  onChange={(newStatus) =>
                    setStatus(newStatus.toLowerCase() as "active" | "inactive")
                  }
                />
              </div>
            </div>

            {/* Add/Update Button */}
            <Button
              onClick={handleSubmit}
              disabled={!channelName.trim() || (isUpdateMode ? updateLoading : loading)}
              variant="primary"
              size="lg"
              icon={Plus}
              loading={isUpdateMode ? updateLoading : loading}
              className="h-12 px-8"
            >
              {isUpdateMode
                ? updateLoading
                  ? "Updating..."
                  : "Update Channel"
                : loading
                  ? "Adding..."
                  : "Add to list"}
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
                        <p className="t-cap">Code</p>
                        <p className="t-label-b">{channel.code}</p>
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
