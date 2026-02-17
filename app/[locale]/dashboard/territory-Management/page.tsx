"use client";
import { DashboardContent } from "../components/dashboard-content";

export default function TerritoryManagementPage() {
  return (
    <div className="bg-(--gray-0)">
      <DashboardContent
        sample={"Territory Management"}
        descrip={"Manage and organize territories efficiently"}
        table={"All Territories"}
        btnAdd={"Add New Territory"}
        hideData={false}
        hideHeader={true}
        hideMetrics={true}
        proBar={false}
        territoryTable={true}
        settingsRoute={"/dashboard/territory-form"}
      />
    </div>
  );
}
