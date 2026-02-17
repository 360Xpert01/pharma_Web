import { ArrowUp, ArrowDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  trend?: "up" | "down";
}

export default function StatCard({ title, value, change, trend }: StatCardProps) {
  return (
    <div className="bg-(--background) rounded-8 p-4 shadow-soft border border-(--gray-1)">
      <p className="t-md">{title}</p>
      <div className="flex items-end gap-2 mt-1">
        <p className="t-val">{value}</p>
        {change && (
          <p className={`t-sm flex items-center ${trend === "up" ? "t-ok" : "t-err"}`}>
            {trend === "up" ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
            {change}
          </p>
        )}
      </div>
    </div>
  );
}
