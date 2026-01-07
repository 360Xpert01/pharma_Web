"use client";
import { DashboardContent } from "../components/dashboard-content";
import { useSearchParams } from "next/navigation";

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const employeeId = searchParams.get("id");

  return (
    <div className=" bg-(--background) mt-16">
      <DashboardContent
        sample={"Update Profile"}
        descrip={"Unlock the potential of your candidates"}
        table={"All product"}
        btnTrue={true}
        hideMetrics={true}
        UpdateEmp={true}
        employeeId={employeeId}
      />
    </div>
  );
}
