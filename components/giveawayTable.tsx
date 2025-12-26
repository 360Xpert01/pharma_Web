"use client";

import React, { useState, useEffect, useRef } from "react";
import { MoreVertical } from "lucide-react";
import TableColumnHeader from "@/components/TableColumnHeader";
import { useAppDispatch, useAppSelector } from "@/store";
import { getAllGiveaways, resetGiveawaysState } from "@/store/slices/giveaway/getAllGiveawaysSlice";

export default function GiveawayTable() {
  const dispatch = useAppDispatch();
  const hasFetched = useRef(false);
  const [openId, setOpenId] = useState<string | null>(null);

  // Redux state
  const { giveaways, loading, error } = useAppSelector((state) => state.allGiveaways);

  // Fetch giveaways on mount (prevent double call)
  useEffect(() => {
    if (!hasFetched.current) {
      dispatch(getAllGiveaways());
      hasFetched.current = true;
    }

    return () => {
      // Don't reset state on unmount to preserve data when navigating
      // dispatch(resetGiveawaysState());
    };
  }, [dispatch]);

  // Define columns for the table header
  const giveawayColumns = [
    { label: "Pulse Code", className: "flex-1" },
    { label: "Name", className: "flex-1" },
    { label: "Category", className: "flex-1" },
    { label: "Product Name", className: "flex-1" },
    { label: "Units", className: "w-24" },
    { label: "", className: "w-12" }, // Actions
  ];

  return (
    <div className="w-full overflow-hidden">
      <div className="px-3">
        <TableColumnHeader
          columns={giveawayColumns}
          containerClassName="flex text-sm font-medium gap-4"
        />
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading giveaways...</div>
      ) : error ? (
        <div className="text-center py-12 text-red-500">{error}</div>
      ) : giveaways.length === 0 ? (
        <div className="text-center py-12 text-gray-500">No giveaways found</div>
      ) : (
        giveaways.map((item) => (
          <div
            key={item.id}
            className="px-3 py-1 hover:bg-gray-50 transition-colors flex items-center"
          >
            <div className="w-full bg-white rounded-lg p-4 shadow-sm">
              {/* Perfectly Equal Columns using flex */}
              <div className="flex items-center text-sm font-medium gap-4">
                {/* Pulse Code */}
                <div className="flex-1 font-bold text-gray-600 font-mono">
                  {item.pulseCode || "N/A"}
                </div>

                {/* Name */}
                <div className="flex-1 font-semibold text-gray-900">{item.name}</div>

                {/* Category */}
                <div className="flex-1 font-medium text-gray-600">{item.category}</div>

                {/* Product Name */}
                <div className="flex-1 font-medium text-gray-400">{item.productName}</div>

                {/* Units */}
                <div className="w-24 font-medium text-gray-600">{item.units}</div>

                {/* More Options */}
                <div className="w-12 flex justify-end flex-shrink-0">
                  <div className="relative">
                    <button
                      onClick={() => setOpenId(openId === item.id ? null : item.id)}
                      className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition cursor-pointer"
                    >
                      <MoreVertical className="w-5 h-5" />
                    </button>

                    {openId === item.id && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setOpenId(null)} />
                        <div className="absolute right-0 top-10 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                          <div className="py-1">
                            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                              Edit
                            </button>
                            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                              View Details
                            </button>
                            <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 cursor-pointer">
                              Delete
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
