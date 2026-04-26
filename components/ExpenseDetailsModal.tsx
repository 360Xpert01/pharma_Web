import React, { useState, useEffect } from "react";
import { X, Loader2 } from "lucide-react";
import { RoleGuard } from "@/components/shared/RoleGuard";
import { updateExpenseStatus } from "@/store/slices/expense/expenseStatusSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchExpenseDetailsByCallId } from "@/store/slices/expense/getDetailedExpenseSlice";
import { updateSingleExpenseItemStatus } from "@/store/slices/expense/updateSingleExpenseStatus";

interface ExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedExpenseData?: {
    id: string;
    totalExpense: number;
    approvedExpense: number;
    rejectedExpense: number;
  };
  isLoading?: boolean;
  showBulkActions?: boolean;
  onSuccess?: () => void;
}

export default function ExpenseDetailsModal({
  isOpen,
  onClose,
  selectedExpenseData,
  showBulkActions = true,
  onSuccess,
}: ExpenseModalProps) {
  const dispatch = useAppDispatch();
  const { data: detailedExpenses, loading: detailsLoading } = useAppSelector(
    (state) => state.detailedExpense
  );

  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Fetch details when modal opens
  useEffect(() => {
    if (isOpen && selectedExpenseData?.id) {
      dispatch(fetchExpenseDetailsByCallId(selectedExpenseData.id));
    }
  }, [isOpen, selectedExpenseData?.id, dispatch]);

  if (!isOpen) return null;

  const handleBulkUpdate = async (newStatus: "approved" | "rejected") => {
    if (!selectedExpenseData?.id) return;
    setUpdatingId("bulk");
    try {
      await dispatch(
        updateExpenseStatus({
          callId: selectedExpenseData.id,
          status: newStatus,
        })
      );
      dispatch(fetchExpenseDetailsByCallId(selectedExpenseData.id));
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Bulk update failed:", error);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleUpdateStatus = async (newStatus: "approved" | "rejected", callId: string) => {
    setUpdatingId(callId);
    try {
      const resp: any = await dispatch(
        updateSingleExpenseItemStatus({
          id: callId,
          status: newStatus,
        })
      );

      if (resp.meta.requestStatus === "fulfilled") {
        // Status update is handled in the slice extraReducers
        if (onSuccess) onSuccess();
      }
    } catch (error) {
      console.error("Update failed:", error);
    } finally {
      setUpdatingId(null);
    }
  };

  const totalApproved =
    detailedExpenses.length > 0
      ? detailedExpenses
          .filter((exp: any) => exp.status?.toLowerCase() === "approved")
          .reduce((sum: number, exp: any) => sum + exp.amount, 0)
      : selectedExpenseData?.approvedExpense || 0;

  const totalRejected =
    detailedExpenses.length > 0
      ? detailedExpenses
          .filter((exp: any) => exp.status?.toLowerCase() === "rejected")
          .reduce((sum: number, exp: any) => sum + exp.amount, 0)
      : selectedExpenseData?.rejectedExpense || 0;

  const totalExpense =
    detailedExpenses.length > 0
      ? detailedExpenses.reduce((sum: number, exp: any) => sum + exp.amount, 0)
      : selectedExpenseData?.totalExpense || 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-(--background) rounded-8 shadow-soft w-full max-w-4xl overflow-hidden animate-in fade-in zoom-in-95">
        {/* Header Section */}
        <div className="p-4 sm:p-8 pb-4 relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 sm:right-6 sm:top-6 p-2 t-mute hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pr-10 gap-4">
              <h1 className="t-h1 text-gray-900">Expense Details</h1>
              {showBulkActions && (
                <div className="flex gap-3">
                  <RoleGuard action="approve">
                    <button
                      onClick={() => handleBulkUpdate("approved")}
                      disabled={updatingId !== null}
                      className="px-4 sm:px-5 py-2 bg-primary text-white rounded-8 t-label-b hover:bg-primary-2 transition-all disabled:opacity-50 active:scale-95 whitespace-nowrap text-xs sm:text-sm"
                    >
                      Approve All
                    </button>
                  </RoleGuard>
                  <RoleGuard action="reject">
                    <button
                      onClick={() => handleBulkUpdate("rejected")}
                      disabled={updatingId !== null}
                      className="px-4 sm:px-5 py-2 bg-white t-err border border-destructive rounded-8 t-label-b hover:bg-red-50 transition-all disabled:opacity-50 active:scale-95 whitespace-nowrap text-xs sm:text-sm"
                    >
                      Reject All
                    </button>
                  </RoleGuard>
                </div>
              )}
            </div>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="max-w-md">
                <p className="t-md t-mute mb-4">
                  Please review and confirm this expense before approval or rejection
                </p>
              </div>

              <div className="grid grid-cols-2 sm:flex gap-4 sm:gap-8 md:gap-10">
                <div className="flex flex-col items-start">
                  <p className="t-over t-mute mb-1 text-[10px]">Total Expense</p>
                  <p className="t-val-sm t-warn flex items-baseline gap-1">
                    {totalExpense.toLocaleString()}
                    <span className="text-[10px] font-medium">PKR</span>
                  </p>
                </div>
                <div className="flex flex-col items-start">
                  <p className="t-over t-mute mb-1 text-[10px]">Approved</p>
                  <p className="t-val-sm t-ok flex items-baseline gap-1">
                    {totalApproved.toLocaleString()}
                    <span className="text-[10px] font-medium">PKR</span>
                  </p>
                </div>
                <div className="flex flex-col items-start">
                  <p className="t-over t-mute mb-1 text-[10px]">Rejected</p>
                  <p className="t-val-sm t-err flex items-baseline gap-1">
                    {totalRejected.toLocaleString()}
                    <span className="text-[10px] font-medium">PKR</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Expense List */}
        <div className="p-4 sm:p-8 pt-4 pb-10 max-h-[460px] overflow-y-auto custom-scrollbar border-t border-gray-100">
          {detailsLoading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="animate-spin text-primary" size={40} />
              <p className="t-mute t-md">Loading expense details</p>
            </div>
          ) : (
            <div className="space-y-4">
              {detailedExpenses.length > 0 ? (
                detailedExpenses.map((exp) => {
                  const status = exp.status?.toLowerCase();
                  return (
                    <div
                      key={exp.id}
                      className={`p-4 rounded-8 border-2 transition-all duration-300 ${
                        status === "approved"
                          ? "border-success bg-white"
                          : status === "rejected"
                            ? "border-destructive bg-white"
                            : "border-gray-200 bg-white"
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-2">
                        <div className="flex-1">
                          <h3
                            className={`t-h5 font-semibold ${
                              status === "approved"
                                ? "t-ok text-success"
                                : status === "rejected"
                                  ? "t-err text-destructive"
                                  : "text-gray-900"
                            }`}
                          >
                            {exp.title}
                          </h3>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 sm:gap-12 md:gap-16">
                          <p
                            className={`t-val font-bold ${
                              status === "approved"
                                ? "t-ok text-success"
                                : status === "rejected"
                                  ? "t-err text-destructive"
                                  : "text-gray-700"
                            } flex items-baseline gap-2 text-xl`}
                          >
                            {exp.amount.toLocaleString()}
                            <span className="text-[12px] font-semibold uppercase">PKR</span>
                          </p>

                          <div className="min-w-[140px] flex sm:justify-end">
                            {updatingId === exp.id || updatingId === "bulk" ? (
                              <div className="flex justify-center w-full">
                                <Loader2 className="animate-spin text-primary" size={24} />
                              </div>
                            ) : status === "approved" ? (
                              <div className="px-8 py-2 bg-success text-white rounded-8 t-label-b text-sm flex items-center justify-center min-w-[120px]">
                                Approved
                              </div>
                            ) : status === "rejected" ? (
                              <div className="px-8 py-2 bg-white t-err border border-destructive rounded-8 t-label-b text-sm flex items-center justify-center min-w-[120px]">
                                Rejected
                              </div>
                            ) : (
                              <div className="flex gap-3">
                                <RoleGuard action="approve">
                                  <button
                                    onClick={() => handleUpdateStatus("approved", exp.id)}
                                    className="px-6 sm:px-7 py-2 bg-primary text-white rounded-8 t-label-b text-sm shadow-soft hover:bg-primary-2 transition-all active:scale-95"
                                  >
                                    Approve
                                  </button>
                                </RoleGuard>
                                <RoleGuard action="reject">
                                  <button
                                    onClick={() => handleUpdateStatus("rejected", exp.id)}
                                    className="px-6 sm:px-7 py-2 bg-white t-err border border-destructive rounded-8 t-label-b text-sm hover:bg-red-50 transition-all active:scale-95"
                                  >
                                    Reject
                                  </button>
                                </RoleGuard>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-16 bg-gray-50 rounded-8 border border-dashed border-gray-300">
                  <p className="t-mute t-sm">No expense records found for this claim.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
