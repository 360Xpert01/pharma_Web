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

export default function AttendanceDashboard() {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [showCalendar, setShowCalendar] = useState(false);
  const [dataStart, setDataStart] = useState(format(new Date(), "yyyy-MM-dd"));
  const [dataEnd, setDataEnd] = useState(format(addDays(new Date(), 7), "yyyy-MM-dd"));
  const currentDate = format(new Date(), "yyyy-MM-dd");
  const sevenDaysAfter = format(addDays(new Date(), 7), "yyyy-MM-dd");

  const [dateRange, setDateRange] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  const selectionRange = dateRange[0];

  const handleSelect = (ranges: any) => {
    setDateRange([ranges.selection]);
    setDataStart(format(ranges.selection.startDate!, "yyyy-MM-dd"));
    setDataEnd(format(ranges.selection.endDate!, "yyyy-MM-dd"));
  };

  const attendanceList = useAppSelector((state) => state.attendance.list);
  console.log(attendanceList, "attendanceList");

  useEffect(() => {
    if (id) {
      dispatch(fetchAttendanceList({ userId: id, from: dataStart, to: dataEnd }));
    }
  }, [dispatch, id]);

  return (
    <div className=" mx-auto ">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 relative">
        <h2 className="text-2xl font-bold text-gray-800">Weekly Attendance</h2>
        <div
          className="flex items-center gap-4 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100 cursor-pointer"
          onClick={() => setShowCalendar(!showCalendar)}
        >
          <ChevronLeft className="w-5 h-5 text-blue-600" />
          <span className="text-sm font-semibold text-gray-700">
            {format(selectionRange.startDate!, "dd MMM, yyyy")} -{" "}
            {format(selectionRange.endDate!, "dd MMM, yyyy")}
          </span>
          <ChevronRight className="w-5 h-5 text-blue-600" />
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
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Apply
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Attendance List */}
      <div className="space-y-3">
        {attendanceList && attendanceList.length > 0 ? (
          attendanceList.map((item: any, index: any) => {
            const record = item.records && item.records.length > 0 ? item.records[0] : null;
            return (
              <div
                key={index}
                className="grid grid-cols-12 items-center bg-white rounded-xl border border-gray-100 shadow-sm px-6 py-4 hover:shadow-md transition-shadow"
              >
                {/* Day & Date */}
                <div className="col-span-3">
                  <h4 className="text-lg font-bold text-gray-900 leading-tight">{item.day}</h4>
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
          <div className="text-center py-10 text-gray-500">
            No attendance data found for the selected range.
          </div>
        )}
      </div>
    </div>
  );
}
