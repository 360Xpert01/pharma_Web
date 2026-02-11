"use client";
import { DashboardContent } from "../components/dashboard-content";

export default function DistributorTypesPage() {
  return (
    <div className=" bg-(--background)">
      <DashboardContent
        sample={"Distributor Types"}
        descrip={"Manage and categorize distributor types"}
        table={"Distributor Types Report"}
        btnTrue={true}
        campHeading={"All Distributor Types"}
        filterT={true}
        hideMetrics={true}
        distributorTypesD={true}
        distributorTypesTrue={true}
      />
    </div>
  );
}
