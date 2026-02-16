"use client";

import { DashboardContent } from "../components/dashboard-content";

export default function TerritoryConflictsRoute() {
  return (
    <div className="bg-(--gray-0)">
      <DashboardContent
        sample={"Conflict Resolution"}
        descrip={"Unlock the potential of your candidates"}
        hideHeader={false}
        hideMetrics={true}
        hideData={true}
        btnTrue={true}
        territoryConflicts={true}
      />
    </div>
  );
}
