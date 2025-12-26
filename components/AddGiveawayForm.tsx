"use client";

import React, { useState, useRef, useEffect } from "react";
import { Upload, X, Plus } from "lucide-react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/store";
import { createGiveaway, resetGiveawayState } from "@/store/slices/giveaway/createGiveawaySlice";
import { getAllGiveaways } from "@/store/slices/giveaway/getAllGiveawaysSlice";
import {
  generatePrefix,
  resetGeneratePrefixState,
} from "@/store/slices/preFix/generatePrefixSlice";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

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
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [units, setUnits] = useState(1);
  const [legacyCode, setLegacyCode] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Generate prefix on mount
  useEffect(() => {
    dispatch(generatePrefix({ entity: "Giveaway" }));

    return () => {
      dispatch(resetGeneratePrefixState());
      dispatch(resetGiveawayState());
    };
  }, [dispatch]);

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
      if (fileInputRef.current) fileInputRef.current.value = "";

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

  const handleImageClick = () => fileInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Size check (5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Validation
    if (!name.trim()) {
      toast.error("Item name is required");
      return;
    }

    if (!category.trim()) {
      toast.error("Item category is required");
      return;
    }

    if (!generatedPrefix) {
      toast.error("Pulse code is not generated yet. Please wait.");
      return;
    }

    // Create giveaway - empty strings will be converted to null, then to "N/A" in the slice
    dispatch(
      createGiveaway({
        name: name.trim(),
        category: category.trim() || null,
        productName: productName.trim() || null,
        imageUrl: image || null,
        description: description.trim() || null,
        units,
        pulseCode: generatedPrefix,
        legacyCode: legacyCode.trim() || generatedPrefix, // Use pulse code if legacy code is empty
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
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="p-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left: Image Upload */}
        <div className="space-y-6">
          {/* Main Image */}
          <div
            onClick={handleImageClick}
            className="relative w-full h-92 bg-gray-200 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer overflow-hidden group hover:border-gray-400 transition-all"
          >
            {image ? (
              <div className="relative w-full h-full">
                <Image src={image} alt="Giveaway" fill className="object-cover" />
                <button
                  onClick={removeImage}
                  className="absolute top-4 right-4 bg-red-500 text-white p-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 shadow-lg cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <Upload className="w-14 h-14 mb-4" />
                <p className="text-base font-medium">Click to upload image</p>
                <p className="text-sm">or drag and drop</p>
              </div>
            )}
          </div>

          {/* Small Thumbnail */}
          <div className="w-20 h-20 bg-gray-200 border-2 border-dashed border-gray-300 rounded-xl " />
        </div>

        {/* Right: Form Fields */}
        <div className="lg:col-span-2 space-y-7">
          {/* Pulse Code and Legacy Code Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Pulse Code</label>
              <input
                type="text"
                value={generatedPrefix || ""}
                placeholder={prefixLoading ? "Generating..." : "PLS_GIV_000001"}
                readOnly
                className="w-full px-5 py-3.5 border border-gray-300 rounded-xl bg-gray-50 text-gray-700 cursor-not-allowed outline-none"
                title={prefixError || "Auto-generated pulse code (read-only)"}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Legacy Code</label>
              <input
                type="text"
                value={legacyCode}
                onChange={(e) => setLegacyCode(e.target.value)}
                placeholder="Optional legacy code"
                className="w-full px-5 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
              />
            </div>
          </div>

          {/* Row 2: Item Name and Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Item Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Pen, Diary"
                className="w-full px-5 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Item Category <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Gift / Sample / Promotional Material"
                className="w-full px-5 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
              />
            </div>
          </div>

          {/* Row 3: Product Name and Units */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Brand / Product Linked To
              </label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Panadol"
                className="w-full px-5 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Units <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min="1"
                value={units}
                onChange={(e) => setUnits(parseInt(e.target.value) || 1)}
                placeholder="1"
                className="w-full px-5 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sample Description
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Pain reliever tablet"
              className="w-full px-5 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition resize-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-8">
            <button
              type="button"
              onClick={handleDiscard}
              className="px-8 py-3.5 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition font-medium cursor-pointer"
            >
              Discard
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={createLoading || prefixLoading}
              className={`px-10 py-3.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition font-medium flex items-center gap-3 shadow-lg cursor-pointer ${
                createLoading || prefixLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <Plus className="w-5 h-5" />
              {createLoading ? "Adding..." : "Add Giveaway"}
            </button>
          </div>
        </div>
      </div>

      {/* Hidden Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
