"use client";
import { DashboardContent } from "../components/dashboard-content";
import { useSearchParams } from "next/navigation";

export default function UpdateDistributorPage() {
  const searchParams = useSearchParams();
  const distributorId = searchParams.get("id");

  return (
    <div className="bg-(--background) mt-16">
      <DashboardContent
        sample={"Update Distributor"}
        descrip={"Edit distributor details"}
        table={""}
        hideMetrics={true}
        btnTrue={true}
        UpdateDistributorEmp={true}
        distributorId={distributorId}
      />
    </div>
  );
}
