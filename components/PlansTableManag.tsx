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

interface CampaignItem {
  id: string;
  name: string;
  month: string;
  date: string;
  condition: string;
  channel: string;
  status: "Approved" | "Rejected" | "Under Review";
}

const campaignData: CampaignItem[] = [
  {
    id: "1",
    name: "Sami Kashan",
    month: "September, 2025",
    date: "2024-01-15",
    condition: "Diabetes",
    channel: "Doctors",
    status: "Under Review",
  },
  {
    id: "2",
    name: "Sami Kashan",
    month: "September, 2025",
    date: "2024-01-15",
    condition: "Cancer",
    channel: "Pharmacy/Stores",
    status: "Rejected",
  },
  {
    id: "3",
    name: "Alex Torres",
    month: "October, 2025",
    date: "2024-02-20",
    condition: "Hypertension",
    channel: "Chain Pharmacy",
    status: "Approved",
  },
  {
    id: "4",
    name: "Liam Brown",
    month: "March, 2026",
    date: "2024-07-20",
    condition: "Depression",
    channel: "Doctors",
    status: "Approved",
  },
  {
    id: "5",
    name: "Jordan Lee",
    month: "November, 2025",
    date: "2024-03-10",
    condition: "Asthma",
    channel: "Pharmacy/Stores",
    status: "Under Review",
  },
  {
    id: "6",
    name: "Rina Patel",
    month: "December, 2025",
    date: "2024-04-05",
    condition: "Heart Disease",
    channel: "Doctors",
    status: "Approved",
  },
  {
    id: "7",
    name: "Max Chen",
    month: "January, 2026",
    date: "2024-05-15",
    condition: "Obesity",
    channel: "GTs",
    status: "Under Review",
  },
  {
    id: "8",
    name: "Ella Rodriguez",
    month: "February, 2026",
    date: "2024-06-25",
    condition: "Cholesterol",
    channel: "Pharmacy/Stores",
    status: "Rejected",
  },
];

export default function CampaignApprovalTable() {
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
  const paginatedCampaigns = campaignData.slice(startIndex, endIndex);

  return (
    <div className="w-full ">
      {loading ? (
        <div className="px-4">
          <TableLoadingState
            variant="skeleton"
            rows={5}
            columns={6}
            message="Loading campaigns..."
          />
        </div>
      ) : error ? (
        <TableErrorState error={error} onRetry={handleRetry} title="Failed to load campaigns" />
      ) : campaignData.length === 0 ? (
        <TableEmptyState
          message="No campaigns found"
          description="There are currently no campaign requests to display."
        />
      ) : (
        <>
          <TableColumnHeader
            columns={[
              { label: "Name", className: "w-[15%]" },
              { label: "Month", className: "w-[15%]" },
              { label: "Date", className: "w-[12%]" },
              { label: "Condition", className: "w-[15%]" },
              { label: "Channel", className: "w-[15%]" },
              { label: "Status", className: "w-[15%] text-center" },
              { label: "", className: "w-[13%]" },
            ]}
            containerClassName="flex w-full px-4"
            showBackground={false}
          />

          {paginatedCampaigns.map((item) => (
            <div key={item.id} className="px-4 py-1">
              <div className="w-full bg-[var(--background)] rounded-8 p-3 border border-(--gray-2) flex items-center hover:bg-(--gray-0) transition-all cursor-pointer">
                {/* Name */}
                <div className="w-[15%] t-td-b truncate" title={item.name}>
                  {item.name}
                </div>

                {/* Month */}
                <div className="w-[15%] t-td truncate" title={item.month}>
                  {item.month}
                </div>

                {/* Date */}
                <div className="w-[12%] t-mute truncate" title={item.date}>
                  {item.date}
                </div>

                {/* Condition */}
                <div className="w-[15%] t-label truncate" title={item.condition}>
                  {item.condition}
                </div>

                {/* Channel */}
                <div className="w-[15%] t-td-b truncate" title={item.channel}>
                  {item.channel}
                </div>

                {/* Status Badge */}
                <div className="w-[15%] flex justify-center">
                  <StatusBadge status={item.status} />
                </div>

                {/* View Details */}
                <Link
                  href={`/dashboard/plan-Request`}
                  className="w-[13%] flex justify-end items-center gap-1"
                >
                  <span className="t-sm cursor-pointer whitespace-nowrap">View Details</span>
                  <ChevronRight className="w-6 h-6 text-(--primary)" />
                </Link>
              </div>
            </div>
          ))}

          {/* Pagination */}
          {campaignData.length > 0 && (
            <TablePagination
              currentPage={currentPage}
              totalItems={campaignData.length}
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
