"use client";

import React, { useState } from "react";
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
    id: "dfa23423sdf",
    name: "Dr. Sarah Ali",
    specialty: "Cardiologist",
    email: "sarah@gmail.com",
    phone: "+932143235236",
    city: "Karachi",
    status: "Active",
  },
  {
    id: "dfa23423sas",
    name: "Dr. Sarah Ali",
    specialty: "Cardiologist",
    email: "sarah@gmail.com",
    phone: "+932143235236",
    city: "Karachi",
    status: "Active",
  },
  {
    id: "dfa2342sdf",
    name: "Dr. Sarah Ali",
    specialty: "Cardiologist",
    email: "sarah@gmail.com",
    phone: "+932143235236",
    city: "Karachi",
    status: "Active",
  },
  {
    id: "dfa23423ewr",
    name: "Dr. Sarah Ali",
    specialty: "Cardiologist",
    email: "sarah@gmail.com",
    phone: "+932143235236",
    city: "Karachi",
    status: "Active",
  },
  {
    id: "dfa23423s1d",
    name: "Dr. Sarah Ali",
    specialty: "Cardiologist",
    email: "sarah@gmail.com",
    phone: "+932143235236",
    city: "Karachi",
    status: "Active",
  },
  {
    id: "dfa2342123s",
    name: "Dr. Sarah Ali",
    specialty: "Cardiologist",
    email: "sarah@gmail.com",
    phone: "+932143235236",
    city: "Karachi",
    status: "Inactive",
  },
  {
    id: "dfa23423sre",
    name: "",
    specialty: "Cardiologist",
    email: "sarah@gmail.com",
    phone: "+932143235236",
    city: "Karachi",
    status: "Inactive",
  },
];

export default function DoctorsTable() {
  const [openId, setOpenId] = useState<string | null>(null);
  return (
    <div className="w-full  overflow-hidden">
      {doctorsData.map((doctor, index) => (
        <div
          key={doctor.id}
          className={`px-3 py-1 hover:bg-gray-50 transition-colors flex items-center ${
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
              <div className="relative">
                <button
                  onClick={() => setOpenId(openId === doctor.id ? null : doctor.id)}
                  className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition"
                >
                  <MoreVertical className="w-5 h-5" />
                </button>

                {openId === doctor.id && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setOpenId(null)} />
                    <div className="absolute right-0 top-10 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                      <div className="py-1">
                        <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Edit
                        </button>
                        <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Duplicate
                        </button>
                        <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                          Delete
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
