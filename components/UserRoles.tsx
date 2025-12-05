"use client";

import React from "react";
import { MoreVertical, Check, X } from "lucide-react";

interface Role {
  id: string;
  roleId: string;
  created: string;
  title: string;
  responsibilities: number;
  status: "active" | "inactive";
}

const rolesData: Role[] = [
  {
    id: "1",
    roleId: "ROLEID1235799",
    created: "2025-10-15",
    title: "Assistant Sales Manager",
    responsibilities: 4,
    status: "active",
  },
  {
    id: "2",
    roleId: "ROLEID1235800",
    created: "2025-11-01",
    title: "Marketing Coordinator",
    responsibilities: 3,
    status: "active",
  },
  {
    id: "3",
    roleId: "ROLEID1235801",
    created: "2025-12-05",
    title: "Product Development Lead",
    responsibilities: 5,
    status: "inactive",
  },
  {
    id: "4",
    roleId: "ROLEID1235802",
    created: "2026-01-10",
    title: "Data Analyst",
    responsibilities: 4,
    status: "active",
  },
  {
    id: "5",
    roleId: "ROLEID1235803",
    created: "2026-02-20",
    title: "UX/UI Designer",
    responsibilities: 6,
    status: "active",
  },
  {
    id: "6",
    roleId: "ROLEID1235804",
    created: "2026-03-12",
    title: "Software Engineer",
    responsibilities: 5,
    status: "active",
  },
  {
    id: "7",
    roleId: "ROLEID1235805",
    created: "2026-04-01",
    title: "Project Manager",
    responsibilities: 7,
    status: "inactive",
  },
  {
    id: "8",
    roleId: "ROLEID1235806",
    created: "2026-05-15",
    title: "Customer Success Specialist",
    responsibilities: 4,
    status: "active",
  },
  {
    id: "9",
    roleId: "ROLEID1235807",
    created: "2026-06-30",
    title: "Human Resources Generalist",
    responsibilities: 5,
    status: "active",
  },
  {
    id: "10",
    roleId: "ROLEID1235808",
    created: "2026-07-20",
    title: "Finance Manager",
    responsibilities: 3,
    status: "inactive",
  },
  {
    id: "11",
    roleId: "ROLEID1235809",
    created: "2026-08-05",
    title: "Content Strategist",
    responsibilities: 4,
    status: "active",
  },
];

export default function RolesCardList() {
  return (
    <div className="w-full ">
      {/* Header */}

      {/* Card List */}
      <div className="space-y-3">
        {rolesData.map((role) => (
          <div
            key={role.id}
            className="bg-white border border-gray-200 rounded-xl p-3 transition-shadow duration-200"
          >
            <div className="flex items-center justify-between gap-6">
              {/* Left Section */}
              <div className="flex-1 grid grid-cols-5 gap-6">
                {/* Role ID */}
                <div>
                  <p className="mt-1 font-semibold text-md text-gray-900">{role.roleId}</p>
                </div>

                {/* Created Date */}
                <div>
                  <p className="mt-1 text-sm text-gray-500">{role.created}</p>
                </div>

                {/* Title */}
                <div>
                  <p className="mt-1 font-semibold text-gray-900">{role.title}</p>
                </div>

                {/* Responsibilities */}
                <div>
                  <p className="mt-1 font-semibold text-gray-900">
                    {role.responsibilities} Responsibilities
                  </p>
                </div>

                <div className="flex justify-start ">
                  {/* Status Badge */}
                  <span
                    className={`inline-flex items-center gap-2 px-12 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                      role.status === "active"
                        ? "bg-green-500 text-white"
                        : "bg-gray-300 text-white"
                    }`}
                  >
                    {role.status === "active" ? "Active" : "Inactive"}
                  </span>

                  {/* More Options */}
                </div>
              </div>

              {/* Right Section: Status + Actions */}

              <div className="">
                <button className="text-gray-400 hover:text-gray-700 transition">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
