"use client";

import React, { useState } from "react";
import { Search, ListFilter, Upload, ChevronDown, X } from "lucide-react";
import Image from "next/image";
interface UsersHeaderProps {
  campHeading?: string;
  filterT?: boolean;
  title?: string;
}

export default function UsersHeader({ campHeading, filterT, title }: UsersHeaderProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [openId, setOpenId] = useState<boolean>(false);
  const exportBtn = () => {
    console.log("export btn clicked");
  };

  return (
    <div className="bg-[var(--background)]">
      <div className="px-4 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        {/* Left: Title + Description */}
        <div>
          <h1 className="t-h1">{campHeading || "All Users"}</h1>
          <p className="t-sm mt-1">Unlock the potential of your candidates</p>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--gray-9)] pointer-events-none" />
            <input
              type="text"
              placeholder="Search users..."
              className="pl-10 pr-4 py-2.5 w-full sm:w-64 bg-[var(--gray-2)] text-[var(--gray-9)] rounded-8 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:bg-[var(--light)] transition-all duration-200"
            />
          </div>

          {filterT && (
            <div className="relative">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center justify-center p-3.5 bg-[var(--primary)] text-[var(--light)] rounded-8 cursor-pointer transition-colors shadow-soft"
                aria-label="Filter"
              >
                <ListFilter className="w-4 h-4" />
              </button>

              {/* Filter Dropdown */}
              {isFilterOpen && (
                <div className="absolute cursor-pointer right-0 mt-2 w-72 bg-[var(--background)] rounded-8 shadow-soft border border-[var(--gray-2)] z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="p-5 space-y-5">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <h3 className="t-h4">Filter by</h3>
                      <button
                        onClick={() => setIsFilterOpen(false)}
                        className="text-[var(--gray-4)] hover:text-[var(--gray-6)] transition"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Role Filter */}
                    <div>
                      <label className="t-label block mb-1.5">Role</label>
                      <select className="w-full px-3 py-2.5 border border-[var(--gray-3)] rounded-8 text-sm focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] transition">
                        <option>All Roles</option>
                        <option>Admin</option>
                        <option>Manager</option>
                        <option>Sales Rep</option>
                        <option>Doctor</option>
                        <option>Pharmacist</option>
                      </select>
                    </div>

                    {/* Status Filter */}
                    <div>
                      <label className="t-label block mb-1.5">Status</label>
                      <select className="w-full px-3 py-2.5 border border-[var(--gray-3)] rounded-8 text-sm focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] transition">
                        <option>All Status</option>
                        <option>Active</option>
                        <option>Inactive</option>
                        <option>Pending</option>
                        <option>Suspended</option>
                      </select>
                    </div>

                    {/* Date Range */}
                    <div>
                      <label className="t-label block mb-1.5">Date Range</label>
                      <select className="w-full px-3 py-2.5 border border-[var(--gray-3)] rounded-8 text-sm focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] transition">
                        <option>Last 30 Days</option>
                        <option>Last 7 Days</option>
                        <option>This Month</option>
                        <option>Last Month</option>
                        <option>Custom Range</option>
                      </select>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-3">
                      <button className="flex-1 px-4 py-2.5 border border-[var(--gray-3)] text-[var(--gray-7)] rounded-8 text-sm font-medium hover:bg-[var(--gray-0)] transition">
                        Clear All
                      </button>
                      <button className="flex-1 px-4 py-2.5 bg-[var(--primary)] text-[var(--light)] rounded-8 text-sm font-medium hover:bg-[var(--primary-2)] transition shadow-soft">
                        Apply Filters
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="border h-9 border-[var(--gray-3)]"></div>

          {/* Export Button */}
          <div
            onClick={() => setOpenId(!openId)}
            className="flex items-center cursor-pointer relative gap-0 border border-[var(--primary)] rounded-8 text-sm font-medium shadow-soft overflow-hidden"
          >
            <div className="flex items-center gap-2 px-4 py-3 bg-[var(--primary)] hover:bg-[var(--primary-2)] text-[var(--light)] transition-colors">
              <Upload className="w-4 h-4" />
              <span>Export List</span>
            </div>

            <div className="px-3 py-3 bg-[var(--light)] hover:bg-[var(--gray-1)] flex items-center justify-center transition-colors">
              <Image
                src="/arrow-down-blue.svg"
                alt="Dropdown Arrow"
                width={20}
                height={20}
                className="w-5 h-5 object-contain"
              />
            </div>

            {openId && (
              <>
                {/* Backdrop */}
                <div className="fixed inset-0 z-40" onClick={() => setOpenId(false)} />

                {/* Dropdown Menu */}
                <div className="absolute right-0 top-full mt-2 w-56 bg-[var(--background)] rounded-8 shadow-soft border border-[var(--gray-2)] z-50 overflow-hidden">
                  <div className="py-2">
                    <button className="w-full text-left px-5 py-3 t-td hover:bg-[var(--gray-1)] flex items-center gap-3 transition">
                      <span>Export Format (.xls)</span>
                    </button>
                    <button className="w-full text-left px-5 py-3 t-td hover:bg-[var(--gray-1)] flex items-center gap-3 transition">
                      <span>Import Data (.xls)</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Optional: Overlay when filter is open */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-40  bg-opacity-10" onClick={() => setIsFilterOpen(false)} />
      )}
    </div>
  );
}
