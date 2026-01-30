"use client";

import React from "react";
import { Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button/button";
import {
  FormInput,
  FormSelect,
  StatusToggle,
  DayRangePicker,
  TimeRangePicker,
} from "@/components/form";
import { useDoctorForm } from "../hooks/use-doctor-form";
import { useRouter } from "next/navigation";

interface UpdateDoctorFormProps {
  partyId: string;
  channelId?: string;
}

export default function UpdateDoctorForm({ partyId, channelId }: UpdateDoctorFormProps) {
  const router = useRouter();
  const {
    // State
    pmdcNumber,
    setPmdcNumber,
    userName,
    setUserName,
    specialization,
    setSpecialization,
    email,
    setEmail,
    status,
    setStatus,
    contactNumber,
    setContactNumber,
    qualification,
    setQualification,
    segment,
    setSegment,
    designation,
    setDesignation,
    dateOfBirth,
    setDateOfBirth,
    parent,
    setParent,
    locations,
    isUpdateMode,

    // Redux data
    specializations,
    specializationsLoading,
    qualifications,
    qualificationsLoading,
    segments,
    segmentsLoading,
    createLoading,
    partyLoading,
    bricks,
    bricksLoading,
    currentChannel,
    fieldConfig,

    // Handlers
    addLocation,
    removeLocation,
    updateLocation,
    handleSubmit,
    getErrorMessage,
    clearFieldError,
  } = useDoctorForm(channelId, partyId);

  if (partyLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary)]"></div>
      </div>
    );
  }

  return (
    <div className="bg-[var(--background)] rounded-8 p-9">
      {/* Header */}
      <h2 className="t-h1 mb-8">Basic Info</h2>

      {/* Basic Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {fieldConfig.channel && (
          <FormInput
            label="Channel"
            name="channel"
            value={currentChannel?.name || ""}
            onChange={() => {}}
            placeholder="Loading channel..."
            required
            readOnly
          />
        )}

        {fieldConfig.pmdcNumber && (
          <FormInput
            label="PMDC Number"
            name="pmdcNumber"
            type="text"
            value={pmdcNumber}
            onChange={(val) => {
              setPmdcNumber(val);
              clearFieldError("pmdcNumber");
            }}
            placeholder="e.g. 12345-P"
            required
            error={getErrorMessage("pmdcNumber")}
          />
        )}

        {fieldConfig.name && (
          <FormInput
            label="Name"
            name="name"
            type="text"
            value={userName}
            onChange={(val) => {
              setUserName(val);
              clearFieldError("userName");
            }}
            placeholder="e.g. john doe"
            required
            error={getErrorMessage("userName")}
          />
        )}

        {fieldConfig.contactNumber && (
          <FormInput
            label="Contact number"
            name="contactNumber"
            type="tel"
            value={contactNumber}
            onChange={(val) => {
              setContactNumber(val);
              clearFieldError("contactNumber");
            }}
            placeholder="e.g. +92345678910"
            required
            error={getErrorMessage("contactNumber")}
          />
        )}

        {fieldConfig.qualification && (
          <FormSelect
            label="Qualification"
            name="qualification"
            value={qualification}
            onChange={(val) => {
              setQualification(val);
              clearFieldError("qualification");
            }}
            options={[
              { value: "", label: "Select qualification" },
              ...qualifications.map((q) => ({
                value: q.id,
                label: q.name,
              })),
            ]}
            placeholder="Select qualification"
            required
            loading={qualificationsLoading}
            error={getErrorMessage("qualification")}
          />
        )}

        {fieldConfig.specialty && (
          <FormSelect
            label="Speciality"
            name="speciality"
            value={specialization}
            onChange={(val) => {
              setSpecialization(val);
              clearFieldError("specialization");
            }}
            options={specializations.map((spec) => ({
              value: spec.id,
              label: spec.name,
            }))}
            placeholder="e.g. Cardiologist, Neurologist..."
            required
            loading={specializationsLoading}
            error={getErrorMessage("specialization")}
          />
        )}

        {fieldConfig.segment && (
          <FormSelect
            label="Segment (A/B/C)"
            name="segment"
            value={segment}
            onChange={(val) => {
              setSegment(val);
              clearFieldError("segment");
            }}
            options={[
              { value: "", label: "Select segment" },
              ...segments.map((s) => ({
                value: s.id,
                label: s.name,
              })),
            ]}
            placeholder="Select segment"
            required
            loading={segmentsLoading}
            error={getErrorMessage("segment")}
          />
        )}

        {fieldConfig.designation && (
          <FormInput
            label="Designation"
            name="designation"
            type="text"
            value={designation}
            onChange={(val) => {
              setDesignation(val);
              clearFieldError("designation");
            }}
            placeholder="e.g. Senior Consultant"
            required
            error={getErrorMessage("designation")}
          />
        )}

        {fieldConfig.email && (
          <FormInput
            label="Email Address"
            name="email"
            type="email"
            value={email}
            onChange={(val) => {
              setEmail(val);
              clearFieldError("email");
            }}
            placeholder="e.g. abc123@gmail.com"
            required
            error={getErrorMessage("email")}
          />
        )}

        {fieldConfig.dateOfBirth && (
          <FormInput
            label="Date Of Birth"
            name="dateOfBirth"
            type="date"
            value={dateOfBirth}
            onChange={(val) => {
              setDateOfBirth(val);
              clearFieldError("dateOfBirth");
            }}
            placeholder="e.g. 5/10/2001"
            required
            error={getErrorMessage("dateOfBirth")}
          />
        )}

        {fieldConfig.parent && (
          <FormSelect
            label="Parent"
            name="parent"
            value={parent}
            onChange={(val) => {
              setParent(val);
              clearFieldError("parent");
            }}
            options={[
              { value: "", label: "Select parent" },
              { value: "parent1", label: "Parent Organization 1" },
              { value: "parent2", label: "Parent Organization 2" },
            ]}
            placeholder="Select parent"
            required
            error={getErrorMessage("parent")}
          />
        )}

        {fieldConfig.status && (
          <div className="flex flex-col gap-2">
            <label className="t-label">
              Status <span className="t-err">*</span>
            </label>
            <StatusToggle status={status} onChange={(newStatus) => setStatus(newStatus)} />
          </div>
        )}
      </div>

      {/* Location Section */}
      {fieldConfig.locations && (
        <>
          <div className="flex justify-between items-center mb-6">
            <h2 className="t-h2">Location</h2>
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
                  <h3 className="t-h4">Location {index + 1}</h3>
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
                    label="Bricks"
                    name={`bricks-${location.id}`}
                    value={location.bricks}
                    onChange={(value) => {
                      updateLocation(location.id, "bricks", value);
                      clearFieldError(`locations.${index}.bricks`);
                    }}
                    options={bricks.map((b) => ({
                      value: b.id,
                      label: b.name,
                    }))}
                    required
                    loading={bricksLoading}
                    error={getErrorMessage(`locations.${index}.bricks`)}
                  />

                  <FormInput
                    label="City"
                    name={`city-${location.id}`}
                    value={location.city}
                    onChange={() => {}}
                    placeholder="Auto-populated"
                    required
                    readOnly
                    error={getErrorMessage(`locations.${index}.city`)}
                  />

                  <FormInput
                    label="Country"
                    name={`country-${location.id}`}
                    value={location.country}
                    onChange={() => {}}
                    placeholder="Auto-populated"
                    required
                    readOnly
                    error={getErrorMessage(`locations.${index}.country`)}
                  />

                  <FormInput
                    label="Area"
                    name={`area-${location.id}`}
                    value={location.area}
                    onChange={() => {}}
                    placeholder="Auto-populated"
                    required
                    readOnly
                    error={getErrorMessage(`locations.${index}.area`)}
                  />

                  <FormInput
                    label="Clinic name"
                    name={`clinicName-${location.id}`}
                    type="text"
                    value={location.clinicName}
                    onChange={(value) => {
                      updateLocation(location.id, "clinicName", value);
                      clearFieldError(`locations.${index}.clinicName`);
                    }}
                    placeholder="e.g. SA-25615-EETG"
                    required
                    error={getErrorMessage(`locations.${index}.clinicName`)}
                  />

                  <DayRangePicker
                    label="Visiting days"
                    from={location.visitingDays.from}
                    to={location.visitingDays.to}
                    onChange={(from, to) => {
                      updateLocation(location.id, "visitingDays", { from, to });
                      clearFieldError(`locations.${index}.visitingDays.from`);
                      clearFieldError(`locations.${index}.visitingDays.to`);
                    }}
                    required
                    error={
                      getErrorMessage(`locations.${index}.visitingDays.from`) ||
                      getErrorMessage(`locations.${index}.visitingDays.to`)
                    }
                  />

                  <TimeRangePicker
                    label="Visiting Hours"
                    from={location.visitingHours.from}
                    to={location.visitingHours.to}
                    onChange={(from, to) => {
                      updateLocation(location.id, "visitingHours", { from, to });
                      clearFieldError(`locations.${index}.visitingHours.from`);
                      clearFieldError(`locations.${index}.visitingHours.to`);
                    }}
                    required
                    error={
                      getErrorMessage(`locations.${index}.visitingHours.from`) ||
                      getErrorMessage(`locations.${index}.visitingHours.to`)
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Bottom Buttons */}
      <div className="flex justify-end gap-4 mt-10">
        <Button variant="outline" size="lg" rounded="full" onClick={() => router.back()}>
          Discard
        </Button>
        <Button
          variant="primary"
          size="lg"
          icon={Plus}
          rounded="full"
          className="shadow-soft"
          onClick={handleSubmit}
          loading={createLoading}
        >
          Update Doctor
        </Button>
      </div>
    </div>
  );
}
