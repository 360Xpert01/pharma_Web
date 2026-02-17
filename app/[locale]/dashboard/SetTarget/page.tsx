"use client";

import { DashboardContent } from "../components/dashboard-content";
import { useSearchParams } from "next/navigation";

export default function SetTargetRoute() {
  const searchParams = useSearchParams();
  const targetId = searchParams.get("targetId");

  return (
    <div className="bg-(--gray-0)">
      <DashboardContent
        sample={targetId ? "Update Target" : "Define Target"}
        descrip={
          targetId ? "Update your target allocation" : "Unlock the potential of your candidates"
        }
        hideHeader={false}
        hideMetrics={true}
        hideData={true}
        btnTrue={true}
        setTargetlist={!targetId}
        updateTargetlist={!!targetId}
      />
    </div>
  );
}
