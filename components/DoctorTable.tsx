"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Eye, MoreVertical, ChevronRight } from "lucide-react";
import Link from "next/link";
import TableColumnHeader from "@/components/TableColumnHeader";
import TableLoadingState from "@/components/shared/table/TableLoadingState";
import TableErrorState from "@/components/shared/table/TableErrorState";
import TableEmptyState from "@/components/shared/table/TableEmptyState";
import TablePagination from "@/components/TablePagination";

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
    { label: "Name", className: "col-span-2" },
    { label: "Specialization", className: "col-span-2" },
    { label: "Email", className: "col-span-2" },
    { label: "Phone No", className: "col-span-2" },
    { label: "Location", className: "col-span-1" },
    { label: "Status", className: "col-span-2 text-center" },
    { label: "", className: "col-span-1" }, // Empty for action buttons
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
        <div className="px-7">
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
          <TableColumnHeader columns={doctorColumns} gridCols={12} />

          {paginatedDoctors.map((doctor, index) => (
            <div
              key={doctor.id}
              className={`px-3 py-3 hover:bg-(--gray-0) transition-colors flex items-center ${
                index !== paginatedDoctors.length - 1 ? "" : ""
              }`}
            >
              <div className="w-full bg-[var(--background)] rounded-lg p-3 border border-(--gray-2) grid grid-cols-12 gap-4 text-sm">
                {/* Name */}
                <div className="col-span-2 font-bold text-(--gray-9)">{doctor.name}</div>

                {/* Specialty */}
                <div className="col-span-2 text-(--gray-6)">{doctor.specialty}</div>

                {/* Email */}
                <div className="col-span-2 font-bold text-(--gray-9) flex items-center gap-2">
                  {doctor.email}
                </div>

                {/* Phone */}
                <div className="col-span-2 text-(--gray-9) flex items-center gap-2">
                  {doctor.phone}
                </div>

                {/* City */}
                <div className="col-span-1 font-bold text-(--gray-9) flex items-center gap-2">
                  {doctor.city}
                </div>

                {/* Status */}
                <div className="col-span-2 flex justify-center">
                  <span
                    className={`px-12 py-1 rounded-full text-sm font-medium ${
                      doctor.status === "Active"
                        ? "bg-(--success-0) text-(--success)"
                        : "bg-(--gray-1) text-(--gray-6)"
                    }`}
                  >
                    {doctor.status}
                  </span>
                </div>

                {/* View Details + More */}
                <Link
                  href={`/dashboard/doctor-profile`}
                  className="col-span-1 flex items-center justify-end gap-2"
                >
                  <button className="text-(--gray-4) text-sm   flex items-center gap-1 whitespace-nowrap">
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
