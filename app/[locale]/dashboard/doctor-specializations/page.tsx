"use client";
import { DashboardContent } from "../components/dashboard-content";

export default function DoctorSpecializationsPage() {
  return (
    <div className=" bg-(--background)">
      <DashboardContent
        sample={"Doctor Specializations"}
        descrip={"Manage doctor specializations for your organization"}
        table={"Doctor Specializations"}
        btnTrue={true}
        campHeading={"All Doctor Specializations"}
        filterT={true}
        hideMetrics={true}
        specializationsD={true}
        specializationsTrue={true}
      />
    </div>
  );
}
