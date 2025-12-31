"use client";

import React, { useState, useEffect } from "react";
import { MoreVertical } from "lucide-react";
import TableColumnHeader from "@/components/TableColumnHeader";
import { useAppDispatch, useAppSelector } from "@/store";
import { getAllTeams } from "@/store/slices/team/getAllTeamsSlice";
import type { TeamItem } from "@/store/slices/team/getAllTeamsSlice";

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
    { label: "Name", className: "col-span-2" },
    { label: "Channel", className: "col-span-2" },
    { label: "Call Point", className: "col-span-2" },
    { label: "Assigned", className: "col-span-2 ml-4" },
    { label: "Status", className: "col-span-2 ml-[100px]" },
    { label: "", className: "col-span-2" },
  ];

  // Loading state
  if (loading) {
    return (
      <div className="w-full overflow-hidden">
        <div className="px-3">
          <TableColumnHeader columns={campaignColumns} gridCols={12} />
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            <p className="mt-4 text-(--gray-6)">Loading teams...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="w-full overflow-hidden">
        <div className="px-3">
          <TableColumnHeader columns={campaignColumns} gridCols={12} />
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <p className="text-(--destructive) font-medium">Error loading teams</p>
            <p className="text-(--gray-6) mt-2">{error}</p>
            <button
              onClick={() => dispatch(getAllTeams())}
              className="mt-4 px-4 py-2 bg-primary text-(--light) rounded-md hover:bg-primary/90 transition cursor-pointer"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Empty state
  if (!teams || teams.length === 0) {
    return (
      <div className="w-full overflow-hidden">
        <div className="px-3">
          <TableColumnHeader columns={campaignColumns} gridCols={12} />
        </div>
        <div className="flex items-center justify-center py-12">
          <p className="text-(--gray-6)">No teams found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden">
      {/* Header */}
      <div className="px-3">
        <TableColumnHeader columns={campaignColumns} gridCols={12} />
      </div>

      {/* Rows */}
      <div>
        {teams.map((team) => (
          <div
            key={team.id}
            className="px-3 py-1 hover:bg-(--gray-0) transition-colors duration-200 relative"
            onClick={() => setOpenId(null)}
          >
            {/* Grid with all columns including actions */}
            <div className="rounded-md p-2 border border-(--gray-2) grid grid-cols-12 gap-3 text-sm">
              {/* Name */}
              <div className="col-span-2 font-semibold text-font-semibold">{team.name}</div>

              {/* Channel */}
              <div className="col-span-2 font-semibold text-(--dark)">
                {team.channelName || "N/A"}
              </div>

              {/* Call Point */}
              <div className="col-span-2 font-semibold text-(--dark)">
                {team.callPointName || "N/A"}
              </div>

              {/* Assigned Users */}
              <div className="col-span-2 flex items-center">
                {team.users && team.users.length > 0 ? (
                  <div className="flex -space-x-2">
                    {team.users.slice(0, 5).map((user, idx) => (
                      <div
                        key={user.id}
                        className="w-9 h-9 rounded-full border-2 border-(--light) overflow-hidden ring-2 ring-(--gray-1)"
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

                    {team.users.length > 5 && (
                      <div className="w-9 h-9 rounded-full border-2 border-(--light) flex items-center justify-center text-xs font-medium text-(--gray-6) ring-2 ring-(--gray-1) bg-(--gray-1)">
                        +{team.users.length - 5}
                      </div>
                    )}
                  </div>
                ) : (
                  <span className="text-(--gray-4) text-sm">No users assigned</span>
                )}
              </div>

              {/* Status */}
              <div className="col-span-2 flex items-center justify-center">
                <span
                  className={`px-4 min-w-[90px] text-center py-1 rounded-full text-sm font-medium ${
                    team.isActive
                      ? "bg-green-100 text-(--success)"
                      : "bg-(--gray-1) text-(--gray-6)"
                  }`}
                >
                  {team.isActive ? "Active" : "Inactive"}
                </span>
              </div>

              {/* Actions - Inside grid */}
              <div
                className="col-span-2 flex items-center justify-end"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => handleToggle(team.id)}
                  className="text-(--gray-4) hover:text-(--gray-6) transition cursor-pointer"
                >
                  <MoreVertical className="w-5 h-5" />
                </button>

                {/* Dropdown */}
                {openId === team.id && (
                  <div className="absolute right-0 top-6 mt-2 w-48 bg-(--background) rounded-lg shadow-lg border border-(--gray-2) z-50">
                    <button
                      onClick={() => {
                        console.log("Edit", team.id);
                        setOpenId(null);
                      }}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-(--gray-1) cursor-pointer"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => {
                        console.log("Duplicate", team.id);
                        setOpenId(null);
                      }}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-(--gray-1) cursor-pointer"
                    >
                      Duplicate
                    </button>

                    <button
                      onClick={() => {
                        console.log("Delete", team.id);
                        setOpenId(null);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-(--destructive) hover:bg-(--gray-1) cursor-pointer"
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
