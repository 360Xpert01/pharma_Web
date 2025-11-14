import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { monthlyTargets, monthlyData } from "../app/data/mockData";

export default function MonthlyTargets() {
  return (
    <div className="bg-white w-[33%]  rounded-xl shadow-sm p-3">
      <h2 className="text-lg font-semibold mb-4">Monthly Targets</h2>
      <div className="flex justify-around mb-6">
        <div className="text-center">
          <p className="text-3xl font-bold text-blue-600">{monthlyTargets.thisMonth}</p>
          <p className="text-sm text-gray-600">This month</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold text-red-700">{monthlyTargets.lastMonth}</p>
          <p className="text-sm text-gray-600">Last month</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={monthlyData}>
          <XAxis dataKey="month" tick={{ fontSize: 12 }} />
          <Tooltip />
          <Bar dataKey="target" fill="#93c5fd" radius={[4, 4, 0, 0]} />
          <Bar dataKey="achieved" fill="#ef4444" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
