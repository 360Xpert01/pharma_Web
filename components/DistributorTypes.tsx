"use client";

import React, { useState, useEffect } from "react";
import { EditIcon, Plus } from "lucide-react";
import { FormInput, FormSelect, StatusToggle } from "@/components/form";
import { Button } from "@/components/ui/button/button";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  createDistributorType,
  resetDistributorTypeState,
} from "@/store/slices/distributorType/createDistributorTypeSlice";
import { getAllDistributorTypes } from "@/store/slices/distributorType/getAllDistributorTypesSlice";
import {
  updateDistributorType,
  resetUpdateDistributorTypeState,
} from "@/store/slices/distributorType/updateDistributorTypeSlice";
import { getDistributorTypeById } from "@/store/slices/distributorType/getDistributorTypeByIdSlice";
import {
  generatePrefix,
  resetGeneratePrefixState,
} from "@/store/slices/preFix/generatePrefixSlice";
import { distributorTypeCreationSchema } from "@/validations/distributorTypeValidation";

interface DistributorTypesCardProps {
  updateId?: string | null;
  onUpdateComplete?: () => void;
}

export default function AddDistributorTypesCard({
  updateId = null,
  onUpdateComplete,
}: DistributorTypesCardProps) {
  const dispatch = useAppDispatch();
  const { loading, success, error, message } = useAppSelector(
    (state) => state.createDistributorType
  );
  const {
    loading: updateLoading,
    success: updateSuccess,
    error: updateError,
    message: updateMessage,
  } = useAppSelector((state) => state.updateDistributorType);
  const { distributorType: distributorTypeData } = useAppSelector(
    (state) => state.distributorTypeById
  );
  const {
    generatedPrefix,
    loading: prefixLoading,
    error: prefixError,
  } = useAppSelector((state) => state.generatePrefix);

  const [distributorTypeName, setDistributorTypeName] = useState("");
  const [pulseCode, setPulseCode] = useState("");
  const [status, setStatus] = useState<"active" | "inactive">("active");
  const [validationErrors, setValidationErrors] = useState<{
    name?: string;
    pulseCode?: string;
    status?: string;
  }>({});
  const isUpdateMode = !!updateId;

  // Fetch distributor type data by ID when in update mode
  useEffect(() => {
    if (isUpdateMode && updateId) {
      dispatch(getDistributorTypeById(updateId));
    }
  }, [dispatch, isUpdateMode, updateId]);

  // Generate prefix only when not in update mode
  useEffect(() => {
    if (!isUpdateMode) {
      dispatch(generatePrefix({ entity: "DistributorType" }));
    }

    return () => {
      dispatch(resetGeneratePrefixState());
    };
  }, [dispatch, isUpdateMode]);

  // Populate form when distributor type data is loaded in update mode
  useEffect(() => {
    if (isUpdateMode && distributorTypeData) {
      setDistributorTypeName(distributorTypeData.name || "");
      setPulseCode(distributorTypeData.pulseCode || "");
      setStatus(distributorTypeData.status || "active");
    }
  }, [isUpdateMode, distributorTypeData]);

  // Handle create success
  useEffect(() => {
    if (success) {
      setDistributorTypeName("");
      setPulseCode("");
      setStatus("active");
      setValidationErrors({});
      dispatch(getAllDistributorTypes());
      dispatch(generatePrefix({ entity: "DistributorType" }));
      setTimeout(() => {
        dispatch(resetDistributorTypeState());
      }, 2000);
    }
  }, [success, dispatch]);

  // Handle update success
  useEffect(() => {
    if (updateSuccess) {
      setDistributorTypeName("");
      setPulseCode("");
      setValidationErrors({});
      setStatus("active");
      dispatch(getAllDistributorTypes());
      dispatch(resetUpdateDistributorTypeState());
      if (onUpdateComplete) {
        onUpdateComplete();
      }
    }
  }, [updateSuccess, dispatch, onUpdateComplete]);

  // Validate using Zod schema with real-time field validation
  const validateField = (fieldName: "name" | "pulseCode" | "status", value: any) => {
    try {
      if (fieldName === "name") {
        distributorTypeCreationSchema.shape.name.parse(value);
      } else if (fieldName === "status") {
        distributorTypeCreationSchema.shape.status.parse(value);
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

  // Handle distributor type name change with real-time validation
  const handleDistributorTypeNameChange = (value: string) => {
    setDistributorTypeName(value);
    validateField("name", value);
  };

  const validateForm = (pulseCodeToValidate: string) => {
    try {
      distributorTypeCreationSchema.parse({
        name: distributorTypeName,
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
        distributorTypeCreationSchema.omit({ pulseCode: true }).parse({
          name: distributorTypeName,
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
        // Update existing distributor type - only send name and status
        await dispatch(
          updateDistributorType({
            id: updateId,
            data: {
              name: distributorTypeName.trim(),
              status,
            },
          })
        ).unwrap();
      } else {
        // Create new distributor type - send all fields including pulseCode
        await dispatch(
          createDistributorType({
            name: distributorTypeName.trim(),
            pulseCode: generatedPrefix!,
            status,
          })
        ).unwrap();
      }
    } catch (err: any) {
      console.error(`Failed to ${isUpdateMode ? "update" : "create"} distributor type:`, err);
      const errorMessage =
        err?.message ||
        err?.error ||
        `Failed to ${isUpdateMode ? "update" : "create"} distributor type`;
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
            <h2 className="t-h2">
              {isUpdateMode ? "Update Distributor Type" : "Add Distributor Types"}
            </h2>
            <p className="t-sm text-[var(--subheading-color)] mt-1">
              {isUpdateMode
                ? "Update the distributor type information below"
                : "Manage distributor types and classifications"}
            </p>
          </div>

          {/* Add/Update DistributorType Form */}
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

              {/* DistributorType Name */}
              <FormInput
                label="Distributor Type Name"
                name="distributorTypeName"
                type="text"
                value={distributorTypeName}
                onChange={handleDistributorTypeNameChange}
                placeholder="Enter distributor type name"
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
                !distributorTypeName.trim() ||
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
                  : "Update Distributor Type"
                : loading
                  ? "Adding..."
                  : "Add Distributor Type"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
