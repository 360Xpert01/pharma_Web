"use client";

import React, { useState } from "react";
import { Plus, X } from "lucide-react";
import { FormInput } from "@/components/form";
import { Button } from "@/components/ui/button/button";

interface Qualification {
  id: string;
  qualificationName: string;
  pulseCode: string;
  legacyCode: string;
}

export default function AddQualificationsCard() {
  const [qualificationName, setQualificationName] = useState("");
  const [pulseCode, setPulseCode] = useState("");
  const [legacyCode, setLegacyCode] = useState("");
  const [qualificationsList, setQualificationsList] = useState<Qualification[]>([]);
  const [loading, setLoading] = useState(false);

  // Auto-generate pulse code based on qualifications count
  const generatePulseCode = () => {
    const count = qualificationsList.length + 1;
    return `QL_${String(count).padStart(6, "0")}`;
  };

  const handleAddQualification = async () => {
    if (!qualificationName.trim()) return;

    setLoading(true);

    // Simulate API delay
    setTimeout(() => {
      const newQualification: Qualification = {
        id: Date.now().toString(),
        qualificationName: qualificationName.trim(),
        pulseCode: pulseCode || generatePulseCode(),
        legacyCode: legacyCode.trim() || "",
      };

      setQualificationsList([...qualificationsList, newQualification]);

      // Clear form
      setQualificationName("");
      setPulseCode("");
      setLegacyCode("");
      setLoading(false);
    }, 500);
  };

  const removeQualification = (id: string) => {
    setQualificationsList(qualificationsList.filter((qual) => qual.id !== id));
  };

  return (
    <div className="w-full">
      <div className="bg-[var(--background)] rounded-8 shadow-soft border border-[var(--gray-1)] overflow-hidden">
        <div className="px-8 py-10 space-y-8">
          {/* Header */}
          <div>
            <h2 className="t-h2">Add Qualifications</h2>
            <p className="t-sm text-[var(--subheading-color)] mt-1">
              Manage doctor qualifications and certifications
            </p>
          </div>

          {/* Add New Qualification Form */}
          <div className="flex gap-6 items-end">
            {/* Input Fields Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
              {/* Pulse Code */}
              <FormInput
                label="Pulse Code"
                name="pulseCode"
                type="text"
                value={pulseCode || generatePulseCode()}
                onChange={setPulseCode}
                placeholder="QL_000001"
                required
              />

              {/* Qualification Name */}
              <FormInput
                label="Qualification Name"
                name="qualificationName"
                type="text"
                value={qualificationName}
                onChange={setQualificationName}
                placeholder="e.g. MBBS, MD, MS, DNB"
                required
              />

              {/* Legacy Code */}
              <FormInput
                label="Legacy Code (Optional)"
                name="legacyCode"
                type="text"
                value={legacyCode}
                onChange={setLegacyCode}
                placeholder="e.g. OLD-QL-001"
              />
            </div>

            {/* Add Button */}
            <Button
              onClick={handleAddQualification}
              disabled={!qualificationName.trim() || loading}
              variant="primary"
              size="lg"
              icon={Plus}
              loading={loading}
              className="h-12 px-8"
            >
              {loading ? "Adding..." : "Add to list"}
            </Button>
          </div>

          {/* Added Qualifications List */}
          {qualificationsList.length > 0 && (
            <div className="mt-10">
              <h3 className="t-h4 mb-4">Added Qualifications ({qualificationsList.length})</h3>
              <div className="space-y-3">
                {qualificationsList.map((qualification) => (
                  <div
                    key={qualification.id}
                    className="flex items-center justify-between p-5 bg-[var(--gray-0)] rounded-8 border border-[var(--gray-2)]"
                  >
                    <div className="grid grid-cols-3 gap-8 flex-1">
                      <div>
                        <p className="t-cap">Qualification Name</p>
                        <p className="t-label-b">{qualification.qualificationName}</p>
                      </div>
                      <div>
                        <p className="t-cap">Pulse Code</p>
                        <p className="t-val-sm">{qualification.pulseCode}</p>
                      </div>
                      <div>
                        <p className="t-cap">Legacy Code</p>
                        <p className="t-label-b">{qualification.legacyCode || "N/A"}</p>
                      </div>
                    </div>
                    <Button
                      onClick={() => removeQualification(qualification.id)}
                      variant="ghost"
                      size="icon"
                      icon={X}
                      className="ml-6 text-[var(--destructive)] hover:bg-[var(--destructive-0)]"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
