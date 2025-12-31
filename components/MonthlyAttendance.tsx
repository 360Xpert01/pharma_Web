import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { attendanceData } from "../app/data/mockData";

export default function MonthlyAttendance() {
  return (
    <div className="w-full bg-white rounded-2xl shadow-soft border border-gray-100 py-4 -mt-4 px-8">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold mt-2 text-gray-900">Monthly Attendance</h2>
      </div>

      {/* Content: Left side (date navigator + badges) and Right side (chart) */}
      <div className="flex items-center justify-between gap-8">
        {/* Left Side Content */}
        <div className="flex flex-col gap-8">
          {/* Date Navigator */}
          <div className="flex items-center gap-3 bg-gray-100 text-gray-700 px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-200 transition cursor-pointer w-fit">
            <ChevronLeft className="w-4 h-4" />
            <span>September 2025</span>
            <ChevronRight className="w-4 h-4" />
          </div>

          {/* Status Badges */}
          <div className="flex gap-3">
            <button className="bg-[#FF6B6B] text-white text-xs px-4 py-1.5 rounded-md font-semibold uppercase cursor-pointer">
              Absent
            </button>
            <button className="bg-[#4E9FFF] text-white text-xs px-4 py-1.5 rounded-md font-semibold uppercase cursor-pointer">
              Offsite
            </button>
            <button className="bg-[#00D4AA] text-white text-xs px-4 py-1.5 rounded-md font-semibold uppercase cursor-pointer">
              Onsite
            </button>
          </div>
        </div>

        {/* Right Side: Chart with Center Label */}
        <div className="flex-shrink-0 relative">
          <ResponsiveContainer width={200} height={200}>
            <PieChart>
              <Pie
                data={attendanceData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
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
            <div className="text-3xl font-bold text-gray-900">31</div>
            <div className="text-xs text-gray-500 font-medium">DAYS</div>
          </div>
        </div>
      </div>
    </div>
  );
}
