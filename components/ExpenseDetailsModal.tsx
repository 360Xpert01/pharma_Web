"use client";

import React from "react";
import { X, CheckCircle, XCircle } from "lucide-react";

interface ExpenseItem {
  id?: string;
  description: string;
  amount: number;
  status?: "approved" | "rejected" | "pending";
}

interface ExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  expenses: ExpenseItem[];
  totalExpense: number;
  approvedAmount: number;
  rejectedAmount: number;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  isLoading?: boolean;
  selectedExpenseData?: ExpenseItem[];
}

export default function ExpenseDetailsModal({
  isOpen,
  onClose,
  expenses,
  totalExpense,
  approvedAmount,
  rejectedAmount,
  onApprove,
  onReject,
  isLoading = false,
  selectedExpenseData,
}: ExpenseModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 overflow-hidden animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-5 text-white">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Expense Details</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
              disabled={isLoading}
            >
              <X size={24} />
            </button>
          </div>
          <p className="mt-1 text-blue-100">
            Please review and confirm this expense before approval or rejection
          </p>
        </div>

        {/* Summary */}
        <div className="p-6 border-b bg-gray-50">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-sm text-gray-600">Total Expense</p>
              <p className="text-2xl font-bold text-yellow-600">
                {selectedExpenseData?.totalExpense.toLocaleString()} PKR
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Approved</p>
              <p className="text-2xl font-bold text-green-600">
                {selectedExpenseData?.approvedExpense.toLocaleString()} PKR
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Rejected</p>
              <p className="text-2xl font-bold text-red-600">
                {selectedExpenseData?.rejectedExpense.toLocaleString()} PKR
              </p>
            </div>
          </div>
        </div>

        {/* Expense List */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          <div className="space-y-4">
            {selectedExpenseData?.callExpenses.map((exp, index) => (
              <div
                key={exp.id || index}
                className={`p-4 rounded-xl border transition-all ${
                  exp.status === "completed"
                    ? "bg-green-50 border-green-200"
                    : exp.status === "rejected"
                      ? "bg-red-50 border-red-200"
                      : "bg-white border-gray-200 hover:border-blue-300"
                }`}
              >
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{exp.title}</h3>
                    <p className="text-lg font-bold text-gray-800 mt-1">
                      {exp.amount.toLocaleString()} PKR
                    </p>
                  </div>

                  {/* Status / Actions */}
                  <div className="flex items-center gap-3">
                    {exp.status === "approved" ? (
                      <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full">
                        <CheckCircle size={18} />
                        <span className="font-medium">Approved</span>
                      </div>
                    ) : exp.status === "rejected" ? (
                      <div className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-full">
                        <XCircle size={18} />
                        <span className="font-medium">Rejected</span>
                      </div>
                    ) : (
                      <div className="flex gap-3">
                        <button
                          onClick={() => onApprove?.(exp.id || index.toString())}
                          disabled={isLoading}
                          className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors font-medium"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => onReject?.(exp.id || index.toString())}
                          disabled={isLoading}
                          className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors font-medium"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-5 border-t bg-gray-50 flex justify-end gap-4">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
