import { DoctorCardDetails } from "./DoctorCardDetails";

// components/DoctorStatsCard.tsx
export default function DoctorStatsCard() {
  const topHcps = [
    {
      title: "Sales Report",
      headerLabel: "Sales Completion Rate",
      headerTrend: "down" as const,
      value: 43000,
      valueLabel: "",
      subtitle: "Sales Completion Rate",
      detailValue: "180K",
      progress: 30,
      colorVariant: "1" as const,
    },
    {
      title: "Samples",
      value: 800,
      valueLabel: "Units",
      subtitle: "Samples Completion Rate",
      detailValue: "142K",
      progress: 50,
      colorVariant: "2" as const,
    },
    {
      title: "Giveaways",
      headerLabel: "120 Returned",
      headerTrend: "down" as const,
      value: 200,
      valueLabel: "Items",
      subtitle: "Distributed Items",
      detailValue: "168K",
      progress: 70,
      colorVariant: "3" as const,
    },
  ];

  return (
    <div className="grid gap-6 grid-cols-3">
      {topHcps?.length &&
        topHcps.map((hcp, index) => (
          <DoctorCardDetails
            key={index}
            title={hcp.title}
            headerLabel={hcp.headerLabel}
            headerTrend={hcp.headerTrend}
            value={hcp.value}
            valueLabel={hcp.valueLabel}
            subtitle={hcp.subtitle}
            detailValue={hcp.detailValue}
            progress={hcp.progress}
            colorVariant={hcp.colorVariant}
          />
        ))}
    </div>
  );
}
