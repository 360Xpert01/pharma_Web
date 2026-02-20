"use client";

import React from "react";

export default function DoctorProfileCard({ partyData }: any) {
  const doctorDetails = partyData || {};
  const profileImage = doctorDetails?.image || "/girlPic.png";
  const location = doctorDetails?.locations?.[0];
  const address = location ? `${location.address}` : "Al Asif Karachi";

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toISOString();
    } catch (e) {
      return dateString;
    }
  };

  return (
    <div className="w-full bg-white rounded-8 py-4 shadow-soft border border-gray-1 flex flex-col items-center">
      {/* Profile Image - Scaled down for compact fit */}
      <div className="w-36 h-36 rounded-lg overflow-hidden mb-6 bg-gray-50 flex items-center justify-center border border-gray-100 shadow-sm relative">
        <img
          src={profileImage}
          alt={doctorDetails?.party_name || "Doctor"}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Doctor Name - Compact 2xl */}
      <h2 className="text-2xl font-bold text-[#0f172a] mb-1.5 text-center leading-tight tracking-tight">
        {doctorDetails?.party_name || "N/A"}
      </h2>

      {/* Email - Compact base */}
      <p
        className="text-[#475569] text-base mb-3 text-center truncate w-full px-2"
        title={doctorDetails?.email || "rahimoooon@gmail.com"}
      >
        {doctorDetails?.email || "rahimoooon@gmail.com"}
      </p>

      {/* Address - Compact sm */}
      <p className="text-[#64748b] text-sm mb-2 text-center line-clamp-2 px-2">{address}</p>

      {/* Phone Number - Compact lg */}
      <p className="text-[#475569] text-lg font-semibold mb-2 text-center tracking-wide">
        ({doctorDetails?.phone_number || "03478125322"})
      </p>

      {/* Date - Compact sm */}
      <p className="text-[#64748b] text-sm mb-8 text-center">
        {doctorDetails?.created_at
          ? formatDate(doctorDetails?.created_at)
          : "2026-02-11T00:00:00.000Z"}
      </p>

      {/* Pulse Code Badge - Compact Pill */}
      <div className="bg-[#1d4ed8] text-white text-sm px-8 py-2.5 rounded-lg font-bold shadow-soft transition-all cursor-default uppercase tracking-wider">
        {doctorDetails?.pulsecode || "EMP34"}
      </div>
    </div>
  );
}
