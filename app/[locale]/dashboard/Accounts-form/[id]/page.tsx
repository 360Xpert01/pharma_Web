"use client";
import { DashboardContent } from "../../components/dashboard-content";
import { useParams, useSearchParams } from "next/navigation";

export default function DashboardPage() {
  const params = useParams();
  const giveawayId = params.id;

  return (
    <div className="">
      <DashboardContent
        sample={"Add a Doctor"}
        descrip={"Unlock the potential of your candidates"}
        btnTrue={true}
        hideMetrics={true}
        doctorForm={true}
        idForm={giveawayId as string}
      />
    </div>
  );
}
