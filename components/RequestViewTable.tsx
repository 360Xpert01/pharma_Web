"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import CenturoTable from "@/components/shared/table/CeturoTable";
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

const DEFAULT_AVATAR = "/girlPic.png"; // fallback

export default function DoctorRequestTable() {
  // Simulate loading and error states (replace with actual API call state)
  const [loading] = useState(false);
  const [error] = useState<string | null>(null);

  const handleRetry = () => {
    window.location.reload();
  };

  const columns: ColumnDef<RequestItem>[] = [
    {
      header: "Employee",
      accessorKey: "name",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <Image
            src={row.original.avatar}
            alt={row.original.name}
            width={40}
            height={40}
            className="rounded-8 object-cover border-2 border-(--light) shadow-soft flex-shrink-0"
            onError={(e) => {
              e.currentTarget.src = DEFAULT_AVATAR;
            }}
          />
          <div className="truncate">
            <div className="font-bold text-(--gray-9) truncate">{row.original.name}</div>
            <div className="text-xs text-(--gray-5) truncate">{row.original.position}</div>
          </div>
        </div>
      ),
    },
    {
      header: "Doctor",
      accessorKey: "doctor",
      cell: ({ row }) => (
        <div className="font-bold text-(--gray-9) truncate">{row.original.doctor}</div>
      ),
    },
    {
      header: "Specialty",
      accessorKey: "specialty",
      cell: ({ row }) => (
        <div className="font-bold text-(--gray-8) truncate">{row.original.specialty}</div>
      ),
    },
    {
      header: "Area",
      accessorKey: "area",
      cell: ({ row }) => (
        <div className="font-bold text-(--gray-7) truncate">{row.original.area}</div>
      ),
    },
    {
      id: "actions",
      header: "",
      cell: () => (
        <div className="flex items-center justify-end gap-1 text-(--gray-5) text-sm">
          <span>See Request</span>
          <ChevronRight className="w-6 h-6 text-(--primary)" />
        </div>
      ),
    },
  ];

  return (
    <div className="w-full">
      <CenturoTable
        data={requestData}
        columns={columns}
        loading={loading}
        error={error}
        onRetry={handleRetry}
        enablePagination={true}
        pageSize={10}
        PaginationComponent={TablePagination}
        emptyMessage="No requests found"
      />
    </div>
  );
}
