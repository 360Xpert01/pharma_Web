"use client";

import React, { useState } from "react";
import {
  Trash2,
  Plus,
  AlertCircle,
  User,
  Lock,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Star,
} from "lucide-react";

interface Capsule {
  id: string;
  capacity: string;
  monthlyTarget: string;
}

interface Brick {
  id: string;
  name: string;
}

export default function AddEmployeeForm() {
  const [capsules, setCapsules] = useState<Capsule[]>([
    { id: "1", capacity: "Capsule 500Kg", monthlyTarget: "" },
    { id: "2", capacity: "Capsule 1000Kg", monthlyTarget: "" },
    { id: "3", capacity: "Capsule 1500Kg", monthlyTarget: "" },
  ]);

  const [bricks, setBricks] = useState<Brick[]>([
    { id: "1", name: "Nazimabad No.4" },
    { id: "2", name: "Five Star" },
    { id: "3", name: "Lucky One" },
  ]);

  const updateCapsuleTarget = (id: string, value: string) => {
    setCapsules(capsules.map((c) => (c.id === id ? { ...c, monthlyTarget: value } : c)));
  };

  const addBrick = () => {
    setBricks([...bricks, { id: Date.now().toString(), name: "" }]);
  };

  const updateBrick = (id: string, name: string) => {
    setBricks(bricks.map((b) => (b.id === id ? { ...b, name } : b)));
  };

  const removeBrick = (id: string) => {
    if (bricks.length > 1) {
      setBricks(bricks.filter((b) => b.id !== id));
    }
  };

  return (
    <>
      <div className=" mx-auto text-(--dark) p-6 bg-(--gray-0) min-h-screen ">
        <div className="bg-(--background) rounded-2xl shadow-soft border border-(--gray-2) overflow-hidden">
          <div className="px-8 py-6 border-b border-(--gray-2)">
            <h2 className="text-2xl font-bold text-(--gray-9)">Add Employees</h2>
            <p className="text-sm text-(--gray-5) mt-1">Create New Employee</p>
          </div>

          <div className="p-8 space-y-10">
            {/* Basic Info - Skipped for brevity */}
            <div>
              <h3 className="text-lg font-medium text-(--gray-9) mb-4">Basic Info</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-(--gray-7) mb-1">
                    Full Name <span className="text-(--destructive)">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-(--gray-3) rounded-lg focus:ring-2 focus:ring-(--primary) focus:border-transparent"
                    placeholder="e.g. John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-(--gray-7) mb-1">
                    Username <span className="text-(--destructive)">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-(--gray-3) rounded-lg focus:ring-2 focus:ring-(--primary) focus:border-transparent"
                    placeholder="e.g. john.doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-(--gray-7) mb-1">
                    Email Address <span className="text-(--destructive)">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-(--gray-4)" />
                    <input
                      type="email"
                      className="w-full pl-10 pr-4 py-2 border border-(--gray-3) rounded-lg focus:ring-2 focus:ring-(--primary) focus:border-transparent"
                      placeholder="e.g. john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-(--gray-7) mb-1">Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-2 border border-(--gray-3) rounded-lg focus:ring-2 focus:ring-(--primary) focus:border-transparent"
                    placeholder="••••••••"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-(--gray-7) mb-1">
                    Confirm Password <span className="text-(--destructive)">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-4 h-4 text-(--gray-4)" />
                    <input
                      type="password"
                      className="w-full pl-10 pr-4 py-2 border border-(--gray-3) rounded-lg focus:ring-2 focus:ring-(--primary) focus:border-transparent"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-(--gray-7) mb-1">
                    Phone Number <span className="text-(--destructive)">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 w-4 h-4 text-(--gray-4)" />
                    <input
                      type="tel"
                      className="w-full pl-10 pr-4 py-2 border border-(--gray-3) rounded-lg focus:ring-2 focus:ring-(--primary) focus:border-transparent"
                      placeholder="+92-3456789000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-(--gray-7) mb-1">
                    Date Of Birth
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 w-4 h-4 text-(--gray-4)" />
                    <input
                      type="date"
                      className="w-full pl-10 pr-4 py-2 border border-(--gray-3) rounded-lg focus:ring-2 focus:ring-(--primary) focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-(--gray-7) mb-1">Address</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-8 w-4 h-4 text-(--gray-4)" />
                    <textarea
                      rows={3}
                      className="w-full pl-10 pr-4 py-2 border border-(--gray-3) rounded-lg focus:ring-2 focus:ring-(--primary) focus:border-transparent"
                      placeholder="e.g. H031, Block-2, Gulistan-e-Jauhar, Karachi, Pakistan"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Assign Role & Territory - EXACT MATCH */}
            <div className="space-y-8">
              <h3 className="text-xl font-semibold text-(--gray-9)">Assign Role & Territory</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-(--gray-7) mb-2">
                    Select Role <span className="text-(--destructive)">*</span>
                  </label>
                  <select className="w-full px-4 py-3 border border-(--gray-3) rounded-xl text-(--gray-7) focus:ring-2 focus:ring-(--primary) focus:border-transparent">
                    <option>Sales Representative</option>
                    <option>Manager</option>
                    <option>Admin</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-(--gray-7) mb-2">
                    Select Line Manager
                  </label>
                  <select className="w-full px-4 py-3 border border-(--gray-3) rounded-xl text-(--gray-7) focus:ring-2 focus:ring-(--primary) focus:border-transparent">
                    <option>Select Line Manager</option>
                    <option>Sales Representative</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-(--gray-7) mb-2">
                    Select Team <span className="text-(--destructive)">*</span>
                  </label>
                  <select className="w-full px-4 py-3 border border-(--gray-3) rounded-xl text-(--gray-7) focus:ring-2 focus:ring-(--primary) focus:border-transparent">
                    <option>Sales Representative</option>
                  </select>
                </div>
              </div>

              {/* Capsules Row */}
              <div className="flex flex-wrap gap-6 items-end">
                {capsules.map((capsule) => (
                  <div key={capsule.id} className="flex items-end gap-3">
                    <div>
                      <label className="block text-sm font-medium text-(--gray-7) mb-2">
                        {capsule.capacity}
                      </label>
                      <input
                        type="text"
                        value={capsule.monthlyTarget}
                        onChange={(e) => updateCapsuleTarget(capsule.id, e.target.value)}
                        placeholder="Set Monthly Target"
                        className="w-48 px-4 py-3 border border-(--gray-3) rounded-xl focus:ring-2 focus:ring-(--primary) focus:border-transparent"
                      />
                    </div>
                    <button className="px-4 py-3 bg-(--primary) text-(--light) font-medium rounded-xl hover:bg-(--primary-2) transition-colors whitespace-nowrap">
                      Save Target
                    </button>
                  </div>
                ))}
              </div>

              {/* Location Fields */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-(--gray-7) mb-2">
                    City <span className="text-(--destructive)">*</span>
                  </label>
                  <select className="w-full px-4 py-3 border border-(--gray-3) rounded-xl text-(--gray-7)">
                    <option>Select your region</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-(--gray-7) mb-2">
                    Country <span className="text-(--destructive)">*</span>
                  </label>
                  <select className="w-full px-4 py-3 border border-(--gray-3) rounded-xl text-(--gray-7)">
                    <option>Enter your country</option>
                    <option>Pakistan</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-(--gray-7) mb-2">
                    Area <span className="text-(--destructive)">*</span>
                  </label>
                  <select className="w-full px-4 py-3 border border-(--gray-3) rounded-xl text-(--gray-7)">
                    <option>Enter your Area</option>
                  </select>
                </div>
              </div>

              {/* Bricks */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-(--gray-7) mb-2">
                    Bricks <span className="text-(--destructive)">*</span>
                  </label>
                  <select className="w-full max-w-md px-4 py-3 border border-(--gray-3) rounded-xl text-(--gray-7)">
                    <option>Enter your bricks</option>
                  </select>
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                  {bricks.map((brick) => (
                    <div
                      key={brick.id}
                      className={`flex items-center gap-2 px-4 py-3 rounded-xl border ${
                        brick.name === "Nazimabad No.4"
                          ? "border-(--destructive) bg-(--destructive-0)"
                          : "border-(--gray-3) bg-(--background)"
                      }`}
                    >
                      <input
                        type="text"
                        value={brick.name}
                        onChange={(e) => updateBrick(brick.id, e.target.value)}
                        className="bg-transparent outline-none font-medium text-(--gray-8) min-w-32"
                        placeholder="Brick name"
                      />
                      {brick.name === "Nazimabad No.4" && (
                        <AlertCircle className="w-5 h-5 text-(--destructive)" />
                      )}
                      <button
                        onClick={() => removeBrick(brick.id)}
                        className="text-(--destructive) hover:bg-(--destructive-0) p-1 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={addBrick}
                    className="flex items-center gap-2 px-5 py-3 bg-(--primary) text-(--light) font-medium rounded-xl hover:bg-(--primary-2) transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                    Add New Brick
                  </button>
                </div>

                {bricks.some((b) => b.name === "Nazimabad No.4") && (
                  <div className="flex items-center gap-2 text-(--destructive) text-sm font-medium">
                    <AlertCircle className="w-4 h-4" />
                    <span>Conflict in sales allocation</span>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Registration */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-(--gray-9)">Mobile Registration</h3>
              <div className="flex flex-wrap gap-4">
                {["", "", ""].map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <input
                      type="text"
                      placeholder={`atb02c9de5f67890`}
                      className={`px-5 py-3 rounded-xl border ${
                        i === 0
                          ? "border-(--destructive-1) bg-(--destructive-0)"
                          : "border-(--gray-3)"
                      } focus:ring-2 focus:ring-(--primary) focus:border-transparent`}
                    />
                    <button className="text-(--destructive) hover:bg-(--destructive-0) p-2 rounded-lg transition-colors">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 pt-8 border-t border-(--gray-2)">
              <button className="px-6 py-3 border border-(--primary) text-(--primary) font-medium rounded-xl hover:bg-(--primary-0) transition-colors">
                Discard
              </button>
              <button className="px-8 py-3 bg-(--primary) text-(--light) font-medium rounded-xl hover:bg-(--primary-2) transition-colors flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Add Employee
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
