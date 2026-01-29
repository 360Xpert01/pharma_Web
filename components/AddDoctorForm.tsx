"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Trash2, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button/button";
import {
  FormInput,
  FormSelect,
  StatusToggle,
  DayRangePicker,
  TimeRangePicker,
} from "@/components/form";
import { useAppDispatch, useAppSelector } from "@/store";
import { getAllSpecializations } from "@/store/slices/specialization/getAllSpecializationsSlice";
import { getAllQualifications } from "@/store/slices/qualification/getAllQualificationsSlice";
import { getAllSegments } from "@/store/slices/segment/getAllSegmentsSlice";
import { getAllChannels } from "@/store/slices/channel/getAllChannelsSlice";
import { getFieldConfigByChannel } from "@/utils/doctorFormConfig";
import { createParty, resetCreatePartyState } from "@/store/slices/party/partySlicePost";
import { toast } from "react-hot-toast";

interface Location {
  id: string;
  city: string;
  country: string;
  area: string;
  bricks: string;
  clinicName: string;
  visitingDays: { from: string; to: string };
  visitingHours: { from: string; to: string };
}

export default function AddDoctorForm({ idForm }: { idForm?: string }) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  console.log(idForm, "Account/Channel ID:", idForm);

  // Redux state
  const { specializations, loading: specializationsLoading } = useAppSelector(
    (state) => state.allSpecializations
  );
  const { qualifications, loading: qualificationsLoading } = useAppSelector(
    (state) => state.allQualifications
  );
  const { segments, loading: segmentsLoading } = useAppSelector((state) => state.allSegments);
  const { channels, loading: channelsLoading } = useAppSelector((state) => state.allChannels);
  const { createLoading, createSuccess, createError } = useAppSelector(
    (state) => state.createParty
  );

  // Find the channel associated with this ID
  const currentChannel = useMemo(() => {
    if (!channels || channels.length === 0 || !idForm) return null;
    return channels.find((ch) => ch.id === idForm);
  }, [channels, idForm]);

  // Get field configuration based on channel name
  const fieldConfig = useMemo(() => {
    if (currentChannel) {
      console.log("Current channel found:", currentChannel.name);
      return getFieldConfigByChannel(currentChannel.name);
    }
    // Default: show all fields if no channel is found
    console.log("No channel found, using default config");
    return getFieldConfigByChannel();
  }, [currentChannel]);

  // Form states
  const [channel, setChannel] = useState("");
  const [pmdcNumber, setPmdcNumber] = useState("");
  const [userName, setUserName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"Active" | "Inactive">("Active");
  const [contactNumber, setContactNumber] = useState("");
  const [qualification, setQualification] = useState("");
  const [segment, setSegment] = useState("");
  const [designation, setDesignation] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [parent, setParent] = useState("");

  // Fetch data on mount
  useEffect(() => {
    dispatch(getAllSpecializations());
    dispatch(getAllQualifications());
    dispatch(getAllSegments());
    dispatch(getAllChannels());
  }, [dispatch]);

  // Auto-select the current channel when it's loaded
  useEffect(() => {
    if (currentChannel && !channel) {
      setChannel(currentChannel.id);
    }
  }, [currentChannel, channel]);

  // Handle success/error
  useEffect(() => {
    if (createSuccess) {
      toast.success("Doctor added successfully!");
      dispatch(resetCreatePartyState());
      router.push(`/dashboard/doctors-?id=${idForm || ""}`);
    }
    if (createError) {
      toast.error(createError);
      dispatch(resetCreatePartyState());
    }
  }, [createSuccess, createError, dispatch, router, idForm]);

  const [locations, setLocations] = useState<Location[]>([
    {
      id: "1",
      city: "",
      country: "",
      area: "",
      bricks: "",
      clinicName: "",
      visitingDays: { from: "", to: "" },
      visitingHours: { from: "", to: "" },
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
        visitingDays: { from: "", to: "" },
        visitingHours: { from: "", to: "" },
      },
    ]);
  };

  const removeLocation = (id: string) => {
    if (locations.length > 1) {
      setLocations(locations.filter((loc) => loc.id !== id));
    }
  };

  const updateLocation = (id: string, field: keyof Location, value: any) => {
    setLocations(locations.map((loc) => (loc.id === id ? { ...loc, [field]: value } : loc)));
  };

  const handleSubmit = async () => {
    // Basic validation
    if (!userName || !email || !contactNumber) {
      toast.error("Please fill in all required fields");
      console.log("Submitting form", userName, email, contactNumber, specialization);
      return;
    }

    const payload = {
      channelTypeId: channel || idForm || "",
      basicInfo: {
        party_type: "DOCTOR",
        name: userName,
        email: email,
        phoneNumber: contactNumber,
        image: "", // Default or placeholder
        description: designation || qualification || "",
        segmentId: segment,
        status: status.toUpperCase(),
      },
      attributes: {
        specialization: specialization,
        qualification: qualification,
        segment: segment,
        designation: designation,
        date_of_birth: dateOfBirth,
        pmdcNumber: pmdcNumber,
      },
      locations: locations.map((loc) => {
        // Parse visiting days range: send only boundary days as requested
        const days = [];
        if (loc.visitingDays.from) days.push(loc.visitingDays.from.toUpperCase());
        if (loc.visitingDays.to) days.push(loc.visitingDays.to.toUpperCase());

        // Parse visiting hours range
        const timeSlots = [];
        if (loc.visitingHours.from && loc.visitingHours.to) {
          timeSlots.push({ start: loc.visitingHours.from, end: loc.visitingHours.to });
        } else if (loc.visitingHours.from) {
          timeSlots.push({ start: loc.visitingHours.from, end: loc.visitingHours.from });
        }

        return {
          locationType: "CLINIC",
          address: `${loc.clinicName}, ${loc.area}, ${loc.city}`,
          city: loc.city,
          state: loc.city, // Placeholder for state
          country: loc.country,
          schedules: [
            {
              scheduleType: "WEEKLY",
              validFrom: new Date().toISOString().split("T")[0],
              validUntil: null,
              scheduleData: [
                {
                  days: days,
                  time_slots: timeSlots,
                },
              ],
            },
          ],
        };
      }),
    };

    console.log("Submitting Payload:", payload);
    dispatch(createParty(payload as any));
  };

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
            onChange={setChannel}
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
            onChange={setPmdcNumber}
            placeholder="e.g. 12345-P"
            required
          />
        )}

        {fieldConfig.name && (
          <FormInput
            label="Name"
            name="name"
            type="text"
            value={userName}
            onChange={setUserName}
            placeholder="e.g. john doe"
            required
          />
        )}

        {fieldConfig.contactNumber && (
          <FormInput
            label="Contact number"
            name="contactNumber"
            type="tel"
            value={contactNumber}
            onChange={setContactNumber}
            placeholder="e.g. +92345678910"
            required
          />
        )}

        {fieldConfig.qualification && (
          <FormSelect
            label="Qualification"
            name="qualification"
            value={qualification}
            onChange={setQualification}
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
          />
        )}

        {fieldConfig.specialty && (
          <FormSelect
            label="Speciality"
            name="speciality"
            value={specialization}
            onChange={setSpecialization}
            options={specializations.map((spec) => ({
              value: spec.id,
              label: spec.name,
            }))}
            placeholder="e.g. Cardiologist, Neurologist..."
            required
            loading={specializationsLoading}
          />
        )}

        {fieldConfig.segment && (
          <FormSelect
            label="Segment (A/B/C)"
            name="segment"
            value={segment}
            onChange={setSegment}
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
          />
        )}

        {fieldConfig.designation && (
          <FormInput
            label="Designation"
            name="designation"
            type="text"
            value={designation}
            onChange={setDesignation}
            placeholder="e.g. Senior Consultant"
            required
          />
        )}

        {fieldConfig.email && (
          <FormInput
            label="Email Address"
            name="email"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="e.g. abc123@gmail.com"
            required
          />
        )}
        {/* 
        <FormInput
          label="License number"
          name="licenseNumber"
          type="text"
          value={licenseNumber}
          onChange={setLicenseNumber}
          placeholder="e.g. SA-25615-EETG"
          required
        /> */}

        {fieldConfig.dateOfBirth && (
          <FormInput
            label="Date Of Birth"
            name="dateOfBirth"
            type="date"
            value={dateOfBirth}
            onChange={setDateOfBirth}
            placeholder="e.g. 5/10/2001"
            required
          />
        )}

        {fieldConfig.parent && (
          <FormSelect
            label="Parent"
            name="parent"
            value={parent}
            onChange={setParent}
            options={[
              { value: "", label: "Select parent" },
              { value: "parent1", label: "Parent Organization 1" },
              { value: "parent2", label: "Parent Organization 2" },
            ]}
            placeholder="Select parent"
            required
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

                  <DayRangePicker
                    label="Visiting days"
                    from={location.visitingDays.from}
                    to={location.visitingDays.to}
                    onChange={(from, to) =>
                      updateLocation(location.id, "visitingDays", { from, to })
                    }
                    required
                  />

                  <TimeRangePicker
                    label="Visiting Hours"
                    from={location.visitingHours.from}
                    to={location.visitingHours.to}
                    onChange={(from, to) =>
                      updateLocation(location.id, "visitingHours", { from, to })
                    }
                    required
                  />
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Bottom Buttons */}
      <div className="flex justify-end gap-4 mt-10">
        <Button variant="outline" size="lg" rounded="full">
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
          Add Doctor
        </Button>
      </div>
    </div>
  );
}
