"use client";
import { DashboardContent } from "../components/dashboard-content";

export default function DashboardPage() {
  return (
    <div className=" bg-white">
      <DashboardContent
        sample={"User Roles"}
        descrip={"Unlock the potential of your candidates"}
        table={"All Request"}
        hideHeader={true}
        hideMetrics={true}
        hideData={true}
        campHeading={"All Roles"}
        UserRoleTable={true}
        btnAdd={"Add New Role"}
        settingsRoute={"/dashboard/AddRole-Form"}
      />
    </div>
  );
}
