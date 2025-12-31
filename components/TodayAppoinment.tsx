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
    <div className="w-full overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-(--gray-1)">
        <h2 className="text-2xl font-bold text-(--gray-9)">Todays Appointments</h2>
        <div className="flex items-center gap-3 bg-blue-50 text-(--primary) px-5 py-2.5 rounded-full text-sm font-medium hover:bg-blue-100 transition cursor-pointer">
          <ChevronLeft className="w-4 h-4" />
          01 - 07 Sept, 2025
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>

      {/* Appointments List */}
      <div className="divide-y divide-(--gray-1)">
        {appointments.map((appt) => (
          <div key={appt.id} className="p-6 hover:bg-gray-50/50 transition-all duration-200">
            {/* Appointment Title */}
            <h3 className="text-lg font-semibold text-(--gray-9) mb-4">{appt.title}</h3>

            <div className="flex items-start justify-between gap-6">
              {/* Doctor Info */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-14 h-14 rounded-full overflow-hidden ring-4 ring-(--light) shadow-soft">
                    <Image
                      src={appt.avatar || "https://randomuser.me/api/portraits/women/44.jpg"}
                      alt={appt.doctorName}
                      width={56}
                      height={56}
                      className="object-cover"
                    />
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-(--gray-9)">{appt.doctorName}</h4>
                  <p className="text-sm text-(--gray-6)">{appt.specialty}</p>
                </div>
              </div>

              {/* Clinic & Location */}
              <div className="text-right">
                <div className="flex items-center gap-2 text-(--primary) mb-1">
                  <MapPin className="w-4 h-4" />
                  <span className="font-medium">{appt.clinic}</span>
                </div>
                <p className="text-sm text-(--gray-5) max-w-xs">{appt.address}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
