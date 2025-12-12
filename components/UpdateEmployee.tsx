"use client";

import React, { useState, useRef } from "react";
import { Plus, Upload, X } from "lucide-react";
import Image from "next/image";

export default function AddEmployeeForm() {
  const [status, setStatus] = useState<"Active" | "Inactive">("Active");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => fileInputRef.current?.click();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Optional: Size check (5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should be less than 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className=" bg-gray-50">
      <div className="bg-white rounded-2xl shadow-lg p-8 space-y-10">
        {/* Section: Basic Info */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Basic Info</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left: Profile Image Upload */}
            <div className="space-y-6">
              {/* Main Image Upload Box */}
              <div className="relative">
                <div
                  onClick={handleImageClick}
                  className="relative w-full h-96 bg-gray-100 border-2 border-dashed border-gray-300 rounded-3xl cursor-pointer overflow-hidden group hover:border-gray-400 transition-all"
                >
                  {imagePreview ? (
                    <>
                      <Image
                        src={imagePreview}
                        alt="Employee Profile"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <button
                        onClick={removeImage}
                        className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-700 p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-white shadow-lg"
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-gray-400 px-8">
                      <Upload className="w-16 h-16 mb-4" />
                      <p className="text-lg font-medium">Click to upload image</p>
                      <p className="text-sm">PNG, JPG up to 5MB</p>
                    </div>
                  )}
                </div>

                {/* Hidden File Input - Inside the upload area */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/jpg"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>

              {/* Optional: Small Thumbnails (if needed later) */}
              {/* <div className="flex gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-24 h-24 bg-gray-200 border-2 border-dashed rounded-xl" />
                ))}
              </div> */}
            </div>

            {/* Right: Form Fields */}
            <div className="md:col-span-2 space-y-6">
              {/* Row 1: Pulse Code, Legacy Code, Status */}
              <div className="grid grid-cols-3 gap-4 items-center">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Pulse Code*</label>
                  <input
                    type="text"
                    placeholder="PLS_EMP_000152"
                    className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Legacy code*</label>
                  <input
                    type="text"
                    placeholder="000152"
                    className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                </div>
                <div className="flex items-end justify-end pb-2">
                  <div className="inline-flex border border-gray-300 rounded-full p-1 bg-gray-50 overflow-hidden">
                    <button
                      onClick={() => setStatus("Active")}
                      className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                        status === "Active"
                          ? "bg-blue-600 text-white"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      Active
                    </button>
                    <button
                      onClick={() => setStatus("Inactive")}
                      className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                        status === "Inactive"
                          ? "bg-blue-600 text-white"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      Inactive
                    </button>
                  </div>
                </div>
              </div>

              {/* Names */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">First Name*</label>
                  <input
                    type="text"
                    placeholder="First Name"
                    className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Middle Name</label>
                  <input
                    type="text"
                    placeholder="Middle Name"
                    className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Last Name*</label>
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Email, Phone, DOB */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email Address*</label>
                  <input
                    type="email"
                    placeholder="e.g. abc123@gmail.com"
                    className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone Number*</label>
                  <input
                    type="tel"
                    placeholder="e.g. +92345678910"
                    className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                  <input
                    type="date"
                    className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Full Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Address</label>
                <input
                  type="text"
                  placeholder="e.g. B121, Block-2, Gulshan-e-Iqbal, Karachi, Pakistan"
                  className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Assign Role */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Assign Role</h2>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-medium text-gray-700">Select Role*</label>
              <select className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white">
                <option>Sales Representative</option>
                <option>Team Lead</option>
                <option>Manager</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Select Line Manager</label>
              <select className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white">
                <option>Sales Representative</option>
                <option>Sara Ali</option>
                <option>Usman Malik</option>
              </select>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 pt-6">
          <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition">
            Discard
          </button>
          <button className="px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition flex items-center gap-2 shadow-lg">
            <Plus className="w-5 h-5" />
            Add Employee
          </button>
        </div>
      </div>
    </div>
  );
}
