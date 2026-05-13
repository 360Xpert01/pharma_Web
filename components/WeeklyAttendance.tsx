"use client";

import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, AlertTriangle, LogIn, LogOut } from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/store";
import { useSearchParams } from "next/navigation";
import { DateRange, Range } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format, addDays } from "date-fns";
import { fetchAttendanceList } from "@/store/slices/Attendance/AttandanceGetSlice";
import { ConfirmModal } from "./shared/confirm-modal";
import NoDataFound from "./shared/NoDataFound";
import { Loader2 } from "lucide-react";

export default function AttendanceDashboard({
  dateRange,
  setDateRange,
}: {
  dateRange: Range[];
  setDateRange: (range: Range[]) => void;
}) {
  const dispatch = useAppDispatch();
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

  const { list: attendanceList, loading } = useAppSelector((state) => state.attendance);
  console.log(attendanceList, "attendanceList");

  useEffect(() => {
    if (id) {
      dispatch(fetchAttendanceList({ userId: id, from: dataStart, to: dataEnd }));
    }
  }, [dispatch, id, dataStart, dataEnd]);

  const displayText = `${format(selectionRange.startDate!, "dd MMM yyyy")} - ${format(
    selectionRange.endDate!,
    "dd MMM yyyy"
  )}`;

  return (
    <div className=" mx-auto ">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 relative">
        <h2 className="t-h3">Weekly Attendance</h2>

        <div className="flex items-center gap-2 text-primary text-sm font-medium">
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
          <div className="absolute right-0 top-12 mt-2 z-[1000] bg-white rounded-lg shadow-xl p-3 border border-gray-200">
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
                  if (id) {
                    dispatch(fetchAttendanceList({ userId: id, from: dataStart, to: dataEnd }));
                  }
                  setShowCalendar(false);
                }}
                className="px-4 py-2 text-sm bg-primary text-white rounded hover:bg-blue-600"
              >
                Apply
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Attendance List */}
      <div className="space-y-3">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 grayscale opacity-50">
            <Loader2 className="w-10 h-10 animate-spin text-(--primary) mb-4" />
            <p className="t-label-sm">Loading weekly attendance...</p>
          </div>
        ) : attendanceList && attendanceList.length > 0 ? (
          attendanceList.map((item: any, index: any) => {
            const record = item.records && item.records.length > 0 ? item.records[0] : item;
            return (
              <div
                key={index}
                className="grid grid-cols-12 items-center bg-white rounded-xl border border-gray-100 shadow-sm px-6 py-4 hover:shadow-md transition-shadow"
              >
                {/* Day & Date */}
                <div className="col-span-3">
                  <h4 className="text-lg font-bold text-gray-900 leading-tight">
                    {item.dayName || item.day || "N/A"}
                  </h4>
                  <p className="text-sm text-gray-500 font-medium">
                    {item.attendanceDateFormatted}
                  </p>
                </div>

                {/* Check-In */}
                <div className="col-span-3 flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                    <LogIn className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-md font-bold text-gray-800">
                      {record?.checkInAtPKT || "---"}
                    </p>
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                      Check-in
                    </p>
                  </div>
                </div>

                {/* Check-Out */}
                <div className="col-span-3 flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                    <LogOut className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-md font-bold text-gray-800">
                      {record?.checkOutAtPKT || "---"}
                    </p>
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                      Check-out
                    </p>
                  </div>
                </div>

                {/* Remarks / Offsite Status */}
                <div className="col-span-3 flex justify-end">
                  {record?.flaggedReason ? (
                    <div className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-lg border border-red-100">
                      <AlertTriangle className="w-4 h-4" />
                      <span className="text-xs font-bold whitespace-nowrap">
                        {record.flaggedReason}
                      </span>
                    </div>
                  ) : (
                    <div className="bg-gray-50 text-gray-400 px-8 py-2 rounded-lg text-xs font-medium border border-gray-100 italic">
                      No remarks
                    </div>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <NoDataFound />
        )}
      </div>
    </div>
  );
}
