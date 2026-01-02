"use client";

import React, { useState, useEffect, use } from "react";
import { Plus } from "lucide-react";
import { fetchPrefixes } from "@/store/slices/preFix/allPreFixTable";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "./ui/use-toast";
import { createPrefix } from "@/store/slices/preFix/postPrefix";
import { prefixCreationSchema } from "@/validations/prefixValidation";
import { FormInput, FormSelect } from "@/components/form";
import { Button } from "@/components/ui/button/button";

export default function AddPrefixNameComponent() {
  const [selectedTable, setSelectedTable] = useState("");
  const [prefix, setPrefix] = useState("");
  const [validationError, setValidationError] = useState("");

  // Validation errors state
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const preview = prefix ? `${prefix.toUpperCase()}01` : "";

  // Helper functions for validation
  const getErrorMessage = (fieldName: string) => validationErrors[fieldName] || "";
  const hasError = (fieldName: string) => !!validationErrors[fieldName];
  const clearFieldError = (fieldName: string) => {
    if (validationErrors[fieldName]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        return newErrors;
      });
      setValidationError("");
    }
  };

  const getInputClasses = (fieldName: string) => {
    const baseClasses =
      "w-full px-4 py-3 bg-(--gray-0) border rounded-xl focus:outline-none focus:ring-2";
    if (hasError(fieldName)) {
      return `${baseClasses} border-(--destructive) focus:ring-(--destructive) focus:border-(--destructive)`;
    }
    return `${baseClasses} border-(--gray-2) focus:ring-(--primary) focus:border-(--primary)`;
  };

  const handlePrefixChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Clear validation error when user starts typing
    clearFieldError("code");

    // Allow both uppercase and lowercase letters along with numbers
    // Block spaces, hyphens, underscores and all other special characters
    const validPattern = /^[A-Za-z0-9]*$/;
    if (!validPattern.test(value)) {
      return;
    }

    // Silently prevent more than 5 characters
    if (value.length > 5) {
      return;
    }

    setPrefix(value);
  };

  const handleAddPrefix = async () => {
    // Prepare form data for validation
    const formData = {
      code: prefix,
      entity: selectedTable,
    };

    // Validate using Zod schema
    const validation = prefixCreationSchema.safeParse(formData);

    if (!validation.success) {
      // Create an errors object mapping field names to error messages
      const errors: Record<string, string> = {};
      validation.error.errors.forEach((err) => {
        const fieldName = err.path[0] as string;
        if (!errors[fieldName]) {
          errors[fieldName] = err.message;
        }
      });

      // Set validation errors to display inline
      setValidationErrors(errors);

      // Also show the first error as a toast for immediate feedback
      const firstError = validation.error.errors[0];
      toast({
        title: "Error",
        description: firstError.message,
        variant: "destructive",
      });
      return;
    }

    // Clear validation errors
    setValidationErrors({});
    setValidationError("");

    const payload = {
      code: validation.data.code.toLowerCase(), // Send lowercase to API
      entity: validation.data.entity,
    };

    const result = await dispatch(createPrefix(payload));

    if (createPrefix.fulfilled.match(result)) {
      toast({
        title: "Success",
        description: "Prefix added successfully!",
      });
      // Optional: refetch prefixes list
      dispatch(fetchPrefixes());
      setPrefix("");
      setSelectedTable("");
      setValidationError("");
    } else {
      // Display error from API
      const errorMsg = (result.payload as string) || "Failed to add prefix";
      setValidationError(errorMsg);
      toast({
        title: "Error",
        description: errorMsg,
        variant: "destructive",
      });
    }
  };

  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(fetchPrefixes());
  }, [dispatch]);
  const { tables, loading, error } = useSelector((state: any) => state.allPreFixTable);
  const { loading: createLoading, error: createError } = useSelector(
    (state: any) => state.createPrefix
  );

  console.log("Tables:", tables);
  return (
    <div className=" bg-(--gray-0) flex items-center justify-center ">
      <div className="w-full">
        <div className="bg-(--background) rounded-2xl shadow-soft border border-(--gray-1) overflow-hidden">
          <div className="p-8 space-y-6">
            {/* Title & Subtitle */}
            <div>
              <h1 className="text-2xl font-bold text-(--gray-9)">Add Prefix Name</h1>
              <p className="text-sm text-(--gray-0)0 mt-1">
                Unlock the potential of your candidates
              </p>
            </div>

            {/* Form Row */}
            <div className="flex flex-col md:flex-row gap-6 items-end">
              {/* Select Data Table Dropdown */}
              <div className="w-full md:w-[25%]">
                <FormSelect
                  label="Select Data Table"
                  name="entity"
                  value={selectedTable}
                  onChange={setSelectedTable}
                  options={
                    tables?.map((tableName: string) => ({
                      value: tableName,
                      label: tableName.replace(/-/g, ""),
                    })) || []
                  }
                  placeholder={loading ? "Loading tables" : "Select a table"}
                  loading={loading}
                  required
                  error={validationErrors.entity}
                  disabled={!tables || tables.length === 0}
                />
              </div>

              {/* Prefix Input */}
              <div className="w-full md:w-[25%]">
                <FormInput
                  label="Prefix"
                  name="code"
                  type="text"
                  value={prefix}
                  onChange={(value) => {
                    const validPattern = /^[A-Za-z0-9]*$/;
                    if (!validPattern.test(value)) return;
                    if (value.length > 5) return;
                    setPrefix(value);
                  }}
                  placeholder="e.g. EMP, max 5 characters"
                  required
                  error={validationErrors.code || validationError}
                  disabled={!selectedTable}
                />
              </div>

              {/* Preview Box */}
              <div className="w-full md:w-[25%]">
                <label className="block text-sm font-medium text-(--gray-7)">Preview</label>
                <div className="mt-1 w-full h-12 px-4 py-3 bg-(--gray-1) border border-(--gray-2) rounded-8 text-(--gray-7) font-medium flex items-center">
                  {preview || "—"}
                </div>
              </div>

              {/* Add Prefix Button */}
              <div className="w-full md:w-[25%] flex justify-end items-end">
                <Button
                  variant="primary"
                  size="lg"
                  icon={Plus}
                  rounded="default"
                  onClick={handleAddPrefix}
                  loading={createLoading}
                  disabled={!selectedTable || !prefix}
                >
                  {createLoading ? "Adding..." : "Add Prefix"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
