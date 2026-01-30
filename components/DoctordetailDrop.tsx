// components/VisitHistoryAccordion.tsx
"use client";

import React, { useState, useRef, useMemo } from "react";
import { Paperclip, Gift, Calendar, MoreVertical } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import CenturoTable from "@/components/shared/table/CeturoTable";
import TablePagination from "@/components/TablePagination";
import AnimatedTabs from "@/components/shared/AnimatedTabs";
import VisitExpandedDetails from "@/components/VisitExpandedDetails";
import SamplesTable from "@/components/SamplesTable";
import GiveawaysTable from "@/components/GiveawaysTable";

interface Visit {
  id: string;
  doctorName: string;
  specialty: string;
  clinic: string;
  date: string;
  calls: string;
  sampleItems: { name: string; date: string; quantity: number }[];
  giveawayItems: { name: string; date: string; quantity: number }[];
  remarks: string;
  attachments: number; // yeh ab sirf initial count ke liye hai (0 rakha hai)
}

const visitData: Visit[] = [
  {
    id: "1",
    doctorName: "Dr. Sami Kashan",
    specialty: "Diabetologist",
    clinic: "Diabetes Care Clinic",
    date: "2024-12-01",
    calls: "74 Calls Last week",
    sampleItems: [
      { name: "Glucophage 500mg", date: "2024-12-01", quantity: 30 },
      { name: "Insulin Pens", date: "2024-12-01", quantity: 10 },
    ],
    giveawayItems: [
      { name: "Branded Glucose Meter", date: "2024-12-01", quantity: 1 },
      { name: "Patient Education Booklet", date: "2024-12-01", quantity: 20 },
    ],
    remarks:
      "Very cooperative doctor. Interested in new insulin analogs. Requested samples for trial.",
    attachments: 0,
  },
  {
    id: "2",
    doctorName: "Dr. Ahmed Raza",
    specialty: "Cardiologist",
    clinic: "Heart Health Center",
    date: "2024-11-28",
    calls: "62 Calls Last week",
    sampleItems: [{ name: "Atorvastatin 20mg", date: "2024-11-28", quantity: 50 }],
    giveawayItems: [{ name: "Branded Stethoscope", date: "2024-11-28", quantity: 1 }],
    remarks: "Prefers evening visits. High patient volume.",
    attachments: 0,
  },
  {
    id: "3",
    doctorName: "Dr. Fatima Ali",
    specialty: "Neurologist",
    clinic: "Brain & Spine Clinic",
    date: "2024-11-25",
    calls: "58 Calls Last week",
    sampleItems: [],
    giveawayItems: [
      { name: "Migraine Diary", date: "2024-11-25", quantity: 25 },
      { name: "Branded Pen Set", date: "2024-11-25", quantity: 10 },
    ],
    remarks: "No samples requested this time. Only educational material taken.",
    attachments: 0,
  },
  {
    id: "4",
    doctorName: "Dr. Omar Farooq",
    specialty: "Gastroenterologist",
    clinic: "Digestive Health Hospital",
    date: "2024-11-20",
    calls: "81 Calls Last week",
    sampleItems: [
      { name: "Pantoprazole 40mg", date: "2024-11-20", quantity: 60 },
      { name: "Probiotics Sachets", date: "2024-11-20", quantity: 40 },
    ],
    giveawayItems: [],
    remarks: "Regular customer. Always accepts samples. Very positive feedback on last product.",
    attachments: 0,
  },
  {
    id: "5",
    doctorName: "Dr. Ayesha Khan",
    specialty: "Pediatrician",
    clinic: "Children's Wellness Clinic",
    date: "2024-11-18",
    calls: "45 Calls Last week",
    sampleItems: [{ name: "Vitamin D Drops", date: "2024-11-18", quantity: 20 }],
    giveawayItems: [
      { name: "Coloring Books", date: "2024-11-18", quantity: 30 },
      { name: "Stickers Pack", date: "2024-11-18", quantity: 100 },
    ],
    remarks: "Loves giveaway items for kids. Very friendly and approachable.",
    attachments: 0,
  },
  {
    id: "6",
    doctorName: "Dr. Hassan Mahmood",
    specialty: "Orthopedic Surgeon",
    clinic: "Joint & Bone Care Center",
    date: "2024-11-15",
    calls: "52 Calls Last week",
    sampleItems: [
      { name: "Calcium Tablets", date: "2024-11-15", quantity: 45 },
      { name: "Vitamin D3 Capsules", date: "2024-11-15", quantity: 30 },
    ],
    giveawayItems: [{ name: "Exercise Guide Booklet", date: "2024-11-15", quantity: 15 }],
    remarks: "Specializes in sports injuries. Very interested in new calcium supplements.",
    attachments: 0,
  },
  {
    id: "7",
    doctorName: "Dr. Zainab Qureshi",
    specialty: "Dermatologist",
    clinic: "Skin Care Clinic",
    date: "2024-11-12",
    calls: "68 Calls Last week",
    sampleItems: [
      { name: "Anti-Acne Cream", date: "2024-11-12", quantity: 25 },
      { name: "Sunscreen SPF 50", date: "2024-11-12", quantity: 20 },
    ],
    giveawayItems: [{ name: "Skincare Guide", date: "2024-11-12", quantity: 40 }],
    remarks: "Very professional. Requests samples for teenage patients. High prescription rate.",
    attachments: 0,
  },
  {
    id: "8",
    doctorName: "Dr. Bilal Ansari",
    specialty: "ENT Specialist",
    clinic: "Ear, Nose & Throat Center",
    date: "2024-11-10",
    calls: "47 Calls Last week",
    sampleItems: [
      { name: "Nasal Spray", date: "2024-11-10", quantity: 35 },
      { name: "Throat Lozenges", date: "2024-11-10", quantity: 50 },
    ],
    giveawayItems: [],
    remarks: "Prefers morning appointments. Appreciates detailed product information.",
    attachments: 0,
  },
  {
    id: "9",
    doctorName: "Dr. Nida Saleem",
    specialty: "Gynecologist",
    clinic: "Women's Health Clinic",
    date: "2024-11-08",
    calls: "71 Calls Last week",
    sampleItems: [
      { name: "Prenatal Vitamins", date: "2024-11-08", quantity: 40 },
      { name: "Iron Supplements", date: "2024-11-08", quantity: 35 },
    ],
    giveawayItems: [
      { name: "Pregnancy Care Guide", date: "2024-11-08", quantity: 25 },
      { name: "Baby Care Booklet", date: "2024-11-08", quantity: 25 },
    ],
    remarks: "Excellent relationship. Always provides valuable feedback on products.",
    attachments: 0,
  },
  {
    id: "10",
    doctorName: "Dr. Imran Sheikh",
    specialty: "General Physician",
    clinic: "City Medical Center",
    date: "2024-11-05",
    calls: "89 Calls Last week",
    sampleItems: [
      { name: "Multivitamins", date: "2024-11-05", quantity: 60 },
      { name: "Paracetamol 500mg", date: "2024-11-05", quantity: 100 },
    ],
    giveawayItems: [{ name: "First Aid Kit", date: "2024-11-05", quantity: 5 }],
    remarks: "High volume practice. Very influential in the medical community.",
    attachments: 0,
  },
  {
    id: "11",
    doctorName: "Dr. Mariam Baig",
    specialty: "Psychiatrist",
    clinic: "Mental Health Wellness Center",
    date: "2024-11-02",
    calls: "38 Calls Last week",
    sampleItems: [],
    giveawayItems: [
      { name: "Stress Management Guide", date: "2024-11-02", quantity: 30 },
      { name: "Meditation Handbook", date: "2024-11-02", quantity: 20 },
    ],
    remarks: "Focuses on holistic treatment. Appreciates educational materials for patients.",
    attachments: 0,
  },
  {
    id: "12",
    doctorName: "Dr. Kamran Javed",
    specialty: "Urologist",
    clinic: "Urology Care Center",
    date: "2024-10-30",
    calls: "55 Calls Last week",
    sampleItems: [{ name: "Prostate Health Supplement", date: "2024-10-30", quantity: 25 }],
    giveawayItems: [{ name: "Men's Health Guide", date: "2024-10-30", quantity: 20 }],
    remarks: "Very knowledgeable. Requests clinical trial data for new products.",
    attachments: 0,
  },
  {
    id: "13",
    doctorName: "Dr. Sana Iqbal",
    specialty: "Ophthalmologist",
    clinic: "Eye Care Hospital",
    date: "2024-10-28",
    calls: "64 Calls Last week",
    sampleItems: [
      { name: "Eye Drops Lubricant", date: "2024-10-28", quantity: 40 },
      { name: "Vitamin A Capsules", date: "2024-10-28", quantity: 30 },
    ],
    giveawayItems: [{ name: "Eye Care Tips Brochure", date: "2024-10-28", quantity: 50 }],
    remarks: "Modern clinic with latest equipment. Open to new product trials.",
    attachments: 0,
  },
  {
    id: "14",
    doctorName: "Dr. Adnan Malik",
    specialty: "Pulmonologist",
    clinic: "Respiratory Care Center",
    date: "2024-10-25",
    calls: "76 Calls Last week",
    sampleItems: [
      { name: "Asthma Inhaler", date: "2024-10-25", quantity: 20 },
      { name: "Cough Syrup", date: "2024-10-25", quantity: 35 },
    ],
    giveawayItems: [{ name: "Breathing Exercise Guide", date: "2024-10-25", quantity: 30 }],
    remarks: "Specializes in asthma and COPD patients. Very responsive to follow-ups.",
    attachments: 0,
  },
  {
    id: "15",
    doctorName: "Dr. Rabia Farhan",
    specialty: "Endocrinologist",
    clinic: "Hormone & Metabolism Clinic",
    date: "2024-10-22",
    calls: "59 Calls Last week",
    sampleItems: [
      { name: "Thyroid Medication", date: "2024-10-22", quantity: 45 },
      { name: "Diabetes Test Strips", date: "2024-10-22", quantity: 50 },
    ],
    giveawayItems: [
      { name: "Diabetes Diet Chart", date: "2024-10-22", quantity: 25 },
      { name: "Hormone Balance Guide", date: "2024-10-22", quantity: 20 },
    ],
    remarks:
      "Excellent doctor with great patient outcomes. Interested in latest diabetes treatments.",
    attachments: 0,
  },
];

type Tab = "plans" | "samples" | "giveaways";

export default function VisitHistoryAccordion({ id }: any) {
  const [selectedFiles, setSelectedFiles] = useState<Record<string, File[]>>({});
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const [activeTab, setActiveTab] = useState<Tab>("plans");
  const [loading] = useState(false);
  const [error] = useState<string | null>(null);

  const tabs = [
    { id: "plans" as Tab, label: "Plans" },
    { id: "samples" as Tab, label: "Samples" },
    { id: "giveaways" as Tab, label: "Giveaways" },
  ];

  const openFilePicker = (visitId: string) => {
    fileInputRefs.current[visitId]?.click();
  };

  const handleFileChange = (visitId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      setSelectedFiles((prev) => ({
        ...prev,
        [visitId]: [...(prev[visitId] || []), ...files],
      }));
      e.target.value = ""; // reset so same file can be picked again
    }
  };

  const removeImage = (visitId: string, index: number) => {
    setSelectedFiles((prev) => ({
      ...prev,
      [visitId]: prev[visitId]?.filter((_, i) => i !== index) || [],
    }));
  };

  // Define columns for CenturoTable
  const columns = useMemo<ColumnDef<Visit>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        enableSorting: true,
        sortingFn: "alphanumeric",
        cell: ({ row }) => <p className="font-medium">{row.original.id}</p>,
      },
      {
        accessorKey: "doctorName",
        header: "Doctor Name",
        enableSorting: true,
        sortingFn: "alphanumeric",
        cell: ({ row }) => (
          <p
            className="font-semibold text-(--primary) cursor-pointer hover:underline"
            onClick={(e) => {
              e.stopPropagation();
              row.toggleExpanded();
            }}
          >
            {row.original.doctorName}
          </p>
        ),
      },
      {
        accessorKey: "specialty",
        header: "Specialty",
        enableSorting: true,
        sortingFn: "alphanumeric",
        cell: ({ row }) => <p className="font-medium">{row.original.specialty}</p>,
      },
      {
        accessorKey: "clinic",
        header: "Clinic",
        enableSorting: true,
        sortingFn: "alphanumeric",
        cell: ({ row }) => <p className="font-medium">{row.original.clinic}</p>,
      },
      {
        accessorKey: "date",
        header: "Date",
        enableSorting: true,
        sortingFn: "alphanumeric",
        cell: ({ row }) => <p className="text-(--gray-5)">{row.original.date}</p>,
      },
      {
        accessorKey: "calls",
        header: "Calls",
        enableSorting: true,
        sortingFn: "alphanumeric",
        cell: ({ row }) => <p className="font-medium">{row.original.calls}</p>,
      },
      {
        accessorKey: "actions",
        header: "",
        enableSorting: false,
        cell: () => (
          <div className="flex items-center justify-center text-(--primary) gap-4">
            <Gift className="w-5 h-5" />
            <Paperclip className="w-5 h-5 rotation-120" />
          </div>
        ),
      },
      {
        id: "menu",
        header: "",
        enableSorting: false,
        cell: () => (
          <div className="flex justify-end">
            <MoreVertical className="w-4 h-4 text-(--gray-4)" />
          </div>
        ),
      },
    ],
    []
  );

  // Render expanded row content
  const renderExpandedRow = (visit: Visit) => (
    <VisitExpandedDetails
      visitId={visit.id}
      sampleItems={visit.sampleItems}
      giveawayItems={visit.giveawayItems}
      remarks={visit.remarks}
      selectedFiles={selectedFiles[visit.id] || []}
      onFilePickerOpen={() => openFilePicker(visit.id)}
      onFileChange={(e) => handleFileChange(visit.id, e)}
      onRemoveImage={(index) => removeImage(visit.id, index)}
      fileInputRef={(el) => {
        fileInputRefs.current[visit.id] = el;
      }}
    />
  );

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="w-full max-w-md my-6">
        <AnimatedTabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          variant="primary"
          size="md"
        />
      </div>

      {/* Tab Content */}
      {activeTab === "plans" && (
        <div className="mb-5">
          <CenturoTable
            data={visitData}
            columns={columns}
            loading={loading}
            error={error}
            enableExpanding={true}
            enablePagination={true}
            pageSize={10}
            emptyMessage="No visit history found"
            renderExpandedRow={renderExpandedRow}
            PaginationComponent={TablePagination}
          />
        </div>
      )}

      {activeTab === "samples" && (
        <div className="mb-5">
          <SamplesTable id={id} />
        </div>
      )}

      {activeTab === "giveaways" && (
        <div className="mb-5">
          <GiveawaysTable id={id} />
        </div>
      )}
    </div>
  );
}
