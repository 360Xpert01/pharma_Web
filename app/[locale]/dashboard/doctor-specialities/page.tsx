"use client";
import { DashboardContent } from "../components/dashboard-content";

export default function SpecialitiesPage() {
  return (
    <div className=" bg-(--background)">
      <DashboardContent
        sample={"Doctor Specialities"}
        descrip={"Manage medical specialities and subspecialities"}
        table={"Specialities Report"}
        btnTrue={true}
        campHeading={"All Specialities"}
        filterT={true}
        hideMetrics={true}
        specialitiesD={true}
        specialitiesTrue={true}
      />
    </div>
  );
}
