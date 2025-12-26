"use client";

import React, { useEffect, useRef } from "react";
import { MoreVertical } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/index";
import { getAllCallPoints } from "@/store/slices/callPoint/getAllCallPointsSlice";
import TableColumnHeader from "@/components/TableColumnHeader";

export default function CallPointsList() {
  const dispatch = useAppDispatch();
  const { callPoints, loading, error } = useAppSelector((state) => state.allCallPoints);
  const hasFetched = useRef(false);

  // Fetch call points on component mount (prevent double call)
  useEffect(() => {
    if (!hasFetched.current) {
      dispatch(getAllCallPoints());
      hasFetched.current = true;
    }
  }, [dispatch]);

  // Define columns for the table header
  const callPointColumns = [
    { label: "Pulse Code", className: "flex-1 min-w-[200px]" },
    { label: "Location Title", className: "flex-1 min-w-[250px]" },
    { label: "Latitude", className: "flex-1" },
    { label: "Longitude", className: "flex-1" },
    { label: "", className: "w-10" }, // Empty for action button
  ];

  return (
    <div className="w-full mt-3 bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Call Points</h2>

        {/* Column Headers */}
        <TableColumnHeader
          columns={callPointColumns}
          containerClassName="flex items-center justify-between px-6 py-3"
          showBackground={false}
        />

        {/* List */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-8 text-gray-500">Loading call points...</div>
          ) : callPoints.length === 0 ? (
            <div className="text-center py-12 text-gray-500">No call points found.</div>
          ) : (
            callPoints.map((point) => (
              <div
                key={point.id}
                className="flex items-center justify-between p-6 bg-gray-50/50 rounded-2xl hover:bg-gray-100/70 transition-all duration-200 border border-gray-200"
              >
                {/* Pulse Code - First Column */}
                <div className="flex-1 min-w-[200px]">
                  <h3 className="font-semibold text-black text-base">{point.pulseCode || "N/A"}</h3>
                </div>

                {/* Name */}
                <div className="flex-1 min-w-[250px]">
                  <h3 className="font-semibold text-gray-900 text-lg">{point.name}</h3>
                </div>

                {/* Latitude */}
                <div className="flex-1 text-sm text-gray-600">
                  <span>{point.latitude}</span>
                </div>

                {/* Longitude */}
                <div className="flex-1 text-sm text-gray-600">
                  <span>{point.longitude}</span>
                </div>

                {/* More Options */}
                <button className="text-gray-400 hover:text-gray-700 transition ml-4 cursor-pointer">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
