"use client";
import { useSearchParams } from "next/navigation";
import { DashboardContent } from "../components/dashboard-content";

export default function TeamDetailsPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  return (
    <div className=" bg-(--page-background) mt-16">
      <DashboardContent
        sample={"Team Details"}
        descrip={"Comprehensive view of team performance and members"}
        table={"All Teams"}
        btnAdd={"Edit Team"}
        settingsRoute={
          id ? `/dashboard/UpdateTeamForm?id=${id}&mode=update` : "/dashboard/UpdateTeamForm"
        }
        hideMetrics={true}
        teamDetailBtn={true}
        ActiveOn={true}
        showTabs={true}
      />
    </div>
  );
}
