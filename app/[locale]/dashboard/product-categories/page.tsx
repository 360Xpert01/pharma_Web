"use client";
import { DashboardContent } from "../components/dashboard-content";

export default function ProductCategoriesPage() {
  return (
    <div className=" bg-(--background)">
      <DashboardContent
        sample={"Product Categories"}
        descrip={"Manage product categories for your organization"}
        table={"Product Categories"}
        btnTrue={true}
        campHeading={"All Product Categories"}
        filterT={true}
        hideMetrics={true}
        productCategoriesD={true}
        productCategoriesTrue={true}
      />
    </div>
  );
}
