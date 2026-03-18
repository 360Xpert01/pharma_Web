"use client";

import React, { useState, useEffect } from "react";
import { Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button/button";
import { ProfileImageUpload, FormInput, FormSelect, StatusToggle } from "@/components/form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ConfirmModal } from "./shared/confirm-modal";
import { useAppDispatch, useAppSelector } from "@/store";
import { uploadImageAction, resetUploadState } from "@/store/slices/upload/uploadSlice";
import {
  createDistributor,
  resetCreateDistributorState,
} from "@/store/slices/distributor/createDistributorSlice";
import {
  updateDistributor,
  resetUpdateDistributorState,
} from "@/store/slices/distributor/updateDistributorSlice";
import {
  getDistributorById,
  resetDistributorByIdState,
} from "@/store/slices/distributor/getDistributorByIdSlice";
import { getAllDistributorTypes } from "@/store/slices/distributorType/getAllDistributorTypesSlice";
import { getBrickList } from "@/store/slices/brick/getBrickListSlice";

// ── Props ────────────────────────────────────────────────────────────────────
interface DistributorFormProps {
  mode: "add" | "update";
  distributorId?: string;
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function DistributorForm({ mode, distributorId }: DistributorFormProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isUpdateMode = mode === "update";

  // ── Redux selectors ──────────────────────────────────────────────────────
  const {
    loading: createLoading,
    success: createSuccess,
    error: createError,
  } = useAppSelector((s) => s.createDistributor);
  const {
    loading: updateLoading,
    success: updateSuccess,
    error: updateError,
  } = useAppSelector((s) => s.updateDistributor);
  const { distributor: existingData, loading: fetchLoading } = useAppSelector(
    (s) => s.distributorById
  );
  const { distributorTypes, loading: typesLoading } = useAppSelector((s) => s.allDistributorTypes);
  const { zones, regions, loading: brickLoading } = useAppSelector((s) => s.brickList);

  // Cloudinary/upload state
  const {
    loading: uploadLoading,
    success: uploadSuccess,
    error: uploadError,
    uploadedFiles,
  } = useAppSelector((state) => state.upload);

  // Derived loading / success / error for the submit action
  const loading = isUpdateMode ? updateLoading : createLoading;
  const success = isUpdateMode ? updateSuccess : createSuccess;
  const error = isUpdateMode ? updateError : createError;

  // ── Form state ───────────────────────────────────────────────────────────
  const [legacyCode, setLegacyCode] = useState("");
  const [distributorName, setDistributorName] = useState("");
  const [status, setStatus] = useState<"Active" | "Inactive">("Active");
  const [selectedZoneId, setSelectedZoneId] = useState("");
  const [selectedRegionId, setSelectedRegionId] = useState("");
  const [selectedTypeId, setSelectedTypeId] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Dropdown options (computed AFTER state so selectedZoneId is available)
  const typeOptions = distributorTypes.map((t) => ({ value: t.id, label: t.name }));
  const zoneOptions = zones.map((z) => ({
    value: z.id,
    label: z.description ? `${z.name} - ${z.description}` : z.name,
  }));
  // Only show regions that belong to the selected zone (parentId === selectedZoneId)
  const regionOptions = regions
    .filter((r) => r.parentId === selectedZoneId)
    .map((r) => ({
      value: r.id,
      label: r.description ? `${r.name} - ${r.description}` : r.name,
    }));

  // UI
  const [isDiscardModalOpen, setIsDiscardModalOpen] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // ── On mount: fetch dropdowns + existing data (update mode) ─────────────
  useEffect(() => {
    dispatch(getAllDistributorTypes({ limit: 100 }));
    dispatch(getBrickList());

    if (isUpdateMode && distributorId) {
      dispatch(getDistributorById(distributorId));
    }

    return () => {
      dispatch(resetCreateDistributorState());
      dispatch(resetUpdateDistributorState());
      dispatch(resetDistributorByIdState());
      dispatch(resetUploadState());
    };
  }, [dispatch, isUpdateMode, distributorId]);

  // Image upload effect
  useEffect(() => {
    if (uploadSuccess && uploadedFiles.length > 0) {
      setImagePreview(uploadedFiles[0].url);
      toast.success("Image uploaded successfully!");
    }
    if (uploadError) {
      console.error("DistributorForm: Upload error", uploadError);
      toast.error(uploadError);
    }
  }, [uploadSuccess, uploadedFiles, uploadError]);

  const handleImageChange = async (file: File | null) => {
    if (file) {
      dispatch(uploadImageAction(file));
    } else {
      setImagePreview(null);
      dispatch(resetUploadState());
    }
  };

  // ── Pre-fill form when existing data loads ───────────────────────────────
  useEffect(() => {
    if (isUpdateMode && existingData) {
      setDistributorName(existingData.distributorName || "");
      setLegacyCode(existingData.legacyCode || "");
      setStatus(existingData.distributorStatus === "active" ? "Active" : "Inactive");
      setSelectedZoneId(existingData.zoneId || "");
      setSelectedRegionId(existingData.regionId || "");
      setSelectedTypeId(existingData.distributorTypeId || "");
      setImagePreview(existingData.imageUrl || null);
    }
  }, [existingData, isUpdateMode]);

  // ── Handle success ───────────────────────────────────────────────────────
  useEffect(() => {
    if (success) {
      toast.success(
        isUpdateMode ? "Distributor updated successfully!" : "Distributor added successfully!"
      );
      dispatch(resetCreateDistributorState());
      dispatch(resetUpdateDistributorState());
      router.push("/dashboard/Distributors-Management");
    }
  }, [success]);

  // ── Handle error ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  // ── Field helpers ─────────────────────────────────────────────────────────
  const getError = (field: string) => validationErrors[field] || "";
  const clearError = (field: string) => {
    if (validationErrors[field]) {
      setValidationErrors((prev) => {
        const n = { ...prev };
        delete n[field];
        return n;
      });
    }
  };

  // ── Validation ────────────────────────────────────────────────────────────
  const validate = (): boolean => {
    const errors: Record<string, string> = {};
    if (!distributorName.trim()) errors.distributorName = "Distributor name is required";
    if (!selectedZoneId) errors.zoneId = "Zone is required";
    // Region is only required if the selected zone actually has regions
    if (regionOptions.length > 0 && !selectedRegionId) errors.regionId = "Region is required";
    if (!selectedTypeId) errors.distributorTypeId = "Distributor type is required";
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // ── Submit ────────────────────────────────────────────────────────────────
  const handleSubmit = () => {
    if (!validate()) return;

    const distributorStatus = status === "Active" ? "active" : "inactive";
    // Only send regionId if one is selected (zone may have no regions)
    const regionId = selectedRegionId || undefined;

    if (isUpdateMode && distributorId) {
      dispatch(
        updateDistributor({
          id: distributorId,
          legacyCode: legacyCode || undefined,
          zoneId: selectedZoneId,
          regionId: regionId as string,
          distributorName,
          distributorStatus,
          distributorTypeId: selectedTypeId,
          imageUrl: imagePreview || undefined,
        })
      );
    } else {
      dispatch(
        createDistributor({
          legacyCode: legacyCode || undefined,
          zoneId: selectedZoneId,
          regionId: regionId as string,
          distributorName,
          distributorStatus,
          distributorTypeId: selectedTypeId,
          imageUrl: imagePreview || undefined,
        })
      );
    }
  };

  const handleDiscard = () => setIsDiscardModalOpen(true);
  const confirmDiscard = () => {
    setIsDiscardModalOpen(false);
    router.push("/dashboard/Distributors-Management");
  };

  const buttonText = isUpdateMode
    ? loading
      ? "Updating..."
      : "Update Distributor"
    : loading
      ? "Adding..."
      : "Add Distributor";

  // ── Loading skeleton while fetching existing data ─────────────────────
  if (isUpdateMode && fetchLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-(--primary)" />
      </div>
    );
  }

  const formLoading = loading || uploadLoading;

  return (
    <div className="bg-(--gray-0)">
      <div className="bg-(--background) rounded-8 shadow-soft p-8 space-y-10">
        {/* ── Basic Info ─────────────────────────────────────────────────── */}
        <div className="space-y-6">
          <h2 className="t-h2">Basic Info</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left: Profile Image Upload */}
            <ProfileImageUpload
              imagePreview={imagePreview}
              onImageChange={handleImageChange}
              loading={uploadLoading}
              className="space-y-6"
            />

            {/* Right: Form Fields */}
            <div className="md:col-span-2 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  label="Pulse Code"
                  name="pulseCode"
                  value={isUpdateMode && existingData ? existingData.pulseCode : "Auto-generated"}
                  onChange={() => {}}
                  placeholder="Auto-generated"
                  readOnly
                />
                <FormInput
                  label="Legacy Code"
                  name="legacyCode"
                  value={legacyCode}
                  onChange={(v) => {
                    setLegacyCode(v);
                    clearError("legacyCode");
                  }}
                  placeholder="Enter legacy code"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  label="Distributor Name"
                  name="distributorName"
                  value={distributorName}
                  onChange={(v) => {
                    setDistributorName(v);
                    clearError("distributorName");
                  }}
                  placeholder="Enter distributor name"
                  required
                  error={getError("distributorName")}
                />
                <div className="flex flex-col gap-2 justify-end">
                  <StatusToggle status={status} onChange={setStatus} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Assignment ────────────────────────────────────────────────── */}
        <div className="space-y-6">
          <h2 className="t-h2">Assignment</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Zone — select first; region filters by this */}
            <FormSelect
              label="Zone"
              name="zoneId"
              value={selectedZoneId}
              onChange={(v) => {
                setSelectedZoneId(v);
                setSelectedRegionId(""); // reset region when zone changes
                clearError("zoneId");
                clearError("regionId");
              }}
              options={brickLoading ? [] : zoneOptions}
              placeholder={brickLoading ? "Loading zones..." : "Select zone"}
              error={getError("zoneId")}
            />
            {/* Region — filtered by selected zone via parentId */}
            <FormSelect
              label="Region"
              name="regionId"
              value={selectedRegionId}
              onChange={(v) => {
                setSelectedRegionId(v);
                clearError("regionId");
              }}
              options={selectedZoneId && !brickLoading ? regionOptions : []}
              placeholder={
                brickLoading
                  ? "Loading regions..."
                  : !selectedZoneId
                    ? "Select a zone first"
                    : regionOptions.length === 0
                      ? "No regions for this zone"
                      : "Select region"
              }
              error={getError("regionId")}
            />
            {/* Distributor Type — from getAllDistributorTypes */}
            <FormSelect
              label="Distributor Type"
              name="distributorTypeId"
              value={selectedTypeId}
              onChange={(v) => {
                setSelectedTypeId(v);
                clearError("distributorTypeId");
              }}
              options={typesLoading ? [] : typeOptions}
              placeholder={typesLoading ? "Loading types..." : "Select type"}
              error={getError("distributorTypeId")}
            />
          </div>
        </div>

        {/* ── Action Buttons ────────────────────────────────────────────── */}
        <div className="flex justify-end gap-4 pt-6">
          <Button
            type="button"
            onClick={handleDiscard}
            variant="outline"
            size="lg"
            rounded="full"
            className="px-6"
          >
            Discard
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={formLoading}
            loading={formLoading}
            icon={Plus}
            variant="primary"
            size="lg"
            rounded="full"
            className="px-8 shadow-soft"
          >
            {buttonText}
          </Button>
        </div>
      </div>

      <ConfirmModal
        isOpen={isDiscardModalOpen}
        onClose={() => setIsDiscardModalOpen(false)}
        onConfirm={confirmDiscard}
        title="Discard changes?"
        description="Are you sure you want to discard your changes to this distributor?"
        confirmLabel="Discard"
      />
    </div>
  );
}
