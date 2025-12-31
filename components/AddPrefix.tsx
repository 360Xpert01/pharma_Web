"use client";

import React, { useState, useEffect, use } from "react";
import { ChevronDown } from "lucide-react";
import { fetchPrefixes } from "@/store/slices/preFix/allPreFixTable";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "./ui/use-toast";
import { createPrefix } from "@/store/slices/preFix/postPrefix";
import { prefixCreationSchema } from "@/validations/prefixValidation";

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
    const value = e.target.value.toLowerCase(); // Convert to lowercase

    // Clear validation error when user starts typing
    clearFieldError("code");

    // Only allow lowercase letters and numbers
    // Block spaces, hyphens, underscores and all other special characters
    const validPattern = /^[a-z0-9]*$/;
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
        <div className="bg-(--background) rounded-2xl shadow-lg border border-(--gray-1) overflow-hidden">
          <div className="p-8 space-y-6">
            {/* Title & Subtitle */}
            <div>
              <h1 className="text-2xl font-bold text-(--gray-9)">Add Prefix Name</h1>
              <p className="text-sm text-(--gray-0)0 mt-1">
                Unlock the potential of your candidates
              </p>
            </div>

            {/* Form Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
              {/* Select Data Table Dropdown */}
              <div>
                <label className="block text-sm font-medium text-(--gray-7) mb-2">
                  Select Data Table <span className="text-(--destructive)">*</span>
                </label>
                <div className="relative">
                  <select
                    value={selectedTable}
                    onChange={(e) => {
                      setSelectedTable(e.target.value);
                      clearFieldError("entity");
                    }}
                    disabled={loading || !tables || tables.length === 0}
                    className={getInputClasses("entity")}
                  >
                    <option value="">{loading ? "Loading tables..." : "Select a table..."}</option>
                    {tables?.map((tableName: string, index: number) => (
                      <option className="h-10" key={index} value={tableName}>
                        {tableName.replace(/-/g, "")}
                      </option>
                    ))}
                  </select>
                  {/* <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-(--gray-4) pointer-events-none" /> */}
                </div>
                {/* Reserve space for error message */}
                <div className="h-5 mt-1">
                  {hasError("entity") && (
                    <p className="text-sm text-(--destructive)">{getErrorMessage("entity")}</p>
                  )}
                </div>
              </div>

              {/* Prefix Input */}
              <div>
                <label className="block text-sm font-medium text-(--gray-7) mb-2">
                  Prefix <span className="text-(--destructive)">*</span>
                </label>
                <input
                  type="text"
                  value={prefix}
                  onChange={handlePrefixChange}
                  placeholder="e.g. EMP, max 5 characters"
                  disabled={!selectedTable}
                  className={`${getInputClasses("code")} ${!selectedTable ? "opacity-50 cursor-not-allowed" : ""}`}
                />
                {/* Reserve space for error message to prevent layout shift */}
                <div className="h-5 mt-1">
                  {(hasError("code") || validationError) && (
                    <p className="text-sm text-(--destructive)">
                      {getErrorMessage("code") || validationError}
                    </p>
                  )}
                </div>
              </div>

              {/* Preview Box */}
              <div>
                <label className="block text-sm font-medium text-(--gray-7) mb-2">Preview</label>
                <div className="w-full px-4 py-3 bg-(--gray-1) border border-(--gray-2) rounded-xl text-(--gray-7) font-medium">
                  {preview || "—"}
                </div>
                {/* Reserve space to align with other fields */}
                <div className="h-5 mt-1"></div>
              </div>
            </div>

            {/* Add Prefix Button */}
            <div className="flex justify-end">
              <button
                onClick={handleAddPrefix}
                disabled={createLoading || !selectedTable || !prefix}
                className="px-8 py-3 bg-(--primary) (--light) font-medium rounded-xl hover:bg-(--primary-2) transition shadow-md flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {createLoading ? "Adding..." : "Add Prefix"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
