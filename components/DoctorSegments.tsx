"use client";

import React, { useState } from "react";
import { Plus, X } from "lucide-react";
import { FormInput } from "@/components/form";
import { Button } from "@/components/ui/button/button";

interface DoctorSegment {
  id: string;
  segmentName: string;
  pulseCode: string;
  legacyCode: string;
}

export default function AddDoctorSegmentsCard() {
  const [segmentName, setSegmentName] = useState("");
  const [pulseCode, setPulseCode] = useState("");
  const [legacyCode, setLegacyCode] = useState("");
  const [segmentsList, setSegmentsList] = useState<DoctorSegment[]>([]);
  const [loading, setLoading] = useState(false);

  // Auto-generate pulse code based on segments count
  const generatePulseCode = () => {
    const count = segmentsList.length + 1;
    return `DS_${String(count).padStart(6, "0")}`;
  };

  const handleAddSegment = async () => {
    if (!segmentName.trim()) return;

    setLoading(true);

    // Simulate API delay
    setTimeout(() => {
      const newSegment: DoctorSegment = {
        id: Date.now().toString(),
        segmentName: segmentName.trim(),
        pulseCode: pulseCode || generatePulseCode(),
        legacyCode: legacyCode.trim() || "",
      };

      setSegmentsList([...segmentsList, newSegment]);

      // Clear form
      setSegmentName("");
      setPulseCode("");
      setLegacyCode("");
      setLoading(false);
    }, 500);
  };

  const removeSegment = (id: string) => {
    setSegmentsList(segmentsList.filter((seg) => seg.id !== id));
  };

  return (
    <div className="w-full">
      <div className="bg-[var(--background)] rounded-8 shadow-soft border border-[var(--gray-1)] overflow-hidden">
        <div className="px-8 py-10 space-y-8">
          {/* Header */}
          <div>
            <h2 className="t-h2">Add Doctor Segments</h2>
            <p className="t-sm text-[var(--subheading-color)] mt-1">
              Manage doctor segments (A/B/C) to categorize healthcare professionals
            </p>
          </div>

          {/* Add New Segment Form */}
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
                placeholder="DS_000001"
                required
              />

              {/* Segment Name */}
              <FormInput
                label="Segment Name"
                name="segmentName"
                type="text"
                value={segmentName}
                onChange={setSegmentName}
                placeholder="e.g. Segment A, Segment B, Segment C"
                required
              />

              {/* Legacy Code */}
              <FormInput
                label="Legacy Code (Optional)"
                name="legacyCode"
                type="text"
                value={legacyCode}
                onChange={setLegacyCode}
                placeholder="e.g. OLD-SEG-001"
              />
            </div>

            {/* Add Button */}
            <Button
              onClick={handleAddSegment}
              disabled={!segmentName.trim() || loading}
              variant="primary"
              size="lg"
              icon={Plus}
              loading={loading}
              className="h-12 px-8"
            >
              {loading ? "Adding..." : "Add to list"}
            </Button>
          </div>

          {/* Added Segments List */}
          {segmentsList.length > 0 && (
            <div className="mt-10">
              <h3 className="t-h4 mb-4">Added Segments ({segmentsList.length})</h3>
              <div className="space-y-3">
                {segmentsList.map((segment) => (
                  <div
                    key={segment.id}
                    className="flex items-center justify-between p-5 bg-[var(--gray-0)] rounded-8 border border-[var(--gray-2)]"
                  >
                    <div className="grid grid-cols-3 gap-8 flex-1">
                      <div>
                        <p className="t-cap">Segment Name</p>
                        <p className="t-label-b">{segment.segmentName}</p>
                      </div>
                      <div>
                        <p className="t-cap">Pulse Code</p>
                        <p className="t-val-sm">{segment.pulseCode}</p>
                      </div>
                      <div>
                        <p className="t-cap">Legacy Code</p>
                        <p className="t-label-b">{segment.legacyCode || "N/A"}</p>
                      </div>
                    </div>
                    <Button
                      onClick={() => removeSegment(segment.id)}
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
