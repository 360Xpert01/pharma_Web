"use client";

import React, { useState, useEffect } from "react";
import TargetConfigForm from "./TargetConfigForm";
import ManagerSection, { Manager } from "./ManagerSection";
import ConflictModal from "./ConflictModal";
import { Button } from "@/components/ui/button/button";
import { mockManagers } from "@/data/targetData";
import { getTeamAll } from "@/store/slices/team/getTeamAllSlice";
import {
  getTeamTargetProducts,
  resetTeamTargetProductsState,
} from "@/store/slices/team/getTeamTargetProductsSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import { createTarget, resetCreateTargetState } from "@/store/slices/target/createTargetSlice";
import { getAllRoles } from "@/store/slices/role/getAllRolesSlice";
import { getTeamUsers, resetTeamUsersState } from "@/store/slices/team/getTeamUsersSlice";
import type { CreateTargetPayload } from "@/types/target";
import { targetSchema } from "@/validations/targetValidation";
import DefineTargetSection from "./DefineTargetSection";
import toast from "react-hot-toast";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { getTargetById, resetTargetByIdState } from "@/store/slices/target/getTargetByIdSlice";

export default function SetTargetPage() {
  // Form state
  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedSalesRep, setSelectedSalesRep] = useState("");
  const [targetMonth, setTargetMonth] = useState("");
  const dispatch = useAppDispatch();
  const router = useRouter();
  const params = useParams();
  const locale = params?.locale || "en";
  const searchParams = useSearchParams();
  const targetId = searchParams.get("targetId");

  // Redux selectors
  const { teams } = useAppSelector((state) => state.teamAll);
  const { data: teamTargetData, loading: teamTargetLoading } = useAppSelector(
    (state) => state.teamTargetProducts
  );
  const { roles } = useAppSelector((state) => state.allRoles);
  const { users: teamUsers, loading: teamUsersLoading } = useAppSelector(
    (state) => state.teamUsers
  );
  const {
    loading: createLoading,
    success: createSuccess,
    error: createError,
    message: createMessage,
  } = useAppSelector((state) => state.createTarget);
  const {
    data: targetData,
    loading: targetLoading,
    success: targetSuccess,
  } = useAppSelector((state) => state.targetById);

  // Manager selection state (keeping for backward compatibility with UI)
  const [selectedManager1, setSelectedManager1] = useState("manager1");
  const [selectedManager2, setSelectedManager2] = useState("manager2");

  // New state for SKU targets: { [skuId: string]: string }
  const [skuTargets, setSkuTargets] = useState<Record<string, string>>({});

  // Validation errors state
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // Helper function to get error message for a field
  const getErrorMessage = (fieldName: string) => validationErrors[fieldName] || "";

  // Helper function to clear error for a specific field when user types
  const clearFieldError = (fieldName: string) => {
    if (validationErrors[fieldName]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    }
  };

  // Conflict Modal state
  const [isConflictModalOpen, setIsConflictModalOpen] = useState(false);

  // Find selected team data
  const matchTeam = (teams as any[]).find((team: any) => team.id === selectedTeam);

  // Use the one that has products populated
  const products = teamTargetData?.products || [];

  // Mock data imported from data file (keep for now if no real data)
  const [managers, setManagers] = useState<Manager[]>(mockManagers);

  // Fetch teams and roles on mount
  useEffect(() => {
    dispatch(getTeamAll());
    dispatch(getAllRoles());

    return () => {
      dispatch(resetTargetByIdState());
    };
  }, [dispatch]);

  // Fetch target data if targetId is present
  useEffect(() => {
    if (targetId) {
      dispatch(getTargetById(targetId));
    }
  }, [targetId, dispatch]);

  // Populate form when target data is fetched
  useEffect(() => {
    if (targetSuccess && targetData) {
      // Set team if available
      if (targetData.teamId) {
        setSelectedTeam(targetData.teamId);
      } else if (targetData.team?.id) {
        setSelectedTeam(targetData.team.id);
      } else if (targetData.teamName) {
        // Find team by name if ID is missing (not ideal but defensive)
        const team = teams.find((t: any) => t.name === targetData.teamName);
        if (team) setSelectedTeam(team.id);
      }

      // Format month and year back to the format expected by the form
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

      const month = targetData.month || targetData.targetMonth;
      const year = targetData.year || targetData.targetYear;

      if (month && year) {
        const monthName =
          typeof month === "number" ? monthNames[month - 1] : String(month).toLowerCase();
        setTargetMonth(`${monthName}-${year}`);
      }

      // Map targets back to skuTargets state
      const newSkuTargets: Record<string, string> = {};

      // Case 1: Team-level targets (array of users)
      if (Array.isArray(targetData.targets)) {
        targetData.targets.forEach((userTarget: any) => {
          if (Array.isArray(userTarget.productTargets)) {
            userTarget.productTargets.forEach((pt: any) => {
              if (pt.productSkuId) {
                newSkuTargets[pt.productSkuId] = String(pt.targetValue || pt.targetPackets || "0");
              }
            });
          }
        });
      }
      // Case 2: Individual target (list of products directly)
      else if (Array.isArray(targetData.products)) {
        targetData.products.forEach((product: any) => {
          const skuId = product.productSkuId || product.id || product.skuId;
          if (skuId) {
            newSkuTargets[skuId] = String(product.targetValue || product.targetPackets || "0");
          }
        });
      }

      setSkuTargets(newSkuTargets);
    }
  }, [targetSuccess, targetData, teams]);

  // Fetch team target products and users when team is selected
  useEffect(() => {
    if (selectedTeam) {
      dispatch(getTeamTargetProducts(selectedTeam));

      // Find the "Sales Representative" role to filter users
      const salesRepRole = roles.find(
        (r) => r.roleName === "Sales Representative" || r.pulseCode === "SR"
      );

      dispatch(
        getTeamUsers({
          teamId: selectedTeam,
          roleId: salesRepRole?.id,
        })
      );
    } else {
      dispatch(resetTeamTargetProductsState());
      dispatch(resetTeamUsersState());
      setSelectedSalesRep("");
      setValidationErrors({});
    }
  }, [selectedTeam, roles, dispatch]);

  // Handle API success
  useEffect(() => {
    if (createSuccess) {
      toast.success(createMessage || "Target allocation created successfully!");
      // Reset form
      setManagers(mockManagers);
      dispatch(resetCreateTargetState());
    }
  }, [createSuccess, createMessage, dispatch]);

  // Handle API error
  useEffect(() => {
    if (createError) {
      toast.error(`Error: ${createError}`);
      dispatch(resetCreateTargetState());
    }
  }, [createError, dispatch]);

  // Read-only field values (populated when team is selected)
  const selectedRepData = teamUsers.find((u) => u.userId === selectedSalesRep);

  const teamMetadata = {
    teamRoleCode: matchTeam?.pulseCode || "",
    teamName: matchTeam?.name || "",
    channelName: teamTargetData?.channelName || matchTeam?.channelName || "",
    callPoint: "No Callpoint available", // Not in target API
    areaManager: selectedRepData?.supervisorName || "Abdul Aziz Warisi",
    territory: selectedRepData?.territoryName || "T1",
  };

  const handleSkuTargetChange = (skuId: string, value: string) => {
    setSkuTargets((prev) => ({
      ...prev,
      [skuId]: value,
    }));
  };

  const handleSetTarget = async () => {
    // Parse month/year from targetMonth (assuming format like "january-2026", "2026-12", or month name)
    const currentYear = new Date().getFullYear();
    let month: number = 0;
    let year: number = currentYear;

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

    if (targetMonth.includes("-")) {
      const [mPart, yPart] = targetMonth.split("-");
      const monthIdx = monthNames.indexOf(mPart.toLowerCase());
      month = monthIdx !== -1 ? monthIdx + 1 : parseInt(mPart) || 0;
      year = parseInt(yPart) || currentYear;
    } else if (!isNaN(parseInt(targetMonth))) {
      month = parseInt(targetMonth);
      year = currentYear;
    } else {
      const monthIdx = monthNames.indexOf(targetMonth.toLowerCase());
      month = monthIdx !== -1 ? monthIdx + 1 : 0;
      year = currentYear;
    }

    // Build allocation payload from team details and users
    if (!teamUsers || teamUsers.length === 0) {
      toast.error("No team members found for the selected team.");
      return;
    }

    const targets = teamUsers.map((user: any) => ({
      userId: user.userId || user.id,
      productTargets: products.flatMap((product: any) =>
        product.skus.map((sku: any) => ({
          productSkuId: sku.id,
          targetValue: parseInt(skuTargets[sku.id] || "0") || 0,
        }))
      ),
    }));

    const payload: CreateTargetPayload = {
      teamId: selectedTeam,
      month: month,
      year: year,
      targets,
    };
    // Zod Validation
    const validation = targetSchema.safeParse(payload);

    if (!validation.success) {
      const errors: Record<string, string> = {};
      validation.error.errors.forEach((err) => {
        const fieldName = err.path[0] as string;
        // Map top-level field names for UI
        if (fieldName === "teamId") errors.team = err.message;
        if (fieldName === "month") errors.month = err.message;
        // Add more mappings if needed
      });

      setValidationErrors(errors);
      return;
    }

    setValidationErrors({});

    console.log("Submitting target payload:", payload);

    try {
      await dispatch(createTarget(payload)).unwrap();
      router.push(`/${locale}/dashboard/target-listview`);
    } catch (err) {
      console.error("Failed to create target:", err);
    }
  };

  return (
    <div className="min-h-screen bg-(--gray-0)">
      <div className="bg-background rounded-8 shadow-soft p-8 overflow-hidden">
        <TargetConfigForm
          selectedTeam={selectedTeam}
          targetTeams={teams}
          selectedSalesRep={selectedSalesRep}
          salesReps={teamUsers}
          targetMonthValue={targetMonth}
          areaManager={teamMetadata.areaManager}
          channelName={teamMetadata.channelName}
          territory={teamMetadata.territory}
          onTeamChange={(val) => {
            setSelectedTeam(val);
            clearFieldError("team");
          }}
          onSalesRepChange={setSelectedSalesRep}
          onMonthChange={(val) => {
            setTargetMonth(val);
            clearFieldError("month");
          }}
          errors={validationErrors}
        />

        {/* Define Target Section */}
        <DefineTargetSection
          products={products}
          teamDetailsLoading={teamTargetLoading}
          skuTargets={skuTargets}
          onSkuTargetChange={handleSkuTargetChange}
          selectedTeam={selectedTeam}
        />

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
            disabled={createLoading || targetLoading || !selectedTeam || !targetMonth}
            loading={createLoading || targetLoading}
          >
            {createLoading ? "Submitting..." : targetId ? "Update Target" : "Set Target"}
          </Button>
        </div>
      </div>

      {/* Conflict Modal */}
      <ConflictModal isOpen={isConflictModalOpen} onClose={() => setIsConflictModalOpen(false)} />
    </div>
  );
}
