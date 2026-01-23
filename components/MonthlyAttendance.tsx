import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Mock data directly inside for the example
const attendanceData = [
  { name: "Absent", value: 32, color: "#FB7185" }, // Coral/Red
  { name: "Onsite", value: 53, color: "#34D399" }, // Mint/Green
  { name: "Offsite", value: 15, color: "#3B82F6" }, // Blue
];

export default function MonthlyAttendance() {
  return (
    <div className="w-full bg-white rounded-2xl p-8 shadow-sm border border-gray-100 min-h-[376px] flex flex-col justify-center">
      <div className="flex items-start justify-between">
        {/* Left Side: Title, Navigator and Badges */}
        <div className="flex flex-col h-full">
          <h2 className="text-2xl font-bold text-[#475569] mb-10">Monthly Attendance</h2>

          {/* Date Navigator - Pill Style */}
          <div className="inline-flex items-center gap-6 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-full text-gray-700 w-fit mb-12">
            <ChevronLeft className="w-5 h-5 cursor-pointer text-gray-400 hover:text-gray-600" />
            <span className="font-semibold text-sm">September 2025</span>
            <ChevronRight className="w-5 h-5 cursor-pointer text-gray-400 hover:text-gray-600" />
          </div>

          {/* Status Badges - Horizontal Row as per image */}
          <div className="flex items-center gap-3">
            <span className="bg-[#FB7185] text-white text-[12px] px-4 py-2 rounded-lg font-bold uppercase tracking-wider">
              ABSENT
            </span>
            <span className="bg-[#3B82F6] text-white text-[12px] px-4 py-2 rounded-lg font-bold uppercase tracking-wider">
              OFFSITE
            </span>
            <span className="bg-[#34D399] text-white text-[12px] px-4 py-2 rounded-lg font-bold uppercase tracking-wider">
              ONSITE
            </span>
          </div>
        </div>

        {/* Right Side: Large Doughnut Chart */}
        <div className="relative" style={{ width: "260px", height: "260px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={attendanceData}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={110}
                paddingAngle={2}
                dataKey="value"
                stroke="none"
                startAngle={90}
                endAngle={450}
              >
                {attendanceData.map((entry, i) => (
                  <Cell key={`cell-${i}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Center Text Label */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <div className="text-5xl font-bold text-[#1E293B]">31</div>
            <div className="text-xs text-gray-400 font-bold tracking-widest mt-1">DAYS</div>
          </div>

          {/* Tooltip-like percentage label (Optional decoration from image) */}
          <div className="absolute top-4 right-4 bg-white shadow-md border border-gray-50 px-2 py-1 rounded text-[10px] font-bold text-gray-400">
            32%
          </div>
        </div>
      </div>
    </div>
  );
}
