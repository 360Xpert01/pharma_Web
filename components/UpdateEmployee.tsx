"use client";

import React, { useState, useRef } from "react";
import { Upload, X, Plus } from "lucide-react";
import Image from "next/image";

interface AddEmployeeFormProps {
  ActiveOn?: boolean; // Optional prop to control toggle visibility + default value
}

export default function AddEmployeeForm({ ActiveOn }: AddEmployeeFormProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isActive, setIsActive] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => fileInputRef.current?.click();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="w-full  bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="p-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Side: Image Upload */}
          <div className="space-y-8">
            <div>
              <div
                onClick={handleImageClick}
                className="relative w-full  aspect-square bg-gray-50 border-2 border-dashed border-gray-300 rounded-3xl cursor-pointer overflow-hidden group hover:border-gray-400 transition-all"
              >
                {imagePreview ? (
                  <div className="relative w-full h-full">
                    <Image src={imagePreview} alt="Employee" fill className="object-cover" />
                    <button
                      onClick={removeImage}
                      className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-700 p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-white shadow-lg"
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

            {/* Active Toggle */}

            <div className="flex items-center justify-center gap-4">
              <span className="text-sm font-medium text-gray-700">Status</span>
              <button
                onClick={() => setIsActive(!isActive)}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                  isActive ? "bg-blue-600" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-lg transition-transform ${
                    isActive ? "translate-x-7" : "translate-x-1"
                  }`}
                />
              </button>
              <span
                className={`text-sm font-medium ${isActive ? "text-blue-600" : "text-gray-500"}`}
              >
                {isActive ? "Active" : "Inactive"}
              </span>
            </div>
          </div>

          {/* Right Side: Form Fields */}
          <div className="lg:col-span-2 space-y-8">
            {/* Pulse & Legacy Code */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pulse Generated Code
                </label>
                <div className="px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl font-mono text-gray-900 text-center">
                  KI-O97gdh3B-NJS
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Employee Legacy Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Legacy Code"
                  className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Middle Name</label>
                <input
                  type="text"
                  placeholder="Middle Name"
                  className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  placeholder="employee@company.com"
                  className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="+92-3456789000"
                  className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date Of Birth<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Select Date of Birth"
                  className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Adress</label>
                <input
                  type="text"
                  placeholder="Adress"
                  className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            {/* Role & Supervisor */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role <span className="text-red-500">*</span>
                </label>
                <select className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white">
                  <option>Sales Representative</option>
                  <option>Manager</option>
                  <option>Admin</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Supervisor</label>
                <select className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white">
                  <option>Select Line Manager</option>
                  <option>Ahmed Khan</option>
                  <option>Sara Ali</option>
                  <option>Omar Farooq</option>
                </select>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 pt-8 border-t border-gray-200">
              <button className="px-8 py-4 border border-gray-300 text-gray-700 font-medium rounded-full hover:bg-gray-50 transition">
                Discard
              </button>
              <button className="px-10 py-4 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition flex items-center gap-3 shadow-lg">
                Update Employee
              </button>
            </div>
          </div>
        </div>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </div>
    </div>
  );
}
