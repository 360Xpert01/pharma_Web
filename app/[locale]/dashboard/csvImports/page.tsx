"use client";
import { DashboardContent } from "../components/dashboard-content";

export default function DashboardPage() {
  return (
    <div className=" bg-(--background)">
      <DashboardContent
        sample={"CSV Import"}
        descrip={"Unlock the potential of your candidates"}
        table={"All Doctors"}
        btnTrue={true}
        campHeading={"All Doctors"}
        filterT={true}
        csvIMP={true}
        hideMetrics={true}
        hideHeader={true}
        settingsRoute={"/dashboard/doctor-form"}
      />
    </div>
  );
}
