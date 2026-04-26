"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface NoDataFoundProps {
  title?: string;
  description?: string;
}

export default function NoDataFound({
  title = "No data found",
  description = "Try adjusting your date range filter",
}: NoDataFoundProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 grayscale opacity-50 border-2 border-dashed border-(--gray-2) rounded-12 bg-(--gray-0)/5 transition-all hover:bg-(--gray-0)/10">
      <div className="w-16 h-16 bg-(--gray-1) rounded-full flex items-center justify-center mb-4">
        <ChevronLeft className="w-8 h-8 text-(--gray-4) opacity-20" />
        <ChevronRight className="w-8 h-8 text-(--gray-4) opacity-20 -ml-4" />
      </div>
      <p className="t-h4 text-(--gray-5)">{title}</p>
      <p className="t-sm text-(--gray-4)">{description}</p>
    </div>
  );
}
