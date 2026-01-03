"use client";

import React from "react";
import { ChevronLeft, ChevronRight, AlertTriangle } from "lucide-react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function AttendanceDashboard() {
  // Doughnut Chart Data
  const doughnutData = {
    labels: ["Absent", "Offsite", "Onsite"],
    datasets: [
      {
        data: [32, 15, 53], // 32% Absent → 68% Present
        backgroundColor: ["#e02723", "#dcac00", "#00aa2f"], // Using ceturo theme hex values
        borderWidth: 0,
        cutout: "75%",
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
  };

  const weeklyData = [
    { date: "September 14, 2025", checkIn: "10:00 AM", checkOut: "7:00" },
    { date: "September 14, 2025", checkIn: "10:00 AM", checkOut: "7:00" },
    { date: "September 12, 2025", checkIn: "10:00 AM", checkOut: "7:00", offsite: true },
    { date: "September 15, 2025", checkIn: "10:00 AM", checkOut: "7:00" },
    { date: "September 16, 2025", checkIn: "10:00 AM", checkOut: "7:00" },
    { date: "September 17, 2025", checkIn: "10:00 AM", checkOut: "7:00" },
    { date: "September 18, 2025", checkIn: "10:00 AM", checkOut: "7:00" },
    { date: "September 15, 2025", checkIn: "10:00 AM", checkOut: "7:00" },
    { date: "September 16, 2025", checkIn: "10:00 AM", checkOut: "7:00" },
    { date: "September 17, 2025", checkIn: "10:00 AM", checkOut: "7:00" },
    { date: "September 17, 2025", checkIn: "10:00 AM", checkOut: "7:00" },
  ];

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="t-h3">Weekly Attendance</h2>
        <div className="flex items-center gap-2 text-(--primary) text-sm font-medium cursor-pointer">
          <ChevronLeft className="w-4 h-4" />
          <span>01 - 07 Sept, 2025</span>
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>

      {/* Attendance List */}
      <div className="space-y-4">
        {weeklyData.map((day, index) => (
          <div key={index} className="space-y-3">
            {/* Offsite Warning */}
            {day.offsite && (
              <div className="flex items-center justify-center gap-2 bg-(--destructive-0) text-(--destructive) px-4 py-3 rounded-8 t-md shadow-soft">
                <AlertTriangle className="w-5 h-5" />
                Checked in at off-site location.
              </div>
            )}

            {/* Day Row */}
            <div className="bg-(--background) rounded-8 shadow-soft px-6 py-5">
              <p className="t-label-b mb-3">{day.date}</p>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-(--primary-0) rounded-8 flex items-center justify-center">
                    <ChevronRight className="w-5 h-5 text-(--primary) rotate-180" />
                  </div>
                  <div>
                    <p className="t-val-sm">{day.checkIn}</p>
                    <p className="t-cap">Check-in</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-(--primary-0) rounded-8 flex items-center justify-center">
                    <ChevronRight className="w-5 h-5 text-(--primary)" />
                  </div>
                  <div>
                    <p className="t-val-sm">{day.checkOut}</p>
                    <p className="t-cap">Check-out</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
