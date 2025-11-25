"use client";

import React, { useState } from "react";
import { ChevronRight } from "lucide-react";

interface CampaignItem {
  id: string;
  name: string;
  month: string;
  date: string;
  condition: string;
  channel: string;
  status: "Approved" | "Rejected" | "Under Review";
}

const campaignData: CampaignItem[] = [
  {
    id: "1",
    name: "Sami Kashan",
    month: "September, 2025",
    date: "2024-01-15",
    condition: "Diabetes",
    channel: "Doctors",
    status: "Under Review",
  },
  {
    id: "2",
    name: "Sami Kashan",
    month: "September, 2025",
    date: "2024-01-15",
    condition: "Cancer",
    channel: "Pharmacy/Stores",
    status: "Rejected",
  },
  {
    id: "3",
    name: "Alex Torres",
    month: "October, 2025",
    date: "2024-02-20",
    condition: "Hypertension",
    channel: "Chain Pharmacy",
    status: "Approved",
  },
  {
    id: "4",
    name: "Liam Brown",
    month: "March, 2026",
    date: "2024-07-20",
    condition: "Depression",
    channel: "Doctors",
    status: "Approved",
  },
  {
    id: "5",
    name: "Jordan Lee",
    month: "November, 2025",
    date: "2024-03-10",
    condition: "Asthma",
    channel: "Pharmacy/Stores",
    status: "Under Review",
  },
  {
    id: "6",
    name: "Rina Patel",
    month: "December, 2025",
    date: "2024-04-05",
    condition: "Heart Disease",
    channel: "Doctors",
    status: "Approved",
  },
  {
    id: "7",
    name: "Max Chen",
    month: "January, 2026",
    date: "2024-05-15",
    condition: "Obesity",
    channel: "GTs",
    status: "Under Review",
  },
  {
    id: "8",
    name: "Ella Rodriguez",
    month: "February, 2026",
    date: "2024-06-25",
    condition: "Cholesterol",
    channel: "Pharmacy/Stores",
    status: "Rejected",
  },
];

export default function CampaignApprovalTable() {
  return (
    <div className="w-full ">
      {campaignData.map((item) => (
        <div key={item.id} className="px-4 py-1">
          <div className="w-full bg-white rounded-2xl p-3  border border-gray-200">
            <div className="flex items-center justify-between text-sm">
              {/* Name */}
              <div className="w-48 font-bold text-gray-900">{item.name}</div>

              {/* Month */}
              <div className="flex-1 font-bold min-w-40 text-gray-600">{item.month}</div>

              {/* Date */}
              <div className="w-36 text-gray-500 text-center">{item.date}</div>

              {/* Condition */}
              <div className="flex-1 min-w-32 font-medium text-gray-900 text-center">
                {item.condition}
              </div>

              {/* Channel */}
              <div className="flex-1 min-w-40 font-bold text-gray-700 text-center">
                {item.channel}
              </div>

              {/* Status Badge */}
              <div className="w-40 flex justify-center">
                <span
                  className={`px-6 py-1 rounded-full text-xs text-white shadow-sm ${
                    item.status === "Approved"
                      ? "bg-green-500"
                      : item.status === "Rejected"
                        ? "bg-red-500"
                        : "bg-amber-500"
                  }`}
                >
                  {item.status}
                </span>
              </div>

              {/* View Details */}
              <div className="w-40 flex justify-end items-center gap-2">
                <span className="text-blue-600 font-medium cursor-pointer hover:text-gray-700">
                  View Details
                </span>
                <ChevronRight className="w-5 h-8 text-blue-600" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
