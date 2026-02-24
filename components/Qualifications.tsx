"use client";

import React, { useState, useEffect } from "react";
import { EditIcon, Plus } from "lucide-react";
import { FormInput, FormSelect, StatusToggle } from "@/components/form";
import { Button } from "@/components/ui/button/button";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  createQualification,
  resetQualificationState,
} from "@/store/slices/qualification/createQualificationSlice";
import { getAllQualifications } from "@/store/slices/qualification/getAllQualificationsSlice";
import {
  updateQualification,
  resetUpdateQualificationState,
} from "@/store/slices/qualification/updateQualificationSlice";
import { getQualificationById } from "@/store/slices/qualification/getQualificationByIdSlice";
import {
  generatePrefix,
  resetGeneratePrefixState,
} from "@/store/slices/preFix/generatePrefixSlice";
import { qualificationCreationSchema } from "@/validations/qualificationValidation";

interface QualificationsCardProps {
  updateId?: string | null;
  onUpdateComplete?: () => void;
}

export default function AddQualificationsCard({
  updateId = null,
  onUpdateComplete,
}: QualificationsCardProps) {
  const dispatch = useAppDispatch();
  const { loading, success, error, message } = useAppSelector((state) => state.createQualification);
  const {
    loading: updateLoading,
    success: updateSuccess,
    error: updateError,
    message: updateMessage,
  } = useAppSelector((state) => state.updateQualification);
  const { qualification: qualificationData } = useAppSelector((state) => state.qualificationById);
  const {
    generatedPrefix,
    loading: prefixLoading,
    error: prefixError,
  } = useAppSelector((state) => state.generatePrefix);

  const [qualificationName, setQualificationName] = useState("");
  const [pulseCode, setPulseCode] = useState("");
  const [status, setStatus] = useState<"active" | "inactive">("active");
  const [validationErrors, setValidationErrors] = useState<{
    name?: string;
    pulseCode?: string;
    status?: string;
  }>({});
  const isUpdateMode = !!updateId;

  // Fetch qualification data by ID when in update mode
  useEffect(() => {
    if (isUpdateMode && updateId) {
      dispatch(getQualificationById(updateId));
    }
  }, [dispatch, isUpdateMode, updateId]);

  // Generate prefix only when not in update mode
  useEffect(() => {
    if (!isUpdateMode) {
      dispatch(generatePrefix({ entity: "Qualification" }));
    }

    return () => {
      dispatch(resetGeneratePrefixState());
    };
  }, [dispatch, isUpdateMode]);

  // Populate form when qualification data is loaded in update mode
  useEffect(() => {
    if (isUpdateMode && qualificationData) {
      setQualificationName(qualificationData.name || "");
      setPulseCode(qualificationData.pulseCode || "");
      setStatus(qualificationData.status || "active");
    }
  }, [isUpdateMode, qualificationData]);

  // Handle create success
  useEffect(() => {
    if (success) {
      setQualificationName("");
      setPulseCode("");
      setStatus("active");
      setValidationErrors({});
      dispatch(getAllQualifications());
      dispatch(generatePrefix({ entity: "Qualification" }));
      setTimeout(() => {
        dispatch(resetQualificationState());
      }, 2000);
    }
  }, [success, dispatch]);

  // Handle update success
  useEffect(() => {
    if (updateSuccess) {
      setQualificationName("");
      setPulseCode("");
      setValidationErrors({});
      setStatus("active");
      dispatch(getAllQualifications());
      dispatch(resetUpdateQualificationState());
      if (onUpdateComplete) {
        onUpdateComplete();
      }
    }
  }, [updateSuccess, dispatch, onUpdateComplete]);

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

  const validateForm = (pulseCodeToValidate: string) => {
    try {
      qualificationCreationSchema.parse({
        name: qualificationName,
        pulseCode: pulseCodeToValidate,
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

  const handleSubmit = async () => {
    // Only validate pulse code in create mode
    if (!isUpdateMode) {
      if (!generatedPrefix) {
        setValidationErrors({ pulseCode: "Pulse code is missing. Please wait or try again." });
        return;
      }

      // Validate form with pulse code for creation
      if (!validateForm(generatedPrefix)) {
        return;
      }
    } else {
      // In update mode, validate without pulse code
      try {
        qualificationCreationSchema.omit({ pulseCode: true }).parse({
          name: qualificationName,
          status: status,
        });
        setValidationErrors({});
      } catch (error: any) {
        const errors: typeof validationErrors = {};
        if (error.errors) {
          error.errors.forEach((err: any) => {
            const field = err.path[0];
            errors[field as keyof typeof errors] = err.message;
          });
        }
        setValidationErrors(errors);
        return;
      }
    }

    try {
      if (isUpdateMode && updateId) {
        // Update existing qualification - only send name and status
        await dispatch(
          updateQualification({
            id: updateId,
            data: {
              name: qualificationName.trim(),
              status,
            },
          })
        ).unwrap();
      } else {
        // Create new qualification - send all fields including pulseCode
        await dispatch(
          createQualification({
            name: qualificationName.trim(),
            pulseCode: generatedPrefix!,
            status,
          })
        ).unwrap();
      }
    } catch (err: any) {
      console.error(`Failed to ${isUpdateMode ? "update" : "create"} qualification:`, err);
      const errorMessage =
        err?.message ||
        err?.error ||
        `Failed to ${isUpdateMode ? "update" : "create"} qualification`;
      setValidationErrors({ name: errorMessage });
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
            <h2 className="t-h2">{isUpdateMode ? "Update Qualification" : "Add Qualifications"}</h2>
            <p className="t-sm text-[var(--subheading-color)] mt-1">
              {isUpdateMode
                ? "Update the qualification information below"
                : "Manage doctor qualifications and certifications"}
            </p>
          </div>

          {/* Add/Update Qualification Form */}
          <div className="flex gap-6 items-start">
            {/* Input Fields Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
              {/* Pulse Code - Read-only in both modes */}
              <FormInput
                label="Pulse Code"
                name="pulseCode"
                type="text"
                value={isUpdateMode ? pulseCode : generatedPrefix || ""}
                onChange={() => {}}
                placeholder={prefixLoading ? "Generating..." : "Auto-generated"}
                readOnly
                required
                error={validationErrors.pulseCode}
              />

              {/* Qualification Name */}
              <FormInput
                label="Qualification Name"
                name="qualificationName"
                type="text"
                value={qualificationName}
                onChange={handleQualificationNameChange}
                placeholder="Enter qualification name"
                required
                error={validationErrors.name}
              />

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

            {/* Add/Update Button */}
            <Button
              onClick={handleSubmit}
              disabled={
                (isUpdateMode ? updateLoading : loading) ||
                !qualificationName.trim() ||
                (isUpdateMode ? !pulseCode : !generatedPrefix)
              }
              variant="primary"
              size="lg"
              icon={isUpdateMode ? EditIcon : Plus}
              loading={isUpdateMode ? updateLoading : loading}
              className="h-12 px-8 mt-6"
            >
              {isUpdateMode
                ? updateLoading
                  ? "Updating..."
                  : "Update Qualification"
                : loading
                  ? "Adding..."
                  : "Add Qualification"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
