"use client";

import React, { useState } from "react";
import TargetConfigForm from "./TargetConfigForm";
import ManagerSection, { Manager } from "./ManagerSection";
import ConflictModal from "./ConflictModal";

export default function SetTargetPage() {
  // Form state
  const [selectedTeam, setSelectedTeam] = useState("");
  const [targetMonth, setTargetMonth] = useState("");

  // Manager selection state
  const [selectedManager1, setSelectedManager1] = useState("manager1");
  const [selectedManager2, setSelectedManager2] = useState("manager2");

  // Conflict Modal state
  const [isConflictModalOpen, setIsConflictModalOpen] = useState(false);

  // Mock data for demonstration - matches screenshot
  const [managers, setManagers] = useState<Manager[]>([
    {
      id: "manager1",
      name: "Abdul Aziz Warsi",
      salesReps: [
        {
          id: "rep1",
          name: "Danish Kumar",
          role: "Sales Representative",
          avatar: "/placeholder-avatar.jpg",
          productTags: ["L40", "L42", "L48", "L57"],
          products: [
            {
              id: "prod1",
              name: "Dapakan 500mg",
              targetQuantity: "50 Packets",
              completionPercentage: 100,
              inputValue: "Atorvastatin 10mg",
              hasConflict: false,
            },
            {
              id: "prod2",
              name: "Medooro 500mg",
              targetQuantity: "50 Packets",
              completionPercentage: 50,
              inputValue: "Elt 250mg",
              hasConflict: true,
              conflictMessage: "Conflict with existing target",
            },
          ],
        },
        {
          id: "rep2",
          name: "Majid Hussain",
          role: "Sales Representative",
          avatar: "/placeholder-avatar.jpg",
          productTags: ["L46", "939", "L43", "L52", "874"],
          products: [
            {
              id: "prod1",
              name: "Dapakan 500mg",
              targetQuantity: "50 Packets",
              completionPercentage: 100,
              inputValue: "",
              hasConflict: false,
            },
            {
              id: "prod2",
              name: "Atorvastatin 10gm",
              targetQuantity: "",
              completionPercentage: 0,
              inputValue: "Atorvastatin 10gm",
              hasConflict: false,
            },
            {
              id: "prod3",
              name: "Wellprox 500mg",
              targetQuantity: "50 Packets",
              completionPercentage: 50,
              inputValue: "",
              hasConflict: true,
              conflictMessage: "Conflicts In Sales Allocation",
            },
            {
              id: "prod4",
              name: "ER 250mg",
              targetQuantity: "50 Packets",
              completionPercentage: 100,
              inputValue: "ER 250mg",
              hasConflict: false,
            },
          ],
        },
      ],
    },
    {
      id: "manager2",
      name: "Asad Raza",
      salesReps: [
        {
          id: "rep3",
          name: "Danish Kumar",
          role: "Sales Representative",
          avatar: "/placeholder-avatar.jpg",
          productTags: ["L40", "L42", "L48"],
          products: [
            {
              id: "prod5",
              name: "Divalol 750mg",
              targetQuantity: "50 Packets",
              completionPercentage: 100,
              inputValue: "",
              hasConflict: false,
            },
          ],
        },
        {
          id: "rep4",
          name: "Majid Hussain",
          role: "Sales Representative",
          avatar: "/placeholder-avatar.jpg",
          productTags: ["L40", "L42", "L48", "L57"],
          products: [
            {
              id: "prod6",
              name: "Medooro 100mg",
              targetQuantity: "50 Packets",
              completionPercentage: 100,
              inputValue: "",
              hasConflict: false,
            },
            {
              id: "prod7",
              name: "Elt 250mg",
              targetQuantity: "50 Packets",
              completionPercentage: 100,
              inputValue: "",
              hasConflict: false,
            },
          ],
        },
        {
          id: "rep5",
          name: "Danish Kumar",
          role: "Sales Representative",
          avatar: "/placeholder-avatar.jpg",
          productTags: ["L40", "L48"],
          products: [
            {
              id: "prod8",
              name: "Divalol 750mg",
              targetQuantity: "50 Packets",
              completionPercentage: 100,
              inputValue: "",
              hasConflict: false,
            },
          ],
        },
      ],
    },
  ]);

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
      <div className="bg-(--background) rounded-xl shadow-[0px_5px_10px_rgba(0,0,0,0.20)] p-8 overflow-hidden">
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
            <h2 className="text-xl font-bold text-(--gray-9) mb-6">Members Info</h2>

            {/* Manager Selection Input Fields */}
            <div className="grid grid-cols-4 gap-4 mb-8">
              {/* First Manager Input */}
              <div>
                <label className="block text-xs font-medium text-(--gray-5) mb-2">
                  Head of Sales
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={managers.find((m) => m.id === selectedManager1)?.name || ""}
                    readOnly
                    className="w-full px-4 py-2.5 pr-10 bg-(--gray-0) border border-(--gray-3) rounded-lg text-sm text-(--gray-7) cursor-default"
                  />
                  {selectedManager1 && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <div className="w-5 h-5 rounded-full bg-(--gray-4) flex items-center justify-center">
                        <span className="text-xs text-(--light) font-medium">
                          {managers.findIndex((m) => m.id === selectedManager1) + 1}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Second Manager Input */}
              <div>
                <label className="block text-xs font-medium text-(--gray-5) mb-2">
                  Sales Manager
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={managers.find((m) => m.id === selectedManager2)?.name || ""}
                    readOnly
                    className="w-full px-4 py-2.5 pr-10 bg-(--gray-0) border border-(--gray-3) rounded-lg text-sm text-(--gray-7) cursor-default"
                  />
                  {selectedManager2 && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <div className="w-5 h-5 rounded-full bg-(--gray-4) flex items-center justify-center">
                        <span className="text-xs text-(--light) font-medium">
                          {managers.findIndex((m) => m.id === selectedManager2) + 1}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
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
          <button className="px-6 py-3 border border-(--gray-3) text-(--gray-7) rounded-full hover:bg-(--gray-0) transition cursor-pointer font-medium">
            Discard
          </button>
          <button
            onClick={handleSetTarget}
            className="px-8 py-3 bg-(--primary) text-(--light) rounded-full hover:bg-(--primary-2) transition shadow-lg cursor-pointer font-medium"
          >
            Set Target
          </button>
        </div>
      </div>

      {/* Conflict Modal */}
      <ConflictModal isOpen={isConflictModalOpen} onClose={() => setIsConflictModalOpen(false)} />
    </div>
  );
}
