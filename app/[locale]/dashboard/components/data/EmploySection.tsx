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
import Link from "next/link";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  supervisor: string;
}

const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Mushtaque Ahmed",
    email: "m.mushtaque15@gmail.com",
    phone: "+92 321 9876543",
    role: "Doctor",
    supervisor: "Sara Ali",
  },
  {
    id: "2",
    name: "Mohammad Amir",
    email: "m.amir2002@gmail.com",
    phone: "+92 300 1234567",
    role: "Doctor",
    supervisor: "Sara Ali",
  },
  {
    id: "3",
    name: "Rabie Khan",
    email: "rabie212@gmail.com",
    phone: "+92 333 5556677",
    role: "Doctor",
    supervisor: "Usman Malik",
  },
  {
    id: "4",
    name: "Sara Ali",
    email: "sara.ali@example.com",
    phone: "+92 345 6789012",
    role: "Sales Manager",
    supervisor: "CEO",
  },
  {
    id: "5",
    name: "Omar Farooq",
    email: "omar@example.com",
    phone: "+92 322 1112233",
    role: "Pharmacist",
    supervisor: "Sara Ali",
  },
  {
    id: "6",
    name: "Ayesha Siddiqui",
    email: "ayesha.s@example.com",
    phone: "+92 334 9988776",
    role: "Nurse",
    supervisor: "Dr. Rabie Khan",
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
      <div className="bg-white rounded-xl shadow-[0px_5px_10px_rgba(0,0,0,0.20)] overflow-hidden">
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
                      {/* <span className="text-xs text-gray-500 font-medium">{member.roleBy}</span> */}
                    </div>
                  </div>

                  {/* Email */}
                  <div className="w-[20%] text-start text-sm text-gray-600">{member.email}</div>

                  {/* Calls/Month */}
                  <div className=" w-[20%] flex flex-start items-center  text-center">
                    <span className="font-Semibold text-gray-900">{member.phone}</span>
                  </div>

                  {/* Campaign */}
                  <div className="w-[20%] text-start text-sm font-bold text-gray-900">
                    {member.role}
                  </div>

                  {/* Role */}
                  <div className="w-[20%] text-start text-sm font-bold text-gray-900">
                    {member.supervisor}
                  </div>

                  {/* View Details */}
                  <Link href={`/dashboard/Employee-Profile`} className="w-[10%] text-right">
                    <button className="flex items-center gap-1 text-gray-500  text-sm transition-colors ml-auto">
                      View Details
                      <ChevronRight className="w-6 text-blue-600 h-7" />
                    </button>
                  </Link>
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
