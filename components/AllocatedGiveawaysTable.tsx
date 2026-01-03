"use client";

import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import TableColumnHeader from "@/components/TableColumnHeader";
import TablePagination from "@/components/TablePagination";

interface AllocationRecord {
  id: string;
  pulseCode: string;
  employeeName: string;
  email: string;
  totalGiveaways: number;
  totalSamples: number;
  profilePicture?: string;
}

// Mock data - Replace with actual Redux state
const mockAllocations: AllocationRecord[] = [
  {
    id: "1",
    pulseCode: "000125",
    employeeName: "Hassan Ali",
    email: "h.ali@creativedesigns.com",
    totalGiveaways: 6,
    totalSamples: 8,
    profilePicture: "/girlPic.svg",
  },
  {
    id: "2",
    pulseCode: "000126",
    employeeName: "Amina Ahmed",
    email: "a.ahmed@creativedesigns.com",
    totalGiveaways: 20,
    totalSamples: 15,
    profilePicture: "/girlPic.svg",
  },
  {
    id: "3",
    pulseCode: "000127",
    employeeName: "Ravi Kumar",
    email: "r.kumar@creativedesigns.com",
    totalGiveaways: 4,
    totalSamples: 9,
    profilePicture: "/girlPic.svg",
  },
  {
    id: "4",
    pulseCode: "000129",
    employeeName: "Liam Smith",
    email: "l.smith@creativedesigns.com",
    totalGiveaways: 7,
    totalSamples: 5,
    profilePicture: "/girlPic.svg",
  },
  {
    id: "5",
    pulseCode: "000126",
    employeeName: "Sara Khan",
    email: "s.khan@creativedesigns.com",
    totalGiveaways: 10,
    totalSamples: 12,
    profilePicture: "/girlPic.svg",
  },
  {
    id: "6",
    pulseCode: "000131",
    employeeName: "Omar Farooq",
    email: "o.farooq@creativedesigns.com",
    totalGiveaways: 9,
    totalSamples: 14,
    profilePicture: "/girlPic.svg",
  },
  {
    id: "7",
    pulseCode: "000125",
    employeeName: "Hassan Ali",
    email: "h.ali@creativedesigns.com",
    totalGiveaways: 6,
    totalSamples: 8,
    profilePicture: "/girlPic.svg",
  },
  {
    id: "8",
    pulseCode: "000132",
    employeeName: "Emily Johnson",
    email: "e.johnson@creativedesigns.com",
    totalGiveaways: 5,
    totalSamples: 6,
    profilePicture: "/girlPic.svg",
  },
  {
    id: "9",
    pulseCode: "000130",
    employeeName: "Nina Patel",
    email: "n.patel@creativedesigns.com",
    totalGiveaways: 3,
    totalSamples: 11,
    profilePicture: "/girlPic.svg",
  },
];

export default function AllocatedGiveawaysTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const allocationColumns = [
    { label: "Pulse Code", className: "w-[20%]" },
    { label: "Employee Name", className: "w-[30%]" },
    { label: "Total Giveaways", className: "w-[15%] text-center" },
    { label: "Total Samples", className: "w-[15%] text-center" },
    { label: "", className: "w-[20%]" },
  ];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  // Calculate paginated data
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedAllocations = mockAllocations.slice(startIndex, endIndex);

  return (
    <div>
      <TableColumnHeader
        columns={allocationColumns}
        containerClassName="flex w-full px-4"
        showBackground={false}
      />

      {paginatedAllocations.map((allocation) => (
        <div
          key={allocation.id}
          className="px-3 py-3 w-[98%] flex items-center gap-4 hover:bg-[var(--gray-0)] transition-all border border-[var(--gray-2)] mx-4 my-3 rounded-8 bg-[var(--background)]"
        >
          {/* Pulse Code */}
          <div
            className="w-[20%] text-sm font-bold text-[var(--gray-9)] truncate"
            title={`EMP_${allocation.pulseCode}`}
          >
            EMP_{allocation.pulseCode}
          </div>

          {/* Employee Name with Avatar */}
          <div className="flex w-[30%] items-center gap-3 min-w-0">
            <Image
              src={allocation.profilePicture || "/girlPic.svg"}
              alt={allocation.employeeName}
              width={40}
              height={40}
              className="rounded-8 flex-shrink-0"
            />
            <div className="min-w-0 flex-1">
              <p
                className="font-semibold text-[var(--gray-9)] truncate text-sm"
                title={allocation.employeeName}
              >
                {allocation.employeeName}
              </p>
              <span
                className="text-xs text-[var(--gray-5)] truncate block"
                title={allocation.email}
              >
                {allocation.email}
              </span>
            </div>
          </div>

          {/* Total Giveaways */}
          <div className="w-[15%] text-center">
            <span className="text-sm font-bold text-[var(--gray-9)]">
              {allocation.totalGiveaways.toString().padStart(2, "0")}
            </span>
          </div>

          {/* Total Samples */}
          <div className="w-[15%] text-center">
            <span className="text-sm font-bold text-[var(--gray-9)]">
              {allocation.totalSamples.toString().padStart(2, "0")}
            </span>
          </div>

          {/* View Details Button - Non-functional */}
          <div className="w-[20%] flex justify-end">
            <button className="flex items-center cursor-pointer gap-1 text-sm text-[var(--gray-5)] hover:text-[var(--primary)] transition-colors whitespace-nowrap">
              View Details
              <ChevronRight className="w-5 h-5 text-[var(--primary)]" />
            </button>
          </div>
        </div>
      ))}

      {/* Pagination */}
      {mockAllocations.length > 0 && (
        <TablePagination
          currentPage={currentPage}
          totalItems={mockAllocations.length}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      )}
    </div>
  );
}
