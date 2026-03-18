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
import toast from "react-hot-toast";

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
      dispatch(getAllCallPoints({ pagination: true }));

      // Reset state after delay
      setTimeout(() => {
        dispatch(resetCallPointState());
      }, 3000);
    }
  }, [success, dispatch]);

  const handleSubmit = async () => {
    if (!locationTitle.trim() || !latitude.trim() || !longitude.trim()) {
      return;
    }

    const callPointData = {
      name: locationTitle.trim(),
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      legacyCode: "",
      isActive: true,
    };

    try {
      const result = await dispatch(createCallPoint(callPointData)).unwrap();

      // Yahan result = thunk ka returned payload (success case)
      toast.success("Call point created successfully!");
      // Optional: reset form, navigate, etc.
    } catch (rejectedValueOrError) {
      // Yahan rejectedValueOrError = thunk ke rejectWithValue() se jo bheja tha
      // toast.error(rejectedValueOrError?.message || "Something went wrong!");
    }
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
                value="TO BE GENERATED"
                onChange={() => {}}
                placeholder="Auto-generated"
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
                placeholder="Enter location title"
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
                placeholder="Enter latitude"
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
                placeholder="Enter longitude"
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
                loading={loading}
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
