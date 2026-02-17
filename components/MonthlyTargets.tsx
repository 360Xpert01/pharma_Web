import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { monthlyTargets, monthlyData } from "../app/data/mockData";

export default function MonthlyTargets() {
  return (
    <div className="bg-(--background) w-[33%]  rounded-8 shadow-soft p-3">
      <h2 className="text-lg font-semibold mb-4">Monthly Targets</h2>
      <div className="flex justify-around mb-6">
        <div className="text-center">
          <p className="text-3xl font-bold text-(--primary)">{monthlyTargets.thisMonth}</p>
          <p className="text-sm text-(--gray-5)">This month</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold text-(--destructive)">{monthlyTargets.lastMonth}</p>
          <p className="text-sm text-(--gray-5)">Last month</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={monthlyData}>
          <XAxis dataKey="month" tick={{ fontSize: 12 }} />
          <Tooltip />
          <Bar dataKey="target" fill="var(--primary-1)" radius={[4, 4, 0, 0]} />
          <Bar dataKey="achieved" fill="var(--destructive)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
