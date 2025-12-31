"use client";

import React from "react";
import { Check, X } from "lucide-react";

interface ExpenseRequestItemProps {
  title: string;
  currency?: string;
  onApprove?: () => void;
  onReject?: () => void;
}

const ExpenseRequestItem: React.FC<ExpenseRequestItemProps> = ({
  title,
  currency = "PKR",
  onApprove,
  onReject,
}) => {
  return (
    <div className="bg-(--background) rounded-2xl shadow-sm border border-(--gray-2) p-4 flex items-center justify-between hover:shadow-md transition-shadow">
      <div className="flex-1">
        <h3 className="text-base font-medium text-(--gray-9)">{title}</h3>
      </div>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <button
            onClick={onApprove}
            className="px-4 py-2 bg-(--primary) text-(--light) text-sm font-medium rounded-full hover:bg-(--primary-2) transition-colors flex items-center gap-1 shadow-sm"
          >
            <Check className="w-4 h-4" />
            Approve
          </button>
          <button
            onClick={onReject}
            className="px-4 py-2 border border-(--destructive) text-(--destructive) text-sm font-medium rounded-full hover:bg-(--destructive-0) transition-colors flex items-center gap-1"
          >
            <X className="w-4 h-4" />
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpenseRequestItem;
