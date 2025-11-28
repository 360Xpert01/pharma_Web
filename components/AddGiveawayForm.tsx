"use client";

import React, { useState, useRef } from "react";
import { Upload, X, Plus } from "lucide-react";
import Image from "next/image";

export default function AddGiveawayForm() {
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => fileInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
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
                  className="absolute top-4 right-4 bg-red-500 text-white p-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 shadow-lg"
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
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Item Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
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
                placeholder="Gift / Sample / Promotional Material"
                className="w-full px-5 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Brand / Product Linked To
              </label>
              <input
                type="text"
                placeholder="Panadol"
                className="w-full px-5 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sample QTY <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                placeholder="220"
                className="w-full px-5 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Threshold Value <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                placeholder="25"
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
              placeholder="Pain reliever tablet"
              className="w-full px-5 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition resize-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-8">
            <button className="px-8 py-3.5 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition font-medium">
              Discard
            </button>
            <button className="px-10 py-3.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition font-medium flex items-center gap-3 shadow-lg">
              <Plus className="w-5 h-5" />
              Add Giveaway
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
