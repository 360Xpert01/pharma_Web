"use client";

import { DashboardContent } from "../components/dashboard-content";

export default function DoctorDetailPage() {
  return (
    <div className="bg-(--gray-0)">
      <DashboardContent
        sample={"Doctor Details"}
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
