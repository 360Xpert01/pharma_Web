"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
// import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function PlanRequest() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 8)); // September 2025

  const candidate = {
    name: "Sami Kashan",
    email: "samikashan099@gmail.com",
    phone: "+92 312 283 8270",
    image: "/male-professional-headshot.png",
    reportingManager: "A. Aziz Warsi",
    campaign: "Diabetics",
    requestedMonth: "September",
    channel: "Doctors",
    totalCalls: 220,
    status: "Under Review",
  };

  const avatars = ["/woman-1.png", "/woman-2.png", "/man-1.png", "/woman-3.png", "/man-2.png"];

  const meetings = [
    {
      id: 1,
      type: "Meeting with James Brown",
      doctor: "Dr. Herbert R.",
      specialty: "Heart Specialist",
      location: "A.O Clinic",
      address: "4-F 15/6, Noorabad No. 4, Karachi",
    },
    {
      id: 2,
      type: "Follow-up Consultation",
      doctor: "Dr. Sarah K.",
      specialty: "Pediatrician",
      location: "Kids Care Hospital",
      address: "123 Elm Street, Karachi",
    },
    {
      id: 3,
      type: "Annual Checkup",
      doctor: "Dr. Ali M.",
      specialty: "General Practitioner",
      location: "Health First Clinic",
      address: "456 Oak Avenue, Karachi",
    },
    {
      id: 4,
      type: "Specialist Review",
      doctor: "Dr. Fatima Q.",
      specialty: "Endocrinologist",
      location: "Metabolic Health Center",
      address: "789 Maple Road, Karachi",
    },
    {
      id: 5,
      type: "Diabetes Management Session",
      doctor: "Dr. Ahmed H.",
      specialty: "Diabetes Specialist",
      location: "Wellness Clinic",
      address: "321 Pine Street, Karachi",
    },
  ];

  const calendarDays = getDaysInMonth(currentMonth);
  const firstDayOfWeek = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();

  const callCounts = {
    1: 12,
    2: 12,
    3: 18,
    4: null,
    5: null,
    6: 20,
    7: 25,
    8: 18,
    9: 30,
    10: 22,
    11: 22,
    12: 22,
    13: null,
    14: 0,
    15: 22,
    16: 22,
    17: 22,
    18: 22,
    19: null,
    20: 22,
    21: 22,
    22: 22,
    23: 22,
    24: 22,
    25: null,
    26: null,
    27: 22,
    28: 22,
    29: 22,
    30: 0,
    31: 22,
  };

  const daysWithNoCalls = [14, 30];

  function getDaysInMonth(date: Date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  }

  function previousMonth() {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  }

  function nextMonth() {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  }

  const calendarGrid = Array(firstDayOfWeek)
    .fill(null)
    .concat(Array.from({ length: calendarDays }, (_, i) => i + 1));

  return (
    <div className=" bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Plan Request</h1>
          <p className="text-slate-500 mt-1">Unlock the potential of your candidates</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            {avatars.map((avatar, i) => (
              <Avatar key={i} className="h-10 w-10 border-2 border-white">
                <AvatarImage src={avatar || "/placeholder.svg"} />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            ))}
          </div>
        </div>
        <div className="flex gap-3 justify-end pt-4  border-slate-200">
          <div className=" text-red-500 border-red-500 border justify-center rounded-xl flex gap-2 p-2 bg-white ">
            <X className="w-4 " />
            Reject
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white flex gap-2 justify-center rounded-xl flex p-2">
            Accept
            <ChevronRight className="w-4" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6  mx-auto">
        {/* Left Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-start gap-6 mb-6">
              <Avatar className="h-50 w-24">
                <AvatarImage src={candidate.image || "/placeholder.svg"} />
                <AvatarFallback>SK</AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <h2 className="text-2xl font-bold text-slate-900">{candidate.name}</h2>
                <p className="text-slate-600">{candidate.email}</p>
                <p className="text-slate-600">{candidate.phone}</p>

                <div className="grid grid-cols-2 gap-6 mt-6">
                  <div>
                    <p className="text-sm text-slate-500">Reporting Manager</p>
                    <p className="font-semibold text-slate-900">{candidate.reportingManager}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Requested Month</p>
                    <p className="font-semibold text-slate-900">{candidate.requestedMonth}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Campaign</p>
                    <p className="font-semibold text-slate-900">{candidate.campaign}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Channel</p>
                    <p className="font-semibold text-slate-900">{candidate.channel}</p>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm text-slate-500 mb-2">Total Calls</p>
                <p className="text-3xl font-bold text-slate-900 mb-4">{candidate.totalCalls}</p>
                <span className="inline-block bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm font-semibold">
                  {candidate.status}
                </span>
              </div>
            </div>
          </div>

          {/* Calendar */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-4">September 2025</h3>

            <div className="flex items-center justify-between mb-6">
              <button onClick={previousMonth} className="p-2 hover:bg-slate-100 rounded-lg">
                <ChevronLeft className="w-5 h-5 text-slate-600" />
              </button>
              <span className="text-slate-700 font-semibold">September 2025</span>
              <button onClick={nextMonth} className="p-2 hover:bg-slate-100 rounded-lg">
                <ChevronRight className="w-5 h-5 text-slate-600" />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-2">
              {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day) => (
                <div key={day} className="text-center font-semibold text-slate-600 text-sm py-2">
                  {day}
                </div>
              ))}

              {calendarGrid.map((day, i) => {
                const isNoCalls = day && daysWithNoCalls.includes(day);
                const isSelected = day === 11;

                return (
                  <div
                    key={i}
                    className={`
                      aspect-square flex flex-col items-center justify-center rounded-lg p-2 text-sm
                      ${!day ? "bg-transparent" : ""}
                      ${isNoCalls ? "bg-red-600 text-white font-bold" : isSelected ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-900"}
                    `}
                  >
                    {day && (
                      <>
                        <span className="font-semibold">{day}</span>
                        {callCounts[day as keyof typeof callCounts] !== undefined &&
                          callCounts[day as keyof typeof callCounts] !== null && (
                            <span
                              className={`text-xs ${isNoCalls ? "text-white" : "text-slate-600"}`}
                            >
                              {isNoCalls
                                ? "0 Calls"
                                : `${callCounts[day as keyof typeof callCounts]} Calls`}
                            </span>
                          )}
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="bg-white rounded-lg shadow-sm p-6 h-fit sticky top-6">
          <div className="mb-6 pb-6 border-b border-slate-200">
            <p className="text-slate-500 text-sm">September, 11 2025</p>
            <p className="text-sm text-slate-600 mt-1">Sunday, 12 Call schedule for today</p>
          </div>

          <div className="space-y-6">
            {meetings.map((meeting) => (
              <div key={meeting.id}>
                <h4 className="font-semibold text-slate-900 mb-3">{meeting.type}</h4>
                <div className="flex items-start gap-3">
                  <Avatar className="h-12 w-12 mt-1">
                    <AvatarImage src={`/.jpg?height=48&width=48&query=${meeting.doctor}`} />
                    <AvatarFallback>DR</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-sm">
                    <p className="font-semibold text-slate-900">{meeting.doctor}</p>
                    <p className="text-slate-600">{meeting.specialty}</p>
                    <div className="mt-2 space-y-1">
                      <p className="font-semibold text-slate-800">{meeting.location}</p>
                      <p className="text-slate-600">{meeting.address}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
