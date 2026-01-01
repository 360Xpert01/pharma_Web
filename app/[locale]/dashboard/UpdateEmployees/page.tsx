"use client";
import { DashboardContent } from "../components/dashboard-content";

export default function DashboardPage() {
  return (
    <div className=" bg-(--background) mt-16">
      <DashboardContent
        sample={"Update Profile"}
        descrip={"Unlock the potential of your candidates"}
        table={"All product"}
        btnTrue={true}
        hideMetrics={true}
        UpdateEmp={true}
      />
    </div>
  );
}
