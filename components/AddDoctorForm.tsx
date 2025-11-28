"use client";

import React, { useState } from "react";
import { Trash2, Plus } from "lucide-react";

interface Location {
  id: string;
  city: string;
  country: string;
  area: string;
  bricks: string;
  clinicName: string;
  visitingDays: string;
  visitingHours: string;
}

export default function AddDoctorForm() {
  const [locations, setLocations] = useState<Location[]>([
    {
      id: "1",
      city: "",
      country: "",
      area: "",
      bricks: "",
      clinicName: "",
      visitingDays: "Monday - Friday",
      visitingHours: "10:00 PM - 10:00 AM",
    },
  ]);

  const addLocation = () => {
    setLocations([
      ...locations,
      {
        id: Date.now().toString(),
        city: "",
        country: "",
        area: "",
        bricks: "",
        clinicName: "",
        visitingDays: "Monday - Friday",
        visitingHours: "10:00 PM - 10:00 AM",
      },
    ]);
  };

  const removeLocation = (id: string) => {
    if (locations.length > 1) {
      setLocations(locations.filter((loc) => loc.id !== id));
    }
  };

  return (
    <div className=" bg-white rounded-xl  p-9 ">
      {/* Header */}
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Basic Info</h2>

      {/* Basic Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            User name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. john doe"
            className="w-full px-5 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Specialization <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Cardiologist"
            className="w-full px-5 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            placeholder="e.g. abc123@gmail.com"
            className="w-full px-5 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status <span className="text-red-500">*</span>
          </label>
          <select className="w-full px-5 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-white">
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contact number <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. +92345678910"
            className="w-full px-5 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            License number <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. SA-25615-EETG"
            className="w-full px-5 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date Of Birth <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            placeholder="e.g. 5/10/2001"
            className="w-full px-5 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>

      {/* Location Section */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Location</h2>
        <button
          onClick={addLocation}
          className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition flex items-center gap-2 shadow-md font-medium"
        >
          <Plus className="w-5 h-5" />
          Add New Location
        </button>
      </div>

      {/* Locations */}
      <div className="space-y-16">
        {locations.map((location, index) => (
          <div key={location.id} className="relative mt-6">
            {/* Location Title */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Location {index + 1}</h3>
              {locations.length > 1 && (
                <button
                  onClick={() => removeLocation(location.id)}
                  className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City <span className="text-red-500">*</span>
                </label>
                <select className="w-full px-5 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                  <option>Select your region</option>
                  <option>Karachi</option>
                  <option>Lahore</option>
                  <option>Islamabad</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country <span className="text-red-500">*</span>
                </label>
                <select className="w-full px-5 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                  <option>Enter your country</option>
                  <option>Pakistan</option>
                  <option>India</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Area <span className="text-red-500">*</span>
                </label>
                <select className="w-full px-5 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                  <option>Enter your Area</option>
                  <option>North Nazimabad</option>
                  <option>Gulshan-e-Iqbal</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bricks <span className="text-red-500">*</span>
                </label>
                <select className="w-full px-5 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                  <option>Enter your bricks</option>
                  <option>Brick A-12</option>
                  <option>Brick B-05</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Clinic name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. SA-25615-EETG"
                  className="w-full px-5 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Visiting days <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={location.visitingDays}
                  readOnly
                  className="w-full px-5 py-3.5 border border-gray-300 rounded-xl bg-gray-100 text-gray-600"
                />
              </div>

              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Visiting Hours <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={location.visitingHours}
                  readOnly
                  className="w-full px-5 py-3.5 border border-gray-300 rounded-xl bg-gray-100 text-gray-600"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Buttons */}
      <div className="flex justify-end gap-4 mt-10">
        <button className="px-8 py-3.5 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition font-medium">
          Discard
        </button>
        <button className="px-10 py-3.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition font-medium flex items-center gap-3 shadow-lg">
          <Plus className="w-5 h-5" />
          Add Doctor
        </button>
      </div>
    </div>
  );
}
