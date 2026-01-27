"use client";

import React, { useState, useEffect } from "react";
import { Plus, Save } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store";
import { createGiveaway, resetGiveawayState } from "@/store/slices/giveaway/createGiveawaySlice";
// You must implement these slices:
// getGiveawayById, updateGiveaway, and updateGiveawaySlice in your store
import {
  updateGiveaway,
  resetUpdateGiveawayState,
} from "@/store/slices/giveaway/updateGiveawaySlice";
import { getGiveawayById } from "@/store/slices/giveaway/getGiveawayByIdSlice";
import {
  generatePrefix,
  resetGeneratePrefixState,
} from "@/store/slices/preFix/generatePrefixSlice";
import toast from "react-hot-toast";
import { giveawayCreationSchema } from "@/validations/giveawayValidation";
import { ProfileImageUpload, FormInput } from "@/components/form";
import { Button } from "@/components/ui/button/button";

type GiveawayFormProps = {
  mode?: "add" | "update";
  giveawayId?: string;
};

export default function GiveawayForm({ mode = "add", giveawayId }: GiveawayFormProps) {
  const dispatch = useAppDispatch();

  // Redux state
  const {
    generatedPrefix,
    loading: prefixLoading,
    error: prefixError,
  } = useAppSelector((state) => state.generatePrefix);
  const {
    loading: createLoading,
    success: createSuccess,
    error: createError,
    message: createMessage,
  } = useAppSelector((state) => state.createGiveaway);
  // For update mode
  const {
    giveaway,
    loading: fetchLoading,
    error: updateError,
    success: updateSuccess,
    message: updateMessage,
  } = useAppSelector((state) => state.updateGiveaway || {});

  // Form state
  const [image, setImage] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [units, setUnits] = useState(1);
  const [legacyCode, setLegacyCode] = useState("");
  const [pulseCode, setPulseCode] = useState("");
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // Prefetch logic
  useEffect(() => {
    if (mode === "add") {
      dispatch(generatePrefix({ entity: "Giveaway" }));
    }
    if (mode === "update" && giveawayId) {
      dispatch(getGiveawayById(giveawayId));
    }
    return () => {
      dispatch(resetGeneratePrefixState());
      dispatch(resetGiveawayState());
      if (mode === "update") dispatch(resetUpdateGiveawayState());
    };
  }, [mode, giveawayId, dispatch]);

  // Populate form in update mode
  useEffect(() => {
    if (mode === "update" && giveaway) {
      setName(giveaway.name || "");
      setCategory(giveaway.category || "");
      setProductName(giveaway.productName || "");
      setDescription(giveaway.description || "");
      setUnits(giveaway.units || 1);
      setLegacyCode(giveaway.legacyCode || "");
      setPulseCode(giveaway.pulseCode || "");
      setImage(giveaway.imageUrl || null);
    }
  }, [mode, giveaway]);

  useEffect(() => {
    if (mode === "add") {
      setPulseCode(generatedPrefix || "");
    }
  }, [generatedPrefix, mode]);

  // Feedback
  useEffect(() => {
    if (createSuccess && mode === "add") {
      toast.success(createMessage || "Giveaway created!");
      // Reset form
      setName("");
      setCategory("");
      setProductName("");
      setDescription("");
      setUnits(1);
      setLegacyCode("");
      setImage(null);
      setValidationErrors({});
      dispatch(generatePrefix({ entity: "Giveaway" }));
      setPulseCode("");
      setTimeout(() => {
        dispatch(resetGiveawayState());
      }, 2000);
    }
    if (updateSuccess && mode === "update") {
      toast.success(updateMessage || "Giveaway updated!");
      setTimeout(() => {
        dispatch(resetUpdateGiveawayState());
      }, 2000);
    }
    if (createError && mode === "add") toast.error(createError);
    if (updateError && mode === "update") toast.error(updateError);
  }, [
    createSuccess,
    updateSuccess,
    createError,
    updateError,
    createMessage,
    updateMessage,
    mode,
    dispatch,
  ]);

  // Submit
  const handleSubmit = (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (e) e.preventDefault();
    const formData = {
      name,
      category,
      productName,
      description,
      units,
      pulseCode,
      legacyCode,
      imageUrl: image || "",
    };
    const validation = giveawayCreationSchema.safeParse(formData);
    if (!validation.success) {
      const errors: Record<string, string> = {};
      validation.error.errors.forEach((err) => {
        errors[err.path[0] as string] = err.message;
      });
      setValidationErrors(errors);
      toast.error(validation.error.errors[0].message);
      return;
    }
    setValidationErrors({});
    if (mode === "add") {
      dispatch(createGiveaway(validation.data));
    } else if (mode === "update" && giveawayId) {
      dispatch(updateGiveaway({ id: giveawayId, ...validation.data }));
    }
  };

  // Discard/reset
  const handleDiscard = () => {
    setName("");
    setCategory("");
    setProductName("");
    setDescription("");
    setUnits(1);
    setLegacyCode("");
    setImage(null);
    setValidationErrors({});
    if (mode === "add") setPulseCode("");
  };

  if (fetchLoading) return <p>Loading...</p>;

  return (
    <div className="p-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Image Upload */}
        <div className="space-y-6">
          <ProfileImageUpload imagePreview={image} onImageChange={setImage} />
        </div>
        {/* Form Fields */}
        <div className="lg:col-span-2 space-y-7">
          {/* Pulse Code and Legacy Code Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              label="Pulse Code"
              name="pulseCode"
              type="text"
              value={pulseCode}
              onChange={() => {}}
              placeholder={prefixLoading ? "Generating..." : "GIV_000001"}
              readOnly
              error={prefixError || ""}
            />
            <FormInput
              label="Legacy Code"
              name="legacyCode"
              type="text"
              value={legacyCode}
              onChange={setLegacyCode}
              placeholder="Optional legacy code"
              error={validationErrors.legacyCode}
            />
          </div>
          {/* Row 2: Item Name and Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              label="Item Name"
              name="name"
              type="text"
              value={name}
              onChange={setName}
              placeholder="e.g. Pen, Diary"
              required
              error={validationErrors.name}
            />
            <FormInput
              label="Item Category"
              name="category"
              type="text"
              value={category}
              onChange={setCategory}
              placeholder="Gift / Sample / Promotional Material"
              required
              error={validationErrors.category}
            />
          </div>
          {/* Row 3: Product Name and Units */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              label="Brand / Product Linked To"
              name="productName"
              type="text"
              value={productName}
              onChange={setProductName}
              placeholder="Panadol"
              error={validationErrors.productName}
            />
            <FormInput
              label="Units"
              name="units"
              type="number"
              value={units.toString()}
              onChange={(val) => setUnits(parseInt(val) || 1)}
              placeholder="1"
              required
              error={validationErrors.units}
            />
          </div>
          {/* Description */}
          <div>
            <label className="block t-label mb-2">Sample Description</label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Pain reliever tablet"
              className={`w-full px-5 py-3.5 border rounded-8 outline-none transition resize-none ${
                validationErrors.description
                  ? "border-(--destructive) focus:ring-2 focus:ring-(--destructive)"
                  : "border-(--gray-3) focus:ring-2 focus:ring-(--primary)"
              }`}
            />
            {validationErrors.description && (
              <p className="mt-1 t-sm t-err">{validationErrors.description}</p>
            )}
          </div>
          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-8">
            <Button variant="outline" size="lg" rounded="full" onClick={handleDiscard}>
              Discard
            </Button>
            <Button
              variant="primary"
              size="lg"
              icon={mode === "add" ? Plus : Save}
              rounded="full"
              onClick={handleSubmit}
              loading={createLoading || prefixLoading || fetchLoading}
            >
              {mode === "add"
                ? createLoading
                  ? "Adding..."
                  : "Add Giveaway"
                : updateSuccess
                  ? "Updated!"
                  : "Update Giveaway"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
