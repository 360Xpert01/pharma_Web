"use client";

import { DashboardContent } from "../components/dashboard-content";

export default function AllocateGiveawaysSamplesRoute() {
  return (
    <div className="bg-(--background)">
      <DashboardContent
        sample={"Allocate Giveaways & Samples"}
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
