"use client";

import React, { useState, useEffect } from "react";
import TargetConfigForm from "./TargetConfigForm";
import ManagerSection, { Manager } from "./ManagerSection";
import ConflictModal from "./ConflictModal";
import { Button } from "@/components/ui/button/button";
import { FormInput } from "@/components/form";
import { mockManagers } from "@/data/targetData";
import { getAllTeams } from "@/store/slices/team/getAllTeamsSlice";
import { getTeamDetails } from "@/store/slices/team/getTeamDetailsSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import { createTarget, resetCreateTargetState } from "@/store/slices/target/createTargetSlice";
import type { CreateTargetPayload } from "@/types/target";

export default function SetTargetPage() {
  // Form state
  const [selectedTeam, setSelectedTeam] = useState("");
  const [targetMonth, setTargetMonth] = useState("");
  const dispatch = useAppDispatch();

  // Redux selectors
  const { teams } = useAppSelector((state) => state.allTeams);
  const { teamDetails, loading: teamDetailsLoading } = useAppSelector((state) => state.teamDetails);
  const { loading, success, error, message } = useAppSelector((state) => state.createTarget);

  // Manager selection state (keeping for backward compatibility with UI)
  const [selectedManager1, setSelectedManager1] = useState("manager1");
  const [selectedManager2, setSelectedManager2] = useState("manager2");

  // Conflict Modal state
  const [isConflictModalOpen, setIsConflictModalOpen] = useState(false);

  // Find selected team data
  const matchTeam = teams.find((team: any) => team.id === selectedTeam);
  const selectedTeamDetail = teamDetails.find((team) => team.id === selectedTeam);

  // Mock data imported from data file (keep for now if no real data)
  const [managers, setManagers] = useState<Manager[]>(mockManagers);

  // Fetch teams on mount
  useEffect(() => {
    dispatch(getAllTeams());
    dispatch(getTeamDetails());
  }, [dispatch]);

  // Fetch team details when team is selected
  useEffect(() => {
    if (selectedTeam) {
      dispatch(getTeamDetails());
    }
  }, [selectedTeam, dispatch]);

  // Handle API success
  useEffect(() => {
    if (success) {
      alert(message || "Target allocation created successfully!");
      // Reset form
      setManagers(mockManagers);
      dispatch(resetCreateTargetState());
    }
  }, [success, message, dispatch]);

  // Handle API error
  useEffect(() => {
    if (error) {
      alert(`Error: ${error}`);
      dispatch(resetCreateTargetState());
    }
  }, [error, dispatch]);

  // Read-only field values (populated when team is selected)
  const teamMetadata = {
    teamRoleCode: matchTeam?.pulseCode || "",
    teamName: matchTeam?.name || "",
    channelName: selectedTeamDetail?.channelName || matchTeam?.channelName || "",
    callPoint: selectedTeamDetail?.callPoints?.length
      ? selectedTeamDetail.callPoints[0]?.name || "No Callpoint available"
      : "No Callpoint available",
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

  const handleSetTarget = async () => {
    // Validation
    if (!selectedTeam) {
      alert("Please select a team");
      return;
    }

    if (!targetMonth) {
      alert("Please select a target month");
      return;
    }

    // Validate for conflicts
    const hasConflicts = managers.some((manager) =>
      manager.salesReps.some((rep) => rep.products.some((product) => product.hasConflict))
    );

    if (hasConflicts) {
      alert("Please resolve all conflicts before setting targets");
      return;
    }

    // Parse month/year from targetMonth (assuming format like "2026-12" or just "12" or month name)
    const currentYear = new Date().getFullYear();
    let month: number;
    let year: number;

    if (targetMonth.includes("-")) {
      [year, month] = targetMonth.split("-").map(Number);
    } else if (!isNaN(parseInt(targetMonth))) {
      month = parseInt(targetMonth);
      year = currentYear;
    } else {
      // Month name mapping
      const monthNames = [
        "january",
        "february",
        "march",
        "april",
        "may",
        "june",
        "july",
        "august",
        "september",
        "october",
        "november",
        "december",
      ];
      month = monthNames.indexOf(targetMonth.toLowerCase()) + 1;
      year = currentYear;
    }

    // Build allocation payload from team details or fall back to managers data
    let allocations;

    if (selectedTeamDetail && selectedTeamDetail.users.length > 0) {
      // Use real API data
      allocations = selectedTeamDetail.users.map((user) => ({
        userId: user.id,
        brickAllocations: selectedTeamDetail.products.map((product) => ({
          brickId: "default-brick-id", // No brick info in API, using default
          skuAllocations: product.skus.map((sku) => ({
            productSkuId: sku.id,
            targetValue: 0, // Default value, should be set by user input
            percentage: 100,
          })),
        })),
      }));
    } else {
      // Fall back to mock data structure
      allocations = managers.flatMap((manager) =>
        manager.salesReps.map((rep) => ({
          userId: rep.id,
          brickAllocations: [
            {
              brickId: rep.productTags?.[0] || "default-brick-id",
              skuAllocations: rep.products.map((product) => ({
                productSkuId: product.id,
                targetValue: parseInt(product.inputValue) || parseInt(product.targetQuantity) || 0,
                percentage: product.completionPercentage || 100,
              })),
            },
          ],
        }))
      );
    }

    const payload: CreateTargetPayload = {
      teamId: selectedTeam,
      month: month,
      year: year,
      allocations,
    };

    console.log("Submitting target payload:", payload);

    try {
      await dispatch(createTarget(payload)).unwrap();
    } catch (err) {
      console.error("Failed to create target:", err);
    }
  };

  return (
    <div className="min-h-screen bg-(--gray-0)">
      {/* Centered Content Container */}
      {/* Main White Card */}
      <div className="bg-background rounded-8 shadow-soft p-8 overflow-hidden">
        {/* Target Configuration Form */}

        {/* {teams.map((team:any)=>(<p key={team.id}>{team.name}</p>
        ))} */}

        <TargetConfigForm
          selectedTeam={selectedTeam}
          targetMonth={teams}
          targetMonthValue={targetMonth}
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
            disabled={loading || !selectedTeam || !targetMonth}
            loading={loading}
          >
            {loading ? "Submitting..." : "Set Target"}
          </Button>
        </div>
      </div>

      {/* Conflict Modal */}
      <ConflictModal isOpen={isConflictModalOpen} onClose={() => setIsConflictModalOpen(false)} />
    </div>
  );
}
