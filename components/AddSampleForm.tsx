"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { ProfileImageUpload, FormInput } from "@/components/form";
import { Button } from "@/components/ui/button/button";
import { ConfirmModal } from "./shared/confirm-modal";

export default function AddSampleForm() {
  const router = useRouter();
  const [image, setImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isDiscardModalOpen, setIsDiscardModalOpen] = useState(false);
  const [sampleName, setSampleName] = useState("");
  const [brandName, setBrandName] = useState("");
  const [strength, setStrength] = useState("");
  const [dosageForm, setDosageForm] = useState("");
  const [sampleQty, setSampleQty] = useState("");
  const [thresholdValue, setThresholdValue] = useState("");
  const [description, setDescription] = useState("");

  const handleImageChange = (file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setImageFile(file);
      };
      reader.readAsDataURL(file);
    } else {
      setImage(null);
      setImageFile(null);
    }
  };

  const handleDiscard = () => {
    setIsDiscardModalOpen(true);
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Side - Image Upload */}
        <div className="space-y-6">
          <ProfileImageUpload imagePreview={image} onImageChange={handleImageChange} />
          {/* Small Thumbnail */}
          <div className="w-20 h-20 bg-(--gray-2) border-2 border-dashed border-(--gray-3) rounded-8" />
        </div>

        {/* Right Side - Form Fields */}
        <div className="md:col-span-2 space-y-6">
          {/* Row 1 */}
          <div className="grid grid-cols-3 gap-4">
            <FormInput
              label="Sample Name"
              name="sampleName"
              type="text"
              value={sampleName}
              onChange={setSampleName}
              placeholder="Enter sample name"
            />
            <FormInput
              label="Brand Name"
              name="brandName"
              type="text"
              value={brandName}
              onChange={setBrandName}
              placeholder="Enter brand name"
            />
            <FormInput
              label="Strength"
              name="strength"
              type="text"
              value={strength}
              onChange={setStrength}
              placeholder="Enter strength"
            />
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-3 gap-4">
            <FormInput
              label="Dosage Form"
              name="dosageForm"
              type="text"
              value={dosageForm}
              onChange={setDosageForm}
              placeholder="Enter dosage form"
            />
            <FormInput
              label="Sample QTY"
              name="sampleQty"
              type="number"
              value={sampleQty}
              onChange={setSampleQty}
              placeholder="Enter sample quantity"
            />
            <FormInput
              label="Threshold Value"
              name="thresholdValue"
              type="number"
              value={thresholdValue}
              onChange={setThresholdValue}
              placeholder="Enter threshold value"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block t-label mb-1">Sample Description</label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description..."
              className="w-full px-4 py-3 border border-(--gray-3) rounded-8 focus:ring-2 focus:ring-(--primary) focus:border-transparent outline-none transition resize-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-6">
            <Button variant="outline" size="lg" rounded="full" onClick={handleDiscard}>
              Discard
            </Button>
            <Button variant="primary" size="lg" icon={Plus} rounded="full">
              Add Sample
            </Button>
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={isDiscardModalOpen}
        onClose={() => setIsDiscardModalOpen(false)}
        onConfirm={() => {
          setIsDiscardModalOpen(false);
          router.back();
        }}
        title="Discard changes?"
        description="You will lose all unsaved changes for this sample."
        confirmLabel="Discard"
      />
    </div>
  );
}
