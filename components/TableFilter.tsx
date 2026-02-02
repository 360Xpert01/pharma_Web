import React, { useState, useEffect } from "react";
import { ListFilter, X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store";
import { getAllSpecializations } from "@/store/slices/specialization/getAllSpecializationsSlice";
import { getAllSegments } from "@/store/slices/segment/getAllSegmentsSlice";
import { getAllChannels } from "@/store/slices/channel/getAllChannelsSlice";
import FormSelect from "@/components/form/FormSelect";

interface TableFilterProps {
  showDoctorFilters?: boolean;
  channelId?: string;
  onApply?: () => void;
  onApplyFilters?: (filters: {
    segmentId?: string;
    specializationId?: string;
    status?: string;
  }) => void;
  onClear?: () => void;
}

export default function TableFilter({
  showDoctorFilters = false,
  channelId,
  onApply,
  onApplyFilters,
  onClear,
}: TableFilterProps) {
  const dispatch = useAppDispatch();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filter States
  const [selectedSegment, setSelectedSegment] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedDateRange, setSelectedDateRange] = useState("");

  // Redux state for filters
  const { specializations } = useAppSelector((state) => state.allSpecializations);
  const { segments } = useAppSelector((state) => state.allSegments);
  const { channels } = useAppSelector((state) => state.allChannels);

  // Find current channel to check if it's "Doctor"
  const currentChannel = channels.find((ch) => ch.id === channelId);
  const isDoctorChannel = currentChannel?.name?.toLowerCase().includes("doctor") || false;

  useEffect(() => {
    if (showDoctorFilters && isFilterOpen) {
      dispatch(getAllSpecializations());
      dispatch(getAllSegments());
      if (channels.length === 0) {
        dispatch(getAllChannels());
      }
    }
  }, [dispatch, showDoctorFilters, isFilterOpen, channels.length]);

  return (
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
        <div className="absolute cursor-pointer left-0 mt-2 w-72 bg-[var(--background)] rounded-8 shadow-soft border border-[var(--gray-2)] z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="p-5 space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h3 className="t-h4">Filter by</h3>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="text-[var(--gray-4)] hover:text-[var(--gray-6)] cursor-pointer transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {showDoctorFilters ? (
              <>
                {/* Segment Filter */}
                <div>
                  <FormSelect
                    label="Segment"
                    name="segment"
                    value={selectedSegment}
                    onChange={setSelectedSegment}
                    options={[
                      { value: "", label: "All Segments" },
                      ...segments.map((seg) => ({
                        value: seg.id,
                        label: seg.name,
                      })),
                    ]}
                    placeholder="Select Segment"
                    className="mb-0"
                  />
                </div>

                {/* Specialization Filter - Only show if channel is "Doctor" */}
                {isDoctorChannel && (
                  <div>
                    <FormSelect
                      label="Specialization"
                      name="specialization"
                      value={selectedSpecialization}
                      onChange={setSelectedSpecialization}
                      options={[
                        { value: "", label: "All Specializations" },
                        ...specializations.map((spec) => ({
                          value: spec.id,
                          label: spec.name,
                        })),
                      ]}
                      placeholder="Select Specialization"
                      className="mb-0"
                    />
                  </div>
                )}
              </>
            ) : (
              <>
                {/* Role Filter */}
                <div>
                  <FormSelect
                    label="Role"
                    name="role"
                    value={selectedRole}
                    onChange={setSelectedRole}
                    options={[
                      { value: "", label: "All Roles" },
                      { value: "admin", label: "Admin" },
                      { value: "manager", label: "Manager" },
                      { value: "sales_rep", label: "Sales Rep" },
                      { value: "doctor", label: "Doctor" },
                      { value: "pharmacist", label: "Pharmacist" },
                    ]}
                    placeholder="Select Role"
                    className="mb-0"
                  />
                </div>
              </>
            )}

            {/* Status Filter (Common for both) */}
            <div>
              <FormSelect
                label="Status"
                name="status"
                value={selectedStatus}
                onChange={setSelectedStatus}
                options={[
                  { value: "", label: "All Status" },
                  { value: "active", label: "Active" },
                  { value: "inactive", label: "Inactive" },
                  ...(!showDoctorFilters
                    ? [
                        { value: "pending", label: "Pending" },
                        { value: "suspended", label: "Suspended" },
                      ]
                    : []),
                ]}
                placeholder="Select Status"
                className="mb-0"
              />
            </div>

            {!showDoctorFilters && (
              /* Date Range */
              <div>
                <FormSelect
                  label="Date Range"
                  name="dateRange"
                  value={selectedDateRange}
                  onChange={setSelectedDateRange}
                  options={[
                    { value: "30_days", label: "Last 30 Days" },
                    { value: "7_days", label: "Last 7 Days" },
                    { value: "this_month", label: "This Month" },
                    { value: "last_month", label: "Last Month" },
                    { value: "custom", label: "Custom Range" },
                  ]}
                  placeholder="Select Date Range"
                  className="mb-0"
                />
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-3">
              <button
                onClick={() => {
                  setSelectedSegment("");
                  setSelectedSpecialization("");
                  setSelectedRole("");
                  setSelectedStatus("");
                  setSelectedDateRange("");
                  onClear?.();
                }}
                className="flex-1 px-4 py-2.5 border cursor-pointer border-[var(--gray-3)] text-[var(--gray-7)] rounded-8 text-sm font-medium hover:bg-[var(--gray-0)] transition"
              >
                Clear All
              </button>
              <button
                onClick={() => {
                  if (onApplyFilters) {
                    onApplyFilters({
                      segmentId: selectedSegment,
                      specializationId: selectedSpecialization,
                      status: selectedStatus,
                    });
                  }
                  onApply?.();
                  setIsFilterOpen(false);
                }}
                className="flex-1 px-4 py-2.5 bg-[var(--primary)] text-[var(--light)] rounded-8 cursor-pointer text-sm font-medium hover:bg-[var(--primary-2)] transition shadow-soft"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
