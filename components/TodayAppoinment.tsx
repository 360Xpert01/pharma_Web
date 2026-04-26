"use client";

import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, MapPin, Loader2 } from "lucide-react";
import ImageWithFallback from "./shared/ImageWithFallback";
import { DateRange, Range } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format, addDays } from "date-fns";
import { fetchWeeklyCallSchedule } from "@/store/slices/employeeProfile/weeklyCallsSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { useSearchParams } from "next/navigation";
import { ConfirmModal } from "./shared/confirm-modal";
import NoDataFound from "./shared/NoDataFound";

interface Appointment {
  id: string;
  title: string;
  doctorName: string;
  specialty: string;
  clinic: string;
  address: string;
  avatar?: string;
}

// Dummy data
const appointments: Appointment[] = [
  {
    id: "1",
    title: "Meeting with James Brown",
    doctorName: "Dr. Herbert R.",
    specialty: "Heart Specialist",
    clinic: "A.O Clinic",
    address: "4-F 15/6, Nazimabad No.4, Karachi",
  },
  {
    id: "2",
    title: "Follow-up Consultation",
    doctorName: "Dr. Herbert R.",
    specialty: "Pediatrician",
    clinic: "A.O Clinic",
    address: "4-F 15/6, Nazimabad No.4, Karachi",
  },
  {
    id: "3",
    title: "Annual Checkup",
    doctorName: "Dr. Herbert R.",
    specialty: "Pediatrician",
    clinic: "A.O Clinic",
    address: "4-F 15/6, Nazimabad No.4, Karachi",
  },
  {
    id: "4",
    title: "Specialist Review",
    doctorName: "Dr. Herbert R.",
    specialty: "Pediatrician",
    clinic: "A.O Clinic",
    address: "4-F 15/6, Nazimabad No.4, Karachi",
  },
  {
    id: "5",
    title: "Diabetes Management System",
    doctorName: "Dr. Herbert R.",
    specialty: "Pediatrician",
    clinic: "A.O Clinic",
    address: "4-F 15/6, Nazimabad No.4, Karachi",
  },
  {
    id: "6",
    title: "Meeting with James Brown",
    doctorName: "Dr. Herbert R.",
    specialty: "Pediatrician",
    clinic: "A.O Clinic",
    address: "4-F 15/6, Nazimabad No.4, Karachi",
  },
];

export default function TodaysAppointments({
  dateRange,
  setDateRange,
}: {
  dateRange: Range[];
  setDateRange: (range: Range[]) => void;
}) {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [showCalendar, setShowCalendar] = useState(false);
  const dispatch = useDispatch();

  const selectionRange = dateRange[0];

  const [dataStart, setDataStart] = useState(format(selectionRange.startDate!, "yyyy-MM-dd"));
  const [dataEnd, setDataEnd] = useState(format(selectionRange.endDate!, "yyyy-MM-dd"));

  // Update dataStart/dataEnd when dateRange prop changes
  useEffect(() => {
    setDataStart(format(selectionRange.startDate!, "yyyy-MM-dd"));
    setDataEnd(format(selectionRange.endDate!, "yyyy-MM-dd"));
  }, [selectionRange.startDate, selectionRange.endDate]);

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

  useEffect(() => {
    if (id) {
      dispatch(fetchWeeklyCallSchedule({ salesmanId: id, from: dataStart, to: dataEnd }) as any);
    }
  }, [dispatch, id, dataStart, dataEnd]);

  const { data, loading, error } = useSelector((state: RootState) => state.weeklyCalls);

  // Format display text
  const displayText = `${format(selectionRange.startDate!, "dd MMM yyyy")} - ${format(
    selectionRange.endDate!,
    "dd MMM yyyy"
  )}`;

  return (
    <div className="w-full relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="t-h3">Weekly Appointments</h2>

        {/* Clickable date range */}
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
                dispatch(
                  fetchWeeklyCallSchedule({ salesmanId: id, from: dataStart, to: dataEnd }) as any
                );
                setShowCalendar(false);
              }}
              className="px-4 py-2 text-sm bg-primary text-white rounded hover:bg-blue-600"
            >
              Apply
            </button>
          </div>
        </div>
      )}

      {/* Appointments List */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 grayscale opacity-50">
          <Loader2 className="w-10 h-10 animate-spin text-(--primary) mb-4" />
          <p className="t-label-sm">Loading weekly appointments...</p>
        </div>
      ) : data.length === 0 ? (
        <NoDataFound />
      ) : (
        data.map((day: any) => (
          <div key={day.callDate} className="mb-8 px-4">
            {/* Date as section header */}
            <h3 className="t-h3 mb-4 font-bold text-lg">
              {new Date(day.callDate).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {day.doctorClinicDetail.map((detail: any) => (
                <div
                  key={detail.callId || detail.id}
                  className="bg-white rounded-8 shadow-soft p-5 flex flex-col justify-between border border-gray-100"
                >
                  <h4 className="text-md font-bold mb-3">Meeting with {detail.fullname}</h4>

                  <div className="flex flex-col gap-4">
                    {/* Doctor Info */}
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-8 overflow-hidden flex-shrink-0">
                        <ImageWithFallback
                          src={detail.profilepicture}
                          alt={detail.fullname}
                          width={48}
                          height={48}
                          className="object-cover w-full h-full"
                          fallbackSrc="/girlPic.png"
                        />
                      </div>
                      <div className="overflow-hidden">
                        <h4 className="t-label font-medium truncate">{detail.fullname}</h4>
                        <p className="t-cap text-gray-600 truncate">{detail.specialization}</p>
                      </div>
                    </div>

                    {/* Clinic Info */}
                    <div className="flex items-start gap-3 border-t pt-3">
                      <div className="w-10 h-10 rounded-8 bg-blue-50 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="overflow-hidden">
                        <h4 className="t-label font-medium truncate">{detail.clinicname}</h4>
                        <p className="t-cap text-gray-500 text-xs line-clamp-2">
                          {detail.clinicaddress}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
