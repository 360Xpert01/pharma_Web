"use client";

import React, { useState } from "react";
import {
  ChevronRight,
  Mail,
  Phone,
  TrendingUp,
  Search,
  ListFilter,
  Upload,
  ChevronDown,
  X,
} from "lucide-react";

import SalesDashboard1 from "../SalesDashboard1";
import Image from "next/image";
import { Ta } from "zod/v4/locales";
import TableHeader from "@/components/TableHeader";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  calls: number;
  campaign: string;
  role: string;
  score: number;
  revenue: string;
  avatarColor: string;
  roleBy: string;
}

const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Mushtaque Ahmed",
    email: "m.mushtaque15@gmail.com",
    calls: 3211,
    campaign: "Diabetics",
    role: "Doctor",
    score: 75.08,
    revenue: "445.5K",
    avatarColor: "from-blue-500 to-blue-600",
    roleBy: " Sales Manager",
  },
  {
    id: "2",
    name: "Mohammad Amir",
    email: "m.amir2002@gmail.com",
    calls: 625,
    campaign: "Diabetics",
    role: "Doctor",
    score: 75.08,
    revenue: "445.5K",
    avatarColor: "from-green-500 to-green-600",
    roleBy: " Sales Manager",
  },
  {
    id: "3",
    name: "Rabie Khan",
    email: "rabie212@gmail.com",
    calls: 121,
    campaign: "Diabetics",
    role: "Doctor",
    score: 75.08,
    revenue: "445.5K",
    avatarColor: "from-purple-500 to-purple-600",
    roleBy: "Senior Sales Manager",
  },
  {
    id: "4",
    name: "Mohammad Amir",
    email: "m.amir2002@gmail.com",
    calls: 121,
    campaign: "Diabetics",
    role: "Doctor",
    score: 75.08,
    revenue: "445.5K",
    avatarColor: "from-orange-500 to-orange-600",
    roleBy: " Sales Representative",
  },
  {
    id: "5",
    name: "Sara Ali",
    email: "sara.ali@example.com",
    calls: 300,
    campaign: "Diabetics",
    role: "Nurse",
    score: 80.25,
    revenue: "500.0K",
    avatarColor: "from-pink-500 to-pink-600",
    roleBy: "Sales Coordinator",
  },
  {
    id: "6",
    name: "Omar Farooq",
    email: "omar@example.com",
    calls: 450,
    campaign: "Diabetics",
    role: "Pharmacist",
    score: 78.4,
    revenue: "460.0K",
    avatarColor: "from-indigo-500 to-indigo-600",
    roleBy: " Sales Executive",
  },
];

export default function SalesTeamTable() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [openRowId, setOpenRowId] = useState<string | null>(null);

  const toggleRow = (id: string) => {
    setOpenRowId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="mx-auto bg-gray-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-[0px_5px_15px_rgba(0,0,0,0.35)] overflow-hidden">
        <div className="overflow-x-auto">
          {/* Header */}

          <TableHeader
            title="Sales Team"
            campHeading="All User's"
            filterT={true}
            searchT={true}
            exportT={true}
          />

          {/* Div-based Rows */}
          <div className="">
            {teamMembers.map((member) => (
              <div key={member.id}>
                {/* Main Clickable Row */}
                <div
                  onClick={() => toggleRow(member.id)}
                  className="px-3 py-3 w-[98%] flex justify-start items-center gap-6 hover:bg-gray-50 transition-all duration-200 cursor-pointer border border-gray-200 mx-4 my-3 rounded-2xl"
                >
                  {/* Avatar + Name */}
                  <div className="flex w-[15%] items-center gap-4 flex-shrink-0 w-64">
                    <div className="relative">
                      <Image
                        src="/girlPic.svg"
                        alt={member.name}
                        width={40}
                        height={40}
                        className={`w-10 h-10 rounded-full bg-gradient-to-br ${member.avatarColor} object-cover`}
                      />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{member.name}</p>
                      <span className="text-xs text-gray-500 font-medium">{member.roleBy}</span>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="w-[15%] text-start text-sm text-gray-600">{member.email}</div>

                  {/* Calls/Month */}
                  <div className=" w-[12%] flex flex-start items-center  text-center">
                    <span className="font-bold text-gray-900">
                      {member.calls.toLocaleString()} Calls
                    </span>
                    <span className="block text-xs text-gray-500">/Month</span>
                  </div>

                  {/* Campaign */}
                  <div className="w-[12%] text-start text-sm font-bold text-gray-900">
                    {member.campaign}
                  </div>

                  {/* Role */}
                  <div className="w-[12%] text-start text-sm font-bold text-gray-900">
                    {member.role}
                  </div>

                  {/* Score */}
                  <div className="w-[10%] text-start">
                    <span className="text-sm font-semibold text-gray-900">{member.score}</span>
                  </div>

                  {/* Revenue */}
                  <div className="w-[5%] text-start">
                    <span className="text-sm font-semibold text-gray-900">{member.revenue}</span>
                  </div>

                  {/* View Details */}
                  <div className="w-[10%] text-right">
                    <button className="flex items-center gap-1 text-gray-500  text-sm transition-colors ml-auto">
                      View Details
                      <ChevronRight className="w-6 text-blue-600 h-7" />
                    </button>
                  </div>
                </div>

                {/* Expanded Row */}
                {openRowId === member.id && (
                  <div className="border-t border-gray-200 bg-gray-50 -mt-3 mx-4 rounded-b-2xl overflow-hidden">
                    <div className="px-6 py-8">
                      <SalesDashboard1 member={member} />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
