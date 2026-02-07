import React, { useState, useEffect } from "react";
import { ListFilter, X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store";
import { getAllSpecializations } from "@/store/slices/specialization/getAllSpecializationsSlice";
import { getAllSegments } from "@/store/slices/segment/getAllSegmentsSlice";
import { getAllChannels } from "@/store/slices/channel/getAllChannelsSlice";
import { getAllRoles } from "@/store/slices/role/getAllRolesSlice";
import { getAllTeams } from "@/store/slices/team/getAllTeamsSlice";
import { getAllUsers } from "@/store/slices/employee/getAllUsersSlice";
import { getProductCategories } from "@/store/slices/product/getProductCategoriesSlice";
import FormSelect from "@/components/form/FormSelect";

interface TableFilterProps {
  showDoctorFilters?: boolean;
  showEmployeeFilters?: boolean;
  showProductFilters?: boolean;
  showGiveawayFilters?: boolean;
  channelId?: string;
  onApply?: () => void;
  onApplyFilters?: (filters: {
    // Doctor filters
    segmentId?: string;
    specializationId?: string;
    // Employee filters
    roleId?: string;
    teamId?: string;
    supervisorId?: string;
    // Product filters
    categoryId?: string;
    // Giveaway filters
    status?: string;
  }) => void;
  onClear?: () => void;
}

export default function TableFilter({
  showDoctorFilters = false,
  showEmployeeFilters = false,
  showProductFilters = false,
  showGiveawayFilters = false,
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
  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedSupervisor, setSelectedSupervisor] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedDateRange, setSelectedDateRange] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [selectedProductStatus, setSelectedProductStatus] = useState("");
  const [selectedGiveawayStatus, setSelectedGiveawayStatus] = useState("");

  // Redux state for filters
  const { specializations } = useAppSelector((state) => state.allSpecializations);
  const { segments } = useAppSelector((state) => state.allSegments);
  const { channels } = useAppSelector((state) => state.allChannels);
  const { roles } = useAppSelector((state) => state.allRoles);
  const { teams } = useAppSelector((state) => state.allTeams);
  const { users } = useAppSelector((state) => state.allUsers);
  const { categories } = useAppSelector((state) => state.productCategories);

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
    if (showEmployeeFilters && isFilterOpen) {
      dispatch(getAllRoles());
      dispatch(getAllTeams());
    }
    if (showProductFilters && isFilterOpen) {
      dispatch(getProductCategories());
    }
  }, [
    dispatch,
    showDoctorFilters,
    showEmployeeFilters,
    showProductFilters,
    isFilterOpen,
    channels.length,
  ]);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsFilterOpen(!isFilterOpen);
        }}
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
            ) : showEmployeeFilters ? (
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
                      ...roles.map((role) => ({
                        value: role.id,
                        label: role.roleName,
                      })),
                    ]}
                    placeholder="Select Role"
                    className="mb-0"
                  />
                </div>

                {/* Team Filter */}
                <div>
                  <FormSelect
                    label="Team"
                    name="team"
                    value={selectedTeam}
                    onChange={setSelectedTeam}
                    options={[
                      { value: "", label: "All Teams" },
                      ...teams.map((team) => ({
                        value: team.id,
                        label: team.name,
                      })),
                    ]}
                    placeholder="Select Team"
                    className="mb-0"
                  />
                </div>

                {/* Supervisor Filter */}
                <div>
                  <FormSelect
                    label="Supervisor"
                    name="supervisor"
                    value={selectedSupervisor}
                    onChange={setSelectedSupervisor}
                    options={[
                      { value: "", label: "All Supervisors" },
                      ...users.map((user) => ({
                        value: user.id,
                        label: `${user.firstName} ${user.lastName}`,
                      })),
                    ]}
                    placeholder="Select Supervisor"
                    className="mb-0"
                  />
                </div>
              </>
            ) : showProductFilters ? (
              <>
                {/* Category Filter */}
                <div>
                  <FormSelect
                    label="Category"
                    name="categoryId"
                    value={selectedCategoryId}
                    onChange={setSelectedCategoryId}
                    options={[
                      { value: "", label: "All Categories" },
                      ...categories.map((cat) => ({
                        value: cat.id,
                        label: cat.productCategory,
                      })),
                    ]}
                    placeholder="Select Category"
                    className="mb-0"
                  />
                </div>
              </>
            ) : showGiveawayFilters ? (
              <>
                {/* Status Filter for Giveaways */}
                <div>
                  <FormSelect
                    label="Status"
                    name="status"
                    value={selectedGiveawayStatus}
                    onChange={setSelectedGiveawayStatus}
                    options={[
                      { value: "", label: "All Status" },
                      { value: "active", label: "Active" },
                      { value: "inactive", label: "Inactive" },
                    ]}
                    placeholder="Select Status"
                    className="mb-0"
                  />
                </div>
              </>
            ) : null}

            {/* Status Filter (Common for Doctor, Employee, and Product) */}
            {(showDoctorFilters || showEmployeeFilters || showProductFilters) && (
              <div>
                <FormSelect
                  label="Status"
                  name="status"
                  value={showProductFilters ? selectedProductStatus : selectedStatus}
                  onChange={showProductFilters ? setSelectedProductStatus : setSelectedStatus}
                  options={[
                    { value: "", label: "All Status" },
                    { value: "active", label: "Active" },
                    { value: "inactive", label: "Inactive" },
                    ...(showEmployeeFilters
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
            )}

            {!showDoctorFilters &&
              !showEmployeeFilters &&
              !showProductFilters &&
              !showGiveawayFilters && (
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
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelectedSegment("");
                  setSelectedSpecialization("");
                  setSelectedRole("");
                  setSelectedTeam("");
                  setSelectedSupervisor("");
                  setSelectedStatus("");
                  setSelectedDateRange("");
                  setSelectedCategoryId("");
                  setSelectedProductStatus("");
                  setSelectedGiveawayStatus("");
                  // Trigger filter update with empty values
                  if (onApplyFilters) {
                    onApplyFilters({
                      segmentId: "",
                      specializationId: "",
                      roleId: "",
                      teamId: "",
                      supervisorId: "",
                      categoryId: "",
                      status: "",
                    });
                  }
                  onClear?.();
                  setIsFilterOpen(false);
                }}
                className="flex-1 px-4 py-2.5 border cursor-pointer border-[var(--gray-3)] text-[var(--gray-7)] rounded-8 text-sm font-medium hover:bg-[var(--gray-0)] transition"
              >
                Clear All
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (onApplyFilters) {
                    onApplyFilters({
                      // Doctor filters
                      segmentId: selectedSegment,
                      specializationId: selectedSpecialization,
                      // Employee filters
                      roleId: selectedRole,
                      teamId: selectedTeam,
                      supervisorId: selectedSupervisor,
                      // Product filters
                      categoryId: selectedCategoryId,
                      status: showProductFilters
                        ? selectedProductStatus
                        : showGiveawayFilters
                          ? selectedGiveawayStatus
                          : selectedStatus,
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
