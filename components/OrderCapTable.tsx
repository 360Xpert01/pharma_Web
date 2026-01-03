"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import TableLoadingState from "@/components/shared/table/TableLoadingState";
import TableErrorState from "@/components/shared/table/TableErrorState";
import TableEmptyState from "@/components/shared/table/TableEmptyState";
import TablePagination from "@/components/TablePagination";
import TableColumnHeader from "@/components/TableColumnHeader";

interface BookingItem {
  id: string;
  avatar: string;
  name: string;
  position: string;
  company: string;
  date: string;
  medicine: string;
  dosages: string[];
  customer: string;
}

const bookingData: BookingItem[] = [
  {
    id: "1",
    avatar: "/avatars/mohammad-amir.jpg",
    name: "Mohammad Amir",
    position: "Sales Representative",
    company: "DavaGo - Clifton",
    date: "2025-10-15",
    medicine: "Amoxicillin",
    dosages: ["Tablet 10Mg", "Tablet 40Mg", "Tablet 40Mg"],
    customer: "Clifton",
  },
  {
    id: "2",
    avatar: "/avatars/sarah-johnson.jpg",
    name: "Sarah Johnson",
    position: "Marketing Specialist",
    company: "Imtiaz Medical Center",
    date: "2025-10-20",
    medicine: "Ibuprofen",
    dosages: ["Tablet 200Mg", "Tablet 400Mg"],
    customer: "Teen Talwaar",
  },
  {
    id: "3",
    avatar: "/avatars/michael-smith.jpg",
    name: "Michael Smith",
    position: "Product Manager",
    company: "Tech Innovations Inc.",
    date: "2025-12-01",
    medicine: "Paracetamol",
    dosages: ["Capsule 500Mg", "Capsule 1000Mg"],
    customer: "John Doe",
  },
  {
    id: "4",
    avatar: "/avatars/emily-davis.jpg",
    name: "Emily Davis",
    position: "UX Designer",
    company: "Creative Solutions Co.",
    date: "2025-09-15",
    medicine: "Aspirin",
    dosages: ["Tablet 100Mg", "Tablet 300Mg"],
    customer: "Jane Roe",
  },
  {
    id: "5",
    avatar: "/avatars/david-brown.jpg",
    name: "David Brown",
    position: "Software Engineer",
    company: "NextGen Systems",
    date: "2025-08-30",
    medicine: "Amoxicillin",
    dosages: ["Capsule 250Mg", "Capsule 500Mg"],
    customer: "Alice Smith",
  },
  {
    id: "6",
    avatar: "/avatars/sophia-wilson.jpg",
    name: "Sophia Wilson",
    position: "Data Analyst",
    company: "Market Insights LLC",
    date: "2025-11-05",
    medicine: "Metformin",
    dosages: ["Tablet 500Mg", "Tablet 1000Mg"],
    customer: "Bob Johnson",
  },
  {
    id: "7",
    avatar: "/avatars/james-taylor.jpg",
    name: "James Taylor",
    position: "Sales Executive",
    company: "Global Commerce",
    date: "2025-07-25",
    medicine: "Ciprofloxacin",
    dosages: ["Tablet 250Mg", "Tablet 500Mg"],
    customer: "Charlie Brown",
  },
  {
    id: "8",
    avatar: "/avatars/olivia-martinez.jpg",
    name: "Olivia Martinez",
    position: "HR Coordinator",
    company: "People First Corp.",
    date: "2025-06-10",
    medicine: "Lisinopril",
    dosages: ["Tablet 10Mg", "Tablet 20Mg"],
    customer: "Emma Davis",
  },
  {
    id: "9",
    avatar: "/avatars/daniel-anderson.jpg",
    name: "Daniel Anderson",
    position: "Finance Manager",
    company: "Wealth Solutions",
    date: "2025-05-22",
    medicine: "Atorvastatin",
    dosages: ["Tablet 10Mg", "Tablet 40Mg"],
    customer: "Lucas Wilson",
  },
  {
    id: "10",
    avatar: "/avatars/isabella-thomas.jpg",
    name: "Isabella Thomas",
    position: "Customer Support Lead",
    company: "Service Excellence",
    date: "2025-04-12",
    medicine: "Levothyroxine",
    dosages: ["Tablet 50Mcg", "Tablet 100Mcg"],
    customer: "Grace Taylor",
  },
];

export default function BookingTable() {
  // Simulate loading and error states (replace with actual API call state)
  const [loading] = useState(false);
  const [error] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

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
  const paginatedBookings = bookingData.slice(startIndex, endIndex);

  // Define columns for the table header
  const orderColumns = [
    { label: "Sales Rep", className: "w-[20%]" },
    { label: "Company", className: "w-[15%]" },
    { label: "Date", className: "w-[12%]" },
    { label: "Product", className: "w-[15%]" },
    { label: "SKU's", className: "w-[20%]" },
    { label: "Location", className: "w-[12%]" },
  ];

  return (
    <div className="w-full overflow-hidden">
      {loading ? (
        <div className="px-4">
          <TableLoadingState
            variant="skeleton"
            rows={5}
            columns={5}
            message="Loading bookings..."
          />
        </div>
      ) : error ? (
        <TableErrorState error={error} onRetry={handleRetry} title="Failed to load bookings" />
      ) : bookingData.length === 0 ? (
        <TableEmptyState
          message="No bookings found"
          description="There are currently no order capture records to display."
        />
      ) : (
        <>
          <TableColumnHeader
            columns={orderColumns}
            containerClassName="flex w-full px-3"
            showBackground={false}
          />

          {paginatedBookings.map((item) => (
            <div key={item.id} className="px-3 py-1">
              <div className="w-full bg-[var(--background)] rounded-8 p-3 border border-(--gray-2) flex items-center hover:bg-(--gray-0) transition-all cursor-pointer">
                {/* Employee - Avatar + Name + Position */}
                <div className="w-[20%] flex items-center gap-3">
                  <Image
                    src={item.avatar}
                    alt={item.name}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-8 object-cover border-2 border-(--light) shadow-soft flex-shrink-0"
                    onError={(e) => {
                      e.currentTarget.src = "/girlPic.svg";
                    }}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="t-td-b truncate">{item.name}</p>
                    <p className="t-cap truncate">{item.position}</p>
                  </div>
                </div>

                {/* Company */}
                <div className="w-[15%]">
                  <p className="t-td-b truncate">{item.company}</p>
                </div>

                {/* Date */}
                <div className="w-[12%]">
                  <p className="t-td truncate">{item.date}</p>
                </div>

                {/* Medicine */}
                <div className="w-[15%]">
                  <p className="t-td-b truncate">{item.medicine}</p>
                </div>

                {/* Dosages */}
                <div className="w-[20%] flex flex-wrap gap-2">
                  {item.dosages.map((dose, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-(--gray-1) text-(--gray-7) rounded-8 t-sm font-medium whitespace-nowrap"
                    >
                      {dose}
                    </span>
                  ))}
                </div>

                {/* Customer */}
                <div className="w-[12%]">
                  <p className="t-td-b truncate">{item.customer}</p>
                </div>
              </div>
            </div>
          ))}

          {/* Pagination */}
          {bookingData.length > 0 && (
            <TablePagination
              currentPage={currentPage}
              totalItems={bookingData.length}
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
