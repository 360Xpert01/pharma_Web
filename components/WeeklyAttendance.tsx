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
        backgroundColor: ["#EF4444", "#F59E0B", "#10B981"],
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
      <div className="bg-(--background) rounded-2xl shadow-sm border border-(--gray-1) p-5">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-(--gray-5)">Weekly Attendance</h2>
          <div className="flex items-center gap-2 text-sm text-(--primary) cursor-pointer">
            <ChevronLeft className="w-4 h-4 cursor-pointer" />
            <span>01 - 07 Sept, 2025</span>
            <ChevronRight className="w-4 h-4 cursor-pointer" />
          </div>
        </div>

        <div className="space-y-4">
          {weeklyData.map((day, index) => (
            <div key={index} className="space-y-3">
              {/* Offsite Warning */}
              {day.offsite && (
                <div className="flex items-center gap-2 bg-red-50 text-(--destructive) px-4 py-3 rounded-lg text-sm font-medium">
                  <AlertTriangle className="w-5 h-5" />
                  Checked in at off-site location.
                </div>
              )}

              {/* Day Row */}
              <div className="border border-(--gray-2) rounded-xl p-2">
                <div>
                  <p className="font-medium text-(--gray-9)">{day.date}</p>
                  <div className="flex justify-between  w-[100%] items-center gap-4 mt-2">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-blue-100 rounded-md flex items-center justify-center">
                        <ChevronRight className="w-5 h-5 text-(--primary) rotate-180 cursor-pointer" />
                      </div>
                      <div>
                        <p className="text-2xl font-semibold text-(--gray-9)">{day.checkIn}</p>
                        <p className="text-sm text-(--gray-5)">Check-in</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-blue-100 rounded-md flex items-center justify-center">
                        <ChevronRight className="w-5 h-5 text-(--primary) cursor-pointer" />
                      </div>
                      <div>
                        <p className="text-2xl font-semibold text-(--gray-9)">{day.checkOut}</p>
                        <p className="text-sm text-(--gray-5)">Check-out</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* {index < weeklyData.length - 1 && <hr className="border-(--gray-1)" />} */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
