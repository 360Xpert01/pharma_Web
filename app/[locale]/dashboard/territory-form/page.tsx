"use client";
import { DashboardContent } from "../components/dashboard-content";

export default function TerritoryFormPage() {
  return (
    <div className="bg-(--gray-0)">
      <DashboardContent
        sample={"Territory Form"}
        descrip={"Create or update territory information"}
        hideData={true}
        hideHeader={true}
        hideMetrics={true}
        territoryForm={true}
        btnTrue={true}
      />
    </div>
  );
}
