"use client";

import React from "react";

export default function DoctorProfileCard() {
  const doctorData = {
    name: "Dr. Sarah Mitchelll",
    specialty: "Cardiologist",
    empId: "PLS_EMP- 000124",
    // Image source from the uploaded context
    profileImage: "/capMan.svg",
  };

  return (
    <div className="flex  bg-gray-50">
      {/* Main Card Container */}
      <div className="w-[360px] bg-white rounded-[24px] shadow-sm border border-gray-100 p-10 flex flex-col items-center text-center">
        {/* Profile Image with specific rounding as per image */}
        <div className="w-32 h-32 mb-6 overflow-hidden rounded-[35px] border-4 border-white shadow-sm">
          <img
            src={doctorData.profileImage}
            alt={doctorData.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Doctor Name */}
        <h2 className="text-[26px] font-bold text-gray-900 mb-1 tracking-tight">
          {doctorData.name}
        </h2>

        {/* Specialty */}
        <p className="text-lg text-gray-500 font-medium mb-4">{doctorData.specialty}</p>

        {/* Employee ID Badge */}
        <div className="bg-[#1E75FF] text-white text-[12px] font-bold px-5 py-1.5 rounded-full shadow-sm tracking-wide">
          {doctorData.empId}
        </div>
      </div>
    </div>
  );
}
