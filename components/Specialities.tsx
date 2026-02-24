"use client";

import React, { useState, useEffect } from "react";
import { EditIcon, Plus } from "lucide-react";
import { FormInput, StatusToggle } from "@/components/form";
import { Button } from "@/components/ui/button/button";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  createSpecialization,
  resetSpecializationState,
} from "@/store/slices/specialization/createSpecializationSlice";
import { getAllSpecializations } from "@/store/slices/specialization/getAllSpecializationsSlice";
import {
  updateDoctorSpecialization,
  resetUpdateDoctorSpecializationState,
} from "@/store/slices/specialization/updateDoctorSpecializationSlice";
import { getDoctorSpecializationById } from "@/store/slices/specialization/getDoctorSpecializationByIdSlice";
import {
  generatePrefix,
  resetGeneratePrefixState,
} from "@/store/slices/preFix/generatePrefixSlice";
import { specializationCreationSchema } from "@/validations/specializationValidation";

interface SpecialitiesCardProps {
  updateId?: string | null;
  onUpdateComplete?: () => void;
}

export default function AddSpecialitiesCard({
  updateId = null,
  onUpdateComplete,
}: SpecialitiesCardProps) {
  const dispatch = useAppDispatch();
  const { loading, success, error, message } = useAppSelector(
    (state) => state.createSpecialization
  );
  const {
    loading: updateLoading,
    success: updateSuccess,
    error: updateError,
    message: updateMessage,
  } = useAppSelector((state) => state.updateDoctorSpecialization);
  const { doctorSpecialization: specializationData } = useAppSelector(
    (state) => state.specializationById
  );
  const {
    generatedPrefix,
    loading: prefixLoading,
    error: prefixError,
  } = useAppSelector((state) => state.generatePrefix);

  const [specializationName, setSpecializationName] = useState("");
  const [pulseCode, setPulseCode] = useState("");
  const [validationErrors, setValidationErrors] = useState<{
    name?: string;
    pulseCode?: string;
    status?: string;
  }>({});
  const [status, setStatus] = useState<"active" | "inactive">("active");
  const isUpdateMode = !!updateId;

  // Fetch specialization data by ID when in update mode
  useEffect(() => {
    if (isUpdateMode && updateId) {
      dispatch(getDoctorSpecializationById(updateId));
    }
  }, [dispatch, isUpdateMode, updateId]);

  // Generate prefix only when not in update mode
  useEffect(() => {
    if (!isUpdateMode) {
      dispatch(generatePrefix({ entity: "Specialization" }));
    }

    return () => {
      dispatch(resetGeneratePrefixState());
    };
  }, [dispatch, isUpdateMode]);

  // Populate form when specialization data is loaded in update mode
  useEffect(() => {
    if (isUpdateMode && specializationData) {
      setSpecializationName(specializationData.name || "");
      setPulseCode(specializationData.pulseCode || "");
      setStatus(specializationData.status || "active");
    }
  }, [isUpdateMode, specializationData]);

  // Handle create success
  useEffect(() => {
    if (success) {
      setSpecializationName("");
      setPulseCode("");
      setValidationErrors({});
      setStatus("active");
      dispatch(getAllSpecializations());
      dispatch(generatePrefix({ entity: "Specialization" }));
      setTimeout(() => {
        dispatch(resetSpecializationState());
      }, 2000);
    }
  }, [success, dispatch]);

  // Handle update success
  useEffect(() => {
    if (updateSuccess) {
      setSpecializationName("");
      setPulseCode("");
      setValidationErrors({});
      setStatus("active");
      dispatch(getAllSpecializations());
      dispatch(resetUpdateDoctorSpecializationState());
      if (onUpdateComplete) {
        onUpdateComplete();
      }
    }
  }, [updateSuccess, dispatch, onUpdateComplete]);

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

  // Validate entire form before submission
  const validateForm = (pulseCodeToValidate: string) => {
    try {
      specializationCreationSchema.parse({
        name: specializationName,
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
        specializationCreationSchema.omit({ pulseCode: true }).parse({
          name: specializationName,
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
        // Update existing specialization - only send name and status
        await dispatch(
          updateDoctorSpecialization({
            id: updateId,
            data: {
              name: specializationName.trim(),
              status: status,
            },
          })
        ).unwrap();
      } else {
        // Create new specialization - send all fields including pulseCode
        await dispatch(
          createSpecialization({
            name: specializationName.trim(),
            pulseCode: generatedPrefix!,
            status: status,
          })
        ).unwrap();
      }
    } catch (err: any) {
      console.error(`Failed to ${isUpdateMode ? "update" : "create"} specialization:`, err);
      // Set error from API response if available
      const errorMessage =
        err?.message ||
        err?.error ||
        `Failed to ${isUpdateMode ? "update" : "create"} specialization`;
      setValidationErrors({ name: errorMessage });
    }
  };

  return (
    <div className="w-full">
      <div className="bg-[var(--background)] rounded-8 shadow-soft border border-[var(--gray-1)] overflow-hidden">
        <div className="px-8 py-10 space-y-8">
          {/* Header */}
          <div>
            <h2 className="t-h2">{isUpdateMode ? "Update Speciality" : "Add Specialities"}</h2>
            <p className="t-sm text-[var(--subheading-color)] mt-1">
              {isUpdateMode
                ? "Update the speciality information below"
                : "Manage medical specialities and subspecialities"}
            </p>
          </div>

          {/* Add/Update Speciality Form */}
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

              {/* Speciality Name */}
              <FormInput
                label="Speciality Name"
                name="specializationName"
                type="text"
                value={specializationName}
                onChange={handleSpecializationNameChange}
                placeholder="Enter speciality name"
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
                !specializationName.trim() ||
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
                  : "Update Speciality"
                : loading
                  ? "Adding..."
                  : "Add Specialization"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
