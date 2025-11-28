"use client";

import React, { useState, useRef } from "react";
import { Upload, X, Plus } from "lucide-react";
import Image from "next/image";

export default function AddProductForm() {
  const [image, setImage] = useState<string | null>(null);
  const [skus, setSkus] = useState<string[]>([""]); // Start with one empty SKU
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

  const addSkuField = () => {
    setSkus([...skus, ""]);
  };

  const updateSku = (index: number, value: string) => {
    const updated = [...skus];
    updated[index] = value;
    setSkus(updated);
  };

  const removeSku = (index: number) => {
    setSkus(skus.filter((_, i) => i !== index));
  };

  return (
    <div className=" p-7 ">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left: Image Upload */}
        <div className="space-y-6">
          <div
            onClick={handleImageClick}
            className="relative w-full h-80 bg-gray-200 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer overflow-hidden group hover:border-gray-400 transition-all"
          >
            {image ? (
              <div className="relative w-full h-full">
                <Image src={image} alt="Product" fill className="object-cover" />
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
          <div className="w-20 h-20 bg-gray-200 border-2 border-dashed border-gray-300 rounded-xl" />
        </div>

        {/* Right: Form Fields */}
        <div className="lg:col-span-2 space-y-8">
          {/* Product Category & Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Category <span className="text-red-500">*</span>
              </label>
              <select className="w-full px-5 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition bg-white">
                <option>e.g. Doctor, Heart Specialist, etc...</option>
                <option>Cardiology</option>
                <option>Neurology</option>
                <option>General Medicine</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. john doe"
                className="w-full px-5 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
              />
            </div>
          </div>

          {/* Add Brand SKUs */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Add Product SKU <span className="text-red-500">*</span>
            </label>
            <div className="w-full flex items-center ">
              {skus.map((sku, index) => (
                <div key={index} className="flex w-full items-center gap-3">
                  <input
                    type="text"
                    value={sku}
                    onChange={(e) => updateSku(index, e.target.value)}
                    placeholder="e.g. Capsule 500Mg"
                    className=" px-5 py-3.5 w-[63%]  border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
                  />
                  {skus.length > 1 && (
                    <button
                      onClick={() => removeSku(index)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}

              <button
                onClick={addSkuField}
                className="mt-4 px-6 py-3 w-60  bg-blue-600 text-white rounded-full hover:bg-blue-700 transition flex flex-start items-center gap-2 text-sm font-medium shadow-md"
              >
                <Plus className="w-4 h-4" />
                Add Brand SKUs
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 mt-40">
            <button className="px-8 py-3.5 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition font-medium">
              Discard
            </button>
            <button className="px-10 py-3.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition font-medium flex items-center gap-3 shadow-lg">
              <Plus className="w-5 h-5" />
              Add Product
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
