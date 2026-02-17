"use client";
import { DashboardContent } from "../components/dashboard-content";

export default function DashboardPage() {
  return (
    <div className=" bg-(--background)">
      {/* <DashboardContent
        sample={"Product Management"}
        descrip={"Unlock the potential of your candidates"}
        table={"All product"}
        hideHeader={true}
        hideMetrics={true}
        hideData={false}
        btnAdd={"Add New Product"}
      /> */}
      <DashboardContent
        sample={"Product Management"}
        descrip={"Unlock the potential of your candidates"}
        table={"All product"}
        btnAdd={"Add New Product"}
        hideHeader={true}
        hideMetrics={true}
        proBar={false}
        hideData={true}
        prodTabel={true}
        campHeading={"All Products"}
        filterT={true}
        settingsRoute={"/dashboard/product-Form"}
      />
    </div>
  );
}
