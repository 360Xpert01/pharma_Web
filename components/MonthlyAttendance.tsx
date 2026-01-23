import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { attendanceData } from "../app/data/mockData";

export default function MonthlyAttendance() {
  return (
    <div className="w-full bg-(--background) rounded-8 p-6 shadow-soft border border-(--gray-1)">
      {/* Header */}
      <h2 className="text-base font-bold text-(--gray-9) mb-7">Monthly Attendance</h2>

      {/* Date Navigator with Border */}
      <div className="inline-flex items-center gap-3 px-6 py-3 border border-(--gray-2) rounded-8 text-(--gray-9) text-base mb-6">
        <ChevronLeft className="w-5 h-5 cursor-pointer" />
        <span className="font-medium">September 2025</span>
        <ChevronRight className="w-5 h-5 cursor-pointer" />
      </div>

      {/* Chart and Legend Side by Side */}
      <div className="flex items-center justify-between gap-8">
        {/* Chart with Center Label */}
        <div className="relative shrink-0" style={{ width: "200px", height: "200px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={attendanceData}
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={100}
                paddingAngle={0}
                dataKey="value"
                strokeWidth={0}
              >
                {attendanceData.map((entry, i) => (
                  <Cell key={`cell-${i}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          {/* Center Label */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <div className="text-4xl font-bold text-(--gray-9)">31</div>
            <div className="text-sm text-(--gray-5) font-medium">DAYS</div>
          </div>
        </div>

        {/* Status Badges - Vertical Stack on Right */}
        <div className="flex flex-col gap-3">
          <button className="bg-[#EC6F70] text-(--background) text-sm px-6 py-2.5 rounded-8 font-bold uppercase cursor-pointer">
            ABSENT
          </button>
          <button className="bg-[#60A5FA] text-(--background) text-sm px-6 py-2.5 rounded-8 font-bold uppercase cursor-pointer">
            OFFSITE
          </button>
          <button className="bg-[#6CD49A] text-(--background) text-sm px-6 py-2.5 rounded-8 font-bold uppercase cursor-pointer">
            ONSITE
          </button>
        </div>
      </div>
    </div>
  );
}
