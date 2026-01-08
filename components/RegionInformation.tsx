// components/RegionInformation.tsx
import { FC } from "react";

interface RegionInformationProps {
  lineManager: string;
  legacy: string;
  channel: string;
  team: string;
  totalCalls: string | number;
  status: string;
}

const RegionInformation: FC<RegionInformationProps> = ({
  lineManager,
  legacy,
  channel,
  team,
  totalCalls,
  status,
}) => {
  // Determine status badge styling
  const getStatusBadgeClass = (status: string) => {
    const statusLower = status.toLowerCase();
    if (statusLower.includes("active") || statusLower.includes("approved")) {
      return "bg-green-100 text-green-700";
    } else if (statusLower.includes("review") || statusLower.includes("pending")) {
      return "bg-yellow-100 text-yellow-700";
    } else if (statusLower.includes("inactive") || statusLower.includes("rejected")) {
      return "bg-red-100 text-red-700";
    }
    return "bg-gray-100 text-gray-700";
  };

  return (
    <div className="bg-background shadow-soft rounded-8 p-6">
      <h3 className="t-label-b text-gray-9 mb-4">Region Information</h3>

      <div className="space-y-3">
        {/* Line Manager */}
        <div className="flex justify-between items-center">
          <span className="t-sm text-gray-5">Line Manager</span>
          <span className="t-sm text-gray-9 font-medium">{lineManager}</span>
        </div>

        {/* Legacy */}
        <div className="flex justify-between items-center">
          <span className="t-sm text-gray-5">Legacy</span>
          <span className="t-sm text-gray-9 font-medium">{legacy}</span>
        </div>

        {/* Channel */}
        <div className="flex justify-between items-center">
          <span className="t-sm text-gray-5">Channel</span>
          <span className="t-sm text-gray-9 font-medium">{channel}</span>
        </div>

        {/* Team */}
        <div className="flex justify-between items-center">
          <span className="t-sm text-gray-5">Team</span>
          <span className="t-sm text-gray-9 font-medium">{team}</span>
        </div>

        {/* Total Calls */}
        <div className="flex justify-between items-center">
          <span className="t-sm text-gray-5">Total Calls</span>
          <span className="t-sm text-gray-9 font-medium">{totalCalls}</span>
        </div>

        {/* Status */}
        <div className="flex justify-between items-center">
          <span className="t-sm text-gray-5">Status</span>
          <span
            className={`px-3 py-1 rounded-full t-xs font-medium ${getStatusBadgeClass(status)}`}
          >
            {status}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RegionInformation;
