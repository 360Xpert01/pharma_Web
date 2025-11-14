"use client";
import { DashboardContent } from "../components/dashboard-content";

export default function DashboardPage() {
  return (
    <div className=" bg-gray-50">
      <DashboardContent
        sample={"Employees Management"}
        descrip={"Unlock the potential of your candidates"}
        table={"All Pharmacies & chemists"}
        btnAdd={"Add New Employee"}
        hideData={false}
        hideHeader={true}
        hideMetrics={true}
        proBar={true}
        settingsRoute={"/dashboard/addEmployees"}
        settingsRouteRequest={"/dashboard/viewRequestEmployees"}
        btntextReq={"view Requests"}
        btnReqquest={false}
      />
    </div>
  );
}
