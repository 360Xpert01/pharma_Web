"use client";
import { DashboardContent } from "../components/dashboard-content";

export default function DashboardPage() {
  return (
    <div className=" bg-(--page-background) mt-16">
      <DashboardContent
        sample={"Product View"}
        descrip={"Unlock the potential of your candidates"}
        table={"All product"}
        btnAdd={"Add New Product"}
        settingsRoute={"/dashboard/product-Form"}
        hideMetrics={true}
        productDetailBtn={true}
        ActiveOn={true}
        showTabs={true}
      />
    </div>
  );
}
