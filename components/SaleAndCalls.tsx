import { ChevronLeft, ChevronRight } from "lucide-react";
import { salesProgress } from "../data/mockData";

export default function SaleAndCalls() {
  return (
    <div className="w-full  ">
      <div className="flex justify-between mt-3 mb-2  my-auto  items-center">
        <h2 className="text-lg font-semibold">Sale & Calls</h2>
        <div className="flex items-center   gap-1 text-xs text-(--primary) bg-(--background) px-3 py-1 rounded-8">
          <ChevronLeft className="w-4 h-4" />
          <span>September 2025</span>
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {/* Today Sales */}
        <div className="bg-(--background) rounded-8 shadow-soft p-4">
          <p className="text-sm text-(--gray-6)">Today sales</p>
          <div className="mt-2 ">
            <span className="text-2xl font-semibold">27</span>
            <span className="text-xs text-(--gray-5) ml-2 ">September 2025</span>
          </div>
          <div className="flex items-end gap-4 justify-center">
            {salesProgress.map(({ time, value }) => (
              <div key={time} className="flex flex-col mb-3 items-center">
                <span className="text-xs mb-5 text-(--gray-6) ">{time}</span>

                {/* Progress Bar */}
                <div className="w-6 h-2 bg-(--gray-2) rounded-8 overflow-hidden relative">
                  <div
                    className="absolute inset-0 bg-(--primary) rounded-8 transition-all duration-700 ease-out"
                    style={{ width: `${value * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Total Calls */}
        <div className="bg-(--background) rounded-8 shadow-soft p-6">
          <h3 className="text-lg font-semibold mb-4">Total Calls</h3>
          <div className="">
            <div className="flex justify-between">
              <span className="text-2xl font-bold text-(--primary-1)">15</span>
              <span className="text-sm">Visitors per day</span>
            </div>
            <div className="flex justify-between">
              <span className="text-2xl font-bold text-(--destructive-1)">05</span>
              <span className="text-sm">Call Missed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
