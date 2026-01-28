"use client";

import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { FormInput, StatusToggle } from "@/components/form";
import { Button } from "@/components/ui/button/button";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  createSpecialization,
  resetSpecializationState,
} from "@/store/slices/specialization/createSpecializationSlice";
import { getAllSpecializations } from "@/store/slices/specialization/getAllSpecializationsSlice";
import {
  generatePrefix,
  resetGeneratePrefixState,
} from "@/store/slices/preFix/generatePrefixSlice";
import { specializationCreationSchema } from "@/validations/specializationValidation";
import { toast } from "sonner";

export default function AddSpecialitiesCard() {
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
  const [validationErrors, setValidationErrors] = useState<{
    name?: string;
    pulseCode?: string;
    status?: string;
  }>({});
  const [status, setStatus] = useState<"active" | "inactive">("active");

  // Generate prefix on mount
  useEffect(() => {
    dispatch(generatePrefix({ entity: "DoctorSpecialization" }));

    return () => {
      dispatch(resetGeneratePrefixState());
    };
  }, [dispatch]);

  // Handle success
  useEffect(() => {
    if (success && message) {
      setSpecializationName("");
      setValidationErrors({});
      setStatus("active");
      dispatch(getAllSpecializations());
      dispatch(generatePrefix({ entity: "DoctorSpecialization" }));
      setTimeout(() => {
        dispatch(resetSpecializationState());
      }, 2000);
    }
  }, [success, message, dispatch]);

  // Validate using Zod schema with real-time field validation
  const validateField = (fieldName: "name" | "pulseCode" | "status", value: any) => {
    try {
      if (fieldName === "name") {
        specializationCreationSchema.shape.name.parse(value);
      } else if (fieldName === "status") {
        specializationCreationSchema.shape.status.parse(value);
      }
      setValidationErrors((prev) => {
        const { [fieldName]: _, ...rest } = prev;
        return rest;
      });
    } catch (error: any) {
      if (error.errors && error.errors[0]) {
        setValidationErrors((prev) => ({
          ...prev,
          [fieldName]: error.errors[0].message,
        }));
      }
    }
  };

  // Handle specialization name change with real-time validation
  const handleSpecializationNameChange = (value: string) => {
    setSpecializationName(value);
    validateField("name", value);
  };

  // No legacy code

  // Validate entire form before submission
  const validateForm = () => {
    try {
      specializationCreationSchema.parse({
        name: specializationName,
        pulseCode: generatedPrefix || "",
        status: status,
      });
      setValidationErrors({});
      return true;
    } catch (error: any) {
      const errors: typeof validationErrors = {};
      if (error.errors) {
        error.errors.forEach((err: any) => {
          const field = err.path[0];
          errors[field as keyof typeof errors] = err.message;
        });
      }
      setValidationErrors(errors);
      return false;
    }
  };

  const handleAddSpecialization = async () => {
    // Validate pulse code is generated
    if (!generatedPrefix) {
      toast.error("Pulse code is still being generated. Please wait.");
      return;
    }

    // Validate form
    if (!validateForm()) {
      toast.error("Please fix the validation errors");
      return;
    }

    try {
      await dispatch(
        createSpecialization({
          name: specializationName.trim(),
          pulseCode: generatedPrefix,
          status: status,
        })
      ).unwrap();
    } catch (err) {
      console.error("Failed to create specialization:", err);
    }
  };

  return (
    <div className="w-full">
      <div className="bg-[var(--background)] rounded-8 shadow-soft border border-[var(--gray-1)] overflow-hidden">
        <div className="px-8 py-10 space-y-8">
          {/* Header */}
          <div>
            <h2 className="t-h2">Add Specialities</h2>
            <p className="t-sm text-[var(--subheading-color)] mt-1">
              Manage medical specialities and subspecialities
            </p>
          </div>

          {/* Add New Speciality Form */}
          <div className="flex gap-6 items-start">
            {/* Input Fields Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
              {/* Pulse Code */}
              <FormInput
                label="Pulse Code"
                name="pulseCode"
                type="text"
                value={generatedPrefix || ""}
                onChange={() => {}}
                placeholder={prefixLoading ? "Generating..." : "DS_000001"}
                readOnly
                required
              />

              {/* Speciality Name */}
              <FormInput
                label="Speciality Name"
                name="specializationName"
                type="text"
                value={specializationName}
                onChange={handleSpecializationNameChange}
                placeholder="e.g. Cardiology, Neurology, Orthopedics"
                required
                error={validationErrors.name}
              />

              {/* Status Toggle */}
              <div className="flex flex-col gap-1">
                <label className="t-label mb-1">Status</label>
                <StatusToggle
                  status={status === "active" ? "Active" : "Inactive"}
                  onChange={(newStatus) =>
                    setStatus(newStatus === "Active" ? "active" : "inactive")
                  }
                />
              </div>
            </div>

            {/* Add Button */}
            <Button
              onClick={handleAddSpecialization}
              disabled={loading || !specializationName.trim() || !generatedPrefix}
              variant="primary"
              size="lg"
              icon={Plus}
              loading={loading}
              className="h-12 px-8 mt-6"
            >
              {loading ? "Adding..." : "Add Specialization"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
