"use client";
import { DashboardContent } from "../components/dashboard-content";
import { useSearchParams } from "next/navigation";

export default function UpdateAllocateGivewaySamplePage() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");

  return (
    <div className="bg-(--background) mt-16">
      <DashboardContent
        sample={"Update Allocation"}
        descrip={"Update giveaway and sample allocation for this employee"}
        table={"Allocated Giveaways & Samples"}
        btnTrue={true}
        hideMetrics={true}
        UpdateAllocation={true}
        employeeId={userId}
      />
    </div>
  );
}
