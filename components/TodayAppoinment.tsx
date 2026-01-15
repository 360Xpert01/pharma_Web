"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import Image from "next/image";
import { DateRange, Range } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";

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

export default function TodaysAppointments() {
  const [showCalendar, setShowCalendar] = useState(false);

  const [dateRange, setDateRange] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const selectionRange = dateRange[0];

  const handleSelect = (ranges: any) => {
    setDateRange([ranges.selection]);

    // When user finishes selecting (clicks outside or selects both dates)
    console.log("Selected date range:", {
      start: format(ranges.selection.startDate!, "dd MMM yyyy"),
      end: format(ranges.selection.endDate!, "dd MMM yyyy"),
      // startDate: ranges.selection.startDate?.toISOString(),
      // endDate: ranges.selection.endDate?.toISOString(),
    });
  };

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
        <div
          className="flex items-center gap-2 text-primary text-sm font-medium cursor-pointer hover:opacity-80 transition"
          onClick={() => setShowCalendar(!showCalendar)}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>{displayText}</span>
          <ChevronRight className="w-4 h-4" />
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
            months={1} // show 2 months side by side
            showDateDisplay={false} // hide top input boxes
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
              onClick={() => setShowCalendar(false)}
              className="px-4 py-2 text-sm bg-primary text-white rounded hover:bg-blue-600"
            >
              Apply
            </button>
          </div>
        </div>
      )}

      {/* Appointments List */}
      <div className="space-y-4">
        {appointments.map((appt) => (
          <div
            key={appt.id}
            className="bg-background rounded-8 shadow-soft px-6 py-5 transition-all duration-200"
          >
            <h3 className="t-label-b mb-3">{appt.title}</h3>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-8 overflow-hidden">
                  <Image
                    src={appt.avatar || "https://randomuser.me/api/portraits/women/44.jpg"}
                    alt={appt.doctorName}
                    width={48}
                    height={48}
                    className="object-cover w-full h-full"
                  />
                </div>

                <div>
                  <h4 className="t-label">{appt.doctorName}</h4>
                  <p className="t-cap">{appt.specialty}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-8 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="t-label">{appt.clinic}</h4>
                  <p className="t-cap">{appt.address}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
