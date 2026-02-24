"use client";

import React, { useState, useEffect, useMemo } from "react";
import { EditIcon, Plus } from "lucide-react";
import { FormInput } from "@/components/form";
import { Button } from "@/components/ui/button/button";
import { useAppDispatch, useAppSelector } from "@/store";
import { createSegment, resetSegmentState } from "@/store/slices/segment/createSegmentSlice";
import { getAllSegments } from "@/store/slices/segment/getAllSegmentsSlice";
import { updateSegment, resetUpdateSegmentState } from "@/store/slices/segment/updateSegmentSlice";
import {
  generatePrefix,
  resetGeneratePrefixState,
} from "@/store/slices/preFix/generatePrefixSlice";
import { segmentCreationSchema } from "@/validations/segmentValidation";
import StatusToggle from "@/components/form/StatusToggle";

interface DoctorSegmentsCardProps {
  updateId?: string | null;
  onUpdateComplete?: () => void;
}

export default function AddDoctorSegmentsCard({
  updateId = null,
  onUpdateComplete,
}: DoctorSegmentsCardProps) {
  const dispatch = useAppDispatch();
  const { loading, success, error, message } = useAppSelector((state) => state.createSegment);
  const {
    loading: updateLoading,
    success: updateSuccess,
    error: updateError,
    message: updateMessage,
  } = useAppSelector((state) => state.updateSegment);
  const { segments } = useAppSelector((state) => state.allSegments);
  const {
    generatedPrefix,
    loading: prefixLoading,
    error: prefixError,
  } = useAppSelector((state) => state.generatePrefix);

  // Get segment data from allSegments store by updateId
  const segmentData = useMemo(() => {
    if (updateId && segments) {
      return segments.find((seg: any) => seg.id === updateId);
    }
    return null;
  }, [updateId, segments]);

  const [segmentName, setSegmentName] = useState("");
  const [pulseCode, setPulseCode] = useState("");
  const [validationErrors, setValidationErrors] = useState<{
    name?: string;
    pulseCode?: string;
    status?: string;
  }>({});
  const [status, setStatus] = useState<"active" | "inactive">("active");
  const isUpdateMode = !!updateId;

  // Generate prefix only when not in update mode
  useEffect(() => {
    if (!isUpdateMode) {
      dispatch(generatePrefix({ entity: "Segment" }));
    }

    return () => {
      dispatch(resetGeneratePrefixState());
    };
  }, [dispatch, isUpdateMode]);

  // Populate form when segment data is loaded in update mode
  useEffect(() => {
    if (isUpdateMode && segmentData) {
      console.log("Populating form with segment data:", segmentData);
      setSegmentName(segmentData.name || "");
      setPulseCode(segmentData.pulseCode || "");
      setStatus(segmentData.status || "active");
    }
  }, [isUpdateMode, segmentData]);

  // Handle create success
  useEffect(() => {
    if (success) {
      setSegmentName("");
      setPulseCode("");
      setValidationErrors({});
      setStatus("active");
      dispatch(getAllSegments());
      dispatch(generatePrefix({ entity: "Segment" }));
      setTimeout(() => {
        dispatch(resetSegmentState());
      }, 2000);
    }
  }, [success, dispatch]);

  // Handle update success
  useEffect(() => {
    if (updateSuccess) {
      setSegmentName("");
      setPulseCode("");
      setValidationErrors({});
      setStatus("active");
      dispatch(getAllSegments());
      dispatch(resetUpdateSegmentState());
      if (onUpdateComplete) {
        onUpdateComplete();
      }
    }
  }, [updateSuccess, dispatch, onUpdateComplete]);

  // Validate using Zod schema with real-time field validation
  const validateField = (fieldName: "name" | "pulseCode" | "status", value: any) => {
    try {
      if (fieldName === "name") {
        segmentCreationSchema.shape.name.parse(value);
      } else if (fieldName === "status") {
        segmentCreationSchema.shape.status.parse(value);
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

  // Handle segment name change with real-time validation
  const handleSegmentNameChange = (value: string) => {
    setSegmentName(value);
    validateField("name", value);
  };

  // No legacy code

  // Validate entire form before submission
  const validateForm = (pulseCodeToValidate: string) => {
    try {
      segmentCreationSchema.parse({
        name: segmentName,
        pulseCode: pulseCodeToValidate,
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
        segmentCreationSchema.omit({ pulseCode: true }).parse({
          name: segmentName,
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
        // Update existing segment - only send name and status
        await dispatch(
          updateSegment({
            id: updateId,
            data: {
              name: segmentName.trim(),
              status: status,
            },
          })
        ).unwrap();
      } else {
        // Create new segment - send all fields including pulseCode
        await dispatch(
          createSegment({
            name: segmentName.trim(),
            pulseCode: generatedPrefix!,
            status: status,
          })
        ).unwrap();
      }
    } catch (err: any) {
      console.error(`Failed to ${isUpdateMode ? "update" : "create"} segment:`, err);
      // Set error from API response if available
      const errorMessage =
        err?.message || err?.error || `Failed to ${isUpdateMode ? "update" : "create"} segment`;
      setValidationErrors({ name: errorMessage });
    }
  };

  return (
    <div className="w-full">
      <div className="bg-[var(--background)] rounded-8 shadow-soft border border-[var(--gray-1)] overflow-hidden">
        <div className="px-8 py-10 space-y-8">
          {/* Header */}
          <div>
            <h2 className="t-h2">{isUpdateMode ? "Update Segment" : "Add Segment"}</h2>
            <p className="t-sm text-[var(--subheading-color)] mt-1">
              {isUpdateMode
                ? "Update the segment information below"
                : "Manage segments (A/B/C) to categorize healthcare professionals"}
            </p>
          </div>

          {/* Add/Update Segment Form */}
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

              {/* Segment Name */}
              <FormInput
                label="Segment Name"
                name="segmentName"
                type="text"
                value={segmentName}
                onChange={handleSegmentNameChange}
                placeholder="Enter segment name"
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

            {/* Add/Update Button */}
            <Button
              onClick={handleSubmit}
              disabled={
                (isUpdateMode ? updateLoading : loading) ||
                !segmentName.trim() ||
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
                  : "Update Segment"
                : loading
                  ? "Adding..."
                  : "Add Segment"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
