"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button/button";

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
    <div className="">
      <div className="mt-3">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-(--employee-detail-tab-heading)">
            Weekly Expenses
          </h2>
          <div className="flex items-center gap-2 text-(--primary) text-sm font-medium cursor-pointer">
            <ChevronLeft className="w-4 h-4" />
            <span>01 - 07 Sept, 2025</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>

        <div className="space-y-3">
          {expensesData.map((item) => (
            <div
              key={item.id}
              className="flex items-center rounded-8 shadow-soft border border-(--gray-1) bg-(--background) p-4"
            >
              {/* Left: User Info */}
              <div className="flex items-center gap-4 w-[25%]">
                <div className="relative">
                  <div className="w-14 h-14 rounded-8 overflow-hidden border-2 border-white shadow-soft">
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
                  <h3 className="font-semibold text-(--gray-9)">{item.name}</h3>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-(--gray-5)">{item.role}</p>
                    <span
                      className={`px-2 py-0.5 text-xs font-medium rounded-8 ${
                        item.status === "Review"
                          ? "bg-(--warning-light) text-(--warning-2)"
                          : "bg-(--destructive-light) text-(--destructive)"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Center: Expense Breakdown - Three evenly distributed columns */}
              <div className="flex items-center flex-1">
                <div className="w-1/3 text-center">
                  <p className="text-xs text-(--gray-4)">Total Expense</p>
                  <p className="text-lg font-bold text-(--warning-2)">
                    {item.total.toLocaleString()}
                    <span className="text-xs font-medium text-(--warning-2) ml-1">PKR</span>
                  </p>
                </div>
                <div className="w-1/3 text-center">
                  <p className="text-xs text-(--gray-4)">Approved</p>
                  <p className="text-lg font-bold text-(--success)">
                    {item.approved.toLocaleString()}
                    <span className="text-xs font-medium text-(--success) ml-1">PKR</span>
                  </p>
                </div>
                <div className="w-1/3 text-center">
                  <p className="text-xs text-(--gray-4)">Rejected</p>
                  <p className="text-lg font-bold text-(--destructive)">
                    {item.rejected.toLocaleString()}
                    <span className="text-xs font-medium text-(--destructive) ml-1">PKR</span>
                  </p>
                </div>
              </div>

              {/* Right: Action Buttons */}
              <div className="flex items-center gap-3 w-[20%] justify-end">
                <Button variant="primary" size="sm" rounded="xl" className="px-5">
                  Approve
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  rounded="xl"
                  className="px-5 border-(--destructive-1) text-(--destructive) hover:bg-(--destructive-light) hover:text-(--destructive) hover:border-(--destructive)"
                >
                  Reject
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
