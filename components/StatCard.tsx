import { ArrowUp, ArrowDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  trend?: "up" | "down";
}

export default function StatCard({ title, value, change, trend }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
      <p className="text-sm text-gray-600">{title}</p>
      <div className="flex items-end gap-2 mt-1">
        <p className="text-2xl font-semibold">{value}</p>
        {change && (
          <p
            className={`text-sm flex items-center ${trend === "up" ? "text-green-600" : "text-red-600"}`}
          >
            {trend === "up" ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
            {change}
          </p>
        )}
      </div>
    </div>
  );
}
