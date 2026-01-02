"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Phone,
  Users,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

export default function SalesDashboard() {
  // ----- Mock data -----
  const monthlyTargets = {
    thisMonth: 75.08,
    lastMonth: 45.27,
  };

  const monthlyData = [
    { month: "Jan", target: 70, achieved: 60 },
    { month: "Feb", target: 72, achieved: 68 },
    { month: "Mar", target: 75, achieved: 70 },
    { month: "Apr", target: 78, achieved: 72 },
    { month: "May", target: 80, achieved: 78 },
    { month: "Jun", target: 82, achieved: 75 },
    { month: "Jul", target: 85, achieved: 70 },
    { month: "Aug", target: 88, achieved: 65 },
    { month: "Sep", target: 90, achieved: 70 },
    { month: "Oct", target: 92, achieved: 30 },
    { month: "Nov", target: 95, achieved: 10 },
    { month: "Dec", target: 98, achieved: 5 },
  ];

  const mostSold = [
    { name: "Product Name1", value: 445.2, color: "#f87171" },
    { name: "Product Name2", value: 65.2, color: "#34d399" },
    { name: "Product Name3", value: 5.2, color: "#60a5fa" },
    { name: "Product Name4", value: 44, color: "#a78bfa" },
    { name: "Product Name5", value: 25.9, color: "#f472b6" },
    { name: "Product Name6", value: 65.11, color: "#10b981" },
  ];

  const salesProgress = [
    { time: "8:00", value: 0.25 }, // thoda sa
    { time: "12:00", value: 0.55 }, // aadha se zyada
    { time: "16:00", value: 0.8 }, // kaafi bhara
    { time: "20:00", value: 1.0 }, // poora bhara
  ];

  const brandData = [
    { name: "Brand 1", value: 37, color: "#3b82f6" },
    { name: "Brand 2", value: 22, color: "#6b7280" },
    { name: "Brand 3", value: 24, color: "#9ca3af" },
  ];

  const attendanceData = [
    { name: "Absent", value: 32, color: "#f87171" },
    { name: "Offsite", value: 31, color: "#34d399" },
    { name: "Onsite", value: 37, color: "#60a5fa" },
  ];

  // ----- Helper components -----
  const StatCard = ({
    title,
    value,
    change,
    trend,
  }: {
    title: string;
    value: string;
    change?: string;
    trend?: "up" | "down";
  }) => (
    <div className="bg-(--background) rounded-8 p-4 shadow-soft border border-(--gray-1)">
      <p className="text-sm text-(--gray-6)">{title}</p>
      <div className="flex items-end gap-2 mt-1">
        <p className="text-2xl font-semibold">{value}</p>
        {change && (
          <p
            className={`text-sm flex items-center ${trend === "up" ? "text-(--success)" : "text-(--destructive)"}`}
          >
            {trend === "up" ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
            {change}
          </p>
        )}
      </div>
    </div>
  );

  return (
    <>
      <div className=" text-(--dark)">
        {/* Header */}
        <div className="bg-(--background) w-full  rounded-8 shadow-soft p-2 mb-2 flex justify-between ">
          <div className="flex gap-2 items-center">
            <div className="w-16 h-16 rounded-8 bg-(--gray-2) border-2 border-dashed" />
            <div className="items-center">
              <h1 className="text-xl font-semibold">Mohammad Amir</h1>
              <p className="text-sm text-(--gray-6)">Sales Representative</p>
            </div>
          </div>

          <p className="flex text-medium items-center text-(--gray-5)">m.amir2002@gmail.com</p>
          <p className="flex text-xl font-bold text-(--dark) items-center ">
            358 Calls
            <span className="text-medium items-center text-(--gray-4)">/Month</span>
          </p>
          <p className="flex text-xl font-bold text-(--dark) items-center">Diabatics</p>
          <p className="flex text-xl font-bold text-(--dark) items-center">Doctor</p>
          <p className="flex text-xl font-bold text-(--dark) items-center">75.08k</p>
          <p className="flex text-xl font-bold text-(--dark) items-center">445.k</p>

          {/* <StatCard title="Calls/Month" value="325" />
            <StatCard title="" value="Diabatics" />
            <StatCard title="" value="Doctor" />
            <StatCard title="" value="75.08K" change="↑" trend="up" />
            <StatCard title="" value="445.k" change="↓" trend="down" /> */}
          <button className="flex items-center gap-1 text-(--primary) text-sm font-medium">
            View Details <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid bg-(--gray-1) rounded-8 p-3  grid-cols-1 lg:grid-cols-4 gap-2">
          {/* Monthly Targets */}
          <div className="bg-(--background) rounded-8 shadow-soft p-6">
            <h2 className="text-lg font-semibold mb-4">Monthly Targets</h2>
            <div className="flex justify-around mb-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-(--primary)">{monthlyTargets.thisMonth}</p>
                <p className="text-sm text-(--gray-6)">This month</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-(--destructive) ">
                  {monthlyTargets.lastMonth}
                </p>
                <p className="text-sm text-(--gray-6)">Last month</p>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={monthlyData}>
                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                {/* <YAxis tick={{ fontSize: 12 }} /> */}
                <Tooltip />
                <Bar dataKey="target" fill="#93c5fd" radius={[4, 4, 0, 0]} />
                <Bar dataKey="achieved" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Most Sold Products */}

          <div className="bg-(--background) rounded-8 shadow-soft p-6">
            <h2 className="text-lg font-semibold mb-4">Most Sold Products</h2>

            <div className="space-y-5">
              {mostSold.map((p) => {
                const maxValue = Math.max(...mostSold.map((i) => i.value));
                const percentage = (p.value / maxValue) * 100;
                const capped = Math.min(percentage, 90); // Max 90%

                return (
                  <div key={p.name} className="flex flex-col gap-1">
                    {/* Name + Value Row */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div />
                        <span className="text-sm font-medium text-(--primary)">{p.name}</span>
                      </div>
                      <span className="font-medium text-sm text-(--gray-9)">
                        {p.value.toFixed(1)}K
                      </span>
                    </div>

                    {/* Progress Bar (capped at 90%) */}
                    <div className="flex items-center">
                      <div className="flex-1 bg-(--gray-2) rounded-8 h-2 overflow-hidden">
                        <div
                          className="h-full transition-all duration-500 ease-out"
                          style={{
                            width: `${capped}%`,
                            backgroundColor: p.color,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* By Brands */}
          <div className="bg-(--background) rounded-8 shadow-soft p-6">
            <h2 className="text-lg font-semibold ">By Brands</h2>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={brandData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {brandData.map((entry, i) => (
                    <Cell key={`cell-${i}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-4 flex-wrap">
              {brandData.map((b) => (
                // <div key={b.name} className="flex items-center gap-1 text-xs">
                //   <div className="w-3 h-3 rounded-8" style={{ backgroundColor: b.color }} />
                //   <span>{b.name}</span>
                // </div>
                <button style={{ backgroundColor: b.color }} className="text-(--light) p-2 rounded">
                  {b.name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-1 gap-2 ">
            {/* Monthly Attendance */}
            <div className="bg-(--background) flex  rounded-8 shadow-soft p-3">
              <div className=" w-[50%] h-full flex flex-col justify-between bg-(--background) ">
                <div>
                  <h2 className="text-lg font-bold">Monthly Attendance</h2>
                </div>
                <div className="flex  items-center  text-(--dark) p-1  border border-(--gray-4)  bg-(--gray-2) rounded-8 ">
                  <ChevronLeft className="w-4 h-4" />
                  <span className="text-bold">September 2025</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
                <div className="flex  gap-4 text-xs">
                  <div className="flex items-center  gap-3">
                    <button className="bg-(--destructive) p-2 text-(--light) text-bold rounded-8">
                      Absent
                    </button>
                    <button className="bg-(--primary) p-2 text-(--light) text-bold rounded-8">
                      Offsite
                    </button>
                    <button className="bg-(--success) p-2 text-(--light) text-bold rounded-8">
                      Onsite
                    </button>
                  </div>
                </div>
              </div>
              <div className="w-[50%] item-center">
                <ResponsiveContainer width="100%" height={160}>
                  <PieChart>
                    <Pie
                      data={attendanceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={75}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {attendanceData.map((entry, i) => (
                        <Cell key={`cell-${i}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="flex w-full  justify-between ">
              <div>
                <h2 className="text-lg font-semibold">Sale & Calls</h2>
              </div>
              <div className="flex items-center gap-1 text-xs text-(--primary) bg-(--background)  rounded-8 ">
                <ChevronLeft className="w-4 h-4" />
                <span>September 2025</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            {/* Sale & Calls */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
              <div className="bg-(--background) rounded-8 shadow-soft p-2">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-(--gray-6)">Today sales</p>
                    <span className="text-2xl font-semibold">27</span>
                    <span className="text-xs text-(--gray-5)">September 2025</span>
                  </div>
                  {/* Progress Bars with Time Labels */}
                  <div className="flex items-end gap-4 justify-center">
                    {salesProgress.map(({ time, value }) => (
                      <div key={time} className="flex flex-col items-center">
                        <span className="text-sm text-(--gray-6) mb-2">{time}</span>

                        {/* Progress Bar */}
                        <div className="w-6 h-4 bg-(--gray-2) rounded-8 overflow-hidden relative">
                          <div
                            className="absolute inset-0 bg-(--primary) rounded-8 transition-all duration-700 ease-out"
                            style={{ width: `${value * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Total Calls */}
              <div className="bg-(--background) rounded-8 shadow-soft p-2">
                <h2 className="text-lg font-semibold mb-4">Total Calls</h2>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xl text-(--primary-1) aline-center font-bold">15</span>
                    <span className="text-sm"> visitors per day</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xl text-(--destructive-1) font-bold ">05</span>
                    <span className="text-sm "> Call Missed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
