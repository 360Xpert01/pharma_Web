"use client";

import React from "react";

interface ExpenseRow {
  id: string;
  employee1: { name: string; role: string; avatar?: string };
  employee2: { name: string; role: string; avatar?: string };
  totalExpense: number;
  approved: number;
  rejected: number;
}

const expenseData: ExpenseRow[] = [
  {
    id: "1",
    employee1: { name: "Sarah Johnson", role: "Marketing Specialist" },
    employee2: { name: "Dr. Herbert R.", role: "Heart Specialist" },
    totalExpense: 2550,
    approved: 1500,
    rejected: 150,
  },
  {
    id: "2",
    employee1: { name: "Michael Smith", role: "Software Engineer" },
    employee2: { name: "Dr. Emily T.", role: "Neurosurgeon" },
    totalExpense: 3000,
    approved: 2000,
    rejected: 100,
  },
  {
    id: "3",
    employee1: { name: "Jessica Williams", role: "Product Designer" },
    employee2: { name: "Dr. Kevin L.", role: "Orthopedic Surgeon" },
    totalExpense: 4000,
    approved: 2500,
    rejected: 150,
  },
  {
    id: "4",
    employee1: { name: "David Brown", role: "Data Analyst" },
    employee2: { name: "Dr. Laura P.", role: "Pediatrician" },
    totalExpense: 3550,
    approved: 2000,
    rejected: 150,
  },
  {
    id: "5",
    employee1: { name: "Linda Garcia", role: "UX Researcher" },
    employee2: { name: "Dr. Alex Q.", role: "Dermatologist" },
    totalExpense: 4450,
    approved: 3000,
    rejected: 150,
  },
  {
    id: "6",
    employee1: { name: "James Miller", role: "Web Developer" },
    employee2: { name: "Dr. Nancy S.", role: "Cardiologist" },
    totalExpense: 5000,
    approved: 3500,
    rejected: 150,
  },
  {
    id: "7",
    employee1: { name: "Patricia Martinez", role: "Content Writer" },
    employee2: { name: "Dr. Mark T.", role: "Oncologist" },
    totalExpense: 3320,
    approved: 1700,
    rejected: 150,
  },
  {
    id: "8",
    employee1: { name: "Robert Davis", role: "Sales Executive" },
    employee2: { name: "Dr. Susan W.", role: "Gynecologist" },
    totalExpense: 4420,
    approved: 2700,
    rejected: 150,
  },
  {
    id: "9",
    employee1: { name: "Jennifer Lee", role: "Graphic Designer" },
    employee2: { name: "Dr. William H.", role: "Urologist" },
    totalExpense: 3770,
    approved: 2200,
    rejected: 150,
  },
];

const DEFAULT_AVATAR = "/girlPic.svg"; // ya apna placeholder use karo

export default function ExpenseApprovalTable() {
  return (
    <div className="w-full bg-(--gray-0)/50">
      <div className="space-y-1 p-4 ">
        {expenseData.map((row) => (
          <div key={row.id} className="bg-(--background) rounded-2xl border border-(--gray-2) ">
            <div className="p-3">
              <div className="flex items-center justify-between gap-6 text-sm">
                {/* Employee 1 */}
                <div className="flex w-40 items-center gap-3 ">
                  <img
                    src={row.employee1.avatar || DEFAULT_AVATAR}
                    alt={row.employee1.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-(--light) shadow-md"
                  />
                  <div className="truncate">
                    <div className="font-bold text-(--gray-9) truncate">{row.employee1.name}</div>
                    <div className="text-xs text-(--gray-5) truncate">{row.employee1.role}</div>
                  </div>
                </div>

                {/* Employee 2 */}
                <div className="flex items-center gap-3 ">
                  <img
                    src={row.employee2.avatar || DEFAULT_AVATAR}
                    alt={row.employee2.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-(--light) shadow-md"
                  />
                  <div className="truncate">
                    <div className="font-bold text-(--gray-9) truncate">{row.employee2.name}</div>
                    <div className="text-xs text-(--gray-5) truncate">{row.employee2.role}</div>
                  </div>
                </div>

                {/* Total Expense */}
                <div className="text-center">
                  <div className="text-xs text-(--gray-5)">Total Expense</div>
                  <div className="font-bold text-(--warning-2) text-lg">
                    {row.totalExpense.toLocaleString()}
                    <span className="font-bold text-(--warning-2) pl-1 text-sm">PKR</span>
                  </div>
                </div>

                {/* Approved */}
                <div className="text-center">
                  <div className="text-xs text-(--gray-5)">Approved</div>
                  <div className="font-bold text-(--success) text-lg">
                    {row.approved.toLocaleString()}
                    <span className="font-bold text-(--success) pl-1 text-sm">PKR</span>
                  </div>
                </div>

                {/* Rejected */}
                <div className="text-center">
                  <div className="text-xs text-(--gray-5)">Rejected</div>
                  <div className="font-bold text-(--destructive) text-lg">
                    {row.rejected.toLocaleString()}
                    <span className="font-bold text-(--destructive) pl-1 text-sm">PKR</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button className="px-6 py-1 bg-(--primary) text-(--light) font-medium rounded-lg hover:bg-(--primary-2) transition shadow-sm">
                    Approve
                  </button>
                  <button className="px-6 py-1 bg-(--light) text-(--destructive) font-medium rounded-lg border border-(--destructive) hover:bg-(--destructive-0) transition shadow-sm">
                    Reject
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
