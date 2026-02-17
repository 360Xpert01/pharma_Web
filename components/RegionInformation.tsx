// components/RegionInformation.tsx
import { FC } from "react";

interface RegionInformationProps {
  lineManager?: string;
  legacy?: string;
  channel?: string;
  team?: string;
  skuCount?: string | number;
  totalCalls?: string | number;
  status?: string;
  category?: string;
  formula?: string;
}

const RegionInformation: FC<RegionInformationProps> = ({
  lineManager,
  legacy,
  channel,
  category,
  skuCount,
  totalCalls,
  status,
  formula,
  team,
}) => {
  // Determine status badge styling
  const getStatusBadgeClass = (status: string = "") => {
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
    <div className="bg-(--background) shadow-soft rounded-8 p-6 border border-(--gray-1)">
      <h3 className="text-base font-bold text-(--gray-9) mb-8">Regional Information</h3>

      <div className="space-y-7">
        {/* Status */}
        {status && (
          <div className="flex justify-between items-center">
            <span className="text-sm text-(--gray-5)">Status</span>
            <span
              className={`px-3 py-2 rounded-8 text-xs font-bold ${getStatusBadgeClass(status)}`}
            >
              {status}
            </span>
          </div>
        )}

        {/* Line Manager */}
        {lineManager && (
          <div className="flex justify-between items-center">
            <span className="text-sm text-(--gray-5)">Line Manager</span>
            <span className="text-sm text-(--gray-9) font-bold">{lineManager}</span>
          </div>
        )}

        {/* Legacy */}
        {legacy && (
          <div className="flex justify-between items-center">
            <span className="text-sm text-(--gray-5)">Legacy</span>
            <span className="text-sm text-(--gray-9) font-bold">{legacy}</span>
          </div>
        )}

        {/* Category */}
        {category && (
          <div className="flex justify-between items-center">
            <span className="text-sm text-(--gray-5)">Category</span>
            <span className="text-sm text-(--gray-9) font-bold">{category}</span>
          </div>
        )}

        {/* Team */}
        {team && (
          <div className="flex justify-between items-center">
            <span className="text-sm text-(--gray-5)">Team</span>
            <span className="text-sm text-(--gray-9) font-bold">{team}</span>
          </div>
        )}

        {/* Channel */}
        {channel && (
          <div className="flex justify-between items-center">
            <span className="text-sm text-(--gray-5)">Channel</span>
            <span className="text-sm text-(--gray-9) font-bold">{channel}</span>
          </div>
        )}

        {/* Formula */}
        {formula && (
          <div className="flex justify-between items-center">
            <span className="text-sm text-(--gray-5)">Formula</span>
            <span className="text-sm text-(--gray-9) font-bold">{formula}</span>
          </div>
        )}

        {/* SKU Count */}
        {skuCount !== undefined && (
          <div className="flex justify-between items-center">
            <span className="text-sm text-(--gray-5)">SKU Count</span>
            <span className="text-sm text-(--gray-9) font-bold">{skuCount}</span>
          </div>
        )}

        {/* Total Calls */}
        {totalCalls !== undefined && (
          <div className="flex justify-between items-center">
            <span className="text-sm text-(--gray-5)">Total Calls</span>
            <span className="text-sm text-(--gray-9) font-bold">{totalCalls}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegionInformation;
