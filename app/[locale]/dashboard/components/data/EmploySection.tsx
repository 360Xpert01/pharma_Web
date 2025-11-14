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

// Import your own component
import SalesDashboard1 from "../SalesDashboard1";
import Image from "next/image";

// Team Member Interface
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

// Sample Data
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
    <div className="mx-auto bg-gray-50">
      <div className="bg-white overflow-hidden">
        <div className="overflow-x-auto">
          {/* Header Section */}
          <div className="bg-white">
            <div className="px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              {/* Title */}
              <div>
                <h1 className="text-2xl font-bold text-gray-900">All User’s</h1>
                <p className="text-sm text-gray-500 mt-1">
                  Unlock the potential of your candidates
                </p>
              </div>

              {/* Actions: Search, Filter, Export */}
              <div className="flex items-center gap-3">
                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search"
                    className="pl-10 pr-4 py-2.5 w-full sm:w-64 bg-gray-100 text-gray-700 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                  />
                </div>

                {/* Filter Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="flex items-center gap-2 p-3 bg-blue-600 text-white rounded-full text-sm font-medium hover:bg-blue-600 transition-colors"
                  >
                    <ListFilter className="w-4 h-4" />
                  </button>

                  {isFilterOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 z-50 p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-gray-900">Filter by</h3>
                        <button
                          onClick={() => setIsFilterOpen(false)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                          <option>All Roles</option>
                          <option>Doctor</option>
                          <option>Nurse</option>
                          <option>Pharmacist</option>
                          <option>Sales Rep</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Status
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                          <option>All Status</option>
                          <option>Active</option>
                          <option>Inactive</option>
                          <option>Pending</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Date Range
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                          <option>Last 30 Days</option>
                          <option>Last 7 Days</option>
                          <option>This Month</option>
                          <option>Custom Range</option>
                        </select>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <button className="flex-1 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                          Clear
                        </button>
                        <button className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                          Apply Filters
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Export Button */}
                <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-full text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm">
                  <Upload className="w-4 h-4" />
                  <span>Export List</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          <table className="w-full">
            <tbody>
              {teamMembers.map((member) => (
                <React.Fragment key={member.id}>
                  {/* Clickable Row */}
                  <tr
                    className="rounded-2xl shadow-sm m-5 hover:bg-gray-50 hover:rounded-2xl transition-colors cursor-pointer"
                    onClick={() => toggleRow(member.id)}
                  >
                    {/* Avatar + Name */}
                    <td className="p-2">
                      <div className="flex items-center gap-3">
                        <div>
                          <Image
                            src={`/girlPic.svg`}
                            alt={member.name}
                            width={40}
                            height={40}
                            className={`w-10 h-10 rounded-full bg-gradient-to-br ${member.avatarColor} flex items-center justify-center text-white font-semibold`}
                          />
                        </div>

                        <div>
                          <p className="font-semibold text-gray-900">{member.name}</p>
                          <span className="text-xs text-gray-500 font-medium">{member.roleBy}</span>
                        </div>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="p-6">
                      <div className="flex items-center gap-2 text-gray-600">
                        <span className="text-sm">{member.email}</span>
                      </div>
                    </td>

                    {/* Calls/Month */}
                    <td className="p-6">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900">
                          {member.calls.toLocaleString()}
                        </span>
                        <span className="text-xs text-gray-500">Calls/Month</span>
                      </div>
                    </td>

                    {/* Campaign */}
                    <td className="p-6">
                      <span className="text-sm font-medium text-gray-900">{member.campaign}</span>
                    </td>

                    {/* Role */}
                    <td className="p-6">
                      <span className="text-sm font-medium text-gray-900">{member.role}</span>
                    </td>

                    {/* Score */}
                    <td className="p-6">
                      <span className="text-sm font-semibold text-gray-900">{member.score}</span>
                    </td>

                    {/* Revenue */}
                    <td className="p-6">
                      <span className="text-sm font-semibold text-gray-900">{member.revenue}</span>
                    </td>

                    {/* View Details */}
                    <td className="p-6">
                      <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors">
                        View Details
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>

                  {/* Expanded Dashboard - Your Component */}
                  {openRowId === member.id && (
                    <tr>
                      <td colSpan={8} className="p-0">
                        <SalesDashboard1 member={member} />
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
