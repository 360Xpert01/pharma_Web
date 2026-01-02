"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import TableLoadingState from "@/components/shared/table/TableLoadingState";
import TableErrorState from "@/components/shared/table/TableErrorState";
import TableEmptyState from "@/components/shared/table/TableEmptyState";
import TablePagination from "@/components/TablePagination";

interface RequestItem {
  id: string;
  avatar: string;
  name: string;
  position: string;
  doctor: string;
  specialty: string;
  area: string;
}

const requestData: RequestItem[] = [
  {
    id: "1",
    avatar: "/avatars/amir-1.jpg",
    name: "Mohammad Amir",
    position: "Sales Representative",
    doctor: "Dr. Rashid Ahmed",
    specialty: "Cardiologist",
    area: "Gulshan-e-iqbal-b121-7500",
  },
  {
    id: "2",
    avatar: "/avatars/amir-2.jpg",
    name: "Mohammad Amir",
    position: "Sales Representative",
    doctor: "Dr. Rashid Ahmed",
    specialty: "Cardiologist",
    area: "Gulshan-e-iqbal-b121-7500",
  },
  {
    id: "3",
    avatar: "/avatars/amir-3.jpg",
    name: "Mohammad Amir",
    position: "Sales Representative",
    doctor: "Dr. Rashid Ahmed",
    specialty: "Cardiologist",
    area: "Gulshan-e-iqbal-b121-7500",
  },
  {
    id: "4",
    avatar: "/avatars/amir-4.jpg",
    name: "Mohammad Amir",
    position: "Sales Representative",
    doctor: "Dr. Rashid Ahmed",
    specialty: "Cardiologist",
    area: "Gulshan-e-iqbal-b121-7500",
  },
  {
    id: "5",
    avatar: "/avatars/amir-5.jpg",
    name: "Mohammad Amir",
    position: "Sales Representative",
    doctor: "Dr. Rashid Ahmed",
    specialty: "Cardiologist",
    area: "Gulshan-e-iqbal-b121-7500",
  },
  {
    id: "6",
    avatar: "/avatars/amir-6.jpg",
    name: "Mohammad Amir",
    position: "Sales Representative",
    doctor: "Dr. Rashid Ahmed",
    specialty: "Cardiologist",
    area: "Gulshan-e-iqbal-b121-7500",
  },
  {
    id: "7",
    avatar: "/avatars/amir-7.jpg",
    name: "Mohammad Amir",
    position: "Sales Representative",
    doctor: "Dr. Rashid Ahmed",
    specialty: "Cardiologist",
    area: "Gulshan-e-iqbal-b121-7500",
  },
  {
    id: "8",
    avatar: "/avatars/amir-8.jpg",
    name: "Mohammad Amir",
    position: "Sales Representative",
    doctor: "Dr. Rashid Ahmed",
    specialty: "Cardiologist",
    area: "Gulshan-e-iqbal-b121-7500",
  },
  {
    id: "9",
    avatar: "/avatars/amir-9.jpg",
    name: "Mohammad Amir",
    position: "Sales Representative",
    doctor: "Dr. Rashid Ahmed",
    specialty: "Cardiologist",
    area: "Gulshan-e-iqbal-b121-7500",
  },
];

const DEFAULT_AVATAR = "/girlPic.svg"; // fallback

export default function DoctorRequestTable() {
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
  const paginatedRequests = requestData.slice(startIndex, endIndex);

  return (
    <div className="w-full">
      {loading ? (
        <div className="px-2">
          <TableLoadingState
            variant="skeleton"
            rows={5}
            columns={4}
            message="Loading requests..."
          />
        </div>
      ) : error ? (
        <TableErrorState error={error} onRetry={handleRetry} title="Failed to load requests" />
      ) : requestData.length === 0 ? (
        <TableEmptyState
          message="No requests found"
          description="There are currently no doctor requests to display."
        />
      ) : (
        <>
          {paginatedRequests.map((item) => (
            <div
              key={item.id}
              className="px-3 py-3 hover:bg-(--gray-0) transition-colors duration-200"
            >
              <div className="bg-[var(--background)] rounded-8 border border-(--gray-2) p-2">
                <div className="flex items-center justify-between text-sm">
                  {/* Left: Avatar + Name + Position */}
                  <div className="flex items-center gap-4 flex-shrink-0">
                    <Image
                      src={item.avatar}
                      alt={item.name}
                      width={48}
                      height={48}
                      className="rounded-8 object-cover border-2 border-(--light) shadow-soft"
                      onError={(e) => {
                        e.currentTarget.src = DEFAULT_AVATAR;
                      }}
                    />
                    <div>
                      <div className="font-bold text-(--gray-9)">{item.name}</div>
                      <div className="text-xs text-(--gray-5)">{item.position}</div>
                    </div>
                  </div>

                  {/* Doctor Name */}
                  <div className="flex-1 text-center">
                    <div className="font-bold text-(--gray-9)">{item.doctor}</div>
                  </div>

                  {/* Specialty */}
                  <div className="flex-1 text-center">
                    <div className="font-bold text-(--gray-8)">{item.specialty}</div>
                  </div>

                  {/* Area + Code */}
                  <div className="flex-1 font-bold text-center">
                    <div className=" text-(--gray-7)">{item.area}</div>
                  </div>

                  {/* See Request Button */}
                  <div className="flex items-center gap-1 text-(--gray-4)  cursor-pointer">
                    <span>See Request</span>
                    <ChevronRight className="w-7 h-7 text-(--primary)" />
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Pagination */}
          {requestData.length > 0 && (
            <TablePagination
              currentPage={currentPage}
              totalItems={requestData.length}
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
