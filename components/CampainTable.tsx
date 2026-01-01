"use client";

import React, { useState, useEffect } from "react";
import { MoreVertical } from "lucide-react";
import TableColumnHeader from "@/components/TableColumnHeader";
import TableLoadingState from "@/components/shared/table/TableLoadingState";
import TableErrorState from "@/components/shared/table/TableErrorState";
import TableEmptyState from "@/components/shared/table/TableEmptyState";
import { useAppDispatch, useAppSelector } from "@/store";
import { getAllTeams } from "@/store/slices/team/getAllTeamsSlice";

export default function CampaignsTable() {
  const dispatch = useAppDispatch();
  const { teams, loading, error } = useAppSelector((state) => state.allTeams);

  // Har row ka apna dropdown state
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(getAllTeams());
  }, [dispatch]);

  const handleToggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  // Table header columns
  const campaignColumns = [
    { label: "Pulse Code", className: "col-span-2" },
    { label: "Name", className: "col-span-2" },
    { label: "Channel", className: "col-span-2" },
    { label: "Call Point", className: "col-span-2" },
    { label: "Assigned", className: "col-span-1" },
    { label: "Status", className: "col-span-3 ml-24" },
    { label: "", className: "col-span-1" },
  ];

  const handleRetry = () => {
    dispatch(getAllTeams());
  };

  // Loading state
  if (loading) {
    return (
      <div className="w-full overflow-hidden bg-(--background)">
        <div className="px-3">
          <TableColumnHeader columns={campaignColumns} gridCols={12} />
        </div>
        <div className="px-3">
          <TableLoadingState variant="skeleton" rows={5} columns={7} message="Loading teams..." />
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="w-full overflow-hidden bg-(--background)">
        <div className="px-3">
          <TableColumnHeader columns={campaignColumns} gridCols={12} />
        </div>
        <TableErrorState error={error} onRetry={handleRetry} title="Failed to load teams" />
      </div>
    );
  }

  // Empty state
  if (!teams || teams.length === 0) {
    return (
      <div className="w-full overflow-hidden bg-(--background)">
        <div className="px-3">
          <TableColumnHeader columns={campaignColumns} gridCols={12} />
        </div>
        <TableEmptyState
          message="No teams found"
          description="There are currently no teams in the system."
        />
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden  bg-(--background)">
      {/* Header */}
      <div className="px-3">
        <TableColumnHeader columns={campaignColumns} gridCols={12} />
      </div>

      {/* Rows */}
      <div>
        {teams.map((team) => (
          <div
            key={team.id}
            className="px-3 py-1 hover:bg-[var(--gray-0)] transition-colors duration-200 relative"
            onClick={() => setOpenId(null)}
          >
            {/* Grid with all columns including actions */}
            <div className="rounded-md p-2 border border-[var(--gray-2)] grid grid-cols-12 gap-3 text-sm">
              {/* Pulse Code */}
              <div className="col-span-2 font-semibold text-[var(--gray-9)]">
                {team.pulseCode || "N/A"}
              </div>
              {/* Name */}
              <div className="col-span-2 font-semibold">{team.name}</div>

              {/* Channel */}
              <div className="col-span-2 font-semibold">{team.channelName || "N/A"}</div>

              {/* Call Point */}
              <div className="col-span-2 font-semibold">{team.callPointName || "N/A"}</div>

              {/* Assigned Users */}
              <div className="col-span-1 flex items-center">
                {team.users && team.users.length > 0 ? (
                  <div className="flex -space-x-2">
                    {team.users.slice(0, 3).map((user, idx) => (
                      <div
                        key={user.id}
                        className="w-7 h-7 rounded-full border-2 border-[var(--light)] overflow-hidden ring-2 ring-[var(--gray-1)]"
                      >
                        <img
                          src={
                            user.profilePicture ||
                            `https://ui-avatars.com/api/?name=User+${idx + 1}`
                          }
                          alt={`User ${idx + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = `https://ui-avatars.com/api/?name=User+${idx + 1}`;
                          }}
                        />
                      </div>
                    ))}
                    {team.users.length > 3 && (
                      <div className="w-7 h-7 rounded-full border-2 border-[var(--light)] flex items-center justify-center text-xs font-medium text-[var(--gray-5)] ring-2 ring-[var(--gray-1)] bg-[var(--gray-1)]">
                        +{team.users.length - 3}
                      </div>
                    )}
                  </div>
                ) : (
                  <span className="text-xs text-center text-[var(--gray-4)]">N/A</span>
                )}
              </div>

              {/* Status */}
              <div className="col-span-2 flex items-center justify-center">
                <span
                  className={`px-4 min-w-[90px] text-center py-1 rounded-full text-sm font-medium ${
                    team.isActive
                      ? "bg-[var(--success)]/10 text-[var(--success)]"
                      : "bg-[var(--gray-1)] text-[var(--gray-5)]"
                  }`}
                >
                  {team.isActive ? "Active" : "Inactive"}
                </span>
              </div>

              {/* Actions - Inside grid */}
              <div
                className="col-span-1 flex items-center justify-end"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => handleToggle(team.id)}
                  className="p-2 text-[var(--gray-4)] hover:text-[var(--gray-6)] hover:bg-(--gray-1) rounded-md transition cursor-pointer"
                >
                  <MoreVertical className="w-5 h-5" />
                </button>

                {/* Dropdown */}
                {openId === team.id && (
                  <div className="absolute right-0 top-6 mt-2 w-48 rounded-lg shadow-soft border border-[var(--gray-2)] bg-[var(--light)] z-50">
                    <button
                      onClick={() => {
                        console.log("Edit", team.id);
                        setOpenId(null);
                      }}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-[var(--gray-1)] cursor-pointer transition"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => {
                        console.log("Duplicate", team.id);
                        setOpenId(null);
                      }}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-[var(--gray-1)] cursor-pointer transition"
                    >
                      Duplicate
                    </button>

                    <button
                      onClick={() => {
                        console.log("Delete", team.id);
                        setOpenId(null);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-[var(--destructive)] hover:bg-[var(--gray-1)] cursor-pointer transition"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
