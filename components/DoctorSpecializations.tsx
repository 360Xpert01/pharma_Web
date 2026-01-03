"use client";

import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/index";
import {
  createSpecialization,
  resetSpecializationState,
} from "@/store/slices/specialization/createSpecializationSlice";
import { getAllSpecializations } from "@/store/slices/specialization/getAllSpecializationsSlice";
import {
  generatePrefix,
  resetGeneratePrefixState,
} from "@/store/slices/preFix/generatePrefixSlice";
import { FormInput } from "@/components/form";
import { Button } from "@/components/ui/button/button";

export default function AddSpecializationsCard() {
  const dispatch = useAppDispatch();
  const { loading, success, error, message } = useAppSelector(
    (state) => state.createSpecialization
  );
  const {
    generatedPrefix,
    loading: prefixLoading,
    error: prefixError,
  } = useAppSelector((state) => state.generatePrefix);

  const [specializationName, setSpecializationName] = useState("");

  // Generate prefix on mount
  useEffect(() => {
    dispatch(generatePrefix({ entity: "Specialization" }));

    return () => {
      dispatch(resetGeneratePrefixState());
    };
  }, [dispatch]);

  // Reset state and refresh specializations list on success
  useEffect(() => {
    if (success) {
      // Clear form
      setSpecializationName("");

      // Refresh specializations list
      dispatch(getAllSpecializations());

      // Regenerate prefix for next specialization
      dispatch(generatePrefix({ entity: "Specialization" }));

      // Reset state after a delay
      setTimeout(() => {
        dispatch(resetSpecializationState());
      }, 3000);
    }
  }, [success, dispatch]);

  const handleAddSpecialization = async () => {
    if (!specializationName.trim()) return;

    // Validate pulse code is generated
    if (!generatedPrefix) {
      console.error("Pulse code not generated yet");
      return;
    }

    const specializationData = {
      name: specializationName.trim(),
      pulseCode: generatedPrefix,
      isActive: true,
    };

    // Dispatch to API
    dispatch(createSpecialization(specializationData));
  };

  return (
    <div className="w-full">
      <div className="bg-[var(--background)] rounded-8 shadow-soft border border-[var(--gray-1)] overflow-hidden">
        <div className="px-8 py-10 space-y-8">
          {/* Header */}
          <div>
            <h2 className="t-h2">Add Doctor Specializations</h2>
            <p className="t-sm mt-1">Manage doctor specializations for your organization</p>
          </div>

          {/* Add New Specialization Form */}
          <div className="flex gap-6 items-end">
            {/* Input Fields Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
              {/* Pulse Code */}
              <FormInput
                label="Pulse Code"
                name="pulseCode"
                type="text"
                value={generatedPrefix || ""}
                onChange={() => {}}
                placeholder={prefixLoading ? "Generating..." : "SP_000001"}
                readOnly
                required
              />

              {/* Specialization Name */}
              <FormInput
                label="Specialization Name"
                name="specializationName"
                type="text"
                value={specializationName}
                onChange={setSpecializationName}
                placeholder="e.g. Cardiologist"
                required
              />
            </div>

            {/* Add Button */}
            <Button
              onClick={handleAddSpecialization}
              disabled={!specializationName.trim() || loading}
              variant="primary"
              size="lg"
              icon={Plus}
              loading={loading}
              className="h-12 px-8"
            >
              {loading ? "Adding..." : "Add to list"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
