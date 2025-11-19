"use client";

import React, { useState } from "react";
import { Search, ListFilter, Upload, ChevronDown, X } from "lucide-react";
import Image from "next/image";
interface UsersHeaderProps {
  campHeading?: string;
  filterT?: boolean;
}

export default function UsersHeader({ campHeading, filterT }: UsersHeaderProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="">
      <div className="px-8 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        {/* Left: Title + Description */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{campHeading || "All Users"}</h1>
          <p className="text-sm text-gray-500 mt-1">Unlock the potential of your candidates</p>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-900 pointer-events-none" />
            <input
              type="text"
              placeholder="Search users..."
              className="pl-10 pr-4 py-2.5 w-full sm:w-64 bg-gray-200 text-gray-900 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200"
            />
          </div>

          <div className="border h-8 border-gray-300"></div>

          {filterT && (
            <div className="relative">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center justify-center p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors shadow-sm"
                aria-label="Filter"
              >
                <ListFilter className="w-4 h-4" />
              </button>

              {/* Filter Dropdown */}
              {isFilterOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-200 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="p-5 space-y-5">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">Filter by</h3>
                      <button
                        onClick={() => setIsFilterOpen(false)}
                        className="text-gray-400 hover:text-gray-600 transition"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Role Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Role</label>
                      <select className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition">
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
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Status
                      </label>
                      <select className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition">
                        <option>All Status</option>
                        <option>Active</option>
                        <option>Inactive</option>
                        <option>Pending</option>
                        <option>Suspended</option>
                      </select>
                    </div>

                    {/* Date Range */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Date Range
                      </label>
                      <select className="w-full px-3 py-2.5 border border-gray-300 Rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition">
                        <option>Last 30 Days</option>
                        <option>Last 7 Days</option>
                        <option>This Month</option>
                        <option>Last Month</option>
                        <option>Custom Range</option>
                      </select>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-3">
                      <button className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition">
                        Clear All
                      </button>
                      <button className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition shadow-sm">
                        Apply Filters
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Export Button */}
          <div className="flex items-center gap-2 border border-blue-500  text-white rounded-full text-sm font-medium  transition-colors shadow-sm">
            <div className="flex items-center  gap-2 bg-blue-500 px-3 py-3 overflow-hidden rounded-tl-full rounded-bl-full ">
              <Upload className="w-4 h-4" />
              <span>Export List</span>
            </div>

            {/* <div className="border-l border-gray-400"></div> */}
            <div className="  mr-3 ">
              <Image
                src="/arrow-down-blue.svg"
                alt="Ceturvi Logo"
                width={25}
                height={25}
                // className="object-contain"
                className={"w-5 h-5 object-contain cursor-pointer"}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Optional: Overlay when filter is open */}
      {isFilterOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-10"
          onClick={() => setIsFilterOpen(false)}
        />
      )}
    </div>
  );
}
