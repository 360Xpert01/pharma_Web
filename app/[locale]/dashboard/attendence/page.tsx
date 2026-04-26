"use client";

import { DashboardContent } from "../components/dashboard-content";
import { UserCheck } from "lucide-react";

export default function AttendancePage() {
  return (
    <DashboardContent
      AttendanceTable={true}
      campHeading="Attendance"
      filterT={true}
      hideHeader={true}
      hideMetrics={true}
      hideData={true}
      sample="Attendence"
      descrip=""
      btnTrue={true}
    />
  );
}
