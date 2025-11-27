"use client";

import PlanRequestHeader from "@/components/PlanRequestHeader";
import PlanRequestCalendar from "@/components/PlanRequestCalendar";
import PlanRequestMeetings from "@/components/PlanRequestMeetings";

export default function PlanRequest() {
  return (
    <div className="bg-gradient-to-br mt-20 from-slate-50 to-slate-100 p-6 min-h-screen">
      <PlanRequestHeader />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6  mt-8">
        <div className="lg:col-span-2 space-y-6">
          <PlanRequestCalendar />
        </div>
        <PlanRequestMeetings />
      </div>
    </div>
  );
}
