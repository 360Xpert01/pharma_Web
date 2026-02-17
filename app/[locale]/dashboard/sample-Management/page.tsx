"use client";
import { DashboardContent } from "../components/dashboard-content";

export default function DashboardPage() {
  return (
    <div className="bg-(--background)">
      <DashboardContent
        sample={"Sample Management"}
        descrip={"Welcome to Ceutro, It's looking like a slow day"}
        table={"All Samples"}
        btnAdd={"Add Sample"}
        btnTrue={true}
        campHeading={"All Samples"}
        filterT={true}
        sampleTable={true}
        hideMetrics={false}
        settingsRoute={"/dashboard/Sample-Form"}
        dataCard={{
          topHcps: [
            {
              title: "Calls Completed vs Planned",
              value: 430,
              valueLabel: "Calls Completed",
              subtitle: "81.7% completed . 22 pending",
              detailValue: "180K",
              progress: 75,
              colorVariant: "1",
            },
            {
              title: "Top HCPs by potential",
              value: 15,
              valueLabel: "High Potential",
              subtitle: "Dr. Sarah Ali",
              detailValue: "195K",
              progress: 30,
              colorVariant: "2",
            },
            {
              title: "Remaining Samples",
              value: 1325,
              valueLabel: "Units",
              subtitle: "Paracetamol",
              detailValue: "142K",
              progress: 60,
              colorVariant: "3",
            },
            {
              title: "Pending Approvals",
              value: 100,
              valueLabel: "Items",
              subtitle: "DCR",
              detailValue: "168K",
              progress: 45,
              colorVariant: "4",
            },
          ],
        }}
      />
    </div>
  );
}
