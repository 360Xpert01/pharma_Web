"use client";

import React, { useState } from "react";
import { MoreVertical } from "lucide-react";
import TableColumnHeader from "@/components/TableColumnHeader";
import StatusToggle from "@/components/form/StatusToggle";

interface Specialization {
  id: string;
  pulseCode: string;
  name: string;
  isActive: boolean;
}

export default function SpecializationsManager() {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [specializations, setSpecializations] = useState<Specialization[]>([
    { id: "1", pulseCode: "SP01", name: "Cardiologist", isActive: true },
    { id: "2", pulseCode: "SP02", name: "Dermatologist", isActive: true },
    { id: "3", pulseCode: "SP03", name: "Neurologist", isActive: true },
    { id: "4", pulseCode: "SP04", name: "Pediatrician", isActive: true },
    { id: "5", pulseCode: "SP05", name: "Orthopedic Surgeon", isActive: true },
    { id: "6", pulseCode: "SP06", name: "Gynecologist", isActive: true },
    { id: "7", pulseCode: "SP07", name: "Ophthalmologist", isActive: true },
    { id: "8", pulseCode: "SP08", name: "Psychiatrist", isActive: true },
    { id: "9", pulseCode: "SP09", name: "Endocrinologist", isActive: true },
    { id: "10", pulseCode: "SP10", name: "Gastroenterologist", isActive: true },
    { id: "11", pulseCode: "SP11", name: "Pulmonologist", isActive: true },
    { id: "12", pulseCode: "SP12", name: "Rheumatologist", isActive: false },
    { id: "13", pulseCode: "SP13", name: "Urologist", isActive: true },
    { id: "14", pulseCode: "SP14", name: "ENT Specialist", isActive: true },
    { id: "15", pulseCode: "SP15", name: "Nephrologist", isActive: true },
  ]);

  const toggleStatus = (id: string) => {
    setSpecializations(
      specializations.map((spec) => (spec.id === id ? { ...spec, isActive: !spec.isActive } : spec))
    );
  };

  const deleteSpecialization = (id: string) => {
    setSpecializations(specializations.filter((spec) => spec.id !== id));
    setOpenMenuId(null);
  };

  // Define columns for the table header
  const specializationColumns = [
    { label: "Pulse Code", className: "w-[35%] ml-3" },
    { label: "Specialization Name", className: "w-[50%]" },
    { label: "Status", className: "w-[5%]" },
    { label: "", className: "w-[0%]" },
  ];

  return (
    <div className="w-full overflow-hidden bg-(--background)">
      {specializations.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="t-h3 text-[var(--gray-6)]">No specializations found</p>
          <p className="t-sm text-[var(--gray-5)] mt-2">
            There are currently no specializations in the system.
          </p>
        </div>
      ) : (
        <div>
          {/* Column Headers */}
          <TableColumnHeader
            columns={specializationColumns}
            containerClassName="flex w-[80%]"
            showBackground={false}
          />

          {/* List */}
          <div>
            {specializations.map((specialization) => (
              <div
                key={specialization.id}
                className="px-3 py-3 w-[98%] flex items-center gap-6 hover:bg-[var(--gray-0)] transition-all cursor-pointer border border-[var(--gray-2)] mx-4 my-3 rounded-8 bg-[var(--background)]"
              >
                {/* Pulse Code */}
                <div
                  className="w-[30%] text-sm font-bold text-[var(--gray-9)] truncate"
                  title={specialization.pulseCode}
                >
                  {specialization.pulseCode}
                </div>

                {/* Specialization Name */}
                <div
                  className="w-[40%] text-sm font-bold text-[var(--gray-9)] truncate"
                  title={specialization.name}
                >
                  {specialization.name}
                </div>

                {/* Status Toggle */}
                <div className="w-[30%] flex items-center">
                  <StatusToggle
                    status={specialization.isActive ? "Active" : "Inactive"}
                    onChange={() => toggleStatus(specialization.id)}
                  />
                </div>

                {/* Three-dot Menu */}
                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenMenuId(openMenuId === specialization.id ? null : specialization.id);
                    }}
                    className="p-2 hover:bg-[var(--gray-1)] rounded-full transition"
                  >
                    <MoreVertical className="w-5 h-5 text-[var(--gray-7)]" />
                  </button>

                  {/* Dropdown Menu */}
                  {openMenuId === specialization.id && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setOpenMenuId(null)} />
                      <div className="absolute right-0 top-10 mt-2 w-48 bg-[var(--light)] rounded-8 shadow-soft border border-[var(--gray-2)] z-50">
                        <button className="w-full text-left px-4 py-2 text-sm hover:bg-[var(--gray-1)] cursor-pointer transition">
                          Edit Specialization
                        </button>
                        <button
                          onClick={() => deleteSpecialization(specialization.id)}
                          className="w-full text-left px-4 py-2 text-sm text-[var(--destructive)] hover:bg-[var(--gray-1)] cursor-pointer transition"
                        >
                          Delete Specialization
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
