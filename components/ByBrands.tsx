import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { brandData } from "../app/data/mockData";

export default function ByBrands() {
  return (
    <div className="bg-white w-[33%] rounded-xl shadow-sm p-4">
      <h2 className="text-lg font-semibold mb-4">By Brands</h2>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={brandData}
            cx="50%"
            cy="50%"
            innerRadius={45}
            outerRadius={70}
            paddingAngle={5}
            dataKey="value"
          >
            {brandData.map((entry, i) => (
              <Cell key={`cell-${i}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <div className="flex justify-center gap-2 mt-4 flex-wrap">
        {brandData.map((b) => (
          <button
            key={b.name}
            style={{ backgroundColor: b.color }}
            className="text-white text-sm p-3 rounded"
          >
            {b.name}
          </button>
        ))}
      </div>
    </div>
  );
}
