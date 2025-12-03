"use client";

import React, { useState } from "react";
import {
  Trash2,
  Plus,
  Calendar as CalendarIcon,
  ChevronDown,
  X,
  User,
  Lock,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function AddEmployeeForm() {
  // Date of Birth State
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  // Supervisor State
  const [showSupervisorDropdown, setShowSupervisorDropdown] = useState(false);
  const [selectedSupervisor, setSelectedSupervisor] = useState<any>(null);

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    // Optional: reset file input
    const input = document.getElementById("image-upload") as HTMLInputElement;
    if (input) input.value = "";
  };

  const supervisorsList = [
    { id: "1", name: "Ahmed Khan", initials: "AK" },
    { id: "2", name: "Sara Ali", initials: "SA" },
    { id: "3", name: "Omar Farooq", initials: "OF" },
    { id: "4", name: "Fatima Riaz", initials: "FR" },
    { id: "5", name: "Ali Raza", initials: "AR" },
  ];

  // Simple calendar logic (September 2025 example)
  const monthYear = "September 2025";
  const daysInMonth = 30;
  const firstDayOffset = 1; // 1 Sept 2025 = Monday → offset 1

  return (
    <>
      <div className="text-black  bg-gray-50 -mt-8 ">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-8 space-y-10">
            {/* Basic Info */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Basic Info</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Pulse Generated Code */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pulse Generated Code
                  </label>
                  <p className="border border-gray-200 rounded-md p-2 bg-gray-50 font-medium">
                    KI-O97gdh3B-NJS
                  </p>
                </div>

                {/* Employee Legacy Code */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Employee Legacy Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Legacy Code"
                  />
                </div>

                {/* First Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="First Name"
                  />
                </div>

                {/* Middle Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Middle Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="Middle Name"
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="Last Name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="employee@company.com"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <input
                      type="tel"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="+92-3456789000"
                    />
                  </div>
                </div>

                {/* Date of Birth - Click pe Calendar */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date Of Birth
                  </label>
                  <div className="relative">
                    <CalendarIcon className="absolute left-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
                    <input
                      type="text"
                      readOnly
                      value={selectedDate}
                      onClick={() => setShowCalendar(!showCalendar)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg cursor-pointer bg-white focus:ring-2 focus:ring-blue-500"
                      placeholder="Select date of birth"
                    />
                  </div>

                  {/* Calendar Popup */}
                  {showCalendar && (
                    <div className="absolute top-full mt-2 left-0 bg-white border border-gray-300 rounded-lg shadow-xl z-50 p-4 w-72">
                      <div className="text-center font-medium text-gray-800 mb-3">{monthYear}</div>
                      <div className="grid grid-cols-7 gap-1 text-xs font-medium text-gray-600 mb-2">
                        <div>S</div>
                        <div>M</div>
                        <div>T</div>
                        <div>W</div>
                        <div>T</div>
                        <div>F</div>
                        <div>S</div>
                      </div>
                      <div className="grid grid-cols-7 gap-1 text-sm">
                        {Array.from({ length: firstDayOffset }, (_, i) => (
                          <div key={`empty-${i}`} />
                        ))}
                        {Array.from({ length: daysInMonth }, (_, i) => {
                          const day = i + 1;
                          return (
                            <button
                              key={day}
                              onClick={() => {
                                setSelectedDate(`${day} September 2025`);
                                setShowCalendar(false);
                              }}
                              className="w-9 h-9 rounded-lg hover:bg-blue-100 hover:text-blue-600 transition"
                            >
                              {day}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <textarea
                      rows={1}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg resize-none"
                      placeholder="e.g. H031, Block-2, Gulistan-e-Jauhar, Karachi"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Assign Role & Territory */}
            <div className="space-y-8">
              <h3 className="text-xl font-semibold text-gray-900">Assign Role & Territory</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Role */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-700 focus:ring-2 focus:ring-blue-500">
                    <option>Sales Representative</option>
                    <option>Manager</option>
                    <option>Admin</option>
                  </select>
                </div>

                {/* Supervisor - With Image Preview */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Supervisor</label>

                  {/* Dropdown Trigger */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setShowSupervisorDropdown(!showSupervisorDropdown)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl text-left flex items-center justify-between bg-white hover:bg-gray-50 transition"
                    >
                      <span className={selectedSupervisor ? "text-gray-900" : "text-gray-500"}>
                        {selectedSupervisor ? selectedSupervisor.name : "Select Line Manager"}
                      </span>
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    </button>

                    {/* Dropdown List */}
                    {showSupervisorDropdown && (
                      <div className="absolute top-full mt-2 w-full bg-white border border-gray-300 rounded-xl shadow-lg z-50 max-h-64 overflow-y-auto">
                        {supervisorsList.map((sup) => (
                          <button
                            key={sup.id}
                            onClick={() => {
                              setSelectedSupervisor(sup);
                              setShowSupervisorDropdown(false);
                            }}
                            className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition text-left"
                          >
                            <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-medium">
                              {sup.initials}
                            </div>
                            <span>{sup.name}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Selected Supervisor Preview Card */}
                  {selectedSupervisor && (
                    <div className="mt-4 flex items-center gap-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
                      <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg font-semibold">
                        {selectedSupervisor.initials}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{selectedSupervisor.name}</p>
                        <p className="text-sm text-blue-600">Line Manager</p>
                      </div>
                      <button
                        onClick={() => setSelectedSupervisor(null)}
                        className="text-gray-500 hover:text-red-600 transition"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Employee pic</p>

                  <div className="border border-gray-200 rounded-lg p-2 mt-3 text-center">
                    {/* Hidden File Input */}
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />

                    {/* Image Preview or Upload Area */}
                    <label htmlFor="image-upload" className="cursor-pointer block">
                      {imagePreview ? (
                        <div className="relative ">
                          <img
                            src={imagePreview}
                            alt="Employee"
                            className="w-15 h-15 rounded-sm object-cover border-4 border-gray-100 shadow-sm"
                          />
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeImage();
                            }}
                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1.5 shadow-lg hover:bg-red-600 transition"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="items-center ">
                          <div className="w-15 h-15 rounded-sm bg-gray-100 border-2 border-dashed border-gray-300 "></div>
                        </div>
                      )}
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 pt-8 ">
              <button className="px-6 py-3 border border-blue-600 text-blue-600 font-medium rounded-xl hover:bg-blue-50 transition-colors">
                Discard
              </button>
              <button className="px-8 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Add Employee
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
