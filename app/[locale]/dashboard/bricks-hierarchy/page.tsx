"use client";
import { DashboardContent } from "../components/dashboard-content";

export default function BricksHierarchyPage() {
  return (
    <div className="bg-(--gray-0)">
      <DashboardContent
        sample="Bricks hierarchy"
        descrip="Manage geographical hierarchy - Zone, Region, Territory, and Bricks"
        table="Geographical Hierarchy"
        btnAdd="Add New Zone"
        hideData={false}
        hideHeader={true}
        hideMetrics={true}
        proBar={false}
        bricksHierarchy={true}
        settingsRoute="/dashboard/bricks-hierarchy/add"
      />
    </div>
  );
}
