"use client";
import React, { useState, useEffect } from "react";
import { X, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { updateCallStatus } from "@/store/slices/employeeProfile/callSlice";
import { useDispatch } from "react-redux";

interface ExpenseItem {
  id: string;
  title: string;
  amount: number;
  status: "approved" | "rejected" | "pending";
}

interface ExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedExpenseData?: {
    totalExpense: number;
    approvedExpense: number;
    rejectedExpense: number;
    callExpenses: ExpenseItem[];
  };
  isLoading?: boolean;
}

export default function ExpenseDetailsModal({
  isOpen,
  onClose,
  selectedExpenseData,
  isLoading: externalLoading = false,
}: ExpenseModalProps) {
  const dispatch = useDispatch();

  // Local state to manage UI updates immediately after dispatch
  const [localExpenses, setLocalExpenses] = useState<ExpenseItem[]>([]);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Sync local state when modal opens or data changes
  useEffect(() => {
    if (selectedExpenseData?.callExpenses) {
      setLocalExpenses(selectedExpenseData.callExpenses);
    }
  }, [selectedExpenseData]);

  if (!isOpen) return null;

  const handleUpdateStatus = async (newStatus: "approved" | "rejected", callId: string) => {
    setUpdatingId(callId);
    try {
      const resp: any = await dispatch(
        updateCallStatus({
          callId,
          status: newStatus,
        })
      );

      // Agar response success hai toh local state filter/update karein
      if (resp.payload?.success) {
        setLocalExpenses((prev) =>
          prev.map((exp) => (exp.id === callId ? { ...exp, status: newStatus } : exp))
        );
      }
    } catch (error) {
      console.error("Update failed:", error);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-5 text-white">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Expense Details</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          <p className="mt-1 text-blue-100">Review and manage individual expense items</p>
        </div>

        {/* Summary Cards */}
        <div className="p-6 border-b bg-gray-50">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
              <p className="text-xs text-gray-500 uppercase font-semibold">Total</p>
              <p className="text-xl font-bold text-gray-800">
                {selectedExpenseData?.totalExpense.toLocaleString()}{" "}
                <span className="text-sm">PKR</span>
              </p>
            </div>
            <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
              <p className="text-xs text-green-600 uppercase font-semibold">Approved</p>
              <p className="text-xl font-bold text-green-600">
                {selectedExpenseData?.approvedExpense.toLocaleString()}{" "}
                <span className="text-sm">PKR</span>
              </p>
            </div>
            <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
              <p className="text-xs text-red-600 uppercase font-semibold">Rejected</p>
              <p className="text-xl font-bold text-red-600">
                {selectedExpenseData?.rejectedExpense.toLocaleString()}{" "}
                <span className="text-sm">PKR</span>
              </p>
            </div>
          </div>
        </div>

        {/* Expense List */}
        <div className="p-6 max-h-[50vh] overflow-y-auto">
          <div className="space-y-3">
            {localExpenses.length > 0 ? (
              localExpenses.map((exp) => (
                <div
                  key={exp.id}
                  className={`p-4 rounded-xl border transition-all ${
                    exp.status === "approved"
                      ? "bg-green-50 border-green-200"
                      : exp.status === "rejected"
                        ? "bg-red-50 border-red-200"
                        : "bg-white border-gray-200"
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{exp.title}</h3>
                      <p className="text-lg font-bold text-gray-700">
                        {exp.amount.toLocaleString()}{" "}
                        <span className="text-sm font-normal">PKR</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      {updatingId === exp.id ? (
                        <div className="flex items-center gap-2 text-blue-600 px-4">
                          <Loader2 className="animate-spin" size={20} />
                          <span className="text-sm font-medium">Updating...</span>
                        </div>
                      ) : exp.status === "approved" ? (
                        <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg">
                          <CheckCircle size={18} />
                          <span className="font-bold text-sm uppercase">Approved</span>
                        </div>
                      ) : exp.status === "rejected" ? (
                        <div className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg">
                          <XCircle size={18} />
                          <span className="font-bold text-sm uppercase">Rejected</span>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleUpdateStatus("approved", exp.id)}
                            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-semibold shadow-sm"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleUpdateStatus("rejected", exp.id)}
                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-semibold shadow-sm"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-10 text-gray-400">No expense records found.</div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t bg-gray-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors font-medium"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
