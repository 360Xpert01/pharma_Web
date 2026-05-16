"use client";

import React from "react";

interface StatusToggleProps {
  status: "Active" | "Inactive";
  onChange: (status: "Active" | "Inactive") => void;
  className?: string;
  activeLabel?: string;
  inactiveLabel?: string;
  readOnly?: boolean;
}

export default function StatusToggle({
  status,
  onChange,
  className = "",
  activeLabel = "Active",
  inactiveLabel = "Inactive",
  readOnly = false,
}: StatusToggleProps) {
  return (
    <div className={`flex ${className}`}>
      <div
        className={`inline-flex border border-(--gray-3) rounded-full p-1 bg-(--gray-0) overflow-hidden ${
          readOnly ? "opacity-90" : ""
        }`}
      >
        <button
          type="button"
          disabled={readOnly}
          onClick={() => !readOnly && onChange("Active")}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
            readOnly ? "cursor-not-allowed" : "cursor-pointer"
          } ${
            status === "Active"
              ? "bg-(--primary) text-(--light)"
              : `text-(--gray-6) ${readOnly ? "" : "hover:bg-(--gray-1)"}`
          }`}
        >
          {activeLabel}
        </button>
        <button
          type="button"
          disabled={readOnly}
          onClick={() => !readOnly && onChange("Inactive")}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
            readOnly ? "cursor-not-allowed" : "cursor-pointer"
          } ${
            status === "Inactive"
              ? "bg-(--primary) text-(--light)"
              : `text-(--gray-6) ${readOnly ? "" : "hover:bg-(--gray-1)"}`
          }`}
        >
          {inactiveLabel}
        </button>
      </div>
    </div>
  );
}
