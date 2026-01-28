"use client";

import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { FormInput, FormSelect } from "@/components/form";
import { Button } from "@/components/ui/button/button";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  createQualification,
  resetQualificationState,
} from "@/store/slices/qualification/createQualificationSlice";
import { getAllQualifications } from "@/store/slices/qualification/getAllQualificationsSlice";
import {
  generatePrefix,
  resetGeneratePrefixState,
} from "@/store/slices/preFix/generatePrefixSlice";
import { qualificationCreationSchema } from "@/validations/qualificationValidation";
import { toast } from "sonner";

export default function AddQualificationsCard() {
  const dispatch = useAppDispatch();
  const { loading, success, error, message } = useAppSelector((state) => state.createQualification);
  const {
    generatedPrefix,
    loading: prefixLoading,
    error: prefixError,
  } = useAppSelector((state) => state.generatePrefix);

  const [qualificationName, setQualificationName] = useState("");
  const [status, setStatus] = useState<"active" | "inactive">("active");
  const [validationErrors, setValidationErrors] = useState<{
    name?: string;
    pulseCode?: string;
    status?: string;
  }>({});

  // Generate prefix on mount
  useEffect(() => {
    dispatch(generatePrefix({ entity: "Qualification" }));

    return () => {
      dispatch(resetGeneratePrefixState());
    };
  }, [dispatch]);

  // Handle success
  useEffect(() => {
    if (success && message) {
      setQualificationName("");
      setStatus("active");
      setValidationErrors({});
      dispatch(getAllQualifications());
      dispatch(generatePrefix({ entity: "Qualification" }));
      setTimeout(() => {
        dispatch(resetQualificationState());
      }, 2000);
    }
  }, [success, message, dispatch]);

  // Validate using Zod schema with real-time field validation
  const validateField = (fieldName: "name" | "pulseCode" | "status", value: any) => {
    try {
      if (fieldName === "name") {
        qualificationCreationSchema.shape.name.parse(value);
      } else if (fieldName === "status") {
        qualificationCreationSchema.shape.status.parse(value);
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

  // Handle qualification name change with real-time validation
  const handleQualificationNameChange = (value: string) => {
    setQualificationName(value);
    validateField("name", value);
  };

  const validateForm = () => {
    try {
      qualificationCreationSchema.parse({
        name: qualificationName,
        pulseCode: generatedPrefix || "",
        status,
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

  const handleAddQualification = async () => {
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
        createQualification({
          name: qualificationName.trim(),
          pulseCode: generatedPrefix,
          status,
        })
      ).unwrap();
    } catch (err) {
      // Error is handled by useEffect
      console.error("Failed to create qualification:", err);
    }
  };

  const statusOptions = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
  ];

  return (
    <div className="w-full">
      <div className="bg-[var(--background)] rounded-8 shadow-soft border border-[var(--gray-1)] overflow-hidden">
        <div className="px-8 py-10 space-y-8">
          {/* Header */}
          <div>
            <h2 className="t-h2">Add Qualifications</h2>
            <p className="t-sm text-[var(--subheading-color)] mt-1">
              Manage doctor qualifications and certifications
            </p>
          </div>

          {/* Add New Qualification Form */}
          <div className="flex gap-6 items-start">
            {/* Input Fields Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
              {/* Pulse Code */}
              <FormInput
                label="Pulse Code"
                name="pulseCode"
                type="text"
                value={generatedPrefix || ""}
                onChange={() => {}} // Read-only, no-op
                placeholder={prefixLoading ? "Generating..." : "QF_000001"}
                readOnly
                required
              />

              {/* Qualification Name */}
              <FormInput
                label="Qualification Name"
                name="qualificationName"
                type="text"
                value={qualificationName}
                onChange={handleQualificationNameChange}
                placeholder="e.g. MBBS, MD, MS, DNB"
                required
                error={validationErrors.name}
              />

              {/* Status */}
              <FormSelect
                label="Status"
                name="status"
                value={status}
                onChange={(value) => setStatus(value as "active" | "inactive")}
                options={statusOptions}
                required
                error={validationErrors.status}
              />
            </div>

            {/* Add Button */}
            <Button
              onClick={handleAddQualification}
              disabled={loading || !qualificationName.trim() || !generatedPrefix}
              variant="primary"
              size="lg"
              icon={Plus}
              loading={loading}
              className="h-12 px-8 mt-6"
            >
              {loading ? "Adding..." : "Add Qualification"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
