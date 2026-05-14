"use client";
import { DashboardContent } from "../components/dashboard-content";

export default function TeamDetailsPage() {
  return (
    <div className=" bg-(--page-background) mt-16">
      <DashboardContent
        sample={"Team Details"}
        descrip={"Comprehensive view of team performance and members"}
        table={"All Teams"}
        btnAdd={"Edit Team"}
        settingsRoute={"/dashboard/UpdateTeamForm"}
        hideMetrics={true}
        teamDetailBtn={true}
        ActiveOn={true}
        showTabs={true}
      />
    </div>
  );
}
