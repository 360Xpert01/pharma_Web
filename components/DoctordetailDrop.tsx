// components/VisitHistoryAccordion.tsx
"use client";

import React, { useState, useRef } from "react";
import { Paperclip, Gift, Calendar, MoreVertical } from "lucide-react";
import Image from "next/image";

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
    clinic: "Children’s Wellness Clinic",
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
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<Record<string, File[]>>({});
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const [activeTab, setActiveTab] = useState<Tab>("plans");
  const tabs: { id: Tab; label: string }[] = [
    { id: "plans", label: "Plans" },
    { id: "samples", label: "Samples" },
    { id: "giveaways", label: "Giveaways" },
  ];

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

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

  return (
    <div className="w-full ">
      <div className="">
        {/* Tabs */}

        <div className="w-full max-w-md  my-6 mx-4">
          <div className="relative bg-gray-100 rounded-full p-1 shadow-inner">
            <div
              className="absolute top-1 left-1 h-[calc(100%-8px)] w-[calc(33.333%-8px)] bg-blue-600 rounded-full transition-all duration-300 ease-out shadow-soft"
              style={{
                transform:
                  activeTab === "plans"
                    ? "translateX(0%)"
                    : activeTab === "samples"
                      ? "translateX(100%)"
                      : "translateX(200%)",
              }}
            />
            <div className="relative flex">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative z-10 flex-1 py-2 px-6 text-sm font-medium transition-all duration-300 rounded-full ${
                    activeTab === tab.id ? "text-white" : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Visit Rows */}
        <div className="mb-5 ">
          {visitData.map((visit) => (
            <div key={visit.id}>
              {/* Main Row */}
              <div
                onClick={() => toggleExpand(visit.id)}
                className="px-6 py-1 transition-all cursor-pointer flex items-center justify-between group"
              >
                <div className="w-full p-4 rounded-md hover:bg-gray-50  border border-gray-200  grid grid-cols-14 gap-6 text-sm">
                  <div className="col-span-2">
                    <p className="font-semibold text-gray-900">{visit.doctorName}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-gray-600">{visit.specialty}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-gray-600">{visit.clinic}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-gray-500">{visit.date}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-gray-700 font-medium">{visit.calls}</p>
                  </div>
                  <div className="col-span-2 flex items-center justify-center text-blue-600 gap-4">
                    <Gift className="w-5 h-5" />
                    <Paperclip className="w-5 h-5 rotation-120 " />
                  </div>
                  <div className="col-span-2 flex justify-end">
                    <MoreVertical className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Expanded Details */}
              {expandedId === visit.id && (
                <div className="px-8 pb-8 border-t bg-gray-100 border-gray-200">
                  <div className="grid grid-cols-1 gap-10 py-6">
                    {/* Left: Samples & Giveaways */}
                    <div className="space-y-8">
                      {visit.sampleItems.length > 0 && (
                        <div>
                          <h4 className="text-sm font-bold text-gray-800 mb-4">Sample Items</h4>
                          <div className="space-y-3">
                            {visit.sampleItems.map((item, i) => (
                              <div
                                key={i}
                                className="flex justify-between items-center bg-(--background) rounded-xl px-5 py-4"
                              >
                                <span className="font-medium text-gray-800">{item.name}</span>
                                <span className="text-sm text-gray-500">{item.date}</span>
                                <span className="text-sm font-bold text-gray-900">
                                  {item.quantity}
                                </span>
                                <MoreVertical className="w-4 h-4 text-gray-400" />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {visit.giveawayItems.length > 0 && (
                        <div>
                          <h4 className="text-sm font-bold text-gray-800 mb-4">Giveaway Items</h4>
                          <div className="space-y-3">
                            {visit.giveawayItems.map((item, i) => (
                              <div
                                key={i}
                                className="flex justify-between items-center bg-(--background) rounded-xl px-5 py-4"
                              >
                                <span className="font-medium text-gray-800">{item.name}</span>
                                <span className="text-sm text-gray-500">{item.date}</span>
                                <span className="text-sm font-bold text-gray-900">
                                  {item.quantity}
                                </span>
                                <MoreVertical className="w-4 h-4 text-gray-400" />
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
                        <h4 className="text-sm font-bold text-gray-800 mb-3">Remarks</h4>
                        <p className="text-sm leading-relaxed text-gray-600 bg-(--background) rounded-xl p-5 border shadow-soft">
                          {visit.remarks}
                        </p>
                      </div>

                      {/* Attachments */}
                      <div className="w-[49%]">
                        <h4 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                          Attachments
                          {selectedFiles[visit.id]?.length > 0 && (
                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">
                              {selectedFiles[visit.id].length}
                            </span>
                          )}
                        </h4>

                        {/* Hidden Input */}
                        <input
                          ref={(el) => (fileInputRefs.current[visit.id] = el)}
                          type="file"
                          accept="image/*"
                          multiple
                          className="hidden"
                          onChange={(e) => handleFileChange(visit.id, e)}
                        />

                        {selectedFiles[visit.id]?.length > 0 ? (
                          <div
                            onClick={() => openFilePicker(visit.id)}
                            className="flex items-center gap-4 bg-(--background) rounded-xl p-3 border shadow-soft cursor-pointer hover:bg-gray-50 transition"
                          >
                            <Paperclip className="w-6 h-6 text-gray-500" />
                            <div className="flex gap-3 flex-wrap">
                              {selectedFiles[visit.id].map((file, index) => (
                                <div key={index} className="relative group">
                                  <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-gray-300">
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
                                    className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                                  >
                                    ×
                                  </button>
                                </div>
                              ))}
                              <div className="w-10 h-10 bg-gray-100 border-2 border-dashed border-gray-400 rounded-xl flex items-center justify-center">
                                <span className="text-xl text-gray-400">+</span>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div
                            onClick={() => openFilePicker(visit.id)}
                            className="text-sm text-gray-400 italic cursor-pointer hover:text-gray-600 transition bg-(--background) rounded-xl p-5 border text-center shadow-soft"
                          >
                            Click to add attachments
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
