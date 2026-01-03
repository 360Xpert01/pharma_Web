"use client";

import React, { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import CenturoTable from "@/components/shared/table/CenturoTable";
import TablePagination from "@/components/TablePagination";

interface DcrRecord {
  id: number;
  employee1: { name: string; role: string };
  employee2: { name: string; role: string };
  specialty: string;
  area: string;
  doctor: string;
  medicine: string;
  strengths: string[];
}

const tableData: DcrRecord[] = [
  {
    id: 1,
    employee1: { name: "Mohammad Amir", role: "Sales Representative" },
    employee2: { name: "Mohammad Amir", role: "Team Lead" },
    specialty: "Cardiologist",
    area: "Gulshan-e-iqbal",
    doctor: "Dr. Rashid Ahmed",
    medicine: "Amoxicillin",
    strengths: ["Tablet 10Mg", "Tablet 40Mg"],
  },
  {
    id: 2,
    employee1: { name: "Sara Khan", role: "Marketing Manager" },
    employee2: { name: "Sara Khan", role: "Senior Manager" },
    specialty: "Pediatrician",
    area: "Clifton",
    doctor: "Dr. Ayesha Farooq",
    medicine: "Ibuprofen",
    strengths: ["Tablet 200Mg", "Tablet 400Mg"],
  },
  {
    id: 3,
    employee1: { name: "Ali Raza", role: "Product Owner" },
    employee2: { name: "Ali Raza", role: "Project Manager" },
    specialty: "Dermatologist",
    area: "Korangi",
    doctor: "Dr. Bilal Shah",
    medicine: "Cetirizine",
    strengths: ["Tablet 10Mg", "Tablet 20Mg"],
  },
  {
    id: 4,
    employee1: { name: "Fatima Bano", role: "UX Designer" },
    employee2: { name: "Fatima Bano", role: "Lead Designer" },
    specialty: "Orthopedist",
    area: "DHA",
    doctor: "Dr. Nida Malik",
    medicine: "Paracetamol",
    strengths: ["Tablet 500Mg", "Tablet 1G"],
  },
  {
    id: 5,
    employee1: { name: "Owais Tariq", role: "Data Analyst" },
    employee2: { name: "Owais Tariq", role: "Senior Analyst" },
    specialty: "Neurologist",
    area: "Nazimabad",
    doctor: "Dr. Fariha Khan",
    medicine: "Metformin",
    strengths: ["Tablet 500Mg", "Tablet 1000Mg"],
  },
  {
    id: 6,
    employee1: { name: "Nida Hussain", role: "Web Developer" },
    employee2: { name: "Nida Hussain", role: "Technical Lead" },
    specialty: "Gynecologist",
    area: "Malir",
    doctor: "Dr. Samina Iftikhar",
    medicine: "Aspirin",
    strengths: ["Tablet 100Mg", "Tablet 300Mg"],
  },
  {
    id: 7,
    employee1: { name: "Hassan Ali", role: "System Administrator" },
    employee2: { name: "Hassan Ali", role: "IT Manager" },
    specialty: "Oncologist",
    area: "Kech",
    doctor: "Dr. Asif Malik",
    medicine: "Simvastatin",
    strengths: ["Tablet 10Mg", "Tablet 20Mg"],
  },
  {
    id: 8,
    employee1: { name: "Zara Malik", role: "Content Writer" },
    employee2: { name: "Zara Malik", role: "Content Lead" },
    specialty: "Ophthalmologist",
    area: "Gulistan-e-Jauhar",
    doctor: "Dr. Hina Shah",
    medicine: "Lisinopril",
    strengths: ["Tablet 5Mg", "Tablet 10Mg"],
  },
  {
    id: 9,
    employee1: { name: "Bilal Ahmed", role: "Graphic Designer" },
    employee2: { name: "Bilal Ahmed", role: "Creative Head" },
    specialty: "Urologist",
    area: "FB Area",
    doctor: "Dr. Talha Qureshi",
    medicine: "Atorvastatin",
    strengths: ["Tablet 20Mg", "Tablet 40Mg"],
  },
];

const DEFAULT_AVATAR = "/girlPic.svg";

export default function DcrTable() {
  // Simulate loading and error states (replace with actual API call state)
  const [loading] = useState(false);
  const [error] = useState<string | null>(null);

  // Define columns for CenturoTable
  const columns: ColumnDef<DcrRecord>[] = [
    {
      header: "Sales Rep",
      accessorKey: "employee1",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <img
            src={DEFAULT_AVATAR}
            alt={row.original.employee1.name}
            className="w-12 h-12 rounded-8 object-cover border-2 border-(--light) shadow-soft flex-shrink-0"
          />
          <div>
            <p className="t-td-b">{row.original.employee1.name}</p>
            <p className="t-cap">{row.original.employee1.role}</p>
          </div>
        </div>
      ),
    },
    {
      header: "Line Manager",
      accessorKey: "employee2",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <img
            src={DEFAULT_AVATAR}
            alt={row.original.employee2.name}
            className="w-12 h-12 rounded-8 object-cover border-2 border-(--light) shadow-soft flex-shrink-0"
          />
          <div>
            <p className="t-td-b">{row.original.employee2.name}</p>
            <p className="t-cap">{row.original.employee2.role}</p>
          </div>
        </div>
      ),
    },
    {
      header: "Specialization",
      accessorKey: "specialty",
      cell: ({ row }) => <p className="t-label">{row.original.specialty}</p>,
    },
    {
      header: "Location",
      accessorKey: "area",
      cell: ({ row }) => <p className="t-label">{row.original.area}</p>,
    },
    {
      header: "Doctor",
      accessorKey: "doctor",
      cell: ({ row }) => <p className="t-td-b">{row.original.doctor}</p>,
    },
    {
      header: "Product",
      accessorKey: "medicine",
      cell: ({ row }) => <p className="t-td-b">{row.original.medicine}</p>,
    },
    {
      header: "SKU's",
      accessorKey: "strengths",
      cell: ({ row }) => (
        <div className="flex flex-wrap gap-2">
          {row.original.strengths.map((s, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-(--gray-1) text-(--gray-7) rounded-8 text-xs font-medium whitespace-nowrap"
            >
              {s}
            </span>
          ))}
        </div>
      ),
    },
  ];

  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="w-full">
      <CenturoTable
        data={tableData}
        columns={columns}
        loading={loading}
        error={error}
        onRetry={handleRetry}
        enablePagination={true}
        pageSize={10}
        PaginationComponent={TablePagination}
        emptyMessage="No DCR records found"
      />
    </div>
  );
}
