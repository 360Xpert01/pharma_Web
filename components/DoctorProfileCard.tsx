"use client";

import React from "react";

export default function DoctorProfileCard({ partyData }: any) {
  const doctorData = {
    name: "Dr. Sarah Mitchelll",
    specialty: "Cardiologist",
    empId: "PLS_EMP- 000124",
    profileImage: "/capMan.svg",
  };

  const doctorDetails = partyData || {};

  return (
    <div className="w-full bg-background rounded-8 p-6 shadow-soft border border-gray-1 flex flex-col items-center">
      {/* Profile Image */}
      <div className="relative w-36 h-36 rounded-8 overflow-hidden mb-4">
        <img
          src={doctorData.profileImage}
          alt={doctorData.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Doctor Name */}
      <h2 className="text-3xl font-bold text-center text-gray-9 mb-2">
        {doctorDetails?.party_name}
      </h2>

      {/* Specialty */}
      <p className="text-base font-thin text-center mb-6">
        {doctorDetails?.attributes?.specialization || "N/A"}
      </p>

      {/* Employee ID Badge */}
      <div className="bg-primary text-white text-sm px-6 py-2 rounded-8 font-semibold">
        {doctorDetails?.attributes?.pmdcNumber || "N/A"}
      </div>
    </div>
  );
}
