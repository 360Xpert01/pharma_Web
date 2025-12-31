"use client";

import React from "react";
import { Check, X } from "lucide-react";
import Image from "next/image";

interface ExpenseItem {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: "Review" | "Rejected";
  total: number;
  approved: number;
  rejected: number;
}

const expensesData: ExpenseItem[] = [
  {
    id: "1",
    name: "Dr. Herbert R.",
    role: "Heart Specialist",
    avatar: "/api/placeholder/40/40",
    status: "Review",
    total: 250,
    approved: 150,
    rejected: 150,
  },
  {
    id: "2",
    name: "Ms. Clara S.",
    role: "Pediatrician",
    avatar: "/api/placeholder/40/40",
    status: "Rejected",
    total: 250,
    approved: 150,
    rejected: 150,
  },
  {
    id: "3",
    name: "Ms. Clara S.",
    role: "Pediatrician",
    avatar: "/api/placeholder/40/40",
    status: "Rejected",
    total: 250,
    approved: 150,
    rejected: 150,
  },
  {
    id: "4",
    name: "Dr. Herbert R.",
    role: "Heart Specialist",
    avatar: "/api/placeholder/40/40",
    status: "Review",
    total: 250,
    approved: 150,
    rejected: 150,
  },
  {
    id: "5",
    name: "Dr. Herbert R.",
    role: "Heart Specialist",
    avatar: "/api/placeholder/40/40",
    status: "Review",
    total: 250,
    approved: 150,
    rejected: 150,
  },
  {
    id: "6",
    name: "Dr. Herbert R.",
    role: "Heart Specialist",
    avatar: "/api/placeholder/40/40",
    status: "Review",
    total: 250,
    approved: 150,
    rejected: 150,
  },
  {
    id: "7",
    name: "Ms. Clara S.",
    role: "Pediatrician",
    avatar: "/api/placeholder/40/40",
    status: "Rejected",
    total: 250,
    approved: 150,
    rejected: 150,
  },
  {
    id: "8",
    name: "Ms. Clara S.",
    role: "Pediatrician",
    avatar: "/api/placeholder/40/40",
    status: "Rejected",
    total: 250,
    approved: 150,
    rejected: 150,
  },
];

export default function ExpenseApprovalList() {
  return (
    <div className=" ">
      <div className="mt-3">
        <div className="space-y-4">
          {expensesData.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-2xl shadow-soft border border-gray-100 p-3"
            >
              {/* Left: User Info */}
              <div className="flex items-center   gap-4">
                <div className="relative">
                  <div className="w-14 h-14 rounded-md overflow-hidden border-2 border-white shadow-soft">
                    <Image
                      src={`/capMan.svg`}
                      alt={item.name}
                      width={50}
                      height={50}
                      className="object-cover"
                    />
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">{item.name}</h3>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-gray-600">{item.role}</p>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        item.status === "Review"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Center: Expense Breakdown */}
              <div className="flex items-center gap-12 text-center">
                <div>
                  <p className="text-xs text-gray-500">Total Expense</p>
                  <p className="text-lg font-bold text-amber-600">
                    {item.total.toLocaleString()}
                    <span className="text-xs ml-1">PKR</span>
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Approved</p>
                  <p className="text-lg font-bold text-green-600">
                    {item.approved.toLocaleString()}
                    <span className="text-xs ml-1">PKR</span>
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Rejected</p>
                  <p className="text-lg font-bold text-red-600">
                    {item.rejected.toLocaleString()}
                    <span className="text-xs ml-1">PKR</span>
                  </p>
                </div>
              </div>

              {/* Right: Action Buttons */}
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white font-sm rounded-xl hover:bg-blue-700 transition shadow-soft cursor-pointer">
                  Approve
                </button>
                <button className="flex items-center gap-2 px-3 py-2 border border-red-300 text-red-600 font-sm rounded-xl hover:bg-red-50 transition cursor-pointer">
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
