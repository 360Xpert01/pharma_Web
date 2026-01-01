import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { brandData } from "../app/data/mockData";
interface ByBrandsProps {
  height?: number | string;
}
export default function ByBrands({ height }: ByBrandsProps) {
  return (
    <div className="bg-(--background)  rounded-xl shadow-soft p-4">
      <h2 className="text-lg font-semibold mb-4">By Brands</h2>
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie
            data={brandData}
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={90}
            paddingAngle={9}
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
            className="text-white text-sm p-3 rounded cursor-pointer"
          >
            {b.name}
          </button>
        ))}
      </div>
    </div>
  );
}
