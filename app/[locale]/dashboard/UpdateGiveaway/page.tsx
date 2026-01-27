"use client";
import { DashboardContent } from "../components/dashboard-content";
import { useSearchParams } from "next/navigation";

export default function UpdateGiveawayPage() {
  const searchParams = useSearchParams();
  const giveawayId = searchParams.get("id");

  return (
    <div className="bg-(--background) mt-16">
      <DashboardContent
        sample={"Update Giveaway"}
        descrip={"Update your giveaway details"}
        table={"All Giveaway"}
        btnTrue={true}
        hideMetrics={true}
        UpdateGiveaway={true}
        giveawayId={giveawayId}
      />
    </div>
  );
}
