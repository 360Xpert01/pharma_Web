"use client";

import { useState, useEffect } from "react";
import TargetConfigForm from "./TargetConfigForm";
import ConflictModal from "./ConflictModal";
import MonthRestrictionModal from "./MonthRestrictionModal";
import { Button } from "@/components/ui/button/button";
import { ConfirmModal } from "./shared/confirm-modal";
import { getTeamAll } from "@/store/slices/team/getTeamAllSlice";
import {
  getTeamTargetProducts,
  resetTeamTargetProductsState,
} from "@/store/slices/team/getTeamTargetProductsSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import { updateTarget, resetUpdateTargetState } from "@/store/slices/target/updateTargetSlice";
import { getAllRoles } from "@/store/slices/role/getAllRolesSlice";
import { getTeamUsers, resetTeamUsersState } from "@/store/slices/team/getTeamUsersSlice";
import type { UpdateTargetPayload } from "@/types/target";
import { updateTargetSchema } from "@/validations/targetValidation";
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
  const userId = searchParams.get("userId");

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
    loading: updateLoading,
    success: updateSuccess,
    error: updateError,
    message: updateMessage,
  } = useAppSelector((state) => state.updateTarget);
  const {
    data: targetData,
    loading: targetLoading,
    success: targetSuccess,
  } = useAppSelector((state) => state.targetById);

  // New state for SKU targets: { [skuId: string]: string }
  const [skuTargets, setSkuTargets] = useState<Record<string, string>>({});

  // Validation errors state
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [isDiscardModalOpen, setIsDiscardModalOpen] = useState(false);

  // Determine if the target is read-only (current or previous months)
  const isReadOnly = (() => {
    if (!targetData) return false;
    const month = targetData.month || targetData.targetMonth;
    const year = targetData.year || targetData.targetYear;
    if (!month || !year) return false;

    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1; // 1-indexed

    if (year < currentYear) return true;
    if (year === currentYear && month <= currentMonth) return true;
    return false;
  })();

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

  // Month Restriction Modal state
  const [isMonthRestrictionModalOpen, setIsMonthRestrictionModalOpen] = useState(false);

  // Find selected team data
  const matchTeam = (teams as any[]).find((team: any) => team.id === selectedTeam);

  // Use the one that has products populated
  const products = teamTargetData?.products || [];

  // Fetch teams and roles on mount
  useEffect(() => {
    dispatch(getTeamAll());
    dispatch(getAllRoles({ limit: 1000 }));

    // Pre-set selectedSalesRep if userId is in query params
    if (userId) {
      setSelectedSalesRep(userId);
    }

    return () => {
      dispatch(resetTargetByIdState());
    };
  }, [dispatch, userId]);

  // Fetch target data if targetId is present
  useEffect(() => {
    if (targetId) {
      dispatch(getTargetById({ targetId, userId: userId || undefined }));
    }
  }, [targetId, userId, dispatch]);

  // Populate form when target data is fetched
  useEffect(() => {
    if (targetSuccess && targetData) {
      // Set team
      if (targetData.teamId) setSelectedTeam(targetData.teamId);

      // Handle allocations mapping
      const allocations = targetData.allocations || [];
      if (allocations.length > 0 && userId) {
        const selectedAlloc = allocations.find((a: any) => a.userId === userId);

        if (selectedAlloc) {
          setSelectedSalesRep(selectedAlloc.userId);

          // Map targets for the selected rep back to skuTargets state
          const newSkuTargets: Record<string, string> = {};
          const skuAllocations = selectedAlloc.skuAllocations || [];
          skuAllocations.forEach((skuAlloc: any) => {
            if (skuAlloc.productSkuId) {
              newSkuTargets[skuAlloc.productSkuId] = String(skuAlloc.targetValue || "0");
            }
          });
          setSkuTargets(newSkuTargets);
        }
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
      const month = targetData.month || targetData.targetMonth;
      const year = targetData.year || targetData.targetYear;
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

  // Handle Update success
  useEffect(() => {
    if (updateSuccess) {
      toast.success(updateMessage || "Target updated successfully!");
      dispatch(resetUpdateTargetState());
      router.push(`/${locale}/dashboard/target-listview`);
    }
  }, [updateSuccess, updateMessage, dispatch, router, locale]);

  // Handle Update error
  useEffect(() => {
    if (updateError) {
      dispatch(resetUpdateTargetState());
    }
  }, [updateError, dispatch]);

  // Read-only field values (populated when team/sales rep is selected)
  // Check if targetData has specific rep info before falling back to teamUsers
  const currentRepFromAlloc = targetData?.allocations?.find(
    (a: any) => a.userId === selectedSalesRep
  );
  const currentRepFromUsers = teamUsers.find((u) => u.userId === selectedSalesRep);

  const teamMetadata = {
    teamName: targetData?.teamName || matchTeam?.name || "",
    channelName:
      targetData?.channelName || teamTargetData?.channelName || matchTeam?.channelName || "",
    areaManager:
      currentRepFromAlloc?.supervisorName || currentRepFromUsers?.supervisorName || "N/A",
    territoryPulseCode:
      currentRepFromAlloc?.territoryPulseCode || currentRepFromUsers?.territoryPulseCode || "N/A",
  };

  const handleSkuTargetChange = (skuId: string, value: string) => {
    setSkuTargets((prev) => ({
      ...prev,
      [skuId]: value,
    }));
  };

  const handleUpdateTarget = async () => {
    // Validate targetId exists
    if (!targetId) {
      return;
    }

    // Restriction check: if current or previous month, show modal and abort
    if (isReadOnly) {
      setIsMonthRestrictionModalOpen(true);
      return;
    }

    // Build update payload with ONLY targets (userId and productTargets with targetValue)
    // The API expects: { targets: [{ userId, productTargets: [{ productSkuId, targetValue }] }] }

    if (!teamUsers || teamUsers.length === 0) {
      return;
    }

    // Strictly update only the user specified in the query param
    const targets = [
      {
        userId: userId!,
        productTargets: products.flatMap((product: any) =>
          product.skus.map((sku: any) => ({
            productSkuId: sku.id,
            targetValue: parseInt(skuTargets[sku.id] || "0") || 0,
          }))
        ),
      },
    ];

    const updatePayload: UpdateTargetPayload = {
      targets,
    };

    // Validate update payload
    const updateValidation = updateTargetSchema.safeParse(updatePayload);

    if (!updateValidation.success) {
      console.error("Validation errors:", updateValidation.error.errors);
      return;
    }

    setValidationErrors({});

    console.log("Submitting update target payload:", updatePayload);

    try {
      await dispatch(updateTarget({ targetId, payload: updatePayload })).unwrap();
    } catch (err) {
      // toast.error(err || "err")
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
          salesReps={userId ? teamUsers.filter((u) => u.userId === userId) : teamUsers}
          targetMonthValue={targetMonth}
          areaManager={teamMetadata.areaManager}
          channelName={teamMetadata.channelName}
          territoryPulseCode={teamMetadata.territoryPulseCode}
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
          isEditMode={true}
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
            onClick={() => setIsDiscardModalOpen(true)}
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
            disabled={updateLoading || targetLoading || !selectedTeam || !targetId}
            loading={updateLoading || targetLoading}
          >
            {updateLoading ? "Updating..." : "Update Target"}
          </Button>
        </div>
      </div>

      <ConflictModal isOpen={isConflictModalOpen} onClose={() => setIsConflictModalOpen(false)} />

      <MonthRestrictionModal
        isOpen={isMonthRestrictionModalOpen}
        onClose={() => setIsMonthRestrictionModalOpen(false)}
      />

      <ConfirmModal
        isOpen={isDiscardModalOpen}
        onClose={() => setIsDiscardModalOpen(false)}
        onConfirm={() => {
          setIsDiscardModalOpen(false);
          router.back();
        }}
        title="Discard changes?"
        description="You will lose all unsaved target changes."
        confirmLabel="Discard"
      />
    </div>
  );
}
