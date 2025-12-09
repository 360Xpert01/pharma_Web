"use client";

import React, { useState } from "react";
import { ChevronDown, User, Target } from "lucide-react";
import Image from "next/image";

interface SalesRep {
  id: string;
  name: string;
  avatar: string;
  manager: string;
  managerAvatar: string;
}

interface Team {
  id: string;
  name: string;
  reps: SalesRep[];
}

const teamsData: Team[] = [
  {
    id: "1",
    name: "Karachi North Team",
    reps: [
      {
        id: "r1",
        name: "Ahmed Khan",
        avatar: "/avatars/ahmed.jpg",
        manager: "Sara Ali",
        managerAvatar: "/avatars/sara.jpg",
      },
      {
        id: "r2",
        name: "Omar Farooq",
        avatar: "/avatars/omar.jpg",
        manager: "Sara Ali",
        managerAvatar: "/avatars/sara.jpg",
      },
      {
        id: "r3",
        name: "Ayesha Raza",
        avatar: "/avatars/ayesha.jpg",
        manager: "Sara Ali",
        managerAvatar: "/avatars/sara.jpg",
      },
    ],
  },
  {
    id: "2",
    name: "Lahore Central Team",
    reps: [
      {
        id: "r4",
        name: "Bilal Ahmed",
        avatar: "/avatars/bilal.jpg",
        manager: "Usman Malik",
        managerAvatar: "/avatars/usman.jpg",
      },
      {
        id: "r5",
        name: "Fatima Noor",
        avatar: "/avatars/fatima.jpg",
        manager: "Usman Malik",
        managerAvatar: "/avatars/usman.jpg",
      },
    ],
  },
];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const products = [
  "Amoxicillin 500mg",
  "Ibuprofen 200mg",
  "Paracetamol 650mg",
  "Metformin 500mg",
  "Lisinopril 10mg",
];

export default function SetTargetComponent() {
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  return (
    <div className="w-full bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="p-10 space-y-10">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            Set Monthly Target
          </h1>
          <p className="text-gray-500 mt-2">Assign targets to sales representatives</p>
        </div>

        {/* Select Team */}
        <div>
          <label className="block text-lg font-semibold text-gray-900 mb-4">Select Team</label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {teamsData.map((team) => (
              <div
                key={team.id}
                onClick={() => setSelectedTeam(team)}
                className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                  selectedTeam?.id === team.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300 bg-white"
                }`}
              >
                <h3 className="font-bold text-gray-900">{team.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{team.reps.length} Members</p>
              </div>
            ))}
          </div>
        </div>

        {/* Target Assignment Table - Only show if team selected */}
        {selectedTeam && (
          <div className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {selectedTeam.name} - Target Assignment
            </h2>

            <div className="space-y-6">
              {selectedTeam.reps.map((rep) => (
                <div key={rep.id} className="bg-gray-50/70 rounded-2xl p-6 border border-gray-200">
                  {/* Rep Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <Image
                        src="/girlPic.svg"
                        alt={rep.name}
                        width={56}
                        height={56}
                        className="rounded-full ring-4 ring-white shadow-md"
                      />
                      <div>
                        <h4 className="font-bold text-gray-900">{rep.name}</h4>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span>Reports to:</span>
                          <div className="flex items-center gap-2">
                            <Image
                              src="/CapMan.svg"
                              alt={rep.manager}
                              width={24}
                              height={24}
                              className="rounded-full"
                            />
                            <span className="font-medium">{rep.manager}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Target Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                    {/* Month */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Month</label>
                      <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white">
                        {months.map((m) => (
                          <option key={m}>{m} 2025</option>
                        ))}
                      </select>
                    </div>

                    {/* Target */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Target (Units)
                      </label>
                      <input
                        type="number"
                        placeholder="e.g. 500"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    {/* Product SKU */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Product SKU
                      </label>
                      <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white">
                        <option>Select SKU</option>
                        {products.map((p) => (
                          <option key={p}>{p}</option>
                        ))}
                      </select>
                    </div>

                    {/* Incentive % */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Incentive % <span className="text-gray-400 text-xs">(Default 100%)</span>
                      </label>
                      <input
                        type="number"
                        defaultValue={100}
                        min={0}
                        max={200}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end mt-10">
              <button className="px-10 py-4 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition flex items-center gap-3 shadow-xl">
                Save All Targets
              </button>
            </div>
          </div>
        )}

        {/* No Team Selected */}
        {!selectedTeam && (
          <div className="text-center py-20 text-gray-400">
            <User className="w-20 h-20 mx-auto mb-4 opacity-30" />
            <p className="text-xl">Select a team to assign targets</p>
          </div>
        )}
      </div>
    </div>
  );
}
