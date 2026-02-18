import React, { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { Search, Upload } from "lucide-react";
import Image from "next/image";
import FormSelect from "@/components/form/FormSelect";
import TableFilter from "./TableFilter";

interface UsersHeaderProps {
  campHeading?: string;
  filterT?: boolean;
  title?: string;
  showInactiveToggle?: boolean;
  inactiveLabel?: string;
  onSearch?: (term: string) => void;
  showDoctorFilters?: boolean;
  showEmployeeFilters?: boolean;
  showProductFilters?: boolean;
  showGiveawayFilters?: boolean;
  showTeamFilters?: boolean;
  isAllocate?: boolean;
  channelId?: string;
  onApplyFilters?: (filters: {
    segmentId?: string;
    specializationId?: string;
    roleId?: string;
    teamId?: string;
    supervisorId?: string;
    categoryId?: string;
    status?: string;
    employeeId?: string;
    channelId?: string;
  }) => void;
}

export default function UsersHeader({
  campHeading,
  filterT,
  title,
  showInactiveToggle = true,
  inactiveLabel,
  onSearch,
  showDoctorFilters = false,
  showEmployeeFilters = false,
  showProductFilters = false,
  showGiveawayFilters = false,
  showTeamFilters = false,
  isAllocate = false,
  channelId,
  onApplyFilters,
}: UsersHeaderProps) {
  const [openId, setOpenId] = useState<boolean>(false);
  const [showInactive, setShowInactive] = useState(false);
  const [sortBy, setSortBy] = useState("recently-created");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch] = useDebounce(searchTerm, 500);

  useEffect(() => {
    onSearch?.(debouncedSearch);
  }, [debouncedSearch, onSearch]);

  const exportBtn = () => {
    console.log("export btn clicked");
  };

  return (
    <div className="bg-[var(--background)]">
      <div className="px-4 py-5 flex items-center justify-between gap-6">
        {/* Left: Search + Filter */}
        <div className="flex items-center gap-3">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--gray-9)] pointer-events-none" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2.5 w-64 bg-[var(--gray-2)] text-[var(--gray-9)] rounded-8 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:bg-[var(--light)] transition-all duration-200"
            />
          </div>

          {filterT && (
            <TableFilter
              showDoctorFilters={showDoctorFilters}
              showEmployeeFilters={showEmployeeFilters}
              showProductFilters={showProductFilters}
              showGiveawayFilters={showGiveawayFilters}
              showTeamFilters={showTeamFilters}
              isAllocate={isAllocate}
              channelId={channelId}
              onApplyFilters={onApplyFilters}
            />
          )}
        </div>

        {/* Right: Checkbox + Sort Dropdown + Export Button */}
        <div className="flex items-center gap-3">
          {/* Quick Sort Dropdown */}
          {/* <FormSelect
            label=""
            name="sortBy"
            value={sortBy}
            onChange={setSortBy}
            options={[
              { value: "recently-created", label: "Recently Created" },
              { value: "recently-modified", label: "Recently Modified" },
            ]}
            placeholder="Quick Sort"
            className="mb-0"
            selectClassName="mt-0"
          /> */}

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
    </div>
  );
}
