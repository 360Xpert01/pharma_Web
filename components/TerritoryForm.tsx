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
import { MapPin, Save, X } from "lucide-react";

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
  const {
    zones,
    regions,
    bricks,
    loading: loadingBricks,
  } = useSelector((state: RootState) => state.brickList);

  // Form state
  const [formData, setFormData] = useState({
    pulseCode: "",
    name: "",
    description: "",
    selectedBricks: [] as string[],
  });

  // Fetch bricks on mount
  useEffect(() => {
    dispatch(getBrickList());
  }, [dispatch]);

  // Fetch territory data if editing
  useEffect(() => {
    if (isEditMode && idFromUrl) {
      dispatch(getTerritoryById(idFromUrl));
    }
  }, [dispatch, isEditMode, idFromUrl]);

  // Populate form with territory data
  useEffect(() => {
    if (territory && isEditMode) {
      setFormData({
        pulseCode: territory.pulseCode || "",
        name: territory.name || "",
        description: territory.description || "",
        selectedBricks: territory.bricks?.map((b) => b.id) || [],
      });
    }
  }, [territory, isEditMode]);

  // Handle success
  useEffect(() => {
    if (createSuccess && createMessage) {
      toast.success("Success", { description: createMessage });
      dispatch(resetCreateTerritoryState());
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBrickToggle = (brickId: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedBricks: prev.selectedBricks.includes(brickId)
        ? prev.selectedBricks.filter((id) => id !== brickId)
        : [...prev.selectedBricks, brickId],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.pulseCode.trim()) {
      toast.error("Validation Error", { description: "Pulse Code is required" });
      return;
    }
    if (!formData.name.trim()) {
      toast.error("Validation Error", { description: "Territory Name is required" });
      return;
    }

    const payload: CreateTerritoryPayload = {
      pulseCode: formData.pulseCode.trim(),
      name: formData.name.trim(),
      description: formData.description.trim(),
      bricks: formData.selectedBricks,
    };

    if (isEditMode && idFromUrl) {
      dispatch(updateTerritory({ id: idFromUrl, ...payload }));
    } else {
      dispatch(createTerritory(payload));
    }
  };

  const handleCancel = () => {
    router.push("/dashboard/territory-Management");
  };

  const isLoading = createLoading || updateLoading || (isEditMode && loadingTerritory);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center gap-3 mb-6">
          <MapPin className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold text-gray-900">
            {isEditMode ? "Edit Territory" : "Create New Territory"}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Pulse Code */}
          <div>
            <label htmlFor="pulseCode" className="block text-sm font-medium text-gray-700 mb-2">
              Pulse Code <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="pulseCode"
              name="pulseCode"
              value={formData.pulseCode}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="e.g., TER-001"
              required
            />
          </div>

          {/* Territory Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Territory Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="e.g., North Territory"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              placeholder="Enter territory description..."
            />
          </div>

          {/* Bricks Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Assign Bricks</label>
            <div className="border border-gray-300 rounded-lg p-4 max-h-80 overflow-y-auto">
              {loadingBricks ? (
                <div className="text-center py-4 text-gray-500">Loading bricks...</div>
              ) : bricks.length === 0 ? (
                <div className="text-center py-4 text-gray-500">No bricks available</div>
              ) : (
                <div className="space-y-2">
                  {bricks.map((brick) => (
                    <label
                      key={brick.id}
                      className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={formData.selectedBricks.includes(brick.id)}
                        onChange={() => handleBrickToggle(brick.id)}
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">{brick.name}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {formData.selectedBricks.length} brick(s) selected
            </p>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <X className="h-4 w-4" />
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              {isLoading ? "Saving..." : isEditMode ? "Update Territory" : "Create Territory"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
