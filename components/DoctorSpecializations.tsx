"use client";

import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { FormInput } from "@/components/form";
import { Button } from "@/components/ui/button/button";

interface Specialization {
  id: string;
  pulseCode: string;
  name: string;
  isActive: boolean;
}

export default function AddSpecializationsCard() {
  const [specializationName, setSpecializationName] = useState("");
  const [pulseCode, setPulseCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
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
  ]);

  const handleAddSpecialization = async () => {
    if (!specializationName.trim()) return;

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const newSpecialization: Specialization = {
        id: (specializations.length + 1).toString(),
        pulseCode: pulseCode.trim() || "SP11",
        name: specializationName.trim(),
        isActive: true,
      };

      setSpecializations([...specializations, newSpecialization]);
      setSpecializationName("");
      setPulseCode("");
      setSuccess(true);
      setLoading(false);

      // Reset success message after 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    }, 500);
  };

  return (
    <div className="w-full">
      <div className="bg-[var(--background)] rounded-8 shadow-soft border border-[var(--gray-1)] overflow-hidden">
        <div className="px-8 py-10 space-y-8">
          {/* Header */}
          <div>
            <h2 className="t-h2">Add Doctor Specializations</h2>
            <p className="t-sm mt-1">Manage doctor specializations for your organization</p>
          </div>

          {/* Success Message */}
          {success && (
            <div className="bg-[var(--success-0)] border border-[var(--success)] text-[var(--success)] px-4 py-3 rounded-8">
              Specialization added successfully!
            </div>
          )}

          {/* Add New Specialization Form */}
          <div className="flex gap-6 items-end">
            {/* Input Fields Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
              {/* Pulse Code */}
              <FormInput
                label="Pulse Code"
                name="pulseCode"
                type="text"
                value={pulseCode}
                onChange={setPulseCode}
                placeholder="SP11"
                required
              />

              {/* Specialization Name */}
              <FormInput
                label="Specialization Name"
                name="specializationName"
                type="text"
                value={specializationName}
                onChange={setSpecializationName}
                placeholder="e.g. Cardiologist"
                required
              />
            </div>

            {/* Add Button */}
            <Button
              onClick={handleAddSpecialization}
              disabled={!specializationName.trim() || loading}
              variant="primary"
              size="lg"
              icon={Plus}
              loading={loading}
              className="h-12 px-8"
            >
              {loading ? "Adding..." : "Add to list"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
