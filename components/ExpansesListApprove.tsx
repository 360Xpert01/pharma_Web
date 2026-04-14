"use client";

import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button/button";
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
interface ExpenseItem {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: "Review" | "Rejected";
  total: number;
  approved: number;
  rejected: number;
}

export default function ExpenseApprovalList() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [showCalendar, setShowCalendar] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isDiscardModalOpen, setIsDiscardModalOpen] = useState(false);
  const [approving, setApproving] = useState(false);
  const [dataStart, setDataStart] = useState(format(new Date(), "yyyy-MM-dd"));
  const [dataEnd, setDataEnd] = useState(format(new Date(), "yyyy-MM-dd"));
  console.log("dataStart", dataStart);
  console.log("dataEnd", dataEnd);
  const currentDate = format(new Date(), "yyyy-MM-dd");
  const sevenDaysAfter = format(addDays(new Date(), 7), "yyyy-MM-dd");
  const [dateRange, setDateRange] = useState<Range[]>([
    {
      startDate: new Date(), // 2026-01-14
      endDate: new Date(sevenDaysAfter),
      key: "selection",
    },
  ]);

  const [selectedExpense, setSelectedExpense] = useState<any | null>(null);
  const from = "2026-01-12";
  const to = "2026-01-13";

  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state: any) => state.weekelyCallExpenses);
  const expensesAPI = data?.completedCalls || [];

  useEffect(() => {
    dispatch(
      fetchWeeklyCallExpenses({
        salesmanId: id,
        from: currentDate,
        to: sevenDaysAfter,
      })
    );
  }, [dispatch, from, to]);

  const selectionRange = dateRange[0];

  const handleSelect = (ranges: any) => {
    setDateRange([ranges.selection]);
    setDataStart(format(ranges.selection.startDate!, "yyyy-MM-dd"));
    setDataEnd(format(ranges.selection.endDate!, "yyyy-MM-dd"));
  };

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
  return (
    <div className="">
      <div className="mt-3">
        <div className="flex items-center justify-between mb-6 relative">
          <h2 className="t-h3">Weekly Expenses</h2>
          <div
            className="flex items-center gap-2 text-(--primary) text-sm font-medium cursor-pointer hover:opacity-80 transition"
            onClick={() => setShowCalendar(!showCalendar)}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>{displayText}</span>
            <ChevronRight className="w-4 h-4" />
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
                  onClick={() => setIsDiscardModalOpen(true)}
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

        <div className="space-y-3">
          {expensesAPI.map((item) => (
            <div key={item.callDate} className="mb-8">
              {/* Date as section header */}

              {/* <h3 className="t-h3 mb-4 font-bold text-lg">
            {new Date(item.callDate).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </h3> */}

              {item.calls.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleCardClick(item)}
                  className="flex items-center rounded-8 shadow-soft  bg-(--background) p-4 cursor-pointer hover:shadow-md hover:border-(--primary) transition-all"
                >
                  {/* Left: User Info */}
                  <div className="flex items-center gap-4 w-[25%]">
                    <div className="relative">
                      <div className="w-14 h-14 rounded-8 overflow-hidden border-2 border-white shadow-soft">
                        <ImageWithFallback
                          src={item.profilepicture}
                          alt={item.name}
                          width={50}
                          height={50}
                          className="object-cover"
                          fallbackSrc="/girlPic.png"
                        />
                      </div>
                    </div>

                    <div>
                      <h3 className="t-label-b">{item.fullname}</h3>
                      <div className="flex items-center gap-2">
                        <p className="t-sm">{item.specialization}</p>
                        <span
                          className={`px-2 py-0.5 text-xs font-medium rounded-8 ${
                            item.status === "Pending"
                              ? "bg-(--warning-light) text-(--warning-2)"
                              : item.status === "Rejected" || item.status === "rejected"
                                ? "bg-(--destructive-light) text-(--destructive)"
                                : "bg-(--success-light) text-(--success)"
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Center: Expense Breakdown - Three evenly distributed columns */}
                  <div className="flex items-center flex-1">
                    <div className="w-1/3 text-center">
                      <p className="t-cap">Total Expense</p>
                      <p className="t-val-sm t-warn">
                        {item.totalExpense.toLocaleString()}
                        <span className="t-sm t-warn ml-1">PKR</span>
                      </p>
                    </div>
                    <div className="w-1/3 text-center">
                      <p className="t-cap">Approved</p>
                      <p className="t-val-sm t-ok">
                        {item.approvedExpense.toLocaleString()}
                        <span className="t-sm t-ok ml-1">PKR</span>
                      </p>
                    </div>
                    <div className="w-1/3 text-center">
                      <p className="t-cap">Rejected</p>
                      <p className="t-val-sm t-err">
                        {item.rejectedExpense.toLocaleString()}
                        <span className="t-sm t-err ml-1">PKR</span>
                      </p>
                    </div>
                  </div>

                  {/* Right: Action Buttons */}
                  {item.status === "Pending" && (
                    <div className="flex items-center gap-3 w-[20%] justify-end">
                      <Button
                        variant="primary"
                        size="sm"
                        rounded="xl"
                        className="px-5"
                        disabled={statusUpdating === item.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStatusUpdate(item.id, "approved");
                        }}
                      >
                        {statusUpdating === item.id ? "..." : "Approve"}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        rounded="xl"
                        className="px-5 border-(--destructive-1) text-(--destructive) hover:bg-(--destructive-light) hover:text-(--destructive) hover:border-(--destructive)"
                        disabled={statusUpdating === item.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStatusUpdate(item.id, "rejected");
                        }}
                      >
                        {statusUpdating === item.id ? "..." : "Reject"}
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <ExpenseDetailsModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        selectedExpenseData={selectedExpense}
        isLoading={approving}
      />

      <ConfirmModal
        isOpen={isDiscardModalOpen}
        onClose={() => setIsDiscardModalOpen(false)}
        onConfirm={() => {
          setIsDiscardModalOpen(false);
          setShowCalendar(false);
        }}
        title="Discard date selection?"
        description="Are you sure you want to discard your selected date range?"
        confirmLabel="Discard"
      />
    </div>
  );
}
