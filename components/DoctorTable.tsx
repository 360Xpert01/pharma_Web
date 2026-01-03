"use client";

import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import CenturoTable from "@/components/shared/table/CenturoTable";
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

  // Define columns for CenturoTable
  const columns: ColumnDef<Doctor>[] = [
    {
      header: "Name",
      accessorKey: "name",
      cell: ({ row }) => <div className="t-td-b truncate">{row.original.name}</div>,
    },
    {
      header: "Specialization",
      accessorKey: "specialty",
      cell: ({ row }) => <div className="t-td truncate">{row.original.specialty}</div>,
    },
    {
      header: "Email",
      accessorKey: "email",
      cell: ({ row }) => <div className="t-td-b truncate">{row.original.email}</div>,
    },
    {
      header: "Phone No",
      accessorKey: "phone",
      cell: ({ row }) => <div className="t-td truncate">{row.original.phone}</div>,
    },
    {
      header: "Location",
      accessorKey: "city",
      cell: ({ row }) => <div className="t-td-b truncate">{row.original.city}</div>,
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => (
        <div className="flex justify-center">
          <StatusBadge status={row.original.status} />
        </div>
      ),
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <Link href={`/dashboard/doctor-profile`} className="flex items-center justify-end gap-1">
          <span className="t-sm flex items-center gap-1 whitespace-nowrap">View Details</span>
          <ChevronRight className="w-6 h-6 text-(--primary)" />
        </Link>
      ),
    },
  ];

  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="w-full">
      <CenturoTable
        data={doctorsData}
        columns={columns}
        loading={loading}
        error={error}
        onRetry={handleRetry}
        enablePagination={true}
        pageSize={10}
        PaginationComponent={TablePagination}
        emptyMessage="No doctors found"
      />
    </div>
  );
}
