"use client";

import React, { useState } from "react";
import { FormSelect } from "@/components/form";
import { Button } from "@/components/ui/button/button";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store";
import { getTeamAll } from "@/store/slices/team/getTeamAllSlice";
import {
  getTeamConflicts,
  resetTeamConflictsState,
} from "@/store/slices/team/getTeamConflictsSlice";
import {
  targetAllocation,
  resetTargetAllocationState,
} from "@/store/slices/target/targetAllocationSlice";
import { useEffect } from "react";
import { toast } from "sonner";
import { conflictResolutionSchema } from "@/validations/targetValidation";

export default function TerritoryConflictsPage() {
  const [selectedTeam, setSelectedTeam] = useState("");
  const dispatch = useAppDispatch();
  const { teams } = useAppSelector((state) => state.teamAll);
  const { data: teamConflictData, loading: conflictLoading } = useAppSelector(
    (state) => state.teamConflicts
  );
  const {
    loading: resolveLoading,
    success: resolveSuccess,
    error: resolveError,
    message: resolveMessage,
  } = useAppSelector((state) => state.targetAllocation);

  // Validation errors state
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    dispatch(getTeamAll());
  }, [dispatch]);

  useEffect(() => {
    if (selectedTeam) {
      dispatch(getTeamConflicts(selectedTeam));
    } else {
      dispatch(resetTeamConflictsState());
    }
  }, [selectedTeam, dispatch]);

  // Handle resolve success
  useEffect(() => {
    if (resolveSuccess && resolveMessage) {
      toast.success("Success", { description: resolveMessage });
      dispatch(resetTargetAllocationState());
      setValidationErrors({});
      // Refresh conflicts
      if (selectedTeam) {
        dispatch(getTeamConflicts(selectedTeam));
      }
    }
  }, [resolveSuccess, resolveMessage, dispatch, selectedTeam]);

  // Handle resolve error
  useEffect(() => {
    if (resolveError) {
      toast.error("Error", { description: resolveError });
      dispatch(resetTargetAllocationState());
    }
  }, [resolveError, dispatch]);

  // Local state to manage input shares before saving
  const [localShares, setLocalShares] = useState<Record<string, Record<string, string>>>({});

  const handleShareChange = (brickId: string, territoryId: string, value: string) => {
    setLocalShares((prev) => ({
      ...prev,
      [brickId]: {
        ...(prev[brickId] || {}),
        [territoryId]: value,
      },
    }));
    clearBrickError(brickId);
  };
  const getBrickTotalPercentage = (conflict: any) => {
    const shares = localShares[conflict.brickId] || {};
    let total = 0;
    conflict.territories.forEach((t: any) => {
      const value = shares[t.territoryId] ?? t.percentage;
      total += parseFloat(value) || 0;
    });
    return total;
  };

  const getErrorMessage = (brickId: string) => validationErrors[brickId] || "";

  const clearBrickError = (brickId: string) => {
    if (validationErrors[brickId]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[brickId];
        return newErrors;
      });
    }
  };

  const handleResolveConflicts = () => {
    if (!selectedTeam || !teamConflictData) return;

    const bricksPayload = teamConflictData.conflicts.map((conflict) => ({
      brickId: conflict.brickId,
      allocations: conflict.territories.map((t) => ({
        territoryId: t.territoryId,
        percentage: parseFloat(localShares[conflict.brickId]?.[t.territoryId] ?? t.percentage) || 0,
      })),
    }));

    const payload = {
      teamId: selectedTeam,
      bricks: bricksPayload,
    };

    // Zod Validation
    const validation = conflictResolutionSchema.safeParse(payload);

    if (!validation.success) {
      const errors: Record<string, string> = {};
      validation.error.errors.forEach((err) => {
        // err.path looks like ["bricks", 0, "allocations"] or ["bricks", 0]
        if (err.path[0] === "bricks" && typeof err.path[1] === "number") {
          const brickIndex = err.path[1];
          const brickId = teamConflictData.conflicts[brickIndex].brickId;
          if (!errors[brickId]) {
            errors[brickId] = err.message;
          }
        } else if (err.path[0] === "teamId") {
          errors.team = err.message;
        }
      });

      setValidationErrors(errors);
      return;
    }

    setValidationErrors({});
    dispatch(targetAllocation(payload));
  };

  const conflicts = teamConflictData?.conflicts || [];

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
                options={teams.map((team: any) => ({
                  value: team.id,
                  label: team.name,
                }))}
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
            {conflictLoading ? (
              <div className="py-20 text-center">
                <div className="inline-block w-8 h-8 border-4 border-(--gray-3) border-t-primary rounded-8 animate-spin mb-4"></div>
                <p className="t-md text-(--gray-5)">Loading team conflicts...</p>
              </div>
            ) : conflicts.length === 0 ? (
              <div className="py-20 text-center bg-(--gray-0) rounded-8 border-2 border-dashed border-(--gray-2)">
                <p className="t-lg text-(--gray-5)">No conflicts found for this team.</p>
              </div>
            ) : (
              conflicts.map((conflict) => (
                <div
                  key={conflict.brickId}
                  className="bg-white rounded-8 border border-(--gray-2) overflow-hidden shadow-soft"
                >
                  <div className="p-8 space-y-6">
                    {/* Card Header: Code and Percentage */}
                    <div className="flex items-center gap-6">
                      <div className="bg-(--primary) text-white px-6 py-2 rounded-8 t-h4 font-bold">
                        {conflict.brickName}
                      </div>
                      <div
                        className={`t-h1 font-bold ${getBrickTotalPercentage(conflict) === 100 ? "text-(--success)" : "text-(--destructive)"}`}
                      >
                        {getBrickTotalPercentage(conflict)}%
                      </div>
                    </div>

                    {/* Territory Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                      {conflict.territories.map((t) => (
                        <div
                          key={t.territoryId}
                          className="bg-(--gray-0) border border-(--gray-1) rounded-8 p-4 flex items-center justify-between"
                        >
                          <span className="font-medium text-(--gray-9)">
                            {t.territoryPulseCode}
                          </span>
                          <div className="w-16 h-8 bg-white rounded-8 border border-(--gray-1) flex items-center justify-center px-1">
                            <input
                              type="text"
                              value={localShares[conflict.brickId]?.[t.territoryId] ?? t.percentage}
                              onChange={(e) =>
                                handleShareChange(conflict.brickId, t.territoryId, e.target.value)
                              }
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
                      <div
                        className={`rounded-8 px-4 py-3 flex items-center gap-3 ${getErrorMessage(conflict.brickId) ? "bg-(--destructive-0)" : "bg-(--destructive-0)"}`}
                      >
                        <AlertCircle className="w-5 h-5 text-(--destructive)" />
                        <span className="font-medium text-xs text-(--destructive)">
                          {getErrorMessage(conflict.brickId) ||
                            (getBrickTotalPercentage(conflict) === 0
                              ? "Conflicts In Sales Allocation"
                              : `Current Allocation: ${getBrickTotalPercentage(conflict)}% (Must be 100%)`)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
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
          <Button
            variant="primary"
            size="lg"
            rounded="full"
            className="px-10 shadow-soft"
            onClick={handleResolveConflicts}
            loading={resolveLoading}
            disabled={resolveLoading || !selectedTeam || conflicts.length === 0}
          >
            Resolve Conflicts
          </Button>
        </div>
      </div>
    </div>
  );
}
