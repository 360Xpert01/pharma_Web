"use client";
import { DashboardContent } from "../components/dashboard-content";

export default function QualificationsPage() {
  return (
    <div className=" bg-(--background)">
      <DashboardContent
        sample={"Doctor Qualifications"}
        descrip={"Manage and categorize doctor qualifications and certifications"}
        table={"Qualifications Report"}
        btnTrue={true}
        campHeading={"All Qualifications"}
        filterT={true}
        hideMetrics={true}
        qualificationsD={true}
        qualificationsTrue={true}
      />
    </div>
  );
}
