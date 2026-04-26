"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Eye, Loader2 } from "lucide-react";
import { DateRange, Range } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { addDays, format } from "date-fns";
import ExpenseDetailsModal from "./ExpenseDetailsModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeeklyCallExpenses } from "@/store/slices/employeeProfile/weeklyCallExpensesSlice";
import { updateExpenseStatus } from "@/store/slices/expense/expenseStatusSlice";
import { useSearchParams } from "next/navigation";
import ImageWithFallback from "./shared/ImageWithFallback";
import { ConfirmModal } from "./shared/confirm-modal";
import { toast } from "react-hot-toast";
import NoDataFound from "./shared/NoDataFound";

export default function ExpenseApprovalList({
  dateRange,
  setDateRange,
}: {
  dateRange: Range[];
  setDateRange: (range: Range[]) => void;
}) {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const selectionRange = dateRange[0];

  const [dataStart, setDataStart] = useState(format(selectionRange.startDate!, "yyyy-MM-dd"));
  const [dataEnd, setDataEnd] = useState(format(selectionRange.endDate!, "yyyy-MM-dd"));

  // Update dataStart/dataEnd when dateRange prop changes
  useEffect(() => {
    setDataStart(format(selectionRange.startDate!, "yyyy-MM-dd"));
    setDataEnd(format(selectionRange.endDate!, "yyyy-MM-dd"));
  }, [selectionRange.startDate, selectionRange.endDate]);

  const [showCalendar, setShowCalendar] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isDiscardModalOpen, setIsDiscardModalOpen] = useState(false);
  const [approving, setApproving] = useState(false);

  const [selectedExpense, setSelectedExpense] = useState<any | null>(null);

  const handleSelect = (ranges: any) => {
    setDateRange([ranges.selection]);
  };

  const handlePrevWeek = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newStart = addDays(selectionRange.startDate!, -7);
    const newEnd = addDays(selectionRange.endDate!, -7);
    setDateRange([{ startDate: newStart, endDate: newEnd, key: "selection" }]);
  };

  const handleNextWeek = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newStart = addDays(selectionRange.startDate!, 7);
    const newEnd = addDays(selectionRange.endDate!, 7);
    setDateRange([{ startDate: newStart, endDate: newEnd, key: "selection" }]);
  };

  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state: any) => state.weekelyCallExpenses);
  const expensesAPI = data?.completedCalls || [];

  useEffect(() => {
    if (id) {
      dispatch(
        fetchWeeklyCallExpenses({
          salesmanId: id,
          from: dataStart,
          to: dataEnd,
        }) as any
      );
    }
  }, [dispatch, id, dataStart, dataEnd]);

  const displayText = `${format(selectionRange.startDate!, "dd MMM yyyy")} - ${format(
    selectionRange.endDate!,
    "dd MMM yyyy"
  )}`;

  const handleCardClick = (expense: any) => {
    setSelectedExpense(expense);
    setShowModal(true);
  };

  const [statusUpdating, setStatusUpdating] = useState<string | null>(null);

  const handleStatusUpdate = async (callId: string, status: "approved" | "rejected") => {
    setStatusUpdating(callId);
    try {
      await dispatch(updateExpenseStatus({ callId, status }) as any).unwrap();
      toast.success(`Expense ${status} successfully`);
      // Refresh the list
      dispatch(
        fetchWeeklyCallExpenses({
          salesmanId: id as string,
          from: dataStart,
          to: dataEnd,
        }) as any
      );
    } catch (err: any) {
      toast.error(err || `Failed to ${status} expense`);
    } finally {
      setStatusUpdating(null);
    }
  };

  const filteredExpenses = expensesAPI
    .map((group: any) => ({
      ...group,
      calls: group.calls.filter((call: any) => call.totalExpense > 0),
    }))
    .filter((group: any) => group.calls.length > 0);

  return (
    <div className="">
      <div className="mt-3">
        <div className="flex items-center justify-between mb-6 relative">
          <h2 className="t-h3">Weekly Expenses</h2>
          <div className="flex items-center gap-2 text-(--primary) text-sm font-medium">
            <ChevronLeft
              className="w-4 h-4 cursor-pointer hover:bg-blue-50 rounded-full transition"
              onClick={handlePrevWeek}
            />
            <span
              className="cursor-pointer hover:opacity-80 transition"
              onClick={() => setShowCalendar(!showCalendar)}
            >
              {displayText}
            </span>
            <ChevronRight
              className="w-4 h-4 cursor-pointer hover:bg-blue-50 rounded-full transition"
              onClick={handleNextWeek}
            />
          </div>

          {/* Calendar Popup */}
          {showCalendar && (
            <div className="absolute right-0 top-9 mt-2 z-1000 bg-white rounded-lg shadow-xl p-3 border border-gray-200">
              <DateRange
                editableDateInputs={true}
                onChange={handleSelect}
                moveRangeOnFirstSelection={false}
                ranges={dateRange}
                direction="horizontal"
                months={1}
                showDateDisplay={false}
                showMonthAndYearPickers={true}
                rangeColors={["#3b82f6", "#3b82f6"]}
              />

              <div className="flex justify-end gap-3 mt-3 pt-3 border-t">
                <button
                  onClick={() => setShowCalendar(false)}
                  className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    (dispatch(
                      fetchWeeklyCallExpenses({
                        salesmanId: id,
                        from: dataStart,
                        to: dataEnd,
                      })
                    ),
                      setShowCalendar(false));
                  }}
                  className="px-4 py-2 text-sm bg-primary text-white rounded hover:bg-blue-600"
                >
                  Apply
                </button>
              </div>
            </div>
          )}
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 grayscale opacity-50">
            <Loader2 className="w-10 h-10 animate-spin text-(--primary) mb-4" />
            <p className="t-label-sm">Loading weekly expenses...</p>
          </div>
        ) : filteredExpenses.length === 0 ? (
          <NoDataFound />
        ) : (
          <div className="space-y-1">
            {filteredExpenses.map(({ callDate, calls }: any) => (
              <div key={callDate} className="mb-8">
                {/* Date as section header */}

                {/* <h3 className="t-h3 mb-4 font-bold text-lg">
            {new Date(callDate).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </h3> */}

                {calls.map((call: any) => (
                  <div
                    key={call.id}
                    onClick={() => handleCardClick(call)}
                    className="flex items-center rounded-8 shadow-soft bg-(--background) p-4 cursor-pointer mb-4 last:mb-0"
                  >
                    {/* Left: User Info */}
                    <div className="flex items-center gap-4 w-[25%]">
                      <div className="relative">
                        <div className="w-14 h-14 rounded-8 overflow-hidden border-2 border-white">
                          <ImageWithFallback
                            src={call.profilepicture || call.partyImage}
                            alt={call.fullname || call.partyName || "User"}
                            width={50}
                            height={50}
                            className="object-cover"
                            fallbackSrc="/girlPic.png"
                          />
                        </div>
                      </div>

                      <div>
                        <h3 className="t-label-b">
                          {call.fullname || call.partyName || "Unknown"}
                        </h3>
                        <div className="flex items-center gap-2">
                          <p className="t-sm">
                            {call.specialization || call.partySpecialization || "Unknown"}
                          </p>
                          <span
                            className={`px-2 py-0.5 text-xs font-medium rounded-8 ${
                              call.status === "Pending"
                                ? "bg-(--warning-light) text-(--warning-2)"
                                : call.status === "Rejected" ||
                                    call.status === "rejected" ||
                                    call.status === "Rejected"
                                  ? "bg-(--destructive-light) text-(--destructive)"
                                  : "bg-(--success-light) text-(--success)"
                            }`}
                          >
                            {call.status}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Date Column */}
                    <div className="w-[15%] text-center">
                      <p className="t-cap">Date</p>
                      <p className="t-label-sm">
                        {callDate ? format(new Date(callDate), "dd MMM yyyy") : "N/A"}
                      </p>
                    </div>

                    {/* Center: Expense Breakdown - Three evenly distributed columns */}
                    <div className="flex items-center flex-1">
                      <div className="w-1/3 text-center">
                        <p className="t-cap">Total Expense</p>
                        <p className="t-val-sm t-warn">
                          {call.totalExpense.toLocaleString()}
                          <span className="t-sm t-warn ml-1">PKR</span>
                        </p>
                      </div>
                      <div className="w-1/3 text-center">
                        <p className="t-cap">Approved</p>
                        <p className="t-val-sm t-ok">
                          {call.approvedExpense.toLocaleString()}
                          <span className="t-sm t-ok ml-1">PKR</span>
                        </p>
                      </div>
                      <div className="w-1/3 text-center">
                        <p className="t-cap">Rejected</p>
                        <p className="t-val-sm t-err">
                          {call.rejectedExpense.toLocaleString()}
                          <span className="t-sm t-err ml-1">PKR</span>
                        </p>
                      </div>
                    </div>

                    {/* Right: Detail Action */}
                    <div className="flex items-center justify-end w-[10%]">
                      <div
                        className="p-2 hover:bg-gray-100 rounded-full text-blue-600 transition-colors"
                        title="View Details"
                      >
                        <Eye size={20} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

      <ExpenseDetailsModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        selectedExpenseData={selectedExpense}
        isLoading={approving}
        showBulkActions={true}
        onSuccess={() => {
          dispatch(
            fetchWeeklyCallExpenses({
              salesmanId: id as string,
              from: dataStart,
              to: dataEnd,
            }) as any
          );
        }}
      />
    </div>
  );
}
