"use client";

import React, { useState, useRef } from "react";
import { Upload, X } from "lucide-react";
import Image from "next/image";

export default function AddSampleForm() {
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Click on image box → trigger file input
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove image
  const removeImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Side - Image Upload */}
        <div className="space-y-6">
          {/* Main Image Box */}
          <div
            onClick={handleImageClick}
            className="relative w-full h-86 bg-(--gray-2) border-2 border-dashed border-(--gray-3) rounded-2xl cursor-pointer overflow-hidden group hover:border-(--gray-4) transition-colors"
          >
            {image ? (
              <div className="relative w-full h-full">
                <Image src={image} alt="Sample" fill className="object-cover" />
                <button
                  onClick={removeImage}
                  className="absolute top-3 right-3 bg-(--destructive) text-(--light) p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-(--gray-0)0">
                <Upload className="w-12 h-12 mb-3" />
                <p className="text-sm font-medium">Click to upload image</p>
                <p className="text-xs">or drag and drop</p>
              </div>
            )}
          </div>

          {/* Small Thumbnail */}
          <div className="w-20 h-20 bg-(--gray-2) border-2 border-dashed border-(--gray-3) rounded-xl" />
        </div>

        {/* Right Side - Form Fields */}
        <div className="md:col-span-2 space-y-6">
          {/* Row 1 */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-(--gray-7) mb-1">Sample Name</label>
              <input
                type="text"
                placeholder="Panadol"
                className="w-full px-4 py-3 border border-(--gray-3) rounded-xl focus:ring-2 focus:ring-(--primary) focus:border-transparent outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-(--gray-7) mb-1">Brand Name</label>
              <input
                type="text"
                placeholder="324"
                className="w-full px-4 py-3 border border-(--gray-3) rounded-xl focus:ring-2 focus:ring-(--primary) focus:border-transparent outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-(--gray-7) mb-1">Strength</label>
              <input
                type="text"
                placeholder="e.g. 500 mg, 10 ml"
                className="w-full px-4 py-3 border border-(--gray-3) rounded-xl focus:ring-2 focus:ring-(--primary) focus:border-transparent outline-none transition"
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-(--gray-7) mb-1">Dosage Form</label>
              <input
                type="text"
                placeholder="Tablet, Capsule, Syrup, Injection, etc..."
                className="w-full px-4 py-3 border border-(--gray-3) rounded-xl focus:ring-2 focus:ring-(--primary) focus:border-transparent outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-(--gray-7) mb-1">Sample QTY</label>
              <input
                type="number"
                placeholder="220"
                className="w-full px-4 py-3 border border-(--gray-3) rounded-xl focus:ring-2 focus:ring-(--primary) focus:border-transparent outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-(--gray-7) mb-1">
                Threshold Value
              </label>
              <input
                type="number"
                placeholder="25"
                className="w-full px-4 py-3 border border-(--gray-3) rounded-xl focus:ring-2 focus:ring-(--primary) focus:border-transparent outline-none transition"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-(--gray-7) mb-1">
              Sample Description
            </label>
            <textarea
              rows={4}
              placeholder="Pain reliever tablet"
              className="w-full px-4 py-3 border border-(--gray-3) rounded-xl focus:ring-2 focus:ring-(--primary) focus:border-transparent outline-none transition resize-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-6">
            <button className="px-6 py-3 border border-(--gray-3) text-(--gray-7) rounded-full hover:bg-(--gray-0) transition">
              Discard
            </button>
            <button className="px-8 py-3 bg-(--primary) text-(--light) rounded-full hover:bg-(--primar-2) transition flex items-center gap-2 shadow-soft">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add Sample
            </button>
          </div>
        </div>
      </div>

      {/* Hidden File Input */}
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
