"use client";

import React, { useState } from "react";
import { Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button/button";
import { FormInput, FormSelect } from "@/components/form";

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
  // Form states
  const [userName, setUserName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("Active");
  const [contactNumber, setContactNumber] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

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

  const updateLocation = (id: string, field: keyof Location, value: string) => {
    setLocations(locations.map((loc) => (loc.id === id ? { ...loc, [field]: value } : loc)));
  };

  return (
    <div className="bg-[var(--background)] rounded-xl p-9">
      {/* Header */}
      <h2 className="text-3xl font-bold text-[var(--gray-9)] mb-8">Basic Info</h2>

      {/* Basic Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <FormInput
          label="User name"
          name="userName"
          type="text"
          value={userName}
          onChange={setUserName}
          placeholder="e.g. john doe"
          required
        />

        <FormInput
          label="Specialization"
          name="specialization"
          type="text"
          value={specialization}
          onChange={setSpecialization}
          placeholder="e.g. Cardiologist"
          required
        />

        <FormInput
          label="Email Address"
          name="email"
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="e.g. abc123@gmail.com"
          required
        />

        <FormSelect
          label="Status"
          name="status"
          value={status}
          onChange={setStatus}
          options={[
            { value: "Active", label: "Active" },
            { value: "Inactive", label: "Inactive" },
          ]}
          required
        />

        <FormInput
          label="Contact number"
          name="contactNumber"
          type="tel"
          value={contactNumber}
          onChange={setContactNumber}
          placeholder="e.g. +92345678910"
          required
        />

        <FormInput
          label="License number"
          name="licenseNumber"
          type="text"
          value={licenseNumber}
          onChange={setLicenseNumber}
          placeholder="e.g. SA-25615-EETG"
          required
        />

        <FormInput
          label="Date Of Birth"
          name="dateOfBirth"
          type="date"
          value={dateOfBirth}
          onChange={setDateOfBirth}
          placeholder="e.g. 5/10/2001"
          required
        />
      </div>

      {/* Location Section */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[var(--gray-9)]">Location</h2>
        <Button
          onClick={addLocation}
          variant="primary"
          size="lg"
          icon={Plus}
          rounded="full"
          className="shadow-soft"
        >
          Add New Location
        </Button>
      </div>

      {/* Locations */}
      <div className="space-y-16">
        {locations.map((location, index) => (
          <div key={location.id} className="relative mt-6">
            {/* Location Title */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-[var(--gray-9)]">Location {index + 1}</h3>
              {locations.length > 1 && (
                <Button
                  onClick={() => removeLocation(location.id)}
                  variant="ghost"
                  size="icon"
                  className="text-[var(--destructive)] hover:text-[var(--destructive)] hover:bg-[var(---bg-transparent)]"
                >
                  <Trash2 className="w-5 h-5" />
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormSelect
                label="City"
                name={`city-${location.id}`}
                value={location.city}
                onChange={(value) => updateLocation(location.id, "city", value)}
                options={[
                  { value: "", label: "Select your region" },
                  { value: "Karachi", label: "Karachi" },
                  { value: "Lahore", label: "Lahore" },
                  { value: "Islamabad", label: "Islamabad" },
                ]}
                required
              />

              <FormSelect
                label="Country"
                name={`country-${location.id}`}
                value={location.country}
                onChange={(value) => updateLocation(location.id, "country", value)}
                options={[
                  { value: "", label: "Enter your country" },
                  { value: "Pakistan", label: "Pakistan" },
                  { value: "India", label: "India" },
                ]}
                required
              />

              <FormSelect
                label="Area"
                name={`area-${location.id}`}
                value={location.area}
                onChange={(value) => updateLocation(location.id, "area", value)}
                options={[
                  { value: "", label: "Enter your Area" },
                  { value: "North Nazimabad", label: "North Nazimabad" },
                  { value: "Gulshan-e-Iqbal", label: "Gulshan-e-Iqbal" },
                ]}
                required
              />

              <FormSelect
                label="Bricks"
                name={`bricks-${location.id}`}
                value={location.bricks}
                onChange={(value) => updateLocation(location.id, "bricks", value)}
                options={[
                  { value: "", label: "Enter your bricks" },
                  { value: "Brick A-12", label: "Brick A-12" },
                  { value: "Brick B-05", label: "Brick B-05" },
                ]}
                required
              />

              <FormInput
                label="Clinic name"
                name={`clinicName-${location.id}`}
                type="text"
                value={location.clinicName}
                onChange={(value) => updateLocation(location.id, "clinicName", value)}
                placeholder="e.g. SA-25615-EETG"
                required
              />

              <FormInput
                label="Visiting days"
                name={`visitingDays-${location.id}`}
                type="text"
                value={location.visitingDays}
                onChange={(value) => updateLocation(location.id, "visitingDays", value)}
                readOnly
                className="text-[var(--gray-6)]"
                required
              />

              <FormInput
                label="Visiting Hours"
                name={`visitingHours-${location.id}`}
                type="text"
                value={location.visitingHours}
                onChange={(value) => updateLocation(location.id, "visitingHours", value)}
                readOnly
                className="text-[var(--gray-6)]"
                required
              />
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Buttons */}
      <div className="flex justify-end gap-4 mt-10">
        <Button variant="outline" size="lg" rounded="full">
          Discard
        </Button>
        <Button variant="primary" size="lg" icon={Plus} rounded="full" className="shadow-soft">
          Add Doctor
        </Button>
      </div>
    </div>
  );
}
