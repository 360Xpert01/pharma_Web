// components/VisitHistoryAccordion.tsx
"use client";

import React, { useState, useRef, useMemo } from "react";
import { Paperclip, Gift, Calendar, MoreVertical } from "lucide-react";
import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";
import CenturoTable from "@/components/shared/table/CenturoTable";
import TablePagination from "@/components/TablePagination";

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
];

type Tab = "plans" | "samples" | "giveaways";

export default function VisitHistoryAccordion() {
  const [selectedFiles, setSelectedFiles] = useState<Record<string, File[]>>({});
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const [activeTab, setActiveTab] = useState<Tab>("plans");
  const [loading] = useState(false);
  const [error] = useState<string | null>(null);

  const tabs: { id: Tab; label: string }[] = [
    { id: "plans", label: "Plans" },
    { id: "samples", label: "Samples" },
    { id: "giveaways", label: "Giveaways" },
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
        accessorKey: "doctorName",
        header: "Doctor Name",
        cell: ({ row }) => (
          <p className="font-semibold text-(--gray-9)">{row.original.doctorName}</p>
        ),
      },
      {
        accessorKey: "specialty",
        header: "Specialty",
        cell: ({ row }) => <p className="text-(--gray-6)">{row.original.specialty}</p>,
      },
      {
        accessorKey: "clinic",
        header: "Clinic",
        cell: ({ row }) => <p className="text-(--gray-6)">{row.original.clinic}</p>,
      },
      {
        accessorKey: "date",
        header: "Date",
        cell: ({ row }) => <p className="text-(--gray-5)">{row.original.date}</p>,
      },
      {
        accessorKey: "calls",
        header: "Calls",
        cell: ({ row }) => <p className="text-(--gray-7) font-medium">{row.original.calls}</p>,
      },
      {
        accessorKey: "actions",
        header: "",
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
    <div className="px-4 pb-4">
      <div className="grid grid-cols-1 gap-10 py-6">
        {/* Left: Samples & Giveaways */}
        <div className="space-y-8">
          {visit.sampleItems.length > 0 && (
            <div>
              <h4 className="text-sm font-bold text-(--gray-8) mb-4">Sample Items</h4>
              <div className="space-y-3">
                {visit.sampleItems.map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center bg-(--background) rounded-8 px-5 py-4 border border-(--gray-2)"
                  >
                    <span className="font-medium text-(--gray-8)">{item.name}</span>
                    <span className="text-sm text-(--gray-5)">{item.date}</span>
                    <span className="text-sm font-bold text-(--gray-9)">{item.quantity}</span>
                    <MoreVertical className="w-4 h-4 text-(--gray-4)" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {visit.giveawayItems.length > 0 && (
            <div>
              <h4 className="text-sm font-bold text-(--gray-8) mb-4">Giveaway Items</h4>
              <div className="space-y-3">
                {visit.giveawayItems.map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center bg-(--background) rounded-8 px-5 py-4 border border-(--gray-2)"
                  >
                    <span className="font-medium text-(--gray-8)">{item.name}</span>
                    <span className="text-sm text-(--gray-5)">{item.date}</span>
                    <span className="text-sm font-bold text-(--gray-9)">{item.quantity}</span>
                    <MoreVertical className="w-4 h-4 text-(--gray-4)" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: Remarks + Attachments */}
        <div className="flex w-full justify-between gap-10">
          {/* Remarks */}
          <div className="w-[49%]">
            <h4 className="text-sm font-bold text-(--gray-8) mb-3">Remarks</h4>
            <p className="text-sm leading-relaxed text-(--gray-6) bg-(--background) rounded-8 p-5 border shadow-soft">
              {visit.remarks}
            </p>
          </div>

          {/* Attachments */}
          <div className="w-[49%]">
            <h4 className="text-sm font-bold text-(--gray-8) mb-3 flex items-center gap-2">
              Attachments
              {selectedFiles[visit.id]?.length > 0 && (
                <span className="text-xs bg-(--primary-0) text-(--primary) px-2 py-0.5 rounded-8 font-medium">
                  {selectedFiles[visit.id].length}
                </span>
              )}
            </h4>

            {/* Hidden Input */}
            <input
              ref={(el) => {
                fileInputRefs.current[visit.id] = el;
              }}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => handleFileChange(visit.id, e)}
            />

            {selectedFiles[visit.id]?.length > 0 ? (
              <div
                onClick={() => openFilePicker(visit.id)}
                className="flex items-center gap-4 bg-(--background) rounded-8 p-3 border shadow-soft cursor-pointer hover:bg-(--gray-0) transition"
              >
                <Paperclip className="w-6 h-6 text-(--gray-5)" />
                <div className="flex gap-3 flex-wrap">
                  {selectedFiles[visit.id].map((file, index) => (
                    <div key={index} className="relative group">
                      <div className="w-10 h-10 rounded-8 overflow-hidden border-2 border-(--gray-3)">
                        <Image
                          src={URL.createObjectURL(file)}
                          alt="attachment"
                          width={40}
                          height={40}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeImage(visit.id, index);
                        }}
                        className="absolute -top-1 -right-1 bg-(--destructive) text-(--light) rounded-8 w-5 h-5 text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  <div className="w-10 h-10 bg-(--gray-1) border-2 border-dashed border-(--gray-4) rounded-8 flex items-center justify-center">
                    <span className="text-xl text-(--gray-4)">+</span>
                  </div>
                </div>
              </div>
            ) : (
              <div
                onClick={() => openFilePicker(visit.id)}
                className="text-sm text-(--gray-4) italic cursor-pointer hover:text-(--gray-6) transition bg-(--background) rounded-8 p-5 border text-center shadow-soft"
              >
                Click to add attachments
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="w-full max-w-md my-6">
        <div className="relative bg-(--gray-1) rounded-8 p-1 shadow-inner">
          <div
            className="absolute top-1 left-1 h-[calc(100%-8px)] bg-(--primary) rounded-8 transition-all duration-300 ease-out shadow-soft"
            style={{
              width: "calc(33.333% - 4px)",
              transform:
                activeTab === "plans"
                  ? "translateX(0)"
                  : activeTab === "samples"
                    ? "translateX(calc(100% + 4px))"
                    : "translateX(calc(200% + 8px))",
            }}
          />
          <div className="relative flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative z-10 flex-1 py-2 cursor-pointer px-6 text-sm font-medium transition-all duration-300 rounded-8 ${
                  activeTab === tab.id ? "text-(--light)" : "text-(--gray-6) hover:text-(--gray-8)"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Visit Table */}
      <div className="mb-5">
        <CenturoTable
          data={visitData}
          columns={columns}
          loading={loading}
          error={error}
          enableExpanding={true}
          enablePagination={true}
          pageSize={5}
          emptyMessage="No visit history found"
          renderExpandedRow={renderExpandedRow}
          onRowClick={() => {}} // Enables cursor-pointer styling
          PaginationComponent={TablePagination}
        />
      </div>
    </div>
  );
}
