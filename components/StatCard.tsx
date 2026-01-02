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
      <p className="text-sm text-(--gray-6)">{title}</p>
      <div className="flex items-end gap-2 mt-1">
        <p className="text-2xl font-semibold">{value}</p>
        {change && (
          <p
            className={`text-sm flex items-center ${trend === "up" ? "text-(--success)" : "text-(--destructive)"}`}
          >
            {trend === "up" ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
            {change}
          </p>
        )}
      </div>
    </div>
  );
}
