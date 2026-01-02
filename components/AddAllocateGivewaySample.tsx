"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, Plus, Edit2, Trash2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store";
import { getAllGiveaways } from "@/store/slices/giveaway/getAllGiveawaysSlice";
import { getAllUsers } from "@/store/slices/employee/getAllUsersSlice";

interface GiveawayItem {
  id: string;
  name: string;
  quantity: number;
}

interface SampleItem {
  id: string;
  name: string;
  quantity: number;
}

interface EmployeeData {
  id: string;
  email: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  pulseCode: string;
  roleId?: string;
  profilePicture?: string;
}

export default function AddAllocateGivewaySample() {
  const dispatch = useAppDispatch();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Redux state for employees and giveaways
  const { users, loading: employeesLoading } = useAppSelector((state) => state.allUsers);
  const { giveaways, loading: giveawaysLoading } = useAppSelector((state) => state.allGiveaways);

  // Employee search and selection states
  const [employeeSearch, setEmployeeSearch] = useState("");
  const [showEmployeeDropdown, setShowEmployeeDropdown] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeData | null>(null);

  // Selected items state
  const [selectedGiveaways, setSelectedGiveaways] = useState<GiveawayItem[]>([
    { id: "1", name: "Diagnostic Stetosc...", quantity: 25 },
    { id: "2", name: "Doctor USB Disk", quantity: 25 },
    { id: "3", name: "Prescription folder", quantity: 25 },
    { id: "4", name: "Notebook and Pen...", quantity: 25 },
    { id: "5", name: "Wet wipes", quantity: 25 },
    { id: "6", name: "Notebook and Pen...", quantity: 25 },
    { id: "7", name: "First aid mini kit", quantity: 25 },
    { id: "8", name: "Smartwatch", quantity: 25 },
  ]);

  const [selectedSamples, setSelectedSamples] = useState<SampleItem[]>([
    { id: "1", name: "Lisinopril 250gm", quantity: 25 },
    { id: "2", name: "Dapakan 500mg", quantity: 25 },
    { id: "3", name: "Rigix 10 mg", quantity: 25 },
    { id: "4", name: "Evion 400 mg", quantity: 25 },
    { id: "5", name: "VitaBoost 400mg", quantity: 25 },
    { id: "6", name: "Motilium 10 mg", quantity: 25 },
    { id: "7", name: "Atorvastatin 10gm", quantity: 25 },
    { id: "8", name: "Digene Tablet", quantity: 25 },
  ]);

  // Search states for giveaways and samples
  const [giveawaySearch, setGiveawaySearch] = useState("");
  const [sampleSearch, setSampleSearch] = useState("");

  // Fetch employees and giveaways on mount
  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAllGiveaways());
  }, [dispatch]);

  // Handle click outside dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowEmployeeDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter employees based on search
  const filteredEmployees = users.filter((user) => {
    const fullName = `${user.firstName} ${user.middleName || ""} ${user.lastName}`.toLowerCase();
    const searchTerm = employeeSearch.toLowerCase();
    return (
      fullName.includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm) ||
      user.pulseCode.toLowerCase().includes(searchTerm)
    );
  });

  // Filter functions for giveaways and samples
  const filteredGiveaways = selectedGiveaways.filter((item) =>
    item.name.toLowerCase().includes(giveawaySearch.toLowerCase())
  );

  const filteredSamples = selectedSamples.filter((item) =>
    item.name.toLowerCase().includes(sampleSearch.toLowerCase())
  );

  // Employee selection handler
  const handleSelectEmployee = (employee: EmployeeData) => {
    setSelectedEmployee(employee);
    setEmployeeSearch(`${employee.firstName} ${employee.lastName}`);
    setShowEmployeeDropdown(false);
  };

  // Handler functions
  const handleDeleteGiveaway = (id: string) => {
    setSelectedGiveaways((prev) => prev.filter((item) => item.id !== id));
  };

  const handleDeleteSample = (id: string) => {
    setSelectedSamples((prev) => prev.filter((item) => item.id !== id));
  };

  const handleEditGiveaway = (id: string) => {
    // TODO: Implement edit quantity modal/inline
  };

  const handleEditSample = (id: string) => {
    // TODO: Implement edit quantity modal/inline
  };

  const handleAddGiveaway = () => {
    // TODO: Implement add giveaway modal/selection
  };

  const handleAddSample = () => {
    // TODO: Implement add sample modal/selection
  };

  const handleDiscard = () => {
    setSelectedEmployee(null);
    setEmployeeSearch("");
    setSelectedGiveaways([]);
    setSelectedSamples([]);
    setGiveawaySearch("");
    setSampleSearch("");
  };

  const handleAllocate = () => {
    if (!selectedEmployee) {
      return;
    }
    if (selectedGiveaways.length === 0 && selectedSamples.length === 0) {
      return;
    }

    // TODO: Implement allocation API call
    console.log("Allocating:", {
      employee: selectedEmployee,
      giveaways: selectedGiveaways,
      samples: selectedSamples,
    });

    // Reset form
    handleDiscard();
  };

  return (
    <div className="bg-(--gray-0)">
      <div className="bg-(--background) rounded-8 shadow-soft p-8">
        {/* Select Employee Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-(--gray-9) mb-4">Select Employee</h2>

          <div className="flex gap-6 items-start">
            {/* Search Input */}
            <div className="flex-1 max-w-md relative" ref={dropdownRef}>
              <label className="block text-xs font-medium text-(--gray-6) mb-2">
                Search Employee Name<span className="text-(--destructive)">*</span>
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-(--gray-4)" />
                <input
                  type="text"
                  placeholder="Search Employee Name"
                  value={employeeSearch}
                  onChange={(e) => {
                    setEmployeeSearch(e.target.value);
                    setShowEmployeeDropdown(true);
                    setSelectedEmployee(null); // Clear selection when typing
                  }}
                  onFocus={() => setShowEmployeeDropdown(true)}
                  className="w-full pl-10 pr-4 py-2.5 border border-(--gray-3) rounded-8 focus:ring-2 focus:ring-(--primary) outline-none text-sm"
                />
              </div>

              {/* Employee Dropdown */}
              {showEmployeeDropdown &&
                employeeSearch &&
                !selectedEmployee &&
                filteredEmployees.length > 0 && (
                  <div className="absolute z-50 w-full mt-2 bg-(--background) border border-(--gray-2) rounded-8 shadow-soft max-h-64 overflow-y-auto">
                    {filteredEmployees.slice(0, 5).map((employee) => (
                      <div
                        key={employee.id}
                        onClick={() => handleSelectEmployee(employee)}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-(--gray-0) cursor-pointer border-b border-(--gray-1) last:border-b-0"
                      >
                        {/* Avatar */}
                        <div className="w-10 h-10 rounded-8 bg-(--gray-2) flex items-center justify-center overflow-hidden flex-shrink-0">
                          {employee.profilePicture ? (
                            <img
                              src={employee.profilePicture}
                              alt={employee.firstName}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-(--gray-6) font-medium text-sm">
                              {employee.firstName[0]}
                              {employee.lastName[0]}
                            </span>
                          )}
                        </div>

                        {/* Employee Info */}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-(--gray-9) truncate">
                            {employee.firstName} {employee.lastName}
                          </p>
                          <p className="text-xs text-(--gray-0)0 truncate">{employee.email}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
            </div>

            {/* Helper Text */}
            <div className="flex-1">
              <p className="text-sm text-(--gray-0)0 mt-6">
                You can easily search the assignee you want and
                <br />
                take on different responsibilities.
              </p>
            </div>
          </div>
        </div>

        {/* Conditional: Show Employee Details and Allocation Form after selection */}
        {selectedEmployee && (
          <div className="space-y-6">
            {/* Employee Details Section */}
            <div>
              <div className="grid grid-cols-4 gap-4">
                {/* Team Pulse Code */}
                <div>
                  <label className="block text-xs font-medium text-(--gray-6) mb-2">
                    Team Pulse Code<span className="text-(--destructive)">*</span>
                  </label>
                  <div className="flex items-center px-4 py-2.5 bg-(--gray-0) rounded-8 text-sm">
                    <span className="text-(--gray-9) ml-1">{selectedEmployee.pulseCode}</span>
                  </div>
                </div>

                {/* Employee Name */}
                <div>
                  <label className="block text-xs font-medium text-(--gray-6) mb-2">
                    Employee Name
                  </label>
                  <div className="flex items-center px-4 py-2.5 bg-(--gray-0) rounded-8 text-sm">
                    <span className="text-(--gray-9)">
                      {selectedEmployee.firstName} {selectedEmployee.lastName}
                    </span>
                  </div>
                </div>

                {/* Role */}
                <div>
                  <label className="block text-xs font-medium text-(--gray-6) mb-2">Role</label>
                  <div className="flex items-center px-4 py-2.5 bg-(--gray-0) rounded-8 text-sm">
                    <span className="text-(--gray-9)">Sales Representative</span>
                  </div>
                </div>

                {/* Manager */}
                <div>
                  <label className="block text-xs font-medium text-(--gray-6) mb-2">Manager</label>
                  <div className="flex items-center px-4 py-2.5 bg-(--gray-0) rounded-8 text-sm">
                    <span className="text-(--gray-9)">Abdul Aziz Warsi</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Select Giveaway Section */}
            <div>
              <h2 className="text-xl font-bold text-(--gray-9) mb-4">Select Giveaway</h2>

              {/* Search & Add Row */}
              <div className="flex gap-3 mb-4 w-1/3">
                <div className="flex-1 relative">
                  <label className="block text-xs font-medium text-(--gray-6) mb-2">
                    Search Giveaway Name<span className="text-(--destructive)">*</span>
                  </label>
                  <Search className="absolute left-3 bottom-3 w-4 h-4 text-(--gray-4)" />
                  <input
                    type="text"
                    placeholder="Search Product Name"
                    value={giveawaySearch}
                    onChange={(e) => setGiveawaySearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-(--gray-3) rounded-8 focus:ring-2 focus:ring-(--primary) outline-none text-sm"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    onClick={handleAddGiveaway}
                    className="px-5 py-2.5 bg-(--primary) text-(--light) rounded-8 hover:bg-(--primary-2) transition flex items-center gap-2 text-sm font-medium cursor-pointer whitespace-nowrap"
                  >
                    <Plus className="w-4 h-4" />
                    Add Giveaway
                  </button>
                </div>
              </div>

              {/* Giveaway Cards Grid */}
              {filteredGiveaways.length > 0 && (
                <div className="bg-(--gray-0) rounded-8 p-4">
                  <div className="grid grid-cols-4 gap-3">
                    {filteredGiveaways.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between px-4 py-3 (--background) border border-(--gray-2) rounded-8 hover:shadow-soft transition"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-(--gray-9) truncate">
                            {item.name}
                          </p>
                          <p className="text-xs text-(--gray-0)0 mt-0.5">QTY: {item.quantity}</p>
                        </div>
                        <div className="flex items-center gap-2 ml-2">
                          <button
                            onClick={() => handleEditGiveaway(item.id)}
                            className="p-1.5 text-(--primary) hover:bg-(--primary-0) rounded cursor-pointer"
                            title="Edit quantity"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteGiveaway(item.id)}
                            className="p-1.5 text-(--destructive) hover:bg-(--destructive-0) rounded cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Select Sample Section */}
            <div>
              <h2 className="text-xl font-bold text-(--gray-9) mb-4">Select Sample</h2>

              {/* Search & Add Row */}
              <div className="flex gap-3 mb-4 w-1/3">
                <div className="flex-1 relative">
                  <label className="block text-xs font-medium text-(--gray-6) mb-2">
                    Search Sample Name<span className="text-(--destructive)">*</span>
                  </label>
                  <Search className="absolute left-3 bottom-3 w-4 h-4 text-(--gray-4)" />
                  <input
                    type="text"
                    placeholder="Search Sample Name"
                    value={sampleSearch}
                    onChange={(e) => setSampleSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-(--gray-3) rounded-8 focus:ring-2 focus:ring-(--primary) outline-none text-sm"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    onClick={handleAddSample}
                    className="px-5 py-2.5 bg-(--primary) text-(--light) rounded-8 hover:bg-(--primary-2) transition flex items-center gap-2 text-sm font-medium cursor-pointer whitespace-nowrap"
                  >
                    <Plus className="w-4 h-4" />
                    Add Sample
                  </button>
                </div>
              </div>

              {/* Sample Cards Grid */}
              {filteredSamples.length > 0 && (
                <div className="bg-(--gray-0) rounded-8 p-4">
                  <div className="grid grid-cols-4 gap-3">
                    {filteredSamples.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between px-4 py-3 (--background) border border-(--gray-2) rounded-8 hover:shadow-soft transition"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-(--gray-9) truncate">
                            {item.name}
                          </p>
                          <p className="text-xs text-(--gray-0)0 mt-0.5">QTY: {item.quantity}</p>
                        </div>
                        <div className="flex items-center gap-2 ml-2">
                          <button
                            onClick={() => handleEditSample(item.id)}
                            className="p-1.5 text-(--primary) hover:bg-(--primary-0) rounded cursor-pointer"
                            title="Edit quantity"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteSample(item.id)}
                            className="p-1.5 text-(--destructive) hover:bg-(--destructive-0) rounded cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex justify-end gap-4 pt-6 mt-8">
          <button
            onClick={handleDiscard}
            className="px-8 py-3 border border-(--gray-3) text-(--gray-7) rounded-8 hover:bg-(--gray-0) transition cursor-pointer"
          >
            Discard
          </button>
          <button
            onClick={handleAllocate}
            disabled={!selectedEmployee}
            className={`px-10 py-3 bg-(--primary) text-(--light) rounded-8 hover:bg-(--primary-2) transition flex items-center gap-2 shadow-soft cursor-pointer ${
              !selectedEmployee ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <Plus className="w-5 h-5" />
            Allocate
          </button>
        </div>
      </div>
    </div>
  );
}
