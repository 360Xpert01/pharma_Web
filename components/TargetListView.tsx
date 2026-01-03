"use client";

import React, { useState, useMemo } from "react";
import { EmployeeTarget, GroupedTargets } from "@/types/target";
import TargetEmployeeCard from "./TargetEmployeeCard";
import TableColumnHeader from "@/components/TableColumnHeader";
import TablePagination from "@/components/TablePagination";

// Mock data for demonstration
const mockTargetData: EmployeeTarget[] = [
  {
    id: "1",
    employeeId: "emp001",
    employeeName: "Mohammad Amr",
    employeeRole: "Sales Representative",
    profilePicture: "/girlPic.svg",
    teamName: "[Team Name]",
    channelName: "Channel name",
    lineManager: "Line Manager",
    month: "January",
    year: 2025,
    tags: ["L43", "L02", "E74"],
    products: [
      {
        id: "p1",
        productName: "VitalBoost 400mg",
        targetPackets: 800,
        achievedPackets: 264,
        achievementPercentage: 33,
        status: "in-progress",
      },
      {
        id: "p2",
        productName: "NutriPlus 300mg",
        targetPackets: 1200,
        achievedPackets: 600,
        achievementPercentage: 50,
        status: "in-progress",
      },
      {
        id: "p3",
        productName: "Klinex 250mg",
        targetPackets: 500,
        achievedPackets: 100,
        achievementPercentage: 20,
        status: "pending",
      },
      {
        id: "p4",
        productName: "Dapakan 500mg",
        targetPackets: 1000,
        achievedPackets: 1000,
        achievementPercentage: 100,
        status: "completed",
      },
      {
        id: "p5",
        productName: "Fitwell 750mg",
        targetPackets: 760,
        achievedPackets: 76,
        achievementPercentage: 10,
        status: "pending",
      },
      {
        id: "p6",
        productName: "Klinex 250mg",
        targetPackets: 500,
        achievedPackets: 100,
        achievementPercentage: 20,
        status: "pending",
      },
    ],
  },
  {
    id: "2",
    employeeId: "emp002",
    employeeName: "Emily Martinez",
    employeeRole: "Sales Representative",
    profilePicture: "/girlPic.svg",
    teamName: "Healing Hands",
    channelName: "Retail Channel",
    lineManager: "James Green",
    month: "June",
    year: 2025,
    tags: [],
    products: [
      {
        id: "p6",
        productName: "Dapakan 500mg",
        targetPackets: 1000,
        achievedPackets: 1000,
        achievementPercentage: 100,
        status: "completed",
      },
    ],
  },
  {
    id: "3",
    employeeId: "emp003",
    employeeName: "Sarah Khan",
    employeeRole: "Sales Representative",
    profilePicture: "/girlPic.svg",
    teamName: "Health Innovators",
    channelName: "Pharmacy Channel",
    lineManager: "John Smith",
    month: "February",
    year: 2025,
    tags: [],
    products: [
      {
        id: "p7",
        productName: "Atorvastatin 10mg",
        targetPackets: 750,
        achievedPackets: 375,
        achievementPercentage: 50,
        status: "in-progress",
      },
      {
        id: "p8",
        productName: "Fitwell 750mg",
        targetPackets: 760,
        achievedPackets: 76,
        achievementPercentage: 10,
        status: "pending",
      },
    ],
  },
  {
    id: "4",
    employeeId: "emp004",
    employeeName: "Karen Lee",
    employeeRole: "Sales Representative",
    profilePicture: "/girlPic.svg",
    teamName: "Wellness Warriors",
    channelName: "Clinic Channel",
    lineManager: "Robert Brown",
    month: "April",
    year: 2025,
    tags: [],
    products: [
      {
        id: "p9",
        productName: "HealthBoost 500mg",
        targetPackets: 900,
        achievedPackets: 450,
        achievementPercentage: 50,
        status: "in-progress",
      },
    ],
  },
  {
    id: "5",
    employeeId: "emp005",
    employeeName: "Michael Johnson",
    employeeRole: "Sales Representative",
    profilePicture: "/girlPic.svg",
    teamName: "Life Science Crew",
    channelName: "Hospital Channel",
    lineManager: "Emily Davis",
    month: "March",
    year: 2025,
    tags: [],
    products: [
      {
        id: "p10",
        productName: "MediCare 300mg",
        targetPackets: 650,
        achievedPackets: 325,
        achievementPercentage: 50,
        status: "in-progress",
      },
    ],
  },
  {
    id: "6",
    employeeId: "emp006",
    employeeName: "Lucas White",
    employeeRole: "Sales Representative",
    profilePicture: "/girlPic.svg",
    teamName: "Health Plus",
    channelName: "Online Channel",
    lineManager: "Sophia Taylor",
    month: "May",
    year: 2025,
    tags: [],
    products: [
      {
        id: "p11",
        productName: "VitaMax 400mg",
        targetPackets: 800,
        achievedPackets: 400,
        achievementPercentage: 50,
        status: "in-progress",
      },
    ],
  },
  {
    id: "7",
    employeeId: "emp007",
    employeeName: "Olivia Brown",
    employeeRole: "Sales Representative",
    profilePicture: "/girlPic.svg",
    teamName: "Vitality Group",
    channelName: "Wholesale Channel",
    lineManager: "Daniel Wilson",
    month: "July",
    year: 2025,
    tags: [],
    products: [
      {
        id: "p12",
        productName: "PowerPlus 250mg",
        targetPackets: 500,
        achievedPackets: 250,
        achievementPercentage: 50,
        status: "in-progress",
      },
    ],
  },
];

export default function TargetListView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  // Group targets by month
  const groupedTargets = useMemo(() => {
    const filtered = mockTargetData.filter((target) => {
      const matchesSearch =
        target.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        target.teamName.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    });

    const grouped: GroupedTargets = {};
    filtered.forEach((target) => {
      if (!grouped[target.month]) {
        grouped[target.month] = [];
      }
      grouped[target.month].push(target);
    });

    return grouped;
  }, [searchQuery]);

  // Flatten grouped targets for pagination
  const allTargets = useMemo(() => {
    return Object.entries(groupedTargets).flatMap(([month, targets]) =>
      targets.map((target) => ({ ...target, month }))
    );
  }, [groupedTargets]);

  // Calculate total items
  const totalItems = allTargets.length;

  // Apply pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedTargets = allTargets.slice(startIndex, endIndex);

  // Group paginated targets by month
  const paginatedGroupedTargets = useMemo(() => {
    const grouped: GroupedTargets = {};
    paginatedTargets.forEach((target) => {
      if (!grouped[target.month]) {
        grouped[target.month] = [];
      }
      grouped[target.month].push(target);
    });
    return grouped;
  }, [paginatedTargets]);

  return (
    <div>
      {/* Column Headers */}
      <TableColumnHeader
        columns={[
          { label: "Month", className: "w-[20%] ml-3" },
          { label: "Employee", className: "w-[18%]" },
          { label: "Team Name", className: "w-[24%]" },
          { label: "Channel", className: "w-[24%]" },
          { label: "Supervisor", className: "w-[0%]" },
          { label: "", className: "w-[0%]" }, // View Details
        ]}
        containerClassName="flex w-[80%]"
        showBackground={false}
      />

      {/* Employee Cards Grouped by Month */}
      <div>
        {Object.keys(paginatedGroupedTargets).length === 0 ? (
          <div className="bg-[var(--gray-0)] rounded-8 p-12 text-center mx-4 my-3">
            <p className="t-lg">No targets found matching your criteria</p>
          </div>
        ) : (
          Object.entries(paginatedGroupedTargets).map(([month, targets]) => (
            <div key={month} className="space-y-0 mb-3">
              {targets.map((target) => (
                <div key={target.id} className="mx-4 my-3">
                  <TargetEmployeeCard target={target} month={month} />
                </div>
              ))}
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalItems > 0 && (
        <div className="mx-4 mb-4">
          <TablePagination
            currentPage={currentPage}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
            pageSizeOptions={[5, 10, 20, 30, 50]}
            showPageInfo={true}
            showItemsPerPageSelector={true}
          />
        </div>
      )}
    </div>
  );
}
