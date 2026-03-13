"use client";
import { DashboardContent } from "../components/dashboard-content";

export default function AddDistributorPage() {
  return (
    <div className="bg-(--page-background) mt-16">
      <DashboardContent
        sample={"Add Distributor"}
        descrip={"Register a new distributor"}
        table={""}
        hideMetrics={true}
        btnTrue={true}
        AddDistributorBtn={true}
      />
    </div>
  );
}
