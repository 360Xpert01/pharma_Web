"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/store";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import {
  createTerritory,
  updateTerritory,
  getTerritoryById,
  resetCreateTerritoryState,
  resetUpdateTerritoryState,
  type CreateTerritoryPayload,
} from "@/store/slices/territory";
import { getBrickList } from "@/store/slices/brick/getBrickListSlice";
import { toast } from "sonner";
import { Button } from "@/components/ui/button/button";
import { FormInput, FormTextarea, BrickSearch } from "@/components/form";
import { Plus } from "lucide-react";

import {
  generatePrefix,
  resetGeneratePrefixState,
} from "@/store/slices/preFix/generatePrefixSlice";

interface Brick {
  id: string;
  name: string;
  brickCode?: string;
}

export default function TerritoryForm({ territoryId }: { territoryId?: string | null }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const idFromUrl = searchParams?.get("id") || territoryId;

  const isEditMode = Boolean(idFromUrl);

  // State selectors
  const { territory, loading: loadingTerritory } = useSelector(
    (state: RootState) => state.territoryById
  );
  const { generatedPrefix, loading: prefixLoading } = useSelector(
    (state: RootState) => state.generatePrefix
  );
  const {
    success: createSuccess,
    loading: createLoading,
    message: createMessage,
  } = useSelector((state: RootState) => state.createTerritory);
  const {
    success: updateSuccess,
    loading: updateLoading,
    message: updateMessage,
  } = useSelector((state: RootState) => state.updateTerritory);
  const { bricks, loading: loadingBricks } = useSelector((state: RootState) => state.brickList);

  // Form state
  const [formData, setFormData] = useState({
    pulseCode: "",
    description: "",
    selectedBricks: [] as Brick[],
  });

  // Fetch initial data
  useEffect(() => {
    dispatch(getBrickList());

    if (isEditMode && idFromUrl) {
      dispatch(getTerritoryById(idFromUrl));
    } else {
      dispatch(generatePrefix({ entity: "Territory" }));
    }

    return () => {
      dispatch(resetGeneratePrefixState());
    };
  }, [dispatch, isEditMode, idFromUrl]);

  // Populate form with territory data
  useEffect(() => {
    if (territory && isEditMode) {
      setFormData({
        pulseCode: territory.pulseCode || "",
        description: territory.description || "",
        selectedBricks:
          territory.bricks?.map((b: any) => ({
            id: b.id,
            name: b.name,
            brickCode: b.brickCode,
          })) || [],
      });
    }
  }, [territory, isEditMode]);

  // Handle success
  useEffect(() => {
    if (createSuccess && createMessage) {
      toast.success("Success", { description: createMessage });
      dispatch(resetCreateTerritoryState());
      dispatch(resetGeneratePrefixState());
      router.push("/dashboard/territory-Management");
    }
  }, [createSuccess, createMessage, dispatch, router]);

  useEffect(() => {
    if (updateSuccess && updateMessage) {
      toast.success("Success", { description: updateMessage });
      dispatch(resetUpdateTerritoryState());
      router.push("/dashboard/territory-Management");
    }
  }, [updateSuccess, updateMessage, dispatch, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const currentPulseCode = isEditMode ? formData.pulseCode : generatedPrefix || "";

    // Validation
    if (!currentPulseCode.trim()) {
      toast.error("Validation Error", { description: "Pulse Code is required" });
      return;
    }

    const payload: CreateTerritoryPayload = {
      pulseCode: currentPulseCode.trim(),
      description: formData.description.trim(),
      bricks: formData.selectedBricks.map((b) => b.id),
    };

    if (isEditMode && idFromUrl) {
      // Omit pulseCode for updates as per backend requirement
      const { pulseCode, ...updatePayload } = payload;
      dispatch(updateTerritory({ id: idFromUrl, ...(updatePayload as any) }));
    } else {
      dispatch(createTerritory(payload));
    }
  };

  const handleCancel = () => {
    router.back();
  };

  const isLoading =
    createLoading || updateLoading || (isEditMode && loadingTerritory) || prefixLoading;

  return (
    <div className=" ">
      <div className="p-4 space-y-6">
        {/* Territory Details Section */}
        <h2 className="t-h2">Territory Details</h2>

        <div className="grid grid-cols-1 gap-6">
          <FormInput
            label="Pulse Code"
            name="pulseCode"
            value={isEditMode ? formData.pulseCode : generatedPrefix || ""}
            onChange={() => {}}
            placeholder={prefixLoading ? "Generating..." : "Auto-generated"}
            required
            readOnly
            className="cursor-not-allowed max-w-sm"
          />

          <FormTextarea
            label="Description"
            name="description"
            value={formData.description}
            onChange={(value) => setFormData((prev) => ({ ...prev, description: value }))}
            placeholder="Enter territory description..."
            rows={3}
          />
        </div>

        {/* Bricks Selection */}
        <div className="max-w-full">
          <BrickSearch
            allBricks={bricks}
            selectedBricks={formData.selectedBricks}
            onBricksChange={(selected) =>
              setFormData((prev) => ({ ...prev, selectedBricks: selected }))
            }
            loading={loadingBricks}
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 pt-6">
          <Button variant="outline" size="lg" rounded="default" onClick={handleCancel}>
            Discard
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            loading={isLoading}
            variant="primary"
            size="lg"
            icon={Plus}
            rounded="default"
            className="shadow-soft"
          >
            {isLoading
              ? isEditMode
                ? "Updating..."
                : "Creating..."
              : isEditMode
                ? "Update Territory"
                : "Add Territory"}
          </Button>
        </div>
      </div>
    </div>
  );
}
