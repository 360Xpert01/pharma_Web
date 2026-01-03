"use client";
import { DashboardContent } from "../components/dashboard-content";

export default function AllocatedGiveawaysSamplesPage() {
  return (
    <div className="bg-[var(--gray-0)]">
      <DashboardContent
        sample={"Allocated Giveaways & Samples"}
        descrip={"Unlock the potential of your candidates"}
        hideHeader={false}
        hideMetrics={true}
        hideData={true}
        btnTrue={false}
        btnAdd={"Add New Assignee"}
        settingsRoute={"/dashboard/AddAllocateGivewaySample"}
        allocatedGiveawaysTable={true}
        campHeading={"All Assignees"}
        filterT={true}
      />
    </div>
  );
}
