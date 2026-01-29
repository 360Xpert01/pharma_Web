"use client";

import React from "react";

export default function DoctorProfileCard() {
  const doctorData = {
    name: "Dr. Sarah Mitchelll",
    specialty: "Cardiologist",
    empId: "PLS_EMP- 000124",
    profileImage: "/capMan.svg",
  };

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
      <h2 className="text-3xl font-bold text-center text-gray-9 mb-2">{doctorData.name}</h2>

      {/* Specialty */}
      <p className="text-base font-thin text-center mb-6">{doctorData.specialty}</p>

      {/* Employee ID Badge */}
      <div className="bg-primary text-white text-sm px-6 py-2 rounded-8 font-semibold">
        {doctorData.empId}
      </div>
    </div>
  );
}
