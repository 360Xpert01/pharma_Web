"use client";

import React from "react";
import { ChevronLeft, ChevronRight, AlertTriangle, LogIn, LogOut } from "lucide-react";

export default function AttendanceDashboard() {
  const weeklyData = [
    {
      day: "Monday",
      date: "September 14, 2025",
      checkIn: "10:00 AM",
      checkOut: "7:00",
      offsite: true,
    },
    {
      day: "Tuesday",
      date: "September 13, 2025",
      checkIn: "10:00 AM",
      checkOut: "7:00",
      offsite: false,
    },
    {
      day: "Tuesday",
      date: "September 13, 2025",
      checkIn: "10:00 AM",
      checkOut: "7:00",
      offsite: false,
    },
    {
      day: "Monday",
      date: "September 14, 2025",
      checkIn: "10:00 AM",
      checkOut: "7:00",
      offsite: true,
    },
    {
      day: "Tuesday",
      date: "September 13, 2025",
      checkIn: "10:00 AM",
      checkOut: "7:00",
      offsite: false,
    },
  ];

  return (
    <div className=" mx-auto ">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Weekly Attendance</h2>
        <div className="flex items-center gap-4 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100">
          <ChevronLeft className="w-5 h-5 text-blue-600 cursor-pointer" />
          <span className="text-sm font-semibold text-gray-700">01 - 07 Sept, 2025</span>
          <ChevronRight className="w-5 h-5 text-blue-600 cursor-pointer" />
        </div>
      </div>

      {/* Attendance List */}
      <div className="space-y-3">
        {weeklyData.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-12 items-center bg-white rounded-xl border border-gray-100 shadow-sm px-6 py-4 hover:shadow-md transition-shadow"
          >
            {/* Day & Date */}
            <div className="col-span-3">
              <h4 className="text-lg font-bold text-gray-900 leading-tight">{item.day}</h4>
              <p className="text-sm text-gray-500 font-medium">{item.date}</p>
            </div>

            {/* Check-In */}
            <div className="col-span-3 flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                <LogIn className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-md font-bold text-gray-800">{item.checkIn}</p>
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                  Check-in
                </p>
              </div>
            </div>

            {/* Check-Out */}
            <div className="col-span-3 flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                <LogOut className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-md font-bold text-gray-800">{item.checkOut}</p>
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                  Check-out
                </p>
              </div>
            </div>

            {/* Remarks / Offsite Status */}
            <div className="col-span-3 flex justify-end">
              {item.offsite ? (
                <div className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-lg border border-red-100">
                  <AlertTriangle className="w-4 h-4" />
                  <span className="text-xs font-bold whitespace-nowrap">
                    Checked in at off-site location.
                  </span>
                </div>
              ) : (
                <div className="bg-gray-50 text-gray-400 px-8 py-2 rounded-lg text-xs font-medium border border-gray-100 italic">
                  No remarks
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
