"use client";

import React, { useState, useMemo } from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import CenturoTable from "@/components/shared/table/CeturoTable";
import TablePagination from "@/components/TablePagination";
import StatusBadge from "@/components/shared/StatusBadge";
import { useAppSelector, useAppDispatch } from "@/store";
import { getFieldConfigByChannel } from "@/utils/doctorFormConfig";
import { getPartiesByChannelType } from "@/store/slices/party/partiesSlice";

interface Doctor {
  id: string;
  name: string;
  pmdcNumber?: string;
  specialty?: string;
  qualification?: string;
  segment?: string;
  designation?: string;
  email: string;
  phone: string;
  dateOfBirth?: string;
  parent?: string;
  city: string;
  status: "Active" | "Inactive";
}

const doctorsData: Doctor[] = [
  {
    id: "DCR01",
    name: "Dr. Sarah Ali",
    pmdcNumber: "PMDC-87654-K",
    specialty: "Cardiologist",
    qualification: "MBBS, FCPS",
    segment: "A",
    designation: "Senior Consultant",
    email: "sarah.ali@gmail.com",
    phone: "+923214323523",
    dateOfBirth: "1978-03-15",
    parent: "Aga Khan University Hospital",
    city: "Karachi",
    status: "Active",
  },
  {
    id: "DCR02",
    name: "Dr. Ahmed Khan",
    pmdcNumber: "PMDC-65432-L",
    specialty: "Neurologist",
    qualification: "MBBS, MRCP",
    segment: "A",
    designation: "Consultant",
    email: "ahmed.khan@gmail.com",
    phone: "+923334445566",
    dateOfBirth: "1982-07-22",
    parent: "Shaukat Khanum Hospital",
    city: "Lahore",
    status: "Active",
  },
  {
    id: "DCR03",
    name: "Dr. Fatima Raza",
    pmdcNumber: "PMDC-54321-I",
    specialty: "Pediatrician",
    qualification: "MBBS, DCH",
    segment: "B",
    designation: "Assistant Professor",
    email: "fatima.raza@gmail.com",
    phone: "+923451234567",
    dateOfBirth: "1985-11-08",
    parent: "Pakistan Institute of Medical Sciences",
    city: "Islamabad",
    status: "Inactive",
  },
  {
    id: "DCR04",
    name: "Dr. Ali Hassan",
    pmdcNumber: "PMDC-43210-M",
    specialty: "Dermatologist",
    qualification: "MBBS, FCPS (Dermatology)",
    segment: "B",
    designation: "Consultant",
    email: "ali.hassan@gmail.com",
    phone: "+923009876543",
    dateOfBirth: "1980-05-19",
    parent: "Nishtar Hospital",
    city: "Multan",
    status: "Active",
  },
  {
    id: "DCR05",
    name: "Dr. Zainab Malik",
    pmdcNumber: "PMDC-98765-F",
    specialty: "Orthopedic",
    qualification: "MBBS, MS (Ortho)",
    segment: "A",
    designation: "Senior Registrar",
    email: "zainab.malik@gmail.com",
    phone: "+923112223333",
    dateOfBirth: "1983-09-25",
    parent: "Allied Hospital",
    city: "Faisalabad",
    status: "Active",
  },
  {
    id: "DCR06",
    name: "Dr. Bilal Ahmed",
    pmdcNumber: "PMDC-11223-K",
    specialty: "Cardiologist",
    qualification: "MBBS, MD",
    segment: "A",
    designation: "Associate Professor",
    email: "bilal.ahmed@gmail.com",
    phone: "+923225554444",
    dateOfBirth: "1975-12-30",
    parent: "National Institute of Cardiovascular Diseases",
    city: "Karachi",
    status: "Inactive",
  },
  {
    id: "DCR07",
    name: "Dr. Ayesha Farooq",
    pmdcNumber: "PMDC-33445-P",
    specialty: "Gynecologist",
    qualification: "MBBS, FCPS (Gynae)",
    segment: "B",
    designation: "Consultant",
    email: "ayesha.farooq@gmail.com",
    phone: "+923337778888",
    dateOfBirth: "1981-04-12",
    parent: "Lady Reading Hospital",
    city: "Peshawar",
    status: "Active",
  },
  {
    id: "DCR08",
    name: "Dr. Omar Siddiqui",
    pmdcNumber: "PMDC-55667-K",
    specialty: "Oncologist",
    qualification: "MBBS, FCPS (Oncology)",
    segment: "A",
    designation: "Senior Consultant",
    email: "omar.siddiqui@gmail.com",
    phone: "+923441112222",
    dateOfBirth: "1977-08-07",
    parent: "Liaquat National Hospital",
    city: "Karachi",
    status: "Active",
  },
  {
    id: "DCR09",
    name: "Dr. Hina Javed",
    pmdcNumber: "PMDC-77889-L",
    specialty: "Psychiatrist",
    qualification: "MBBS, MRCPsych",
    segment: "B",
    designation: "Consultant Psychiatrist",
    email: "hina.javed@gmail.com",
    phone: "+923556667777",
    dateOfBirth: "1984-02-18",
    parent: "Jinnah Hospital",
    city: "Lahore",
    status: "Active",
  },
  {
    id: "DCR10",
    name: "Dr. Kamran Butt",
    pmdcNumber: "PMDC-99001-R",
    specialty: "ENT Specialist",
    qualification: "MBBS, FCPS (ENT)",
    segment: "C",
    designation: "Medical Officer",
    email: "kamran.butt@gmail.com",
    phone: "+923667778888",
    dateOfBirth: "1986-06-21",
    parent: "Holy Family Hospital",
    city: "Rawalpindi",
    status: "Inactive",
  },
  {
    id: "DCR11",
    name: "Dr. Sana Qureshi",
    pmdcNumber: "PMDC-22334-I",
    specialty: "Radiologist",
    qualification: "MBBS, FCPS (Radiology)",
    segment: "A",
    designation: "Consultant Radiologist",
    email: "sana.qureshi@gmail.com",
    phone: "+923778889999",
    dateOfBirth: "1979-10-14",
    parent: "Shifa International Hospital",
    city: "Islamabad",
    status: "Active",
  },
  {
    id: "DCR12",
    name: "Dr. Tariq Aziz",
    pmdcNumber: "PMDC-44556-S",
    specialty: "Urologist",
    qualification: "MBBS, FCPS (Urology)",
    segment: "B",
    designation: "Senior Registrar",
    email: "tariq.aziz@gmail.com",
    phone: "+923889990000",
    dateOfBirth: "1982-01-29",
    parent: "DHQ Hospital Sialkot",
    city: "Sialkot",
    status: "Active",
  },
  {
    id: "DCR13",
    name: "Dr. Mariam Shah",
    pmdcNumber: "PMDC-66778-M",
    specialty: "Ophthalmologist",
    qualification: "MBBS, DO, FCPS",
    segment: "B",
    designation: "Eye Specialist",
    email: "mariam.shah@gmail.com",
    phone: "+923990001111",
    dateOfBirth: "1983-05-03",
    parent: "Nishtar Medical College",
    city: "Multan",
    status: "Inactive",
  },
  {
    id: "DCR14",
    name: "Dr. Usman Akram",
    pmdcNumber: "PMDC-88990-K",
    specialty: "Gastroenterologist",
    qualification: "MBBS, FCPS (Medicine), FCPS (Gastro)",
    segment: "A",
    designation: "Consultant Gastroenterologist",
    email: "usman.akram@gmail.com",
    phone: "+923001112222",
    dateOfBirth: "1976-09-16",
    parent: "Sindh Institute of Urology",
    city: "Karachi",
    status: "Active",
  },
  {
    id: "DCR15",
    name: "Dr. Nadia Pervez",
    pmdcNumber: "PMDC-10111-L",
    specialty: "Endocrinologist",
    qualification: "MBBS, MRCP (UK)",
    segment: "A",
    designation: "Endocrinology Consultant",
    email: "nadia.pervez@gmail.com",
    phone: "+923112223344",
    dateOfBirth: "1981-07-27",
    parent: "Services Hospital",
    city: "Lahore",
    status: "Active",
  },
  {
    id: "DCR16",
    name: "Dr. Faisal Mahmood",
    pmdcNumber: "PMDC-32234-F",
    specialty: "Pulmonologist",
    qualification: "MBBS, FCPS (Pulmonology)",
    segment: "B",
    designation: "Chest Specialist",
    email: "faisal.mahmood@gmail.com",
    phone: "+923223344555",
    dateOfBirth: "1984-03-11",
    parent: "District Headquarter Hospital",
    city: "Faisalabad",
    status: "Inactive",
  },
  {
    id: "DCR17",
    name: "Dr. Rabia Nasir",
    pmdcNumber: "PMDC-54356-G",
    specialty: "Rheumatologist",
    qualification: "MBBS, FCPS (Rheumatology)",
    segment: "C",
    designation: "Consultant",
    email: "rabia.nasir@gmail.com",
    phone: "+923334455666",
    dateOfBirth: "1987-12-05",
    parent: "Aziz Fatima Hospital",
    city: "Gujranwala",
    status: "Active",
  },
  {
    id: "DCR18",
    name: "Dr. Shahid Iqbal",
    pmdcNumber: "PMDC-76578-P",
    specialty: "Nephrologist",
    qualification: "MBBS, FCPS (Nephrology)",
    segment: "A",
    designation: "Consultant Nephrologist",
    email: "shahid.iqbal@gmail.com",
    phone: "+923445566777",
    dateOfBirth: "1978-11-23",
    parent: "Khyber Teaching Hospital",
    city: "Peshawar",
    status: "Active",
  },
  {
    id: "DCR19",
    name: "Dr. Amina Rauf",
    pmdcNumber: "PMDC-98790-Q",
    specialty: "Hematologist",
    qualification: "MBBS, FCPS (Hematology)",
    segment: "B",
    designation: "Hematology Specialist",
    email: "amina.rauf@gmail.com",
    phone: "+923556677888",
    dateOfBirth: "1985-08-09",
    parent: "Bolan Medical Complex",
    city: "Quetta",
    status: "Active",
  },
  {
    id: "DCR20",
    name: "Dr. Imran Yousaf",
    pmdcNumber: "PMDC-20912-K",
    specialty: "Anesthesiologist",
    qualification: "MBBS, FCPS (Anesthesia)",
    segment: "B",
    designation: "Senior Anesthetist",
    email: "imran.yousaf@gmail.com",
    phone: "+923667788999",
    dateOfBirth: "1980-04-17",
    parent: "Civil Hospital",
    city: "Karachi",
    status: "Inactive",
  },
  {
    id: "DCR21",
    name: "Dr. Kiran Nadeem",
    pmdcNumber: "PMDC-42134-L",
    specialty: "Pathologist",
    qualification: "MBBS, MPhil (Pathology)",
    segment: "B",
    designation: "Consultant Pathologist",
    email: "kiran.nadeem@gmail.com",
    phone: "+923778899000",
    dateOfBirth: "1982-06-13",
    parent: "Mayo Hospital",
    city: "Lahore",
    status: "Active",
  },
  {
    id: "DCR22",
    name: "Dr. Hamza Saleem",
    pmdcNumber: "PMDC-64356-I",
    specialty: "Plastic Surgeon",
    qualification: "MBBS, FCPS (Plastic Surgery)",
    segment: "A",
    designation: "Plastic Surgery Consultant",
    email: "hamza.saleem@gmail.com",
    phone: "+923889900111",
    dateOfBirth: "1979-02-28",
    parent: "CDA Hospital",
    city: "Islamabad",
    status: "Active",
  },
  {
    id: "DCR23",
    name: "Dr. Saima Riaz",
    pmdcNumber: "PMDC-86578-M",
    specialty: "General Surgeon",
    qualification: "MBBS, FCPS (Surgery)",
    segment: "B",
    designation: "General Surgeon",
    email: "saima.riaz@gmail.com",
    phone: "+923990011222",
    dateOfBirth: "1983-10-20",
    parent: "Nishtar Hospital",
    city: "Multan",
    status: "Inactive",
  },
  {
    id: "DCR24",
    name: "Dr. Adnan Hafeez",
    pmdcNumber: "PMDC-08790-R",
    specialty: "Vascular Surgeon",
    qualification: "MBBS, FCPS (Vascular Surgery)",
    segment: "A",
    designation: "Vascular Surgery Specialist",
    email: "adnan.hafeez@gmail.com",
    phone: "+923001122333",
    dateOfBirth: "1977-05-07",
    parent: "Armed Forces Institute of Cardiology",
    city: "Rawalpindi",
    status: "Active",
  },
  {
    id: "DCR25",
    name: "Dr. Lubna Farhan",
    pmdcNumber: "PMDC-30912-K",
    specialty: "Infectious Disease",
    qualification: "MBBS, FCPS (Medicine), MRCP",
    segment: "A",
    designation: "Infectious Disease Consultant",
    email: "lubna.farhan@gmail.com",
    phone: "+923112233444",
    dateOfBirth: "1980-01-31",
    parent: "Indus Hospital",
    city: "Karachi",
    status: "Active",
  },
];

export default function DoctorsTable({ id }: { id: string }) {
  // Simulate loading and error states (replace with actual API call state)
  // const [loading] = useState(false);
  // const [error] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const { parties, loading, error } = useAppSelector((state) => state.parties);

  React.useEffect(() => {
    dispatch(getPartiesByChannelType(id));
  }, [dispatch]);

  console.log("parties12321", parties?.data?.items);

  const doctorsDataApi = parties?.data?.items || [];

  // Redux state for channels (fetched by parent component)
  const { channels, loading: channelsLoading } = useAppSelector((state) => state.allChannels);

  // Find the channel associated with this ID
  const currentChannel = useMemo(() => {
    if (!channels || channels.length === 0 || !id) return null;
    return channels.find((ch) => ch.id === id);
  }, [channels, id]);

  // Get field configuration based on channel name
  const fieldConfig = useMemo(() => {
    if (currentChannel) {
      console.log("Table - Current channel found:", currentChannel.name);
      return getFieldConfigByChannel(currentChannel.name);
    }
    // Default: show all columns if no channel is found
    console.log("Table - No channel found, using deault config");
    return getFieldConfigByChannel();
  }, [currentChannel]);

  // Define columns for CenturoTable based on field configuration
  const columns: ColumnDef<Doctor>[] = useMemo(() => {
    const cols: ColumnDef<Doctor>[] = [];

    // ID column - always show
    cols.push({
      header: "ID",
      accessorKey: "id",
      cell: ({ row }) => <span>{row.original?.id || "N/A"}</span>,
    });

    // PMDC Number - conditional
    if (fieldConfig.pmdcNumber) {
      cols.push({
        header: "PMDC Number",
        accessorKey: "pmdcNumber",
        cell: ({ row }) => <span>{row.original?.attributes?.PmdcNumber || "N/A"}</span>,
      });
    }

    // Name - conditional
    if (fieldConfig.name) {
      cols.push({
        header: "Name",
        accessorKey: "name",
        cell: ({ row }) => <span>{row.original?.party_name || "N/A"}</span>,
      });
    }

    // Specialization - conditional
    if (fieldConfig.specialty) {
      cols.push({
        header: "Specialization",
        accessorKey: "specialty",
        cell: ({ row }) => (
          <span className="text-[var(--muted-foreground)]">
            {row.original?.attributes?.specialization || "N/A"}
          </span>
        ),
      });
    }

    // Qualification - conditional
    if (fieldConfig.qualification) {
      cols.push({
        header: "Qualification",
        accessorKey: "qualification",
        cell: ({ row }) => <span>{row.original?.attributes?.qualification || "N/A"}</span>,
      });
    }

    // Segment - conditional
    if (fieldConfig.segment) {
      cols.push({
        header: "Segment",
        accessorKey: "segment",
        cell: ({ row }) => <span>{row.original?.segment || "N/A"}</span>,
      });
    }

    // Designation - conditional
    if (fieldConfig.designation) {
      cols.push({
        header: "Designation",
        accessorKey: "designation",
        cell: ({ row }) => <span>{row.original?.attributes?.Designation || "N/A"}</span>,
      });
    }

    // Email - conditional
    if (fieldConfig.email) {
      cols.push({
        header: "Email",
        accessorKey: "email",
        cell: ({ row }) => <span>{row.original?.email || "N/A"}</span>,
      });
    }

    // Phone/Contact Number - conditional
    if (fieldConfig.contactNumber) {
      cols.push({
        header: "Phone No",
        accessorKey: "phone",
        cell: ({ row }) => (
          <span className="text-[var(--muted-foreground)]">
            {row.original?.phone_number || "N/A"}
          </span>
        ),
      });
    }

    // Date of Birth - conditional
    if (fieldConfig.dateOfBirth) {
      cols.push({
        header: "D.O.B",
        accessorKey: "dateOfBirth",
        cell: ({ row }) => <span>{row.original?.attributes?.date_of_birth || "N/A"}</span>,
      });
    }

    // Parent - conditional
    if (fieldConfig.parent) {
      cols.push({
        header: "Parent",
        accessorKey: "parent",
        cell: ({ row }) => <span>{row.original?.parent || "N/A"}</span>,
      });
    }

    // Location - conditional (mapped to locations in config)
    if (fieldConfig.locations) {
      cols.push({
        header: "Location",
        accessorKey: "city",
        cell: ({ row }) => <span>{row.original?.locations?.city || "N/A"}</span>,
      });
    }

    // Status - always show
    cols.push({
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => (
        <div className="flex justify-center">
          <StatusBadge status={row.original?.status} />
        </div>
      ),
    });

    // Actions - always show
    cols.push({
      id: "actions",
      header: "",
      enableSorting: false,
      cell: ({ row }) => (
        <Link
          href={`/dashboard/details-profile/${row.original?.party_id}`}
          className="flex items-center justify-end gap-1 text-sm cursor-pointer text-[var(--muted-foreground)] hover:opacity-80 transition-opacity"
        >
          <span className="whitespace-nowrap">View Details</span>
          <ChevronRight className="w-4 h-4 text-[var(--primary)]" />
        </Link>
      ),
    });

    return cols;
  }, [fieldConfig]);

  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="w-full">
      <CenturoTable
        data={doctorsDataApi}
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
