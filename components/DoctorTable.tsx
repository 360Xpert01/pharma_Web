"use client";

import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import CenturoTable from "@/components/shared/table/CeturoTable";
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
    id: "DCR01",
    name: "Dr. Sarah Ali",
    specialty: "Cardiologist",
    email: "sarah.ali@gmail.com",
    phone: "+923214323523",
    city: "Karachi",
    status: "Active",
  },
  {
    id: "DCR02",
    name: "Dr. Ahmed Khan",
    specialty: "Neurologist",
    email: "ahmed.khan@gmail.com",
    phone: "+923334445566",
    city: "Lahore",
    status: "Active",
  },
  {
    id: "DCR03",
    name: "Dr. Fatima Raza",
    specialty: "Pediatrician",
    email: "fatima.raza@gmail.com",
    phone: "+923451234567",
    city: "Islamabad",
    status: "Inactive",
  },
  {
    id: "DCR04",
    name: "Dr. Ali Hassan",
    specialty: "Dermatologist",
    email: "ali.hassan@gmail.com",
    phone: "+923009876543",
    city: "Multan",
    status: "Active",
  },
  {
    id: "DCR05",
    name: "Dr. Zainab Malik",
    specialty: "Orthopedic",
    email: "zainab.malik@gmail.com",
    phone: "+923112223333",
    city: "Faisalabad",
    status: "Active",
  },
  {
    id: "DCR06",
    name: "Dr. Bilal Ahmed",
    specialty: "Cardiologist",
    email: "bilal.ahmed@gmail.com",
    phone: "+923225554444",
    city: "Karachi",
    status: "Inactive",
  },
  {
    id: "DCR07",
    name: "Dr. Ayesha Farooq",
    specialty: "Gynecologist",
    email: "ayesha.farooq@gmail.com",
    phone: "+923337778888",
    city: "Peshawar",
    status: "Active",
  },
  {
    id: "DCR08",
    name: "Dr. Omar Siddiqui",
    specialty: "Oncologist",
    email: "omar.siddiqui@gmail.com",
    phone: "+923441112222",
    city: "Karachi",
    status: "Active",
  },
  {
    id: "DCR09",
    name: "Dr. Hina Javed",
    specialty: "Psychiatrist",
    email: "hina.javed@gmail.com",
    phone: "+923556667777",
    city: "Lahore",
    status: "Active",
  },
  {
    id: "DCR10",
    name: "Dr. Kamran Butt",
    specialty: "ENT Specialist",
    email: "kamran.butt@gmail.com",
    phone: "+923667778888",
    city: "Rawalpindi",
    status: "Inactive",
  },
  {
    id: "DCR11",
    name: "Dr. Sana Qureshi",
    specialty: "Radiologist",
    email: "sana.qureshi@gmail.com",
    phone: "+923778889999",
    city: "Islamabad",
    status: "Active",
  },
  {
    id: "DCR12",
    name: "Dr. Tariq Aziz",
    specialty: "Urologist",
    email: "tariq.aziz@gmail.com",
    phone: "+923889990000",
    city: "Sialkot",
    status: "Active",
  },
  {
    id: "DCR13",
    name: "Dr. Mariam Shah",
    specialty: "Ophthalmologist",
    email: "mariam.shah@gmail.com",
    phone: "+923990001111",
    city: "Multan",
    status: "Inactive",
  },
  {
    id: "DCR14",
    name: "Dr. Usman Akram",
    specialty: "Gastroenterologist",
    email: "usman.akram@gmail.com",
    phone: "+923001112222",
    city: "Karachi",
    status: "Active",
  },
  {
    id: "DCR15",
    name: "Dr. Nadia Pervez",
    specialty: "Endocrinologist",
    email: "nadia.pervez@gmail.com",
    phone: "+923112223344",
    city: "Lahore",
    status: "Active",
  },
  {
    id: "DCR16",
    name: "Dr. Faisal Mahmood",
    specialty: "Pulmonologist",
    email: "faisal.mahmood@gmail.com",
    phone: "+923223344555",
    city: "Faisalabad",
    status: "Inactive",
  },
  {
    id: "DCR17",
    name: "Dr. Rabia Nasir",
    specialty: "Rheumatologist",
    email: "rabia.nasir@gmail.com",
    phone: "+923334455666",
    city: "Gujranwala",
    status: "Active",
  },
  {
    id: "DCR18",
    name: "Dr. Shahid Iqbal",
    specialty: "Nephrologist",
    email: "shahid.iqbal@gmail.com",
    phone: "+923445566777",
    city: "Peshawar",
    status: "Active",
  },
  {
    id: "DCR19",
    name: "Dr. Amina Rauf",
    specialty: "Hematologist",
    email: "amina.rauf@gmail.com",
    phone: "+923556677888",
    city: "Quetta",
    status: "Active",
  },
  {
    id: "DCR20",
    name: "Dr. Imran Yousaf",
    specialty: "Anesthesiologist",
    email: "imran.yousaf@gmail.com",
    phone: "+923667788999",
    city: "Karachi",
    status: "Inactive",
  },
  {
    id: "DCR21",
    name: "Dr. Kiran Nadeem",
    specialty: "Pathologist",
    email: "kiran.nadeem@gmail.com",
    phone: "+923778899000",
    city: "Lahore",
    status: "Active",
  },
  {
    id: "DCR22",
    name: "Dr. Hamza Saleem",
    specialty: "Plastic Surgeon",
    email: "hamza.saleem@gmail.com",
    phone: "+923889900111",
    city: "Islamabad",
    status: "Active",
  },
  {
    id: "DCR23",
    name: "Dr. Saima Riaz",
    specialty: "General Surgeon",
    email: "saima.riaz@gmail.com",
    phone: "+923990011222",
    city: "Multan",
    status: "Inactive",
  },
  {
    id: "DCR24",
    name: "Dr. Adnan Hafeez",
    specialty: "Vascular Surgeon",
    email: "adnan.hafeez@gmail.com",
    phone: "+923001122333",
    city: "Rawalpindi",
    status: "Active",
  },
  {
    id: "DCR25",
    name: "Dr. Lubna Farhan",
    specialty: "Infectious Disease",
    email: "lubna.farhan@gmail.com",
    phone: "+923112233444",
    city: "Karachi",
    status: "Active",
  },
];

export default function DoctorsTable() {
  // Simulate loading and error states (replace with actual API call state)
  const [loading] = useState(false);
  const [error] = useState<string | null>(null);

  // Define columns for CenturoTable
  const columns: ColumnDef<Doctor>[] = [
    {
      header: "ID",
      accessorKey: "id",
      cell: ({ row }) => <span>{row.original.id}</span>,
    },
    {
      header: "Name",
      accessorKey: "name",
      cell: ({ row }) => <span>{row.original.name}</span>,
    },
    {
      header: "Specialization",
      accessorKey: "specialty",
      cell: ({ row }) => (
        <span className="text-[var(--muted-foreground)]">{row.original.specialty}</span>
      ),
    },
    {
      header: "Email",
      accessorKey: "email",
      cell: ({ row }) => <span>{row.original.email}</span>,
    },
    {
      header: "Phone No",
      accessorKey: "phone",
      cell: ({ row }) => (
        <span className="text-[var(--muted-foreground)]">{row.original.phone}</span>
      ),
    },
    {
      header: "Location",
      accessorKey: "city",
      cell: ({ row }) => <span>{row.original.city}</span>,
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
      enableSorting: false,
      cell: ({ row }) => (
        <Link
          href={`/dashboard/doctor-profile`}
          className="flex items-center justify-end gap-1 text-sm cursor-pointer text-[var(--muted-foreground)] hover:opacity-80 transition-opacity"
        >
          <span className="whitespace-nowrap">View Details</span>
          <ChevronRight className="w-4 h-4 text-[var(--primary)]" />
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
