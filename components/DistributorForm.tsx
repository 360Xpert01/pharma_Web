"use client";

import React, { useState, useEffect } from "react";
import { Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button/button";
import { FormInput, FormSelect, StatusToggle } from "@/components/form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ConfirmModal } from "./shared/confirm-modal";

// ── Dummy data for dropdowns ──────────────────────────────────────────────────
const DUMMY_ZONES = [
  { value: "zone-001", label: "North Zone" },
  { value: "zone-002", label: "South Zone" },
  { value: "zone-003", label: "East Zone" },
  { value: "zone-004", label: "West Zone" },
  { value: "zone-005", label: "Central Zone" },
];

const DUMMY_REGIONS = [
  { value: "reg-001", label: "Lahore Region" },
  { value: "reg-002", label: "Karachi Region" },
  { value: "reg-003", label: "Islamabad Region" },
  { value: "reg-004", label: "Peshawar Region" },
  { value: "reg-005", label: "Multan Region" },
  { value: "reg-006", label: "Faisalabad Region" },
];

const DUMMY_DISTRIBUTOR_TYPES = [
  { value: "dtype-001", label: "Wholesale" },
  { value: "dtype-002", label: "Retail" },
  { value: "dtype-003", label: "Sub-Distributor" },
];

// ── Dummy existing records for pre-fill in update mode ──────────────────────
const DUMMY_DISTRIBUTORS: Record<string, any> = {
  "dist-001": {
    pulseCode: "DST-0001",
    legacyCode: "LEG-001",
    distributorName: "Alpha Pharma Distributors",
    distributorStatus: "Active",
    zoneId: "zone-001",
    regionId: "reg-001",
    distributorTypeId: "dtype-001",
  },
  "dist-002": {
    pulseCode: "DST-0002",
    legacyCode: "LEG-002",
    distributorName: "Beta Medical Supplies",
    distributorStatus: "Active",
    zoneId: "zone-002",
    regionId: "reg-002",
    distributorTypeId: "dtype-002",
  },
  "dist-003": {
    pulseCode: "DST-0003",
    legacyCode: "LEG-003",
    distributorName: "Gamma Health Traders",
    distributorStatus: "Inactive",
    zoneId: "zone-003",
    regionId: "reg-003",
    distributorTypeId: "dtype-001",
  },
  "dist-004": {
    pulseCode: "DST-0004",
    legacyCode: "LEG-004",
    distributorName: "Delta Pharma Network",
    distributorStatus: "Active",
    zoneId: "zone-004",
    regionId: "reg-004",
    distributorTypeId: "dtype-003",
  },
  "dist-005": {
    pulseCode: "DST-0005",
    legacyCode: "LEG-005",
    distributorName: "Epsilon Drug Mart",
    distributorStatus: "Active",
    zoneId: "zone-005",
    regionId: "reg-005",
    distributorTypeId: "dtype-002",
  },
  "dist-006": {
    pulseCode: "DST-0006",
    legacyCode: "LEG-006",
    distributorName: "Zeta MedCare Distributors",
    distributorStatus: "Inactive",
    zoneId: "zone-001",
    regionId: "reg-006",
    distributorTypeId: "dtype-001",
  },
};

// ── Props ────────────────────────────────────────────────────────────────────
interface DistributorFormProps {
  mode: "add" | "update";
  distributorId?: string;
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function DistributorForm({ mode, distributorId }: DistributorFormProps) {
  const router = useRouter();
  const isUpdateMode = mode === "update";

  // Form state
  const [pulseCode, setPulseCode] = useState("");
  const [legacyCode, setLegacyCode] = useState("");
  const [distributorName, setDistributorName] = useState("");
  const [status, setStatus] = useState<"Active" | "Inactive">("Active");
  const [selectedZoneId, setSelectedZoneId] = useState("");
  const [selectedRegionId, setSelectedRegionId] = useState("");
  const [selectedTypeId, setSelectedTypeId] = useState("");

  // UI state
  const [loading, setLoading] = useState(false);
  const [fetchingData, setFetchingData] = useState(false);
  const [isDiscardModalOpen, setIsDiscardModalOpen] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // ── Load existing data in update mode ─────────────────────────────────────
  useEffect(() => {
    if (isUpdateMode && distributorId) {
      setFetchingData(true);
      // Simulate API fetch with a short delay
      const timeout = setTimeout(() => {
        const existing = DUMMY_DISTRIBUTORS[distributorId];
        if (existing) {
          setPulseCode(existing.pulseCode || "");
          setLegacyCode(existing.legacyCode || "");
          setDistributorName(existing.distributorName || "");
          setStatus(existing.distributorStatus === "Inactive" ? "Inactive" : "Active");
          setSelectedZoneId(existing.zoneId || "");
          setSelectedRegionId(existing.regionId || "");
          setSelectedTypeId(existing.distributorTypeId || "");
        }
        setFetchingData(false);
      }, 600);
      return () => clearTimeout(timeout);
    }
  }, [isUpdateMode, distributorId]);

  // ── Helpers ───────────────────────────────────────────────────────────────
  const getError = (field: string) => validationErrors[field] || "";
  const clearError = (field: string) => {
    if (validationErrors[field]) {
      setValidationErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  // ── Validation ────────────────────────────────────────────────────────────
  const validate = (): boolean => {
    const errors: Record<string, string> = {};
    if (!distributorName.trim()) errors.distributorName = "Distributor name is required";
    if (!selectedZoneId) errors.zoneId = "Zone is required";
    if (!selectedRegionId) errors.regionId = "Region is required";
    if (!selectedTypeId) errors.distributorTypeId = "Distributor type is required";
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // ── Submit ────────────────────────────────────────────────────────────────
  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);
    // Simulate API call
    await new Promise((res) => setTimeout(res, 800));
    setLoading(false);

    const msg = isUpdateMode
      ? "Distributor updated successfully!"
      : "Distributor added successfully!";
    toast.success(msg);
    router.push("/dashboard/Distributors-Management");
  };

  const handleDiscard = () => setIsDiscardModalOpen(true);
  const confirmDiscard = () => {
    setIsDiscardModalOpen(false);
    router.push("/dashboard/Distributors-Management");
  };

  // ── Loading state (update mode) ───────────────────────────────────────────
  if (isUpdateMode && fetchingData) {
    return (
      <div className="bg-(--gray-0) flex items-center justify-center min-h-[400px]">
        <div className="bg-(--background) rounded-8 shadow-soft p-12 flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 animate-spin text-(--primary)" />
          <p className="t-lg">Loading distributor data...</p>
        </div>
      </div>
    );
  }

  const buttonText = isUpdateMode
    ? loading
      ? "Updating..."
      : "Update Distributor"
    : loading
      ? "Adding..."
      : "Add Distributor";

  return (
    <div className="bg-(--gray-0)">
      <div className="bg-(--background) rounded-8 shadow-soft p-8 space-y-10">
        {/* ── Section: Basic Info ──────────────────────────────────────── */}
        <div className="space-y-6">
          <h2 className="t-h2">Basic Info</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Pulse Code */}
            <FormInput
              label="Pulse Code"
              name="pulseCode"
              value={isUpdateMode ? pulseCode : "Auto-generated"}
              onChange={() => {}}
              placeholder="Auto-generated"
              readOnly
            />
            {/* Legacy Code */}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Distributor Name */}
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
            {/* Status Toggle */}
            <div className="flex flex-col gap-2 justify-end">
              <StatusToggle status={status} onChange={setStatus} />
            </div>
          </div>
        </div>

        {/* ── Section: Assignment ──────────────────────────────────────── */}
        <div className="space-y-6">
          <h2 className="t-h2">Assignment</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Zone */}
            <FormSelect
              label="Zone"
              name="zoneId"
              value={selectedZoneId}
              onChange={(v) => {
                setSelectedZoneId(v);
                clearError("zoneId");
              }}
              options={DUMMY_ZONES}
              placeholder="Select zone"
              error={getError("zoneId")}
            />
            {/* Region */}
            <FormSelect
              label="Region"
              name="regionId"
              value={selectedRegionId}
              onChange={(v) => {
                setSelectedRegionId(v);
                clearError("regionId");
              }}
              options={DUMMY_REGIONS}
              placeholder="Select region"
              error={getError("regionId")}
            />
            {/* Distributor Type */}
            <FormSelect
              label="Distributor Type"
              name="distributorTypeId"
              value={selectedTypeId}
              onChange={(v) => {
                setSelectedTypeId(v);
                clearError("distributorTypeId");
              }}
              options={DUMMY_DISTRIBUTOR_TYPES}
              placeholder="Select type"
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
            disabled={loading}
            loading={loading}
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

      {/* Discard Confirm Modal */}
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
