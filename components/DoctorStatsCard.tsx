import { DoctorCardDetails } from "./DoctorCardDetails";

// components/DoctorStatsCard.tsx
export default function DoctorStatsCard() {
  const topHcps = [
    {
      title: "Sales Report",
      value: 430000,
      valueLabel: "",
      subtitle: "Sales Completion Rate",
      detailValue: "180K",
      progress: 75,
      colorVariant: "1",
    },
    {
      title: "Samples",
      value: 800,
      valueLabel: "",
      subtitle: "Samples Completion Rate",
      detailValue: "195K",
      progress: 30,
      colorVariant: "2",
    },
    {
      title: "Giveaways",
      value: 200,
      valueLabel: "",
      subtitle: "Distributed Items",
      detailValue: "142K",
      progress: 60,
      colorVariant: "3",
    },
  ];

  return (
    <div className="grid  gap-6 grid-cols-3">
      {topHcps?.length &&
        topHcps.map((hcp, index) => (
          <DoctorCardDetails
            key={index}
            title={hcp.title}
            value={hcp.value}
            valueLabel={hcp.valueLabel}
            subtitle={hcp.subtitle}
            detailLabel={hcp.detailLabel || ""}
            detailValue={hcp.detailValue}
            progress={hcp.progress}
            colorVariant={hcp.colorVariant}
          />
        ))}
    </div>
  );
}
