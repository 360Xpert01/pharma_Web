"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
// Dynamic Call Data as Object (sub-json style)
const monthlyCallData: Record<string, Record<number, number | null>> = {
  "2025-9": {
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

export default function PlanRequestCalendar({
  scheduleDetail,
  callsCount,
  scheduleStatus,
  calls,
  onDateSelect,
  scheduletitle,
}: {
  scheduleDetail: any;
  callsCount: any;
  scheduleStatus: any;
  calls: any;
  onDateSelect: (date: string | null) => void;
  scheduletitle: string;
}) {
  // Convert month name to month number
  const getMonthNumber = (monthName: string): number => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return months.indexOf(monthName);
  };

  const monthNumber = scheduleStatus?.month ? getMonthNumber(scheduleStatus.month) : 0;
  const year = scheduleStatus?.year || new Date().getFullYear();

  const [currentMonth, setCurrentMonth] = useState(new Date(year, monthNumber));
  const [selectedDay, setSelectedDay] = useState<number | null>(1);
  const month = currentMonth.getMonth();

  // Select first day by default on component mount
  useEffect(() => {
    const formattedDate = `${year}-${String(month + 1).padStart(2, "0")}-01`;
    onDateSelect(formattedDate);
  }, []);

  // const year = currentMonth.getFullYear();
  const monthKey = `${year}-${month + 1}`;
  const monthName = currentMonth.toLocaleString("default", { month: "long", year: "numeric" });

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay();

  // Extract call data from calls array
  const extractedCallData: Record<number, number> = {};
  if (calls && Array.isArray(calls)) {
    calls.forEach((callRecord: any) => {
      if (callRecord.callDate) {
        const date = new Date(callRecord.callDate);
        const day = date.getDate();
        extractedCallData[day] = callRecord.totalCount || 0;
      }
    });
  }

  const handleDayClick = (day: number | null) => {
    if (!day) return;

    setSelectedDay(day);

    const formattedDate = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

    // Very important → call parent function!
    onDateSelect(formattedDate);
  };

  const callCounts =
    { ...monthlyCallData[monthKey], ...extractedCallData } || extractedCallData || {};
  const zeroCallDays = noCallDays[monthKey] || [];

  const previousMonth = () => setCurrentMonth(new Date(year, month - 1));
  const nextMonth = () => setCurrentMonth(new Date(year, month + 1));

  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const calendarGrid = Array(firstDayOfWeek)
    .fill(null)
    .concat(Array.from({ length: daysInMonth }, (_, i) => i + 1));

  return (
    <>
      {/* Candidate Info Card */}
      <div className="bg-(--background) rounded-8 shadow-soft p-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-6">
            <Image
              width={100}
              height={100}
              src={scheduleDetail?.saleRepPicture || "/girlPic.png"}
              alt="Candidate"
            />
            <div>
              <h2 className="t-h4">{scheduleDetail?.fullname}</h2>
              <p className="t-md">{scheduleDetail?.email}</p>
              <p className="t-md">{scheduleDetail?.phone}</p>
            </div>
          </div>

          <div className=" space-y-4">
            <div>
              <p className="t-cap">Reporting Manager</p>
              <p className="t-h4">{scheduleDetail?.supervisorName}</p>
            </div>
            <div>
              <p className="t-cap">Team Name</p>
              <p className="t-h4">{scheduleDetail?.teamName}</p>
            </div>
          </div>

          <div className=" space-y-4">
            <div>
              <p className="t-cap">Requested Month</p>
              <p className="t-h4">{scheduleDetail?.month}</p>
            </div>
            <div>
              <p className="t-cap">Channel</p>
              <p className="t-h4">{scheduleDetail?.channelName}</p>
            </div>
          </div>

          <div className="">
            <div>
              <p className="t-cap">Status</p>
              <span
                className={`inline-block ${scheduletitle === "Accepted" ? "bg-[var(--success-0)] text-[var(--success)]" : scheduletitle === "Rejected" ? "bg-[var(--destructive-0)] text-[var(--destructive)]" : "bg-[var(--warning-0)] text-[var(--warning)]"} px-4 py-1 rounded-8 t-cap`}
              >
                {scheduletitle}
              </span>
            </div>
            <p className="t-cap mt-3">Total Calls</p>
            <p className="t-val">{callsCount}</p>
          </div>
        </div>
      </div>

      {/* Calendar */}
      <div className="bg-(--background) rounded-8 shadow-soft p-6 mt-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="t-h1">{monthName}</h3>
        </div>

        <div className="grid grid-cols-7 gap-2 text-center">
          {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((d) => (
            <div key={d} className="t-label-b py-3">
              {d}
            </div>
          ))}

          {calendarGrid.map((day, i) => {
            const isZero = day && zeroCallDays.includes(day);
            const calls = day ? (callCounts[day] ?? null) : null;
            const isSelected = day === selectedDay;

            return (
              <div
                key={i}
                onClick={() => {
                  if (day) {
                    handleDayClick(day);
                  }
                }}
                className={`
                  aspect-square rounded-8 p-3 flex flex-col justify-between text-left cursor-pointer transition-colors
                  ${!day ? "bg-transparent" : isZero ? "bg-(--destructive) text-(--light)" : isSelected ? "bg-(--primary) text-(--light)" : "bg-(--gray-0) hover:bg-(--gray-2)"}
                `}
              >
                {day && (
                  <>
                    <span className="t-val-lg">{day}</span>
                    {calls !== null ? (
                      <span className={`t-sm ${isZero ? "text-(--light)" : ""}`}>
                        {isZero ? "0 Calls" : `${calls} Calls`}
                      </span>
                    ) : (
                      <span className={`t-sm ${isZero ? "text-(--light)" : ""}`}>{"0 Calls"}</span>
                    )}
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
