"use client";
import { DashboardContent } from "../components/dashboard-content";

export default function DashboardPage() {
  return (
    <div className=" bg-white">
      <DashboardContent
        sample={"Request View"}
        descrip={"Unlock the potential of your candidates"}
        table={"All Requests"}
        btnTrue={true}
        hideHeader={true}
        hideMetrics={true}
        proBar={false}
        hideData={true}
        ReqTabel={true}
        campHeading={"All Requests"}
        filterT={false}
      />
    </div>
  );
}
