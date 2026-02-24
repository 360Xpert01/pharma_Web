"use client";

import { useAppSelector } from "@/store";
import { DashboardContent } from "../../components/dashboard-content";

export default function DoctorDetailPage() {
  const { data: party } = useAppSelector((state) => state.partyById);
  const channelName = party?.channel_name || "Doctor";

  return (
    <div className="bg-(--gray-0)">
      <DashboardContent
        sample={`${channelName} Details`}
        descrip={"Unlock the potential of your candidates"}
        hideHeader={false}
        hideMetrics={true}
        hideData={true}
        btnTrue={true}
        doctorDetail
      />
    </div>
  );
}
