"use client";

import React from "react";
import Image from "next/image";
import { Mail, Phone, Calendar, MapPin, PencilLine } from "lucide-react";

export default function EmployeeProfileCard() {
  const profileData = {
    name: "Mohammad Amir",
    empId: "PLS_EMP- 000124",
    shortId: "000124",
    manager: "A. Aziz Warsi",
    email: "samikashan099@gmail.com",
    phone: "+92 312 283 8270",
    dob: "19th January 97",
    address: "B-121, Block-2, Gulshan-e-Iqbal, Karachi, Pakistan",
    profileImage:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&auto=format&fit=crop", // Placeholder from image
  };

  return (
    <div className="">
      <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-5 flex items-start gap-8">
        {/* Profile Image Section */}
        <div className="relative w-40 h-45 ">
          <div className="w-full h-full rounded-[32px] overflow-hidden">
            <img
              src={profileData.profileImage}
              alt={profileData.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Details Section */}
        <div className="flex-1">
          <div className="flex justify-between items-start ">
            <div className="flex items-center gap-3">
              <span className="bg-blue-600 text-white text-[12px] font-bold px-3 py-1 rounded-md tracking-wide">
                {profileData.empId}
              </span>
              <span className="text-gray-400 text-sm font-medium border-l pl-3">
                {profileData.shortId}
              </span>
            </div>

            {/* Edit Button */}
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all">
              <PencilLine size={18} />
              Edit Employee
            </button>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">
            {profileData.name}
          </h1>

          <div className="grid grid-cols-2 gap-y-6">
            {/* Left Column: Contact Info */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-gray-900 font-bold text-sm">Reporting Manager</span>
                <span className="text-gray-500 text-sm font-medium">{profileData.manager}</span>
              </div>

              <div className="flex flex-col gap-1 text-gray-500 text-sm font-medium">
                <p>{profileData.email}</p>
                <p>{profileData.phone}</p>
                <p>{profileData.dob}</p>
              </div>
            </div>

            {/* Right Column: Address */}
            <div className="pl-4">
              <h4 className="text-gray-900 font-bold text-sm mb-2">Full Address</h4>
              <p className="text-gray-500 text-sm font-medium leading-relaxed max-w-[240px]">
                {profileData.address}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
