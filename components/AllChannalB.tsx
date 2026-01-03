// components/ChannelsManager.tsx
"use client";

import React, { useState, useEffect } from "react";
import { MoreVertical } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/index";
import { getAllChannels } from "@/store/slices/channel/getAllChannelsSlice";
import TableColumnHeader from "@/components/TableColumnHeader";
import TableLoadingState from "@/components/shared/table/TableLoadingState";
import TableErrorState from "@/components/shared/table/TableErrorState";
import TableEmptyState from "@/components/shared/table/TableEmptyState";
import StatusToggle from "@/components/form/StatusToggle";

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

  const handleRetry = () => {
    dispatch(getAllChannels());
  };

  // Define columns for the table header - matching EmploySection/CampainTable pattern
  const channelColumns = [
    { label: "Pulse Code", className: "w-[35%] ml-3" },
    { label: "Channel Name", className: "w-[50%]" },
    { label: "Status", className: "w-[5%]" },
    { label: "", className: "w-[0%]" },
  ];

  return (
    <div className="w-full overflow-hidden bg-(--background)">
      {loading ? (
        <div className="px-4">
          <TableLoadingState
            variant="skeleton"
            rows={5}
            columns={3}
            message="Loading channels..."
          />
        </div>
      ) : error ? (
        <TableErrorState error={error} onRetry={handleRetry} title="Failed to load channels" />
      ) : channels.length === 0 ? (
        <TableEmptyState
          message="No channels found"
          description="There are currently no channels in the system."
        />
      ) : (
        <div>
          {/* Column Headers */}
          <TableColumnHeader
            columns={channelColumns}
            containerClassName="flex w-[80%]"
            showBackground={false}
          />

          {/* List */}
          <div>
            {channels.map((channel) => (
              <div
                key={channel.id}
                className="px-3 py-3 w-[98%] flex items-center gap-6 hover:bg-[var(--gray-0)] transition-all cursor-pointer border border-[var(--gray-2)] mx-4 my-3 rounded-8 bg-[var(--background)]"
              >
                {/* Pulse Code */}
                <div className="w-[30%] t-td-b truncate" title={channel.pulseCode}>
                  {channel.pulseCode}
                </div>

                {/* Channel Name */}
                <div className="w-[40%] t-td-b truncate" title={channel.name}>
                  {channel.name}
                </div>

                {/* Status Toggle */}
                <div className="w-[30%] flex items-center">
                  <StatusToggle
                    status={channel.isActive ? "Active" : "Inactive"}
                    onChange={(newStatus) => {
                      // TODO: Implement API call to update channel status
                      console.log("Toggle status for channel:", channel.id, newStatus);
                      toggleStatus(channel.id);
                    }}
                  />
                </div>

                {/* Actions */}
                <div className="w-[8%] flex items-center justify-end relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenMenuId(openMenuId === channel.id ? null : channel.id);
                    }}
                    className="p-2 text-[var(--gray-4)] hover:text-[var(--gray-6)] hover:bg-[var(--gray-1)] rounded-8 transition cursor-pointer"
                  >
                    <MoreVertical className="w-5 h-5" />
                  </button>

                  {openMenuId === channel.id && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setOpenMenuId(null)} />
                      <div className="absolute right-0 top-10 mt-2 w-48 bg-[var(--light)] rounded-8 shadow-soft border border-[var(--gray-2)] z-50">
                        <button className="w-full text-left px-4 py-2 t-td hover:bg-[var(--gray-1)] cursor-pointer transition">
                          Add New Campaign
                        </button>
                        <button className="w-full text-left px-4 py-2 t-td hover:bg-[var(--gray-1)] cursor-pointer transition">
                          Edit Channel
                        </button>
                        <button
                          onClick={() => deleteChannel(channel.id)}
                          className="w-full text-left px-4 py-2 t-td t-err hover:bg-[var(--gray-1)] cursor-pointer transition"
                        >
                          Delete Channel
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
