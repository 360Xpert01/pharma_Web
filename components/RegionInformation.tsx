export default function CampaignStatsCard() {
  const stats = [
    { label: "Campaign", value: "Diabetics" },
    { label: "Requested Month", value: "September" },
    { label: "Channel", value: "Doctors" },
    { label: "Status", value: "Under Review", isStatus: true },
    { label: "Total Calls", value: "220" },
  ];

  return (
    <div className="bg-white rounded-[20px] shadow-sm border border-gray-100 p-9">
      <div className="grid grid-cols-5 gap-4">
        {stats.map((stat, index) => (
          <div key={index}>
            <p className="text-gray-400 text-xs font-medium mb-2 uppercase tracking-tight">
              {stat.label}
            </p>
            {stat.isStatus ? (
              <span className="bg-[#F3D371] text-white px-2 py-2 rounded-full text-sm font-bold shadow-sm">
                {stat.value}
              </span>
            ) : (
              <p className="text-xl font-extrabold text-gray-900">{stat.value}</p>
            )}
          </div>
        ))}
      </div>
      {/* Bottom Row */}
      <div className="grid grid-cols-5 gap-4 mt-10">
        <div>
          <p className="text-gray-400 text-xs font-medium mb-2 uppercase">Total Calls</p>
          <p className="text-xl font-extrabold text-gray-900">220</p>
        </div>
        <div>
          <p className="text-gray-400 text-xs font-medium mb-2 uppercase">Total Calls</p>
          <p className="text-xl font-extrabold text-gray-900">220</p>
        </div>
      </div>
    </div>
  );
}
