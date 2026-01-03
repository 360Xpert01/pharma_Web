"use client";

import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import TableColumnHeader from "@/components/TableColumnHeader";
import TableLoadingState from "@/components/shared/table/TableLoadingState";
import TableErrorState from "@/components/shared/table/TableErrorState";
import TableEmptyState from "@/components/shared/table/TableEmptyState";
import TablePagination from "@/components/TablePagination";
import StatusBadge from "@/components/shared/StatusBadge";

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  email: string;
  phone: string;
  city: string;
  status: "Active" | "Inactive";
}

const doctorsData: Doctor[] = [
  {
    id: "1",
    name: "Dr. Sarah Ali",
    specialty: "Cardiologist",
    email: "sarah@gmail.com",
    phone: "+932143235236",
    city: "Karachi",
    status: "Active",
  },
  {
    id: "2",
    name: "Dr. Sarah Ali",
    specialty: "Cardiologist",
    email: "sarah@gmail.com",
    phone: "+932143235236",
    city: "Karachi",
    status: "Active",
  },
  {
    id: "3",
    name: "Dr. Sarah Ali",
    specialty: "Cardiologist",
    email: "sarah@gmail.com",
    phone: "+932143235236",
    city: "Karachi",
    status: "Active",
  },
  {
    id: "4",
    name: "Dr. Sarah Ali",
    specialty: "Cardiologist",
    email: "sarah@gmail.com",
    phone: "+932143235236",
    city: "Karachi",
    status: "Active",
  },
  {
    id: "5",
    name: "Dr. Sarah Ali",
    specialty: "Cardiologist",
    email: "sarah@gmail.com",
    phone: "+932143235236",
    city: "Karachi",
    status: "Active",
  },
  {
    id: "6",
    name: "Dr. Sarah Ali",
    specialty: "Cardiologist",
    email: "sarah@gmail.com",
    phone: "+932143235236",
    city: "Karachi",
    status: "Inactive",
  },
  {
    id: "7",
    name: "Dr. Sarah Ali",
    specialty: "Cardiologist",
    email: "sarah@gmail.com",
    phone: "+932143235236",
    city: "Karachi",
    status: "Inactive",
  },
];

export default function DoctorsTable() {
  // Simulate loading and error states (replace with actual API call state)
  const [loading] = useState(false);
  const [error] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Define columns for the table header
  const doctorColumns = [
    { label: "Name", className: "w-[15%]" },
    { label: "Specialization", className: "w-[15%]" },
    { label: "Email", className: "w-[20%]" },
    { label: "Phone No", className: "w-[15%]" },
    { label: "Location", className: "w-[10%]" },
    { label: "Status", className: "w-[12%] text-center" },
    { label: "", className: "w-[13%]" }, // Empty for action buttons
  ];

  const handleRetry = () => {
    // Add retry logic here when connected to API
    window.location.reload();
  };

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
  const paginatedDoctors = doctorsData.slice(startIndex, endIndex);

  return (
    <div className="w-full overflow-hidden">
      {loading ? (
        <div className="px-4">
          <TableLoadingState variant="skeleton" rows={5} columns={7} message="Loading doctors..." />
        </div>
      ) : error ? (
        <TableErrorState error={error} onRetry={handleRetry} title="Failed to load doctors" />
      ) : doctorsData.length === 0 ? (
        <TableEmptyState
          message="No doctors found"
          description="There are currently no doctors in the system."
        />
      ) : (
        <>
          <TableColumnHeader
            columns={doctorColumns}
            containerClassName="flex w-full px-3"
            showBackground={false}
          />

          {paginatedDoctors.map((doctor) => (
            <div key={doctor.id} className="px-3 py-1">
              <div className="w-full bg-[var(--background)] rounded-8 p-3 border border-(--gray-2) flex items-center hover:bg-(--gray-0) transition-all cursor-pointer">
                {/* Name */}
                <div className="w-[15%] t-td-b truncate" title={doctor.name}>
                  {doctor.name}
                </div>

                {/* Specialty */}
                <div className="w-[15%] t-td truncate" title={doctor.specialty}>
                  {doctor.specialty}
                </div>

                {/* Email */}
                <div className="w-[20%] t-td-b truncate" title={doctor.email}>
                  {doctor.email}
                </div>

                {/* Phone */}
                <div className="w-[15%] t-td truncate" title={doctor.phone}>
                  {doctor.phone}
                </div>

                {/* City */}
                <div className="w-[10%] t-td-b truncate" title={doctor.city}>
                  {doctor.city}
                </div>

                {/* Status */}
                <div className="w-[12%] flex justify-center">
                  <StatusBadge status={doctor.status} />
                </div>

                {/* View Details + More */}
                <Link
                  href={`/dashboard/doctor-profile`}
                  className="w-[13%] flex items-center justify-end gap-1"
                >
                  <button className="t-sm flex items-center gap-1 whitespace-nowrap">
                    View Details
                  </button>
                  <ChevronRight className="w-6 h-6 text-(--primary)" />
                </Link>
              </div>
            </div>
          ))}

          {/* Pagination */}
          {doctorsData.length > 0 && (
            <TablePagination
              currentPage={currentPage}
              totalItems={doctorsData.length}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
              onItemsPerPageChange={handleItemsPerPageChange}
              pageSizeOptions={[10, 20, 30, 50]}
              showPageInfo={true}
              showItemsPerPageSelector={true}
            />
          )}
        </>
      )}
    </div>
  );
}
