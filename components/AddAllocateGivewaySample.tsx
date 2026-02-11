"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, Plus, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store";
import { getAllGiveaways } from "@/store/slices/giveaway/getAllGiveawaysSlice";
import { getAllUsers } from "@/store/slices/employee/getAllUsersSlice";
import { getAllProductSkus } from "@/store/slices/product/getAllProductSkusSlice";
import { allocateUser, resetAllocateUserState } from "@/store/slices/allocation/allocateUserSlice";
import toast from "react-hot-toast";
import { FormInput } from "@/components/form";
import GiveawayAllocation from "./allocation/GiveawayAllocation";
import SampleAllocation from "./allocation/SampleAllocation";

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
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Redux state for employees, giveaways, and samples
  const { users, loading: employeesLoading } = useAppSelector((state) => state.allUsers);
  const { giveaways, loading: giveawaysLoading } = useAppSelector((state) => state.allGiveaways);
  const { productSkus, loading: samplesLoading } = useAppSelector((state) => state.allProductSkus);
  const {
    loading: allocateLoading,
    success: allocateSuccess,
    error: allocateError,
  } = useAppSelector((state) => state.allocateUser);

  // Employee search and selection states
  const [employeeSearch, setEmployeeSearch] = useState("");
  const [showEmployeeDropdown, setShowEmployeeDropdown] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeData | null>(null);

  // Selected items state
  const [selectedGiveaways, setSelectedGiveaways] = useState<GiveawayItem[]>([]);
  const [selectedSamples, setSelectedSamples] = useState<SampleItem[]>([]);

  // Fetch employees, giveaways, and product SKUs on mount
  useEffect(() => {
    dispatch(getAllUsers({ page: 1, limit: 1000 }));
    dispatch(getAllGiveaways({ page: 1, limit: 1000 }));
    dispatch(getAllProductSkus());

    return () => {
      dispatch(resetAllocateUserState());
    };
  }, [dispatch]);

  // Handle allocation success
  useEffect(() => {
    if (allocateSuccess) {
      toast.success("Items allocated successfully!");

      // Reset form
      handleDiscard();

      // Redirect to allocation list page after a short delay
      setTimeout(() => {
        router.push("/dashboard/allocate-giveways-sample");
      }, 1500);
    }
  }, [allocateSuccess, router]);

  // Handle allocation error
  useEffect(() => {
    if (allocateError) {
      toast.error(allocateError);
    }
  }, [allocateError]);

  // Handle click outside dropdowns
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

  const handleUpdateGiveawayQuantity = (id: string, quantity: number) => {
    setSelectedGiveaways((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item))
    );
  };

  const handleUpdateSampleQuantity = (id: string, quantity: number) => {
    setSelectedSamples((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item))
    );
  };

  const handleAddGiveaway = (giveaway: any) => {
    if (!selectedGiveaways.find((g) => g.id === giveaway.id)) {
      setSelectedGiveaways((prev) => [
        ...prev,
        { id: giveaway.id, name: giveaway.name, quantity: 1 },
      ]);
    } else {
      toast.error("This giveaway is already added");
    }
  };

  const handleAddSample = (sample: any) => {
    if (!selectedSamples.find((s) => s.id === sample.productSkuId)) {
      const skuStr = typeof sample.sku === "object" ? sample.sku?.sku : sample.sku;
      setSelectedSamples((prev) => [
        ...prev,
        { id: sample.productSkuId, name: `${sample.productName} - ${skuStr}`, quantity: 1 },
      ]);
    } else {
      toast.error("This sample is already added");
    }
  };

  const handleDiscard = () => {
    setSelectedEmployee(null);
    setEmployeeSearch("");
    setSelectedGiveaways([]);
    setSelectedSamples([]);
    dispatch(resetAllocateUserState());
  };

  const handleAllocate = () => {
    if (!selectedEmployee) {
      toast.error("Please select an employee");
      return;
    }
    if (selectedGiveaways.length === 0 && selectedSamples.length === 0) {
      toast.error("Please select at least one giveaway or sample");
      return;
    }

    // Prepare payload for API
    const payload = {
      userId: selectedEmployee.id,
      giveaway: selectedGiveaways.map((g) => ({ id: g.id, quantity: g.quantity })),
      sample: selectedSamples.map((s) => ({ id: s.id, quantity: s.quantity })),
    };

    dispatch(allocateUser(payload));
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
                    setSelectedEmployee(null);
                  }}
                  onFocus={() => setShowEmployeeDropdown(true)}
                  className="w-full pl-10 pr-4 py-2.5 border border-(--gray-3) rounded-8 focus:ring-2 focus:ring-(--primary) outline-none text-sm"
                />
                {employeesLoading && (
                  <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-(--primary)" />
                )}
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
                          <p className="text-xs text-(--gray-6) truncate">{employee.email}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
            </div>

            {/* Helper Text */}
            <div className="flex-1">
              <p className="text-sm text-(--gray-6) mt-6">
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <FormInput
                label="Team Pulse Code"
                name="pulseCode"
                value={selectedEmployee.pulseCode || ""}
                onChange={() => {}}
                required
                readOnly
              />
              <FormInput
                label="Employee Name"
                name="employeeName"
                value={`${selectedEmployee.firstName} ${selectedEmployee.lastName}`}
                onChange={() => {}}
                readOnly
              />
              <FormInput
                label="Role"
                name="role"
                value="Sales Representative"
                onChange={() => {}}
                readOnly
              />
              <FormInput label="Manager" name="manager" value="-" onChange={() => {}} readOnly />
            </div>

            {/* Select Giveaway Section */}
            <GiveawayAllocation
              allGiveaways={giveaways.filter(
                (g) => !selectedGiveaways.find((sg) => sg.id === g.id)
              )}
              selectedGiveaways={selectedGiveaways}
              onAddGiveaway={handleAddGiveaway}
              onRemoveGiveaway={handleDeleteGiveaway}
              onUpdateQuantity={handleUpdateGiveawayQuantity}
              loading={giveawaysLoading}
            />

            {/* Select Sample Section */}
            <SampleAllocation
              allSamples={productSkus.filter(
                (s) => !selectedSamples.find((ss) => ss.id === s.productSkuId)
              )}
              selectedSamples={selectedSamples}
              onAddSample={handleAddSample}
              onRemoveSample={handleDeleteSample}
              onUpdateQuantity={handleUpdateSampleQuantity}
              loading={samplesLoading}
            />
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex justify-end gap-4 pt-6 mt-8">
          <button
            onClick={handleDiscard}
            disabled={allocateLoading}
            className="px-8 py-3 border border-(--gray-3) text-(--gray-7) rounded-8 hover:bg-(--gray-0) transition cursor-pointer disabled:opacity-50"
          >
            Discard
          </button>
          <button
            onClick={handleAllocate}
            disabled={!selectedEmployee || allocateLoading}
            className={`px-10 py-3 bg-(--primary) text-(--light) rounded-8 hover:bg-(--primary-2) transition flex items-center gap-2 shadow-soft cursor-pointer ${
              !selectedEmployee || allocateLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {allocateLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Allocating...
              </>
            ) : (
              <>
                <Plus className="w-5 h-5" />
                Allocate
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
