"use client";

import { DashboardContent } from "../components/dashboard-content";

export default function SetTargetRoute() {
  return (
    <div className="bg-(--gray-0)">
      <DashboardContent
        sample={"Set Team Target"}
        descrip={"Unlock the potential of your candidates"}
        hideHeader={false}
        hideMetrics={true}
        hideData={true}
        btnTrue={true}
        setTargetlist={true}
      />
    </div>
  );
}
