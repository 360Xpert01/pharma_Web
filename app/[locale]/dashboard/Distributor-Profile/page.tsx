"use client";
import { DashboardContent } from "../components/dashboard-content";

export default function DistributorProfilePage() {
  return (
    <div className="bg-(--page-background) mt-16">
      <DashboardContent
        sample={"Distributor Profile"}
        descrip={"View distributor details"}
        table={""}
        btnAdd={"Edit Distributor"}
        settingsRoute={"/dashboard/UpdateDistributor"}
        hideMetrics={true}
        distributorProfileBtn={true}
        showDistributorTabs={true}
        ActiveOn={true}
      />
    </div>
  );
}
