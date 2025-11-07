import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { attendanceData } from "../app/data/mockData";

export default function MonthlyAttendance() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 flex">
      <div className="w-[50%] flex flex-col justify-between">
        <h2 className="text-lg font-bold">Monthly Attendance</h2>
        <div className="flex items-center justify-center gap-1 text-black p-2 border border-gray-400 bg-gray-200 rounded-full">
          <ChevronLeft className="w-4 h-4" />
          <span className="font-bold">September 2025</span>
          <ChevronRight className="w-4 h-4" />
        </div>
        <div className="flex gap-2 flex-wrap">
          <button className="bg-red-400 text-white px-1 py-1 rounded">Absent</button>
          <button className="bg-blue-400 text-white px-1 py-1 rounded">Offsite</button>
          <button className="bg-green-400 text-white px-1 py-1 rounded">Onsite</button>
        </div>
      </div>
      <div className="w-[50%] flex items-center justify-center">
        <ResponsiveContainer width="100%" height={160}>
          <PieChart>
            <Pie
              data={attendanceData}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={75}
              paddingAngle={3}
              dataKey="value"
            >
              {attendanceData.map((entry, i) => (
                <Cell key={`cell-${i}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
