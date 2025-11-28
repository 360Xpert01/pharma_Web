"use client";
import { DashboardContent } from "../components/dashboard-content";

export default function DashboardPage() {
  return (
    <div className="">
      <DashboardContent
        sample={"Add New Giveaway"}
        descrip={"Unlock the potential of your candidates"}
        btnTrue={true}
        hideMetrics={true}
        GivawayForm={true}
      />
    </div>
  );
}
