"use client";

import { DashboardContent } from "../components/dashboard-content";

export default function AddAllocateGivewaySamplePage() {
  return (
    <div className="bg-[var(--gray-0)]">
      <DashboardContent
        sample={"Allocated Giveaways & Samples"}
        descrip={"Unlock the potential of your candidates"}
        hideHeader={false}
        hideMetrics={true}
        hideData={true}
        btnTrue={true}
        AddAllocateGiveaway={true}
      />
    </div>
  );
}
