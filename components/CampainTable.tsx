"use client";

import React, { useState, useEffect } from "react";
import { MoreVertical } from "lucide-react";
import TableColumnHeader from "@/components/TableColumnHeader";
import { useAppDispatch, useAppSelector } from "@/store";
import { getAllTeams } from "@/store/slices/team/getAllTeamsSlice";
import { Button } from "@/components/ui/button/button";
import { Skeleton } from "@/components/ui/skeleton";
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

  // Loading state
  if (loading) {
    return (
      <div className="w-full overflow-hidden bg-white">
        <div className="px-3">
          <TableColumnHeader columns={campaignColumns} gridCols={12} />
        </div>
        <div className="px-3 space-y-1">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="py-1">
              <div className="rounded-md p-2 border border-[var(--gray-2)] grid grid-cols-12 gap-3">
                {/* Pulse Code Skeleton */}
                <div className="col-span-2 flex items-center">
                  <Skeleton className="h-5 w-20" />
                </div>
                {/* Name Skeleton */}
                <div className="col-span-2 flex items-center">
                  <Skeleton className="h-5 w-32" />
                </div>
                {/* Channel Skeleton */}
                <div className="col-span-2 flex items-center">
                  <Skeleton className="h-5 w-24" />
                </div>
                {/* Call Point Skeleton */}
                <div className="col-span-2 flex items-center">
                  <Skeleton className="h-5 w-28" />
                </div>
                {/* Assigned Users Skeleton */}
                <div className="col-span-1 flex items-center">
                  <div className="flex -space-x-2">
                    <Skeleton className="w-7 h-7 rounded-full" />
                    <Skeleton className="w-7 h-7 rounded-full" />
                    <Skeleton className="w-7 h-7 rounded-full" />
                  </div>
                </div>
                {/* Status Skeleton */}
                <div className="col-span-2 flex items-center justify-center">
                  <Skeleton className="h-6 w-20 rounded-full" />
                </div>
                {/* Action Button Skeleton */}
                <div className="col-span-1 flex items-center justify-end">
                  <Skeleton className="h-8 w-8 rounded-md" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="w-full overflow-hidden bg-white">
        <div className="px-3">
          <TableColumnHeader columns={campaignColumns} gridCols={12} />
        </div>
        <div className="flex items-center justify-center py-16">
          <div className="text-center max-w-md">
            <div className="mb-4">
              <svg
                className="mx-auto h-12 w-12 text-[var(--destructive)]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[var(--gray-9)] mb-2">Error Loading Teams</h3>
            <p className="text-[var(--gray-6)] mb-6">{error}</p>
            <Button
              onClick={() => dispatch(getAllTeams())}
              variant="primary"
              size="default"
              rounded="lg"
            >
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Empty state
  if (!teams || teams.length === 0) {
    return (
      <div className="w-full overflow-hidden bg-white">
        <div className="px-3">
          <TableColumnHeader columns={campaignColumns} gridCols={12} />
        </div>
        <div className="flex items-center justify-center py-16">
          <div className="text-center">
            <div className="mb-4">
              <svg
                className="mx-auto h-12 w-12 text-[var(--gray-4)]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[var(--gray-9)] mb-2">No Teams Found</h3>
            <p className="text-[var(--gray-6)]">Get started by creating your first team.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden  bg-white">
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
                <Button
                  onClick={() => handleToggle(team.id)}
                  variant="ghost"
                  size="icon"
                  className="text-[var(--gray-4)] hover:text-[var(--gray-6)]"
                >
                  <MoreVertical className="w-5 h-5" />
                </Button>

                {/* Dropdown */}
                {openId === team.id && (
                  <div className="absolute right-0 top-6 mt-2 w-48 rounded-lg shadow-lg border border-[var(--gray-2)] bg-[var(--light)] z-50">
                    <Button
                      onClick={() => {
                        console.log("Edit", team.id);
                        setOpenId(null);
                      }}
                      variant="ghost"
                      size="sm"
                      rounded="none"
                      fullWidth
                      className="justify-start hover:bg-[var(--gray-1)] rounded-none"
                    >
                      Edit
                    </Button>

                    <Button
                      onClick={() => {
                        console.log("Duplicate", team.id);
                        setOpenId(null);
                      }}
                      variant="ghost"
                      size="sm"
                      rounded="none"
                      fullWidth
                      className="justify-start hover:bg-[var(--gray-1)] rounded-none"
                    >
                      Duplicate
                    </Button>

                    <Button
                      onClick={() => {
                        console.log("Delete", team.id);
                        setOpenId(null);
                      }}
                      variant="ghost"
                      size="sm"
                      rounded="none"
                      fullWidth
                      className="justify-start text-[var(--destructive)] hover:bg-[var(--gray-1)] rounded-none"
                    >
                      Delete
                    </Button>
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
