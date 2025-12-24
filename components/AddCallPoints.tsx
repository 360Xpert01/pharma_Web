"use client";

import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/index";
import {
  createCallPoint,
  resetCallPointState,
} from "@/store/slices/callPoint/createCallPointSlice";
import { getAllCallPoints } from "@/store/slices/callPoint/getAllCallPointsSlice";
import {
  generatePrefix,
  resetGeneratePrefixState,
} from "@/store/slices/preFix/generatePrefixSlice";
import { fetchPrefixes } from "@/store/slices/preFix/allPreFixTable";

export default function AddCallPointForm() {
  const dispatch = useAppDispatch();
  const { loading, success } = useAppSelector((state) => state.createCallPoint);
  const {
    generatedPrefix,
    loading: prefixLoading,
    error: prefixError,
  } = useAppSelector((state) => state.generatePrefix);

  const [locationTitle, setLocationTitle] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  // Fetch prefixes and generate pulse code on mount
  useEffect(() => {
    const fetchAndGenerate = async () => {
      const result = await dispatch(fetchPrefixes());

      if (fetchPrefixes.fulfilled.match(result)) {
        const availableTables = result.payload.data.tables;

        // Find "CallPoint" table for call point pulse code
        if (availableTables && availableTables.includes("CallPoint")) {
          dispatch(generatePrefix({ entity: "CallPoint" }));
        }
      }
    };

    fetchAndGenerate();

    return () => {
      dispatch(resetGeneratePrefixState());
      dispatch(resetCallPointState());
    };
  }, [dispatch]);

  // Reset form on success
  useEffect(() => {
    if (success) {
      setLocationTitle("");
      setLatitude("");
      setLongitude("");

      // Refresh call points list
      dispatch(getAllCallPoints());

      // Regenerate pulse code for next entry
      dispatch(generatePrefix({ entity: "CallPoint" }));

      // Reset state after delay
      setTimeout(() => {
        dispatch(resetCallPointState());
      }, 3000);
    }
  }, [success, dispatch]);

  const handleSubmit = () => {
    if (!locationTitle.trim() || !latitude.trim() || !longitude.trim()) {
      return;
    }

    // Validate pulse code is generated
    if (!generatedPrefix) {
      console.error("Pulse code not generated yet");
      return;
    }

    const callPointData = {
      name: locationTitle.trim(),
      pulseCode: generatedPrefix, // Include pulse code in payload
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      legacyCode: "",
      isActive: true,
    };

    dispatch(createCallPoint(callPointData));
  };

  return (
    <div className="w-full">
      <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="px-8 py-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Add Call Point</h1>
            <p className="text-sm text-gray-500 mt-1">Unlock the potential of your candidates</p>
          </div>

          {/* Form Fields - Single Row with 4 columns + button */}
          <div className="flex items-end gap-6">
            {/* Pulse Code */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Pulse Code</label>
              <input
                type="text"
                value={generatedPrefix || ""}
                placeholder={prefixLoading ? "Generating..." : "PLS_CP_000001"}
                readOnly
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-700 cursor-not-allowed outline-none"
                title={prefixError || "Auto-generated pulse code (read-only)"}
              />
            </div>

            {/* Location Title */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Location Title</label>
              <input
                type="text"
                value={locationTitle}
                onChange={(e) => setLocationTitle(e.target.value)}
                placeholder="e.g 360Xpert Solution"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 placeholder-gray-400 text-sm"
              />
            </div>

            {/* Latitude */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Latitude</label>
              <input
                type="text"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                placeholder="e.g 24.924371"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 placeholder-gray-400 text-sm"
              />
            </div>

            {/* Longitude */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Longitude</label>
              <input
                type="text"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                placeholder="e.g 67.084682"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 placeholder-gray-400 text-sm"
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                onClick={handleSubmit}
                disabled={
                  !locationTitle.trim() ||
                  !latitude.trim() ||
                  !longitude.trim() ||
                  loading ||
                  prefixLoading
                }
                className="px-8 py-3 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all cursor-pointer text-sm"
              >
                {loading ? "Adding..." : "Add Call Point"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
