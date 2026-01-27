"use client";
import { DashboardContent } from "../components/dashboard-content";
import { useSearchParams } from "next/navigation";

export default function UpdateProductPage() {
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");

  return (
    <div className=" bg-(--background) mt-16">
      <DashboardContent
        sample={"Update Product"}
        descrip={"Update your product details"}
        table={"All product"}
        btnTrue={true}
        hideMetrics={true}
        UpdateProduct={true}
        productId={productId}
      />
    </div>
  );
}
