"use client";

import React, { useState } from "react";
import TargetConfigForm from "./TargetConfigForm";
import ManagerSection, { Manager } from "./ManagerSection";
import ConflictModal from "./ConflictModal";
import { Button } from "@/components/ui/button/button";
import { FormInput } from "@/components/form";
import { mockManagers } from "@/data/targetData";

export default function SetTargetPage() {
  // Form state
  const [selectedTeam, setSelectedTeam] = useState("");
  const [targetMonth, setTargetMonth] = useState("");

  // Manager selection state
  const [selectedManager1, setSelectedManager1] = useState("manager1");
  const [selectedManager2, setSelectedManager2] = useState("manager2");

  // Conflict Modal state
  const [isConflictModalOpen, setIsConflictModalOpen] = useState(false);

  // Mock data imported from data file
  const [managers, setManagers] = useState<Manager[]>(mockManagers);

  // Read-only field values (populated when team is selected)
  const teamMetadata = {
    teamRoleCode: selectedTeam ? "PL_SPT_017284" : "",
    teamName: selectedTeam ? "High Blood Pressure" : "",
    channelName: selectedTeam ? "Chain Pharmacy" : "",
    callPoint: selectedTeam ? "36 Export Solutions" : "",
  };

  // Handler functions
  const handleDeleteProduct = (repId: string, productId: string) => {
    setManagers((prevManagers) =>
      prevManagers.map((manager) => ({
        ...manager,
        salesReps: manager.salesReps.map((rep) =>
          rep.id === repId
            ? {
                ...rep,
                products: rep.products.filter((p) => p.id !== productId),
              }
            : rep
        ),
      }))
    );
  };

  const handleProductInputChange = (repId: string, productId: string, value: string) => {
    setManagers((prevManagers) =>
      prevManagers.map((manager) => ({
        ...manager,
        salesReps: manager.salesReps.map((rep) =>
          rep.id === repId
            ? {
                ...rep,
                products: rep.products.map((p) =>
                  p.id === productId ? { ...p, inputValue: value } : p
                ),
              }
            : rep
        ),
      }))
    );
  };

  const handleSetTarget = () => {
    // Validate for conflicts
    const hasConflicts = managers.some((manager) =>
      manager.salesReps.some((rep) => rep.products.some((product) => product.hasConflict))
    );

    if (hasConflicts) {
      alert("Please resolve all conflicts before setting targets");
      return;
    }

    // Submit logic here
    console.log("Setting targets...", { selectedTeam, targetMonth, managers });
    alert("Targets set successfully!");
  };

  return (
    <div className="min-h-screen bg-(--gray-0)">
      {/* Centered Content Container */}
      {/* Main White Card */}
      <div className="bg-background rounded-8 shadow-soft p-8 overflow-hidden">
        {/* Target Configuration Form */}
        <TargetConfigForm
          selectedTeam={selectedTeam}
          targetMonth={targetMonth}
          teamRoleCode={teamMetadata.teamRoleCode}
          teamName={teamMetadata.teamName}
          channelName={teamMetadata.channelName}
          callPoint={teamMetadata.callPoint}
          onTeamChange={setSelectedTeam}
          onMonthChange={setTargetMonth}
        />

        {/* Members Info Section */}
        <div className="space-y-6 pt-6">
          <div>
            <h2 className="t-h2 text-(--gray-9) mb-6">Members Info</h2>

            {/* Manager Selection Input Fields */}
            <div className="grid grid-cols-4 gap-4 mb-8">
              {/* First Manager Input */}
              <div className="relative">
                <FormInput
                  label="Head of Sales"
                  name="headOfSales"
                  value={managers.find((m) => m.id === selectedManager1)?.name || ""}
                  onChange={() => {}}
                  readOnly
                />
                {selectedManager1 && (
                  <div className="absolute right-3 bottom-3">
                    <div className="w-5 h-5 rounded-full bg-(--gray-4) flex items-center justify-center">
                      <span className="t-sm text-(--light) font-medium">
                        {(managers.findIndex((m) => m.id === selectedManager1) + 1)
                          .toString()
                          .padStart(2, "0")}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Second Manager Input */}
              <div className="relative">
                <FormInput
                  label="Sales Manager"
                  name="salesManager"
                  value={managers.find((m) => m.id === selectedManager2)?.name || ""}
                  onChange={() => {}}
                  readOnly
                />
                {selectedManager2 && (
                  <div className="absolute right-3 bottom-3">
                    <div className="w-5 h-5 rounded-full bg-(--gray-4) flex items-center justify-center">
                      <span className="t-sm text-(--light) font-medium">
                        {(managers.findIndex((m) => m.id === selectedManager2) + 1)
                          .toString()
                          .padStart(2, "0")}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Empty columns to maintain 50% width */}
              <div></div>
              <div></div>
            </div>

            {/* Manager Sections */}
            <div className="space-y-10">
              {[selectedManager1, selectedManager2].map((managerId) => {
                const manager = managers.find((m) => m.id === managerId);
                if (!manager) return null;

                return (
                  <ManagerSection
                    key={manager.id}
                    manager={manager}
                    onDeleteProduct={handleDeleteProduct}
                    onProductInputChange={handleProductInputChange}
                    onConflictClick={() => setIsConflictModalOpen(true)}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer Action Buttons */}
        <div className="flex justify-end gap-4 pt-6 border-t border-(--gray-2)">
          <Button type="button" variant="outline" size="lg" rounded="full" className="px-6">
            Discard
          </Button>
          <Button
            type="button"
            onClick={handleSetTarget}
            variant="primary"
            size="lg"
            rounded="full"
            className="px-8 shadow-soft"
          >
            Set Target
          </Button>
        </div>
      </div>

      {/* Conflict Modal */}
      <ConflictModal isOpen={isConflictModalOpen} onClose={() => setIsConflictModalOpen(false)} />
    </div>
  );
}
