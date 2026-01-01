"use client";

import React, { useState, useEffect, useRef } from "react";
import { Plus, X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store";
import { createGiveaway, resetGiveawayState } from "@/store/slices/giveaway/createGiveawaySlice";
import { getAllGiveaways } from "@/store/slices/giveaway/getAllGiveawaysSlice";
import {
  generatePrefix,
  resetGeneratePrefixState,
} from "@/store/slices/preFix/generatePrefixSlice";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { giveawayCreationSchema } from "@/validations/giveawayValidation";
import { ProfileImageUpload, FormInput, FormSelect, StatusToggle } from "@/components/form";
import { Button } from "@/components/ui/button/button";

export default function AddGiveawayForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  // Redux state
  const {
    generatedPrefix,
    loading: prefixLoading,
    error: prefixError,
  } = useAppSelector((state) => state.generatePrefix);
  const {
    loading: createLoading,
    success,
    error: createError,
    message,
  } = useAppSelector((state) => state.createGiveaway);

  // Form state
  const [image, setImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [units, setUnits] = useState(1);
  const [legacyCode, setLegacyCode] = useState("");

  // Validation errors state
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // Generate prefix on mount
  useEffect(() => {
    dispatch(generatePrefix({ entity: "Giveaway" }));

    return () => {
      dispatch(resetGeneratePrefixState());
      dispatch(resetGiveawayState());
    };
  }, [dispatch]);

  // Handle image change from ProfileImageUpload
  const handleImageChange = (imageData: string | null) => {
    setImage(imageData);
    if (imageData && imageData.startsWith("data:image")) {
      fetch(imageData)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], "giveaway-image.png", { type: blob.type });
          setImageFile(file);
        });
    } else {
      setImageFile(null);
    }
  };

  // Handle success
  useEffect(() => {
    if (success) {
      toast.success(message || "Giveaway created successfully!");
      // Reset form
      setName("");
      setCategory("");
      setProductName("");
      setDescription("");
      setUnits(1);
      setLegacyCode("");
      setImage(null);
      setImageFile(null);
      setValidationErrors({});

      // Refresh giveaways list
      dispatch(getAllGiveaways());

      // Generate new prefix for next entry
      dispatch(generatePrefix({ entity: "Giveaway" }));

      // Reset state after delay
      setTimeout(() => {
        dispatch(resetGiveawayState());
      }, 2000);
    }
  }, [success, message, dispatch]);

  // Handle error
  useEffect(() => {
    if (createError) {
      toast.error(createError);
    }
  }, [createError]);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Prepare form data for validation
    const formData = {
      name,
      category,
      productName,
      description,
      units,
      pulseCode: generatedPrefix || "",
      legacyCode,
      imageUrl: image || "",
    };

    // Validate using Zod schema
    const validation = giveawayCreationSchema.safeParse(formData);

    if (!validation.success) {
      // Create an errors object mapping field names to error messages
      const errors: Record<string, string> = {};
      validation.error.errors.forEach((err) => {
        const fieldName = err.path[0] as string;
        if (!errors[fieldName]) {
          errors[fieldName] = err.message;
        }
      });

      // Set validation errors to display inline
      setValidationErrors(errors);

      // Also show the first error as a toast for immediate feedback
      const firstError = validation.error.errors[0];
      toast.error(firstError.message);
      return;
    }

    // Clear any previous validation errors
    setValidationErrors({});

    // Use validated and transformed data
    const validatedData = validation.data;

    // Create giveaway
    dispatch(
      createGiveaway({
        name: validatedData.name,
        category: validatedData.category || null,
        productName: validatedData.productName || null,
        imageUrl: validatedData.imageUrl || null,
        description: validatedData.description || null,
        units: validatedData.units,
        pulseCode: validatedData.pulseCode,
        legacyCode: validatedData.legacyCode || validatedData.pulseCode,
      })
    );
  };

  const handleDiscard = () => {
    setName("");
    setCategory("");
    setProductName("");
    setDescription("");
    setUnits(1);
    setLegacyCode("");
    setImage(null);
    setImageFile(null);
    setValidationErrors({});
  };

  return (
    <div className="p-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left: Image Upload */}
        <div className="space-y-6">
          <ProfileImageUpload imagePreview={image} onImageChange={handleImageChange} />
          {/* Small Thumbnail */}
          <div className="w-20 h-20 bg-(--gray-2) border-2 border-dashed border-(--gray-3) rounded-xl " />
        </div>

        {/* Right: Form Fields */}
        <div className="lg:col-span-2 space-y-7">
          {/* Pulse Code and Legacy Code Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              label="Pulse Code"
              name="pulseCode"
              type="text"
              value={generatedPrefix || ""}
              onChange={() => {}}
              placeholder={prefixLoading ? "Generating..." : "PLS_GIV_000001"}
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
            <label className="block text-sm font-medium text-(--gray-7) mb-2">
              Sample Description
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Pain reliever tablet"
              className={`w-full px-5 py-3.5 border rounded-xl outline-none transition resize-none ${
                validationErrors.description
                  ? "border-(--destructive) focus:ring-2 focus:ring-(--destructive)"
                  : "border-(--gray-3) focus:ring-2 focus:ring-(--primary)"
              }`}
            />
            {validationErrors.description && (
              <p className="mt-1 text-sm text-(--destructive)">{validationErrors.description}</p>
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
              icon={Plus}
              rounded="full"
              onClick={handleSubmit}
              loading={createLoading || prefixLoading}
            >
              {createLoading ? "Adding..." : "Add Giveaway"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
