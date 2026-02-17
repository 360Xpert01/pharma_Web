"use client";

import { useState, useEffect } from "react";
import TargetConfigForm from "./TargetConfigForm";
import ConflictModal from "./ConflictModal";
import { Button } from "@/components/ui/button/button";
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

export default function UpdateTargetPage() {
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

  // New state for SKU targets: { [skuId: string]: string }
  const [skuTargets, setSkuTargets] = useState<Record<string, string>>({});

  // Validation errors state
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

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
      const data = targetData.data || targetData;

      // Set team
      if (data.teamId) setSelectedTeam(data.teamId);

      // Handle allocations mapping
      const allocations = data.allocations || [];
      if (allocations.length > 0) {
        // Default to first sales rep if not selected
        const firstRep = allocations[0];
        if (firstRep.userId) setSelectedSalesRep(firstRep.userId);

        // Map all targets back to skuTargets state (from all reps in the allocation)
        const newSkuTargets: Record<string, string> = {};
        allocations.forEach((alloc: any) => {
          const skuAllocations = alloc.skuAllocations || alloc.productTargets || [];
          skuAllocations.forEach((skuAlloc: any) => {
            if (skuAlloc.productSkuId) {
              newSkuTargets[skuAlloc.productSkuId] = String(skuAlloc.targetValue || "0");
            }
          });
        });
        setSkuTargets(newSkuTargets);
      }

      // Format month and year
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
      const month = data.month || data.targetMonth;
      const year = data.year || data.targetYear;
      if (month && year) {
        const monthName =
          typeof month === "number" ? monthNames[month - 1] : String(month).toLowerCase();
        setTargetMonth(`${monthName}-${year}`);
      }
    }
  }, [targetSuccess, targetData]);

  // Fetch team target products and users when team is selected
  useEffect(() => {
    if (selectedTeam) {
      dispatch(getTeamTargetProducts(selectedTeam));

      // Find relevant roles
      const salesRepRole = roles.find(
        (r) => r.roleName === "Sales Representative" || r.pulseCode === "SR"
      );

      dispatch(
        getTeamUsers({
          teamId: selectedTeam,
          roleId: salesRepRole?.id,
        })
      );
    }
  }, [selectedTeam, roles, dispatch]);

  // Handle API success
  useEffect(() => {
    if (createSuccess) {
      toast.success(createMessage || "Target allocation updated successfully!");
      dispatch(resetCreateTargetState());
      router.push(`/${locale}/dashboard/target-listview`);
    }
  }, [createSuccess, createMessage, dispatch, router, locale]);

  // Handle API error
  useEffect(() => {
    if (createError) {
      toast.error(`Error: ${createError}`);
      dispatch(resetCreateTargetState());
    }
  }, [createError, dispatch]);

  // Read-only field values (populated when team/sales rep is selected)
  // Check if targetData has specific rep info before falling back to teamUsers
  const currentRepFromAlloc = targetData?.data?.allocations?.find(
    (a: any) => a.userId === selectedSalesRep
  );
  const currentRepFromUsers = teamUsers.find((u) => u.userId === selectedSalesRep);

  const teamMetadata = {
    teamName: targetData?.data?.teamName || matchTeam?.name || "",
    channelName:
      targetData?.data?.channelName || teamTargetData?.channelName || matchTeam?.channelName || "",
    areaManager:
      currentRepFromAlloc?.supervisorName || currentRepFromUsers?.supervisorName || "N/A",
    territory: currentRepFromAlloc?.territoryName || currentRepFromUsers?.territoryName || "N/A",
  };

  const handleSkuTargetChange = (skuId: string, value: string) => {
    setSkuTargets((prev) => ({
      ...prev,
      [skuId]: value,
    }));
  };

  const handleUpdateTarget = async () => {
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
    }

    if (!teamUsers || teamUsers.length === 0) {
      toast.error("No team members found.");
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

    const validation = targetSchema.safeParse(payload);
    if (!validation.success) {
      const errors: Record<string, string> = {};
      validation.error.errors.forEach((err) => {
        const fieldName = err.path[0] as string;
        if (fieldName === "teamId") errors.team = err.message;
        if (fieldName === "month") errors.month = err.message;
      });
      setValidationErrors(errors);
      return;
    }

    setValidationErrors({});
    try {
      await dispatch(createTarget(payload)).unwrap();
    } catch (err) {
      console.error("Failed to update target:", err);
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

        <DefineTargetSection
          products={products}
          teamDetailsLoading={teamTargetLoading || targetLoading}
          skuTargets={skuTargets}
          onSkuTargetChange={handleSkuTargetChange}
          selectedTeam={selectedTeam}
        />

        <div className="flex justify-end gap-4 pt-6">
          <Button
            type="button"
            variant="outline"
            size="lg"
            rounded="full"
            className="px-6"
            onClick={() => router.back()}
          >
            Discard
          </Button>
          <Button
            type="button"
            onClick={handleUpdateTarget}
            variant="primary"
            size="lg"
            rounded="full"
            className="px-8 shadow-soft"
            disabled={createLoading || targetLoading || !selectedTeam || !targetMonth}
            loading={createLoading || targetLoading}
          >
            {createLoading ? "Updating..." : "Update Target"}
          </Button>
        </div>
      </div>

      <ConflictModal isOpen={isConflictModalOpen} onClose={() => setIsConflictModalOpen(false)} />
    </div>
  );
}
