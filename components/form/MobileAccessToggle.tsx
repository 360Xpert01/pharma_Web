"use client";

import React from "react";

interface StatusToggleProps {
  status: "Active" | "Inactive";
  onChange: (status: "Active" | "Inactive") => void;
  className?: string;
  activeLabel?: string;
  inactiveLabel?: string;
}

export default function StatusToggle({
  status,
  onChange,
  className = "",
  activeLabel = "Active",
  inactiveLabel = "Inactive",
}: StatusToggleProps) {
  return (
    <div className={`flex ${className}`}>
      <div className="inline-flex border border-(--gray-3) rounded-full p-1 bg-(--gray-0) overflow-hidden">
        <button
          type="button"
          onClick={() => onChange("Active")}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
            status === "Active"
              ? "bg-(--primary) text-(--light)"
              : "text-(--gray-6) hover:bg-(--gray-1)"
          }`}
        >
          {activeLabel}
        </button>
        <button
          type="button"
          onClick={() => onChange("Inactive")}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
            status === "Inactive"
              ? "bg-(--primary) text-(--light)"
              : "text-(--gray-6) hover:bg-(--gray-1)"
          }`}
        >
          {inactiveLabel}
        </button>
      </div>
    </div>
  );
}
