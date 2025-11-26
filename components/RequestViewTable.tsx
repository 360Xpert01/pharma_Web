"use client";

import React from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

interface RequestItem {
  id: string;
  avatar: string;
  name: string;
  position: string;
  doctor: string;
  specialty: string;
  area: string;
}

const requestData: RequestItem[] = [
  {
    id: "1",
    avatar: "/avatars/amir-1.jpg",
    name: "Mohammad Amir",
    position: "Sales Representative",
    doctor: "Dr. Rashid Ahmed",
    specialty: "Cardiologist",
    area: "Gulshan-e-iqbal-b121-7500",
  },
  {
    id: "2",
    avatar: "/avatars/amir-2.jpg",
    name: "Mohammad Amir",
    position: "Sales Representative",
    doctor: "Dr. Rashid Ahmed",
    specialty: "Cardiologist",
    area: "Gulshan-e-iqbal-b121-7500",
  },
  {
    id: "3",
    avatar: "/avatars/amir-3.jpg",
    name: "Mohammad Amir",
    position: "Sales Representative",
    doctor: "Dr. Rashid Ahmed",
    specialty: "Cardiologist",
    area: "Gulshan-e-iqbal-b121-7500",
  },
  {
    id: "4",
    avatar: "/avatars/amir-4.jpg",
    name: "Mohammad Amir",
    position: "Sales Representative",
    doctor: "Dr. Rashid Ahmed",
    specialty: "Cardiologist",
    area: "Gulshan-e-iqbal-b121-7500",
  },
  {
    id: "5",
    avatar: "/avatars/amir-5.jpg",
    name: "Mohammad Amir",
    position: "Sales Representative",
    doctor: "Dr. Rashid Ahmed",
    specialty: "Cardiologist",
    area: "Gulshan-e-iqbal-b121-7500",
  },
  {
    id: "6",
    avatar: "/avatars/amir-6.jpg",
    name: "Mohammad Amir",
    position: "Sales Representative",
    doctor: "Dr. Rashid Ahmed",
    specialty: "Cardiologist",
    area: "Gulshan-e-iqbal-b121-7500",
  },
  {
    id: "7",
    avatar: "/avatars/amir-7.jpg",
    name: "Mohammad Amir",
    position: "Sales Representative",
    doctor: "Dr. Rashid Ahmed",
    specialty: "Cardiologist",
    area: "Gulshan-e-iqbal-b121-7500",
  },
  {
    id: "8",
    avatar: "/avatars/amir-8.jpg",
    name: "Mohammad Amir",
    position: "Sales Representative",
    doctor: "Dr. Rashid Ahmed",
    specialty: "Cardiologist",
    area: "Gulshan-e-iqbal-b121-7500",
  },
  {
    id: "9",
    avatar: "/avatars/amir-9.jpg",
    name: "Mohammad Amir",
    position: "Sales Representative",
    doctor: "Dr. Rashid Ahmed",
    specialty: "Cardiologist",
    area: "Gulshan-e-iqbal-b121-7500",
  },
];

const DEFAULT_AVATAR = "/girlPic.svg"; // fallback

export default function DoctorRequestTable() {
  return (
    <div className="w-full">
      {requestData.map((item) => (
        <div key={item.id} className="px-2 py-1 hover:bg-gray-50 transition-colors duration-200">
          <div className="bg-white rounded-2xl border border-gray-200 p-2">
            <div className="flex items-center justify-between text-sm">
              {/* Left: Avatar + Name + Position */}
              <div className="flex items-center gap-4 flex-shrink-0">
                <Image
                  src={item.avatar}
                  alt={item.name}
                  width={48}
                  height={48}
                  className="rounded-full object-cover border-2 border-white shadow-md"
                  onError={(e) => {
                    e.currentTarget.src = DEFAULT_AVATAR;
                  }}
                />
                <div>
                  <div className="font-bold text-gray-900">{item.name}</div>
                  <div className="text-xs text-gray-500">{item.position}</div>
                </div>
              </div>

              {/* Doctor Name */}
              <div className="flex-1 text-center">
                <div className="font-bold text-gray-900">{item.doctor}</div>
              </div>

              {/* Specialty */}
              <div className="flex-1 text-center">
                <div className="font-bold text-gray-800">{item.specialty}</div>
              </div>

              {/* Area + Code */}
              <div className="flex-1 font-bold text-center">
                <div className=" text-gray-700">{item.area}</div>
              </div>

              {/* See Request Button */}
              <div className="flex items-center gap-1 text-gray-400  cursor-pointer">
                <span>See Request</span>
                <ChevronRight className="w-7 h-7 text-blue-700" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
