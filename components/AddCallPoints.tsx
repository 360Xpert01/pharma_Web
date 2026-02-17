"use client";

import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
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
import { FormInput } from "@/components/form";
import { Button } from "@/components/ui/button/button";

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
    // 🔥 Always call generate for "CallPoint" entity
    // Call point forms create call points (business logic, not dynamic)
    // The /generate API is idempotent - handles existence automatically
    dispatch(generatePrefix({ entity: "CallPoint" }));

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
      <div className="bg-(--background) rounded-8 shadow-soft border border-(--gray-1) overflow-hidden">
        <div className="px-8 py-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-(--gray-9)">Add Call Point</h1>
            <p className="text-sm text-(--gray-5) mt-1">Unlock the potential of your candidates</p>
          </div>

          {/* Form Fields - Single Row with 4 columns + button */}
          <div className="flex items-end gap-6">
            {/* Pulse Code */}
            <div className="flex-1">
              <FormInput
                label="Pulse Code"
                name="pulseCode"
                type="text"
                value={generatedPrefix || ""}
                onChange={() => {}}
                placeholder={prefixLoading ? "Generating..." : "CP_000001"}
                readOnly
                error={prefixError || ""}
              />
            </div>

            {/* Location Title */}
            <div className="flex-1">
              <FormInput
                label="Location Title"
                name="locationTitle"
                type="text"
                value={locationTitle}
                onChange={setLocationTitle}
                placeholder="e.g 360Xpert Solution"
              />
            </div>

            {/* Latitude */}
            <div className="flex-1">
              <FormInput
                label="Latitude"
                name="latitude"
                type="text"
                value={latitude}
                onChange={setLatitude}
                placeholder="e.g 24.924371"
              />
            </div>

            {/* Longitude */}
            <div className="flex-1">
              <FormInput
                label="Longitude"
                name="longitude"
                type="text"
                value={longitude}
                onChange={setLongitude}
                placeholder="e.g 67.084682"
              />
            </div>

            {/* Submit Button */}
            <div>
              <Button
                variant="primary"
                size="lg"
                icon={Plus}
                rounded="full"
                onClick={handleSubmit}
                loading={loading || prefixLoading}
                disabled={!locationTitle.trim() || !latitude.trim() || !longitude.trim()}
              >
                {loading ? "Adding..." : "Add Call Point"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
