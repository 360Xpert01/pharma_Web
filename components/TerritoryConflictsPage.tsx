"use client";

import React, { useState } from "react";
import { FormSelect } from "@/components/form";
import { Button } from "@/components/ui/button/button";
import { AlertCircle, CheckCircle2 } from "lucide-react";

interface TerritoryConflict {
  id: string;
  code: string;
  percentage: number;
  territories: { name: string; share: string }[];
  isResolved: boolean;
}

export default function TerritoryConflictsPage() {
  const [selectedTeam, setSelectedTeam] = useState("");

  // Mock data for conflicts
  const [conflicts, setConflicts] = useState<TerritoryConflict[]>([
    {
      id: "1",
      code: "L52",
      percentage: 0,
      territories: Array(12)
        .fill(null)
        .map((_, i) => ({ name: `Territory ${i + 1}`, share: "" })),
      isResolved: false,
    },
    {
      id: "2",
      code: "L46",
      percentage: 100,
      territories: [
        { name: "Territory 1", share: "30" },
        { name: "Territory 1", share: "30" },
        { name: "Territory 1", share: "40" },
      ],
      isResolved: true,
    },
    {
      id: "3",
      code: "L56",
      percentage: 70,
      territories: [
        { name: "Territory 1", share: "20" },
        { name: "Territory 2", share: "20" },
        { name: "Territory 3", share: "30" },
      ],
      isResolved: false,
    },
  ]);

  const handleShareChange = (conflictId: string, territoryIdx: number, value: string) => {
    setConflicts((prev) =>
      prev.map((c) => {
        if (c.id === conflictId) {
          const newTerritories = [...c.territories];
          newTerritories[territoryIdx] = { ...newTerritories[territoryIdx], share: value };
          return { ...c, territories: newTerritories };
        }
        return c;
      })
    );
  };

  return (
    <div className="bg-background rounded-8 shadow-soft p-8 overflow-hidden">
      <div className="space-y-6">
        {/* Primary Information Section */}
        <section className="space-y-6">
          <h2 className="t-h2 text-(--gray-9) font-bold">Primary Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-3">
              <FormSelect
                label="Select Team"
                name="team"
                value={selectedTeam}
                onChange={setSelectedTeam}
                options={[
                  { value: "team1", label: "Team North" },
                  { value: "team2", label: "Team South" },
                ]}
                placeholder="Search teams"
                required
              />
            </div>
            <div className="md:col-span-6 self-end pb-2">
              <p className="t-sm text-(--gray-5) leading-snug max-w-sm">
                You can easily name the role you want and take on different responsibilities.
              </p>
            </div>
          </div>
        </section>

        <hr className="border-(--gray-1)" />

        {/* Conflicting Bricks Section */}
        <section className="space-y-4">
          <h2 className="t-h2 text-(--gray-9) font-bold">Conflicting Bricks</h2>

          <div className="space-y-6">
            {conflicts.map((conflict) => (
              <div
                key={conflict.id}
                className="bg-white rounded-8 border border-(--gray-2) overflow-hidden shadow-soft"
              >
                <div className="p-8 space-y-6">
                  {/* Card Header: Code and Percentage */}
                  <div className="flex items-center gap-6">
                    <div className="bg-(--primary) text-white px-6 py-2 rounded-8 t-h4 font-bold">
                      {conflict.code}
                    </div>
                    <div
                      className={`t-h1 font-bold ${conflict.isResolved ? "text-(--success)" : "text-(--destructive)"}`}
                    >
                      {conflict.percentage}%
                    </div>
                  </div>

                  {/* Territory Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {conflict.territories.map((t, idx) => (
                      <div
                        key={idx}
                        className="bg-(--gray-0) border border-(--gray-1) rounded-8 p-4 flex items-center justify-between"
                      >
                        <span className="font-medium text-(--gray-9)">{t.name}</span>
                        <div className="w-16 h-8 bg-white rounded-8 border border-(--gray-1) flex items-center justify-center px-1">
                          <input
                            type="text"
                            value={t.share}
                            onChange={(e) => handleShareChange(conflict.id, idx, e.target.value)}
                            placeholder="0"
                            className="w-full h-full text-right font-normal focus:outline-none placeholder:text-(--gray-4) placeholder:font-normal bg-transparent"
                          />
                          <span className="ml-0.5 text-(--gray-5) select-none text-xs">%</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Status Alert */}
                  {conflict.isResolved ? (
                    <div className="bg-(--success-0) rounded-8 px-4 py-3 flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-(--success)" />
                      <span className="font-medium text-xs text-(--success)">
                        Conflict Resolved
                      </span>
                    </div>
                  ) : (
                    <div className="bg-(--destructive-0) rounded-8 px-4 py-3 flex items-center gap-3">
                      <AlertCircle className="w-5 h-5 text-(--destructive)" />
                      <span className="font-medium text-xs text-(--destructive)">
                        Conflicts in Sales Allocation
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer Actions */}
        <div className="flex justify-end gap-4 pt-6">
          <Button
            variant="outline"
            size="lg"
            rounded="full"
            className="px-8 border-(--primary) text-(--primary) hover:bg-(--primary-0) hover:text-(--primary)"
          >
            Discard
          </Button>
          <Button variant="primary" size="lg" rounded="full" className="px-10 shadow-soft">
            Resolve Conflicts
          </Button>
        </div>
      </div>
    </div>
  );
}
