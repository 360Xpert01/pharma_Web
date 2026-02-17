"use client";
import { DashboardContent } from "../components/dashboard-content";

export default function DoctorSegmentsPage() {
  return (
    <div className=" bg-(--background)">
      <DashboardContent
        sample={"Doctor Segments"}
        descrip={"Manage and categorize doctors by segments (A/B/C)"}
        table={"Segments Report"}
        btnTrue={true}
        campHeading={"All Doctor Segments"}
        filterT={true}
        hideMetrics={true}
        doctorSegmentsD={true}
        doctorSegmentsTrue={true}
      />
    </div>
  );
}
