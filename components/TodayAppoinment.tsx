"use client";

import React from "react";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import Image from "next/image";

interface Appointment {
  id: string;
  title: string;
  doctorName: string;
  specialty: string;
  clinic: string;
  address: string;
  avatar?: string;
}

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
  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-(--employee-detail-tab-heading)">
          Weekly Appointments
        </h2>
        <div className="flex items-center gap-2 text-(--primary) text-sm font-medium cursor-pointer">
          <ChevronLeft className="w-4 h-4" />
          <span>01 - 07 Sept, 2025</span>
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>

      {/* Appointments List */}
      <div className="space-y-4">
        {appointments.map((appt) => (
          <div
            key={appt.id}
            className="bg-(--background) rounded-lg shadow-soft px-6 py-5 transition-all duration-200"
          >
            {/* Appointment Title */}
            <h3 className="text-base font-semibold text-(--gray-9) mb-3">{appt.title}</h3>

            <div className="flex items-center justify-between">
              {/* Doctor Info */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={appt.avatar || "https://randomuser.me/api/portraits/women/44.jpg"}
                    alt={appt.doctorName}
                    width={48}
                    height={48}
                    className="object-cover w-full h-full"
                  />
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-(--gray-9)">{appt.doctorName}</h4>
                  <p className="text-xs text-(--gray-5)">{appt.specialty}</p>
                </div>
              </div>

              {/* Clinic & Location */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-(--primary)" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-(--gray-9)">{appt.clinic}</h4>
                  <p className="text-xs text-(--gray-5)">{appt.address}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
