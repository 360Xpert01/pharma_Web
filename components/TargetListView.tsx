"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";
import { EmployeeTarget } from "@/types/target";
import CenturoTable from "@/components/shared/table/CeturoTable";
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
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTargets = useMemo(() => {
    return mockTargetData.filter((target) => {
      const matchesSearch =
        target.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        target.teamName.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    });
  }, [searchQuery]);

  const handleViewDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/dashboard/SetTarget`);
  };

  const getStatusBadgeColor = (tag: string) => {
    switch (tag) {
      case "L43":
        return "bg-[var(--destructive)]/10 text-[var(--destructive)]";
      case "L02":
        return "bg-[var(--primary)] text-[var(--light)]";
      case "E74":
        return "bg-[var(--primary)] text-[var(--light)]";
      default:
        return "bg-[var(--gray-0)] text-[var(--gray-6)]";
    }
  };

  const columns: ColumnDef<EmployeeTarget>[] = [
    {
      header: "Month",
      accessorKey: "month",
      cell: ({ row }) => <div className="t-label-b">{row.original.month}</div>,
    },
    {
      header: "Employee",
      accessorKey: "employeeName",
      cell: ({ row }) => (
        <div className="flex items-center gap-3 min-w-0">
          <Image
            src={row.original.profilePicture || "/girlPic.svg"}
            alt={row.original.employeeName}
            width={40}
            height={40}
            className="rounded-8 flex-shrink-0"
          />
          <div className="min-w-0 flex-1">
            <h3 className="t-label-b truncate" title={row.original.employeeName}>
              {row.original.employeeName}
            </h3>
            <p className="t-cap truncate" title={row.original.employeeRole}>
              {row.original.employeeRole}
            </p>
          </div>
        </div>
      ),
    },
    {
      header: "Team Name",
      accessorKey: "teamName",
      cell: ({ row }) => (
        <div className="t-td-b truncate" title={row.original.teamName}>
          {row.original.teamName}
        </div>
      ),
    },
    {
      header: "Channel",
      accessorKey: "channelName",
      cell: ({ row }) => (
        <div className="t-td-b truncate" title={row.original.channelName}>
          {row.original.channelName}
        </div>
      ),
    },
    {
      header: "Supervisor",
      accessorKey: "lineManager",
      cell: ({ row }) => (
        <div className="t-td-b truncate" title={row.original.lineManager}>
          {row.original.lineManager}
        </div>
      ),
    },
    {
      id: "actions",
      header: "",
      cell: ({ row, table }) => (
        <div className="flex justify-end">
          <button
            onClick={(e) => {
              e.stopPropagation();
              row.toggleExpanded();
            }}
            className="flex items-center gap-2 t-sm hover:text-[var(--gray-9)] transition whitespace-nowrap cursor-pointer"
          >
            <span className="font-medium">View Details</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${row.getIsExpanded() ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      ),
    },
  ];

  const renderExpandedRow = (target: EmployeeTarget) => {
    return (
      <div className="px-6 py-5 bg-[var(--gray-0)]">
        {/* Tags */}
        <div className="mb-5 flex items-center justify-end border-b border-[var(--gray-2)] pb-4">
          {target.tags && target.tags.length > 0 && (
            <div className="flex gap-2">
              {target.tags.map((tag) => (
                <span
                  key={tag}
                  className={`px-3 py-1 rounded-8 text-xs font-semibold ${getStatusBadgeColor(tag)}`}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {target.products.map((product) => (
            <div
              key={product.id}
              className="rounded-8 px-4 py-3 border-2 bg-[var(--background)] border-[var(--gray-2)]"
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex-1">
                  <p className="t-label-b text-[var(--gray-9)]">{product.productName}</p>
                </div>
                <div className="flex-1 text-center">
                  <p className="t-label-b text-[var(--gray-9)]">{product.targetPackets} Packets</p>
                </div>
                <div className="flex-1 text-right">
                  <p className="t-label-b text-[var(--gray-9)]">{product.achievementPercentage}%</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full">
      <CenturoTable
        data={filteredTargets}
        columns={columns}
        enablePagination={true}
        pageSize={10}
        PaginationComponent={TablePagination}
        enableExpanding={true}
        renderExpandedRow={renderExpandedRow}
        emptyMessage="No targets found"
      />
    </div>
  );
}
