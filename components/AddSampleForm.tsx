"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import { ProfileImageUpload, FormInput } from "@/components/form";
import { Button } from "@/components/ui/button/button";

export default function AddSampleForm() {
  const [image, setImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [sampleName, setSampleName] = useState("");
  const [brandName, setBrandName] = useState("");
  const [strength, setStrength] = useState("");
  const [dosageForm, setDosageForm] = useState("");
  const [sampleQty, setSampleQty] = useState("");
  const [thresholdValue, setThresholdValue] = useState("");
  const [description, setDescription] = useState("");

  const handleImageChange = (imageData: string | null) => {
    setImage(imageData);
    if (imageData && imageData.startsWith("data:image")) {
      fetch(imageData)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], "sample-image.png", { type: blob.type });
          setImageFile(file);
        });
    } else {
      setImageFile(null);
    }
  };

  const handleDiscard = () => {
    setImage(null);
    setImageFile(null);
    setSampleName("");
    setBrandName("");
    setStrength("");
    setDosageForm("");
    setSampleQty("");
    setThresholdValue("");
    setDescription("");
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
              placeholder="Panadol"
            />
            <FormInput
              label="Brand Name"
              name="brandName"
              type="text"
              value={brandName}
              onChange={setBrandName}
              placeholder="324"
            />
            <FormInput
              label="Strength"
              name="strength"
              type="text"
              value={strength}
              onChange={setStrength}
              placeholder="e.g. 500 mg, 10 ml"
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
              placeholder="Tablet, Capsule, Syrup, Injection, etc..."
            />
            <FormInput
              label="Sample QTY"
              name="sampleQty"
              type="number"
              value={sampleQty}
              onChange={setSampleQty}
              placeholder="220"
            />
            <FormInput
              label="Threshold Value"
              name="thresholdValue"
              type="number"
              value={thresholdValue}
              onChange={setThresholdValue}
              placeholder="25"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-(--gray-7) mb-1">
              Sample Description
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Pain reliever tablet"
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
    </div>
  );
}
