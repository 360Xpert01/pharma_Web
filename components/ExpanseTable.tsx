"use client";

import React, { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import CenturoTable from "@/components/shared/table/CenturoTable";
import TablePagination from "@/components/TablePagination";

interface ExpenseRow {
  id: string;
  employee1: { name: string; role: string; avatar?: string };
  employee2: { name: string; role: string; avatar?: string };
  totalExpense: number;
  approved: number;
  rejected: number;
}

const expenseData: ExpenseRow[] = [
  {
    id: "1",
    employee1: { name: "Sarah Johnson", role: "Marketing Specialist" },
    employee2: { name: "Dr. Herbert R.", role: "Heart Specialist" },
    totalExpense: 2550,
    approved: 1500,
    rejected: 150,
  },
  {
    id: "2",
    employee1: { name: "Michael Smith", role: "Software Engineer" },
    employee2: { name: "Dr. Emily T.", role: "Neurosurgeon" },
    totalExpense: 3000,
    approved: 2000,
    rejected: 100,
  },
  {
    id: "3",
    employee1: { name: "Jessica Williams", role: "Product Designer" },
    employee2: { name: "Dr. Kevin L.", role: "Orthopedic Surgeon" },
    totalExpense: 4000,
    approved: 2500,
    rejected: 150,
  },
  {
    id: "4",
    employee1: { name: "David Brown", role: "Data Analyst" },
    employee2: { name: "Dr. Laura P.", role: "Pediatrician" },
    totalExpense: 3550,
    approved: 2000,
    rejected: 150,
  },
  {
    id: "5",
    employee1: { name: "Linda Garcia", role: "UX Researcher" },
    employee2: { name: "Dr. Alex Q.", role: "Dermatologist" },
    totalExpense: 4450,
    approved: 3000,
    rejected: 150,
  },
  {
    id: "6",
    employee1: { name: "James Miller", role: "Web Developer" },
    employee2: { name: "Dr. Nancy S.", role: "Cardiologist" },
    totalExpense: 5000,
    approved: 3500,
    rejected: 150,
  },
  {
    id: "7",
    employee1: { name: "Patricia Martinez", role: "Content Writer" },
    employee2: { name: "Dr. Mark T.", role: "Oncologist" },
    totalExpense: 3320,
    approved: 1700,
    rejected: 150,
  },
  {
    id: "8",
    employee1: { name: "Robert Davis", role: "Sales Executive" },
    employee2: { name: "Dr. Susan W.", role: "Gynecologist" },
    totalExpense: 4420,
    approved: 2700,
    rejected: 150,
  },
  {
    id: "9",
    employee1: { name: "Jennifer Lee", role: "Graphic Designer" },
    employee2: { name: "Dr. William H.", role: "Urologist" },
    totalExpense: 3770,
    approved: 2200,
    rejected: 150,
  },
];

const DEFAULT_AVATAR = "/girlPic.svg";

export default function ExpenseApprovalTable() {
  // Simulate loading and error states (replace with actual API call state)
  const [loading] = useState(false);
  const [error] = useState<string | null>(null);

  const handleRetry = () => {
    window.location.reload();
  };

  const columns: ColumnDef<ExpenseRow>[] = [
    {
      header: "Employee",
      accessorKey: "employee1",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <img
            src={row.original.employee1.avatar || DEFAULT_AVATAR}
            alt={row.original.employee1.name}
            className="w-10 h-10 rounded-8 object-cover border-2 border-(--light) shadow-soft flex-shrink-0"
          />
          <div className="truncate">
            <div className="t-td-b truncate">{row.original.employee1.name}</div>
            <div className="t-cap truncate">{row.original.employee1.role}</div>
          </div>
        </div>
      ),
    },
    {
      header: "Doctor",
      accessorKey: "employee2",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <img
            src={row.original.employee2.avatar || DEFAULT_AVATAR}
            alt={row.original.employee2.name}
            className="w-10 h-10 rounded-8 object-cover border-2 border-(--light) shadow-soft flex-shrink-0"
          />
          <div className="truncate">
            <div className="t-td-b truncate">{row.original.employee2.name}</div>
            <div className="t-cap truncate">{row.original.employee2.role}</div>
          </div>
        </div>
      ),
    },
    {
      header: "Total Expense",
      accessorKey: "totalExpense",
      cell: ({ row }) => (
        <div className="text-center">
          <div className="t-val-sm t-warn">
            {row.original.totalExpense.toLocaleString()}
            <span className="t-sm t-warn pl-1">PKR</span>
          </div>
        </div>
      ),
    },
    {
      header: "Approved",
      accessorKey: "approved",
      cell: ({ row }) => (
        <div className="text-center">
          <div className="t-val-sm t-ok">
            {row.original.approved.toLocaleString()}
            <span className="t-sm t-ok pl-1">PKR</span>
          </div>
        </div>
      ),
    },
    {
      header: "Rejected",
      accessorKey: "rejected",
      cell: ({ row }) => (
        <div className="text-center">
          <div className="t-val-sm t-err">
            {row.original.rejected.toLocaleString()}
            <span className="t-sm t-err pl-1">PKR</span>
          </div>
        </div>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: () => (
        <div className="flex gap-3 justify-center">
          <button className="px-6 py-1 bg-(--primary) text-(--light) font-medium rounded-8 hover:bg-(--primary-2) transition shadow-soft">
            Approve
          </button>
          <button className="px-6 py-1 bg-[var(--background)] text-(--destructive) font-medium rounded-8 border border-(--destructive) hover:bg-(--destructive-0) transition shadow-soft">
            Reject
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full bg-(--gray-0)/50 p-4">
      <CenturoTable
        data={expenseData}
        columns={columns}
        loading={loading}
        error={error}
        onRetry={handleRetry}
        enablePagination={true}
        pageSize={10}
        PaginationComponent={TablePagination}
        emptyMessage="No expense data found"
      />
    </div>
  );
}
