"use client";

import React, { useState, useEffect } from "react";
import TargetConfigForm from "./TargetConfigForm";
import ManagerSection, { Manager } from "./ManagerSection";
import ConflictModal from "./ConflictModal";
import { Button } from "@/components/ui/button/button";
import { mockManagers } from "@/data/targetData";
import { getAllTeams } from "@/store/slices/team/getAllTeamsSlice";
import { getTeamDetails, resetTeamDetailsState } from "@/store/slices/team/getTeamDetailsSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import { createTarget, resetCreateTargetState } from "@/store/slices/target/createTargetSlice";
import type { CreateTargetPayload } from "@/types/target";
import { targetSchema } from "@/validations/targetValidation";
import { z } from "zod";

export default function SetTargetPage() {
  // Form state
  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedSalesRep, setSelectedSalesRep] = useState("");
  const [targetMonth, setTargetMonth] = useState("");
  const dispatch = useAppDispatch();

  // Redux selectors
  const { teams } = useAppSelector((state) => state.allTeams);
  const { teamDetails, loading: teamDetailsLoading } = useAppSelector((state) => state.teamDetails);
  const { loading, success, error, message } = useAppSelector((state) => state.createTarget);

  // Manager selection state (keeping for backward compatibility with UI)
  const [selectedManager1, setSelectedManager1] = useState("manager1");
  const [selectedManager2, setSelectedManager2] = useState("manager2");

  // New state for SKU targets: { [skuId: string]: string }
  const [skuTargets, setSkuTargets] = useState<Record<string, string>>({});

  // Conflict Modal state
  const [isConflictModalOpen, setIsConflictModalOpen] = useState(false);

  // Find selected team data
  const matchTeam = (teams as any[]).find((team: any) => team.id === selectedTeam);

  // Use the one that has products populated
  const currentTeam: any = teamDetails || matchTeam;
  const products: any[] = currentTeam?.products || [];

  // Mock data imported from data file (keep for now if no real data)
  const [managers, setManagers] = useState<Manager[]>(mockManagers);

  // Fetch teams on mount
  useEffect(() => {
    dispatch(getAllTeams());
  }, [dispatch]);

  // Fetch team details when team is selected
  useEffect(() => {
    if (selectedTeam) {
      dispatch(getTeamDetails(selectedTeam));
    } else {
      dispatch(resetTeamDetailsState());
      setSelectedSalesRep("");
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
    channelName: currentTeam?.channelName || matchTeam?.channelName || "",
    callPoint: currentTeam?.callPoints?.length
      ? currentTeam.callPoints[0]?.name || "No Callpoint available"
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

  const handleSkuTargetChange = (skuId: string, value: string) => {
    setSkuTargets((prev) => ({
      ...prev,
      [skuId]: value,
    }));
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

    // Build allocation payload from team details
    if (!currentTeam || !currentTeam.users?.length) {
      alert("No team members found for the selected team.");
      return;
    }

    const allocations = currentTeam.users.map((user: any) => ({
      userId: user.id,
      brickAllocations:
        currentTeam.products.length > 0
          ? [
              {
                brickId: user.brickId || currentTeam.callPoints?.[0]?.id || currentTeam.id,
                skuAllocations: currentTeam.products.flatMap((product: any) =>
                  product.skus.map((sku: any) => ({
                    productSkuId: sku.id,
                    targetValue: parseInt(skuTargets[sku.id] || "0") || 0,
                    percentage: 100,
                  }))
                ),
              },
            ]
          : [],
    }));

    const payload: CreateTargetPayload = {
      teamId: selectedTeam,
      month: month,
      year: year,
      allocations,
    };
    // Zod Validation
    try {
      targetSchema.parse(payload);
    } catch (err) {
      if (err instanceof z.ZodError) {
        const firstError = err.errors[0]?.message || "Invalid target data";
        alert(`Validation Error: ${firstError}`);
        return;
      }
    }

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
          targetTeams={teams}
          selectedSalesRep={selectedSalesRep}
          salesReps={currentTeam?.users || []}
          targetMonthValue={targetMonth}
          areaManager={(currentTeam as any)?.areaManagerName || "Abdul Aziz Warisi"}
          channelName={teamMetadata.channelName || "Chain Pharmacy"}
          territory={(currentTeam as any)?.territory || "T1"}
          onTeamChange={setSelectedTeam}
          onSalesRepChange={setSelectedSalesRep}
          onMonthChange={setTargetMonth}
        />

        {/* Define Target Section */}
        {selectedTeam && (
          <div className="space-y-6 pt-10">
            <div className="flex items-center gap-2">
              <h2 className="t-h2 text-(--gray-9) font-bold">Define Target</h2>
            </div>

            <div className="space-y-8">
              {teamDetailsLoading && (
                <div className="py-20 text-center">
                  <div className="inline-block w-8 h-8 border-4 border-(--gray-3) border-t-primary rounded-8 animate-spin mb-4"></div>
                  <p className="t-md text-(--gray-5)">Loading team products and SKUs...</p>
                </div>
              )}

              {!teamDetailsLoading && products.length === 0 && (
                <div className="py-20 text-center bg-(--gray-0) rounded-8 border-2 border-dashed border-(--gray-2)">
                  <p className="t-lg text-(--gray-5)">No products found for this team.</p>
                </div>
              )}

              {!teamDetailsLoading &&
                products.length > 0 &&
                (products as any[]).map((product: any) => (
                  <div key={product.id} className="flex gap-8 items-center bg-white rounded-8 p-4">
                    {/* Product Branding */}
                    <div className="flex flex-col items-center w-32 shrink-0">
                      <div className="w-24 h-24 bg-(--gray-0) rounded-8 flex items-center justify-center overflow-hidden mb-3 border border-(--gray-1)">
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <div className="text-(--gray-3) text-4xl">💊</div>
                        )}
                      </div>
                      <span className="t-h4 text-center text-(--gray-9) font-bold">
                        {product.name}
                      </span>
                    </div>

                    {/* SKU Grid */}
                    <div className="flex-1 bg-(--gray-0) rounded-8 p-6 border border-(--gray-1)">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-(--background) p-4 rounded-8">
                        {product.skus?.map((sku: any) => (
                          <div
                            key={sku.id}
                            className="bg-(--gray-0) rounded-8 px-4 py-3 flex items-center justify-between shadow-soft"
                          >
                            <span className="t-sm font-bold text-(--gray-9)">
                              {sku.sku || "N/A"}
                            </span>
                            <div className="w-24 h-9 bg-(--background) rounded-8 border border-(--gray-2) flex items-center justify-center overflow-hidden focus-within:border-(--primary) transition-colors">
                              <input
                                type="text"
                                placeholder="Target"
                                className="w-full h-full text-center t-sm font-bold text-(--gray-9) focus:outline-none placeholder:text-(--gray-3) placeholder:font-normal bg-transparent"
                                value={skuTargets[sku.id] || ""}
                                onChange={(e) => handleSkuTargetChange(sku.id, e.target.value)}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Members Info Section (Commented Out) */}
        {/* 
        <div className="space-y-6 pt-6">
          <div>
            <h2 className="t-h2 text-(--gray-9) mb-6">Members Info</h2>

            <div className="grid grid-cols-4 gap-4 mb-8">
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

              <div></div>
              <div></div>
            </div>

            <div className="space-y-10">
              {[selectedManager1, selectedManager2].map((managerId) => {
                const manager = managers.find((m) => m.id === managerId);
                if (!manager) return null;

                return (
                  <ManagerSection
                    key={manager.id}
                    manager={manager}
                    onDeleteProduct={handleDeleteProduct}
                    onProductInputChange={(repId, productId, value) => {}}
                    onConflictClick={() => setIsConflictModalOpen(true)}
                  />
                );
              })}
            </div>
          </div>
        </div>
        */}

        {/* Footer Action Buttons */}
        <div className="flex justify-end gap-4 pt-6">
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
