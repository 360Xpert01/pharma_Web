"use client";

import React from "react";
import { Party } from "@/store/slices/party/partygetId";
import ImageWithFallback from "./shared/ImageWithFallback";

export default function DoctorProfileCard({ partyData }: { partyData: Party }) {
  const doctorDetails = partyData || {};
  const profileImage = doctorDetails?.image;
  const location = doctorDetails?.locations?.[0];
  const address = location ? `${location.address}` : "Al Asif Karachi";

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toISOString().split("T")[0]; // Just showing the date part for cleaner UI
    } catch (e) {
      return dateString;
    }
  };

  return (
    <div className="w-full bg-white rounded-8 py-4 shadow-soft border border-gray-1 flex flex-col items-center">
      {/* Profile Image - Scaled down for compact fit */}
      <div className="w-36 h-36 rounded-lg overflow-hidden mb-6 bg-gray-50 flex items-center justify-center border border-gray-100 shadow-sm relative">
        <ImageWithFallback
          src={profileImage}
          alt={doctorDetails?.party_name || "Doctor"}
          width={144}
          height={144}
          className="w-full h-full object-cover"
          fallbackSrc="/girlPic.png"
        />
      </div>

      {/* Doctor Name - Compact 2xl */}
      <h2 className="text-2xl font-bold text-[#0f172a] mb-1.5 text-center leading-tight tracking-tight">
        {doctorDetails?.party_name || "N/A"}
      </h2>

      {/* Email - Compact base */}
      <p
        className="text-[#475569] text-base mb-3 text-center truncate w-full px-2"
        title={doctorDetails?.email || "No Email Provided"}
      >
        {doctorDetails?.email || "No Email Provided"}
      </p>

      {/* Address - Compact sm */}
      <p className="text-[#64748b] text-sm mb-2 text-center line-clamp-2 px-2">{address}</p>

      {/* Phone Number - Compact lg */}
      <p className="text-[#475569] text-lg font-semibold mb-2 text-center tracking-wide">
        {doctorDetails?.phone_number ? `(${doctorDetails.phone_number})` : "N/A"}
      </p>

      {/* Date - Compact sm */}
      <p className="text-[#64748b] text-sm mb-8 text-center">
        {doctorDetails?.created_at ? formatDate(doctorDetails.created_at) : "N/A"}
      </p>

      {/* Pulse Code Badge - Compact Pill */}
      <div className="bg-[#1d4ed8] text-white text-sm px-8 py-2.5 rounded-lg font-bold shadow-soft transition-all cursor-default uppercase tracking-wider">
        {doctorDetails?.pulsecode || "N/A"}
      </div>
    </div>
  );
}
