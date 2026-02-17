"use client";

import React from "react";
import { Check, X } from "lucide-react";

interface ExpenseRequestItemProps {
  title: string;
  currency?: string;
  onApprove?: () => void;
  onReject?: () => void;
  isLoading?: boolean;
}

const ExpenseRequestItem: React.FC<ExpenseRequestItemProps> = ({
  title,
  currency = "PKR",
  onApprove,
  onReject,
  isLoading,
}) => {
  return (
    <div className="bg-(--background) rounded-8 shadow-soft border border-(--gray-2) p-4 flex items-center justify-between hover:shadow-soft transition-shadow">
      <div className="flex-1">
        <h3 className="t-label-b">{title}</h3>
      </div>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <button
            onClick={onApprove}
            disabled={isLoading}
            className="px-4 py-2 bg-(--primary) text-(--light) t-sm font-medium rounded-8 hover:bg-(--primary-2) transition-colors flex items-center gap-1 shadow-soft disabled:opacity-50 disabled:cursor-not-allowed min-w-[100px] justify-center"
          >
            {isLoading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                Loading...
              </>
            ) : (
              <>
                <Check className="w-4 h-4" />
                Approve
              </>
            )}
          </button>
          <button
            onClick={onReject}
            disabled={isLoading}
            className="px-4 py-2 border border-(--destructive) text-(--destructive) t-sm font-medium rounded-8 hover:bg-(--destructive-0) transition-colors flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed min-w-[100px] justify-center"
          >
            {isLoading ? (
              <>
                <span className="w-4 h-4 border-2 border-(--destructive)/30 border-t-(--destructive) rounded-full animate-spin"></span>
                Loading...
              </>
            ) : (
              <>
                <X className="w-4 h-4" />
                Reject
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpenseRequestItem;
