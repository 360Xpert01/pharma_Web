"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function AddPrefixNameComponent() {
  const [selectedTable, setSelectedTable] = useState("");
  const [prefix, setPrefix] = useState("");

  // Live preview logic (e.g., prefix + "01")
  const preview = prefix ? `${prefix.toUpperCase()} 01` : "";

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
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                  >
                    <option value="">e.g. 360Expert Solution</option>
                    <option value="table1">HR Candidates</option>
                    <option value="table2">Employee Records</option>
                    <option value="table3">Projects</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Prefix Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Prefix</label>
                <input
                  type="text"
                  value={prefix}
                  onChange={(e) => setPrefix(e.target.value)}
                  placeholder="e.g. EMP, max 5 characters"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Preview Box */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Preview</label>
                <div className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-700 font-medium">
                  {preview || "—"}
                </div>
              </div>
            </div>

            {/* Add Prefix Button */}
            <div className="flex justify-end">
              <button className="px-8 py-3 bg-blue-500 text-white font-medium rounded-xl hover:bg-blue-700 transition shadow-md flex items-center gap-2">
                Add Prefix
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
