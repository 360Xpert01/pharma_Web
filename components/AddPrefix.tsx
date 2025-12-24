"use client";

import React, { useState, useEffect, use } from "react";
import { ChevronDown } from "lucide-react";
import { fetchPrefixes } from "@/store/slices/preFix/allPreFixTable";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "./ui/use-toast";
import { createPrefix } from "@/store/slices/preFix/postPrefix";

export default function AddPrefixNameComponent() {
  const [selectedTable, setSelectedTable] = useState("");
  const [prefix, setPrefix] = useState("");
  const [validationError, setValidationError] = useState("");

  const preview = prefix ? `${prefix.toUpperCase()} 01` : "";

  const handlePrefixChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Clear validation error when user starts typing
    setValidationError("");

    // Silently prevent spaces - don't update state if space is entered
    if (value.includes(" ")) {
      return;
    }

    // Silently prevent more than 5 characters
    if (value.length > 5) {
      return;
    }

    setPrefix(value);
  };

  const handleAddPrefix = async () => {
    if (!selectedTable || !prefix) {
      setValidationError("Please select a table and enter a prefix");
      return;
    }

    // Final validation before submission
    if (prefix.includes(" ")) {
      setValidationError("Spaces are not allowed in prefix code");
      return;
    }

    if (prefix.length > 5) {
      setValidationError("Prefix code cannot exceed 5 characters");
      return;
    }

    const payload = {
      code: prefix.toUpperCase(), // e.g., "EMP"
      entity: selectedTable, // long entity string from dropdown
    };

    console.log("Payload", payload);

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
    <div className=" bg-gray-50 flex items-center justify-center ">
      <div className="w-full">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-8 space-y-6">
            {/* Title & Subtitle */}
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Add Prefix Name</h1>
              <p className="text-sm text-gray-500 mt-1">Unlock the potential of your candidates</p>
            </div>

            {/* Form Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
              {/* Select Data Table Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Data Table
                </label>
                <div className="relative">
                  <select
                    value={selectedTable}
                    onChange={(e) => setSelectedTable(e.target.value)}
                    disabled={loading || !tables || tables.length === 0}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 pr-10"
                  >
                    <option value="">{loading ? "Loading tables..." : "Select a table..."}</option>
                    {tables?.map((tableName: string, index: number) => (
                      <option className="h-10" key={index} value={tableName}>
                        {tableName}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
                {/* Reserve space to align with other fields */}
                <div className="h-5 mt-1"></div>
              </div>

              {/* Prefix Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Prefix</label>
                <input
                  type="text"
                  value={prefix}
                  onChange={handlePrefixChange}
                  placeholder="e.g. EMP, max 5 characters"
                  className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 ${
                    validationError
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-200 focus:ring-blue-500 focus:border-blue-500"
                  }`}
                />
                {/* Reserve space for error message to prevent layout shift */}
                <div className="h-5 mt-1">
                  {validationError && <p className="text-sm text-red-600">{validationError}</p>}
                </div>
              </div>

              {/* Preview Box */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Preview</label>
                <div className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-700 font-medium">
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
                className="px-8 py-3 bg-blue-500 text-white font-medium rounded-xl hover:bg-blue-700 transition shadow-md flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
