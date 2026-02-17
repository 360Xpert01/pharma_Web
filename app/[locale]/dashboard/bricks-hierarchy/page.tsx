"use client";
import { DashboardContent } from "../components/dashboard-content";
import { useBricksImport } from "@/hooks/useBricksImport";

export default function BricksHierarchyPage() {
  const { handleImport } = useBricksImport();

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
        pulseAddBtn={true}
        onAddClick={() => {
          // This will be handled by the Wrapper via a shared state or event
          window.dispatchEvent(new CustomEvent("bricks:add-root"));
        }}
      />
    </div>
  );
}
