"use client";

import React, { useState, useRef } from "react";
import { Upload, X, Plus } from "lucide-react";
import Image from "next/image";

export default function AddProductForm() {
  const [image, setImage] = useState<string | null>(null);
  const [skus, setSkus] = useState<string[]>(["Capsule 500mg"]);
  const [isPrescription, setIsPrescription] = useState(true);
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

  const addSkuField = () => setSkus([...skus, ""]);
  const updateSku = (index: number, value: string) => {
    const updated = [...skus];
    updated[index] = value;
    setSkus(updated);
  };
  const removeSku = (index: number) => setSkus(skus.filter((_, i) => i !== index));

  return (
    <div className="">
      <div className=" ">
        <div className="p-10 space-y-12">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
            <p className="text-sm text-gray-500 mt-2">Fill in the product details below</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left: Image Upload */}
            <div className="space-y-6">
              <div
                onClick={handleImageClick}
                className="relative w-full aspect-square max-w-sm bg-gray-100 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer overflow-hidden group hover:border-gray-400 transition-all"
              >
                {image ? (
                  <div className="relative w-full h-full">
                    <Image src={image} alt="Product" fill className="object-cover" />
                    <button
                      onClick={removeImage}
                      className="absolute top-4 right-4 bg-red-500 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-red-600 shadow-xl"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-gray-400">
                    <Upload className="w-16 h-16 mb-4" />
                    <p className="text-lg font-medium">Click to upload image</p>
                    <p className="text-sm">PNG, JPG up to 5MB</p>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Form Fields */}
            <div className="lg:col-span-2 space-y-8">
              {/* Product Codes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Pulse Generated Code */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Code (Pulse Generated)
                  </label>
                  <div className="px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl font-mono text-gray-900">
                    PROD-A7K9X2M
                  </div>
                </div>

                {/* Legacy Code */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Code (Legacy) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. MED-2025-001"
                    className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              {/* Product Name & Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Amoxicillin 500mg"
                    className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                    <option>Antibiotic</option>
                    <option>Pain Relief</option>
                    <option>Antihistamine</option>
                    <option>Diabetes</option>
                    <option>Cardiology</option>
                  </select>
                </div>
              </div>

              {/* Prescription & Formula */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Prescription Required
                  </label>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setIsPrescription(true)}
                      className={`px-6 py-3 rounded-xl font-medium transition ${
                        isPrescription ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => setIsPrescription(false)}
                      className={`px-6 py-3 rounded-xl font-medium transition ${
                        !isPrescription ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      No
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Chemical Formula
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. C₁₆H₁₉N₃O₅S"
                    className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-mono"
                  />
                </div>
              </div>

              {/* SKUs Section */}
              <div className="border-t border-gray-200 pt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  SKUs ({skus.filter((s) => s.trim()).length})
                </h3>
                <div className="space-y-4">
                  {skus.map((sku, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <input
                        type="text"
                        value={sku}
                        onChange={(e) => updateSku(index, e.target.value)}
                        placeholder="e.g. Capsule 500mg"
                        className="flex-1 px-5 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                      {skus.length > 1 && (
                        <button
                          onClick={() => removeSku(index)}
                          className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={addSkuField}
                    className="px-6 py-3 border border-dashed border-blue-400 text-blue-600 rounded-xl hover:bg-blue-50 transition flex items-center gap-2 text-sm font-medium"
                  >
                    <Plus className="w-5 h-5" />
                    Add Another SKU
                  </button>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-4 pt-8 border-t border-gray-200">
                <button className="px-8 py-4 border border-gray-300 text-gray-700 font-medium rounded-full hover:bg-gray-50 transition">
                  Discard
                </button>
                <button className="px-10 py-4 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition flex items-center gap-3 shadow-lg">
                  <Plus className="w-5 h-5" />
                  Add Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

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
