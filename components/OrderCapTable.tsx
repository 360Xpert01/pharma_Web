"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";
import CenturoTable from "@/components/shared/table/CenturoTable";
import TablePagination from "@/components/TablePagination";

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

  const handleRetry = () => {
    window.location.reload();
  };

  const columns: ColumnDef<BookingItem>[] = [
    {
      header: "Sales Rep",
      accessorKey: "name",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <Image
            src={row.original.avatar}
            alt={row.original.name}
            width={40}
            height={40}
            className="w-10 h-10 rounded-8 object-cover border-2 border-(--light) shadow-soft flex-shrink-0"
            onError={(e) => {
              e.currentTarget.src = "/girlPic.svg";
            }}
          />
          <div className="min-w-0 flex-1">
            <p className="t-td-b truncate">{row.original.name}</p>
            <p className="t-cap truncate">{row.original.position}</p>
          </div>
        </div>
      ),
    },
    {
      header: "Company",
      accessorKey: "company",
      cell: ({ row }) => <p className="t-td-b truncate">{row.original.company}</p>,
    },
    {
      header: "Date",
      accessorKey: "date",
      cell: ({ row }) => <p className="t-td truncate">{row.original.date}</p>,
    },
    {
      header: "Product",
      accessorKey: "medicine",
      cell: ({ row }) => <p className="t-td-b truncate">{row.original.medicine}</p>,
    },
    {
      header: "SKU's",
      accessorKey: "dosages",
      cell: ({ row }) => (
        <div className="flex flex-wrap gap-2">
          {row.original.dosages.map((dose, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-(--gray-1) text-(--gray-7) rounded-8 t-sm font-medium whitespace-nowrap"
            >
              {dose}
            </span>
          ))}
        </div>
      ),
    },
    {
      header: "Location",
      accessorKey: "customer",
      cell: ({ row }) => <p className="t-td-b truncate">{row.original.customer}</p>,
    },
  ];

  return (
    <div className="w-full">
      <CenturoTable
        data={bookingData}
        columns={columns}
        loading={loading}
        error={error}
        onRetry={handleRetry}
        enablePagination={true}
        pageSize={10}
        PaginationComponent={TablePagination}
        emptyMessage="No bookings found"
      />
    </div>
  );
}
