"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const candidate = {
  name: "Sami Kashan",
  email: "samikashan099@gmail.com",
  phone: "+92 312 283 8270",
  reportingManager: "Hammad Afzal",
  campaign: "Diabetics",
  requestedMonth: "September",
  channel: "Doctors",
  totalCalls: 220,
  status: "Under Review",
};

// Dynamic Call Data as Object (sub-json style)
const monthlyCallData: Record<string, Record<number, number | null>> = {
  "2025-9": {
    // September 2025
    1: 12,
    2: 12,
    3: 18,
    6: 20,
    7: 25,
    8: 18,
    9: 30,
    10: 22,
    11: 22,
    12: 22,
    15: 22,
    16: 22,
    17: 22,
    18: 22,
    20: 22,
    21: 22,
    22: 22,
    23: 22,
    24: 22,
    27: 22,
    28: 22,
    29: 22,
    31: 22,
    14: 0,
    30: 0,
  },
  // Add more months if needed
};

const noCallDays: Record<string, number[]> = {
  "2025-9": [14, 30],
};

export default function PlanRequestCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 8)); // Sep 2025

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const monthKey = `${year}-${month + 1}`;
  const monthName = currentMonth.toLocaleString("default", { month: "long", year: "numeric" });

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay();

  const callCounts = monthlyCallData[monthKey] || {};
  const zeroCallDays = noCallDays[monthKey] || [];

  const previousMonth = () => setCurrentMonth(new Date(year, month - 1));
  const nextMonth = () => setCurrentMonth(new Date(year, month + 1));

  const calendarGrid = Array(firstDayOfWeek)
    .fill(null)
    .concat(Array.from({ length: daysInMonth }, (_, i) => i + 1));

  return (
    <>
      {/* Candidate Info Card */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-6">
            <Image width={100} height={100} src="/capMan.svg" alt="Candidate" />
            <div>
              <h2 className="text-2xl font-bold text-slate-900">{candidate.name}</h2>
              <p className="text-slate-600">{candidate.email}</p>
              <p className="text-slate-600">{candidate.phone}</p>
            </div>
          </div>

          <div className=" space-y-4">
            <div>
              <p className="text-xs text-slate-500">Reporting Manager</p>
              <p className="font-semibold text-xl">{candidate.reportingManager}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Campaign</p>
              <p className="font-semibold text-xl">{candidate.campaign}</p>
            </div>
          </div>

          <div className=" space-y-4">
            <div>
              <p className="text-xs text-slate-500">Requested Month</p>
              <p className="font-semibold text-xl">{candidate.requestedMonth}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Channel</p>
              <p className="font-semibold text-xl">{candidate.channel}</p>
            </div>
          </div>

          <div className="">
            <div>
              <p className="text-xs text-slate-500">Status</p>
              <span className="inline-block bg-yellow-300 text-white px-4 py-1 rounded-full text-xs">
                {candidate.status}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-3">Total Calls</p>
            <p className="text-xl font-bold">{candidate.totalCalls}</p>
          </div>
        </div>
      </div>

      {/* Calendar */}
      <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-3xl font-bold text-gray-900">{monthName}</h3>
          <div className="flex items-center bg-gray-100 rounded-full border border-slate-200">
            <button onClick={previousMonth} className="p-3 hover:bg-slate-200 rounded-lg">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="px-6 font-medium">{monthName}</span>
            <button onClick={nextMonth} className="p-3 hover:bg-slate-200 rounded-lg">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2 text-center">
          {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((d) => (
            <div key={d} className="font-bold text-slate-500 py-3 text-lg">
              {d}
            </div>
          ))}

          {calendarGrid.map((day, i) => {
            const isZero = day && zeroCallDays.includes(day);
            const calls = day ? (callCounts[day] ?? null) : null;
            const isSelected = day === 11;

            return (
              <div
                key={i}
                className={`
                  aspect-square rounded-lg p-3 flex flex-col justify-between text-left
                  ${!day ? "bg-transparent" : isZero ? "bg-red-600 text-white" : isSelected ? "bg-blue-600 text-white" : "bg-gray-50"}
                `}
              >
                {day && (
                  <>
                    <span className="text-3xl font-medium">{day}</span>
                    {calls !== null ? (
                      <span className={`text-sm ${isZero ? "text-white" : "text-slate-500"}`}>
                        {isZero ? "0 Calls" : `${calls} Calls`}
                      </span>
                    ) : null}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
