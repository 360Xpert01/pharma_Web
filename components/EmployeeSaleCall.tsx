"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

export default function SalesAndCallsCard() {
  return (
    <div className="w-full ">
      {/* Header */}
      <div className="flex  justify-between p-3 pb-4">
        <h2 className="text-3xl font-semibold text-gray-500">Sale & Calls</h2>
        <div className="flex items-center gap-2 text-sm font-medium text-blue-600 bg-white px-4 py-2 rounded-md  transition-colors cursor-pointer">
          <ChevronLeft className="w-4 h-4 text-gray-400 " />
          <span>September, 27 2025</span>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </div>
      </div>

      <div className="flex justify-between gap-6  pb-6 w-[100%]">
        {/* Today Sales */}
        <div className="p-8 border bg-white w-[49%] border-gray-100 rounded-lg shadow-sm">
          <h3 className="text-3xl font-semibold text-gray-900 mb-6">Today sales</h3>

          <div className="flex items-baseline gap-3 mb-8">
            <span className="text-5xl font-bold text-blue-600">27</span>
            <span className="text-lg text-gray-500">September 2025</span>
          </div>

          {/* Timeline Bar */}
          <div className="relative">
            <div className="flex justify-between text-sm text-gray-500 mb-3">
              <span>8:00</span>
              <span>12:00</span>
              <span>16:00</span>
              <span>20:00</span>
            </div>

            <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
              <div className="absolute inset-0 flex items-center">
                {/* Active Progress */}
                <div className="h-full flex">
                  <div className="w-1/5 bg-blue-600 rounded-l-full"></div>
                  <div className="w-1/5 bg-blue-600"></div>
                  <div className="w-1/5 bg-blue-600"></div>
                  <div className="w-1/5 bg-blue-600 opacity-70"></div>
                  <div className="w-1/5 bg-gray-300"></div>
                </div>
              </div>

              {/* White overlay dots for time markers */}
              <div className="absolute inset-0 flex justify-between px-1">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="w-1.5 h-1.5 bg-white rounded-full shadow-sm"></div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Total Calls */}
        <div className="p-8 border bg-white w-[49%] border-gray-100 rounded-lg shadow-md">
          <h3 className="text-3xl font-semibold text-gray-900 mb-6">Total Calls</h3>

          <div className="space-y-5">
            <div>
              <span className="text-5xl font-bold text-blue-600">15</span>
              <span className="text-lg text-gray-500 ml-3">visitors per day</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-5xl font-bold text-red-500">05</span>
              <span className="text-lg text-gray-500 ">Call Missed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
