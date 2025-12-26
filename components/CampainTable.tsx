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
    { label: "Products", className: "col-span-2 ml-6" },
    { label: "Assigned", className: "col-span-2 ml-[160px]" },
    { label: "Status", className: "col-span-1 ml-[80px]" },
    { label: "", className: "col-span-1 ml-6" },
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
            <p className="mt-4 text-gray-600">Loading teams...</p>
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
            <p className="text-red-600 font-medium">Error loading teams</p>
            <p className="text-gray-600 mt-2">{error}</p>
            <button
              onClick={() => dispatch(getAllTeams())}
              className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition cursor-pointer"
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
          <p className="text-gray-600">No teams found</p>
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
            className="px-3 py-1 hover:bg-gray-50 transition-colors duration-200 relative"
            onClick={() => setOpenId(null)}
          >
            {/* Grid with all columns including actions */}
            <div className="rounded-md p-2 border border-gray-200 grid grid-cols-12 gap-3 text-sm">
              {/* Name */}
              <div className="col-span-2 font-semibold text-font-semibold">{team.name}</div>

              {/* Channel */}
              <div className="col-span-2 font-semibold text-black">{team.channelName || "N/A"}</div>

              {/* Call Point */}
              <div className="col-span-2 font-semibold text-black">
                {team.callPointName || "N/A"}
              </div>

              {/* Products */}
              <div className="col-span-2">
                {team.products && team.products.length > 0 ? (
                  <>
                    <p className="font-bold mb-0">{team.products[0]?.name || ""}</p>
                    <div className="flex flex-wrap gap-1">
                      {team.products[0]?.skus?.slice(0, 3).map((sku, idx) => (
                        <span key={sku.id} className="text-gray-400 text-sm font-normal">
                          {sku.sku}
                        </span>
                      ))}
                      {team.products[0]?.skus && team.products[0].skus.length > 3 && (
                        <span className="text-gray-400 text-sm font-normal">
                          +{team.products[0].skus.length - 3} more
                        </span>
                      )}
                    </div>
                  </>
                ) : (
                  <span className="text-gray-400">No products</span>
                )}
              </div>

              {/* Assigned Users */}
              <div className="col-span-2 flex items-center ml-[150px]">
                {team.users && team.users.length > 0 ? (
                  <div className="flex -space-x-2">
                    {team.users.slice(0, 5).map((user, idx) => (
                      <div
                        key={user.id}
                        className="w-9 h-9 rounded-full border-2 border-white overflow-hidden ring-2 ring-gray-100"
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
                      <div className="w-9 h-9 rounded-full border-2 border-white flex items-center justify-center text-xs font-medium text-gray-600 ring-2 ring-gray-100 bg-gray-100">
                        +{team.users.length - 5}
                      </div>
                    )}
                  </div>
                ) : (
                  <span className="text-gray-400 text-sm">No users assigned</span>
                )}
              </div>

              {/* Status */}
              <div className="col-span-1 flex items-center justify-center ml-[100px]">
                <span
                  className={`px-4 min-w-[90px] text-center py-1 rounded-full text-sm font-medium ${
                    team.isActive ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {team.isActive ? "Active" : "Inactive"}
                </span>
              </div>

              {/* Actions - Inside grid */}
              <div
                className="col-span-1 flex items-center justify-center ml-6"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => handleToggle(team.id)}
                  className="text-gray-400 hover:text-gray-600 transition cursor-pointer"
                >
                  <MoreVertical className="w-5 h-5" />
                </button>

                {/* Dropdown */}
                {openId === team.id && (
                  <div className="absolute right-0 top-6 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <button
                      onClick={() => {
                        console.log("Edit", team.id);
                        setOpenId(null);
                      }}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => {
                        console.log("Duplicate", team.id);
                        setOpenId(null);
                      }}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                    >
                      Duplicate
                    </button>

                    <button
                      onClick={() => {
                        console.log("Delete", team.id);
                        setOpenId(null);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 cursor-pointer"
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
