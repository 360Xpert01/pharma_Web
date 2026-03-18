"use client";
import { DashboardContent } from "../components/dashboard-content";

export default function DistributorsManagementPage() {
  return (
    <div className="bg-(--gray-0)">
      <DashboardContent
        sample={"Distributors Management"}
        descrip={"Manage your distributor network"}
        table={"All Distributors"}
        btnAdd={"Add New Distributor"}
        hideMetrics={true}
        hideHeader={false}
        proBar={false}
        distributorTable={true}
        settingsRoute={"/dashboard/addDistributor"}
        btntextReq={""}
        btnReqquest={false}
      />
    </div>
  );
}
