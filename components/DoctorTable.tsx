"use client";

import React from "react";
import { Mail, Phone, MapPin, Eye, MoreVertical, ChevronRight } from "lucide-react";

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  email: string;
  phone: string;
  city: string;
  status: "Active" | "Inactive";
}

const doctorsData: Doctor[] = [
  {
    id: "1",
    name: "Dr. Sarah Ali",
    specialty: "Cardiologist",
    email: "sarah@gmail.com",
    phone: "+932143235236",
    city: "Karachi",
    status: "Active",
  },
  {
    id: "2",
    name: "Dr. Sarah Ali",
    specialty: "Cardiologist",
    email: "sarah@gmail.com",
    phone: "+932143235236",
    city: "Karachi",
    status: "Active",
  },
  {
    id: "3",
    name: "Dr. Sarah Ali",
    specialty: "Cardiologist",
    email: "sarah@gmail.com",
    phone: "+932143235236",
    city: "Karachi",
    status: "Active",
  },
  {
    id: "4",
    name: "Dr. Sarah Ali",
    specialty: "Cardiologist",
    email: "sarah@gmail.com",
    phone: "+932143235236",
    city: "Karachi",
    status: "Active",
  },
  {
    id: "5",
    name: "Dr. Sarah Ali",
    specialty: "Cardiologist",
    email: "sarah@gmail.com",
    phone: "+932143235236",
    city: "Karachi",
    status: "Active",
  },
  {
    id: "6",
    name: "Dr. Sarah Ali",
    specialty: "Cardiologist",
    email: "sarah@gmail.com",
    phone: "+932143235236",
    city: "Karachi",
    status: "Inactive",
  },
  {
    id: "7",
    name: "Dr. Sarah Ali",
    specialty: "Cardiologist",
    email: "sarah@gmail.com",
    phone: "+932143235236",
    city: "Karachi",
    status: "Inactive",
  },
];

export default function DoctorsTable() {
  return (
    <div className="w-full  overflow-hidden">
      {doctorsData.map((doctor, index) => (
        <div
          key={doctor.id}
          className={`px-6 py-1 hover:bg-gray-50 transition-colors flex items-center ${
            index !== doctorsData.length - 1 ? "" : ""
          }`}
        >
          <div className="w-full bg-white rounded-lg p-3 border border-gray-200 grid grid-cols-12 gap-4 text-sm">
            {/* Name */}
            <div className="col-span-2 font-bold text-gray-900">{doctor.name}</div>

            {/* Specialty */}
            <div className="col-span-2 text-gray-600">{doctor.specialty}</div>

            {/* Email */}
            <div className="col-span-2 font-bold text-gray-900 flex items-center gap-2">
              {doctor.email}
            </div>

            {/* Phone */}
            <div className="col-span-2 text-gray-900 flex items-center gap-2">{doctor.phone}</div>

            {/* City */}
            <div className="col-span-1 font-bold text-gray-900 flex items-center gap-2">
              {doctor.city}
            </div>

            {/* Status */}
            <div className="col-span-2 flex justify-center">
              <span
                className={`px-12 py-1 rounded-full text-sm font-medium ${
                  doctor.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {doctor.status}
              </span>
            </div>

            {/* View Details + More */}
            <div className="col-span-1 flex items-center justify-end gap-2">
              <button className="text-gray-400 text-sm   flex items-center gap-1 whitespace-nowrap">
                View Details
              </button>
              <ChevronRight className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
