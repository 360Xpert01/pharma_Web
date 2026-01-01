import React from "react";
import { Mail, Phone, User } from "lucide-react"; // optional: for icons

interface SalesPersonCardProps {
  name: string;
  email: string;
  phone: string;
  photoUrl?: string;
  campaign: string;
  requestedMonth: string;
  channel: string;
  reportingManager: string;
  totalCalls: number;
  status: "Under Review" | "Approved" | "Rejected";
}

const statusColors = {
  "Under Review": "bg-(--warning-0) text-(--warning)",
  Approved: "bg-(--success-0) text-(--success)",
  Rejected: "bg-(--destructive-0) text-(--destructive)",
};

export default function SalesPersonCard({
  name,
  email,
  phone,
  photoUrl = "",
  campaign,
  requestedMonth,
  channel,
  reportingManager,
  totalCalls,
  status = "Under Review",
}: SalesPersonCardProps) {
  return (
    <div className="w-full bg-(--background) rounded-lg shadow-soft border border-(--gray-2) p-5 hover:shadow-soft transition-shadow">
      <div className="flex items-start justify-between">
        {/* Left Section - Profile */}
        <div className="flex items-center gap-5">
          <div className="relative">
            {photoUrl ? (
              <img
                src={photoUrl}
                alt={name}
                className="w-40 h-50 rounded-sm object-cover border-2 border-(--gray-2)"
              />
            ) : (
              <div className="w-20 h-60 bg-(--gray-2) border-2 border-dashed border-(--gray-4) rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-(--gray-4)" />
              </div>
            )}
          </div>

          <div>
            <h2 className="text-xl font-semibold text-(--gray-9)">{name}</h2>
            <div className="flex items-center gap-2 text-sm text-(--gray-6) mt-1">
              <span>{email}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-(--gray-6) mt-1">
              <span>{phone}</span>
            </div>
          </div>
        </div>

        {/* Right Section - Details */}
        <div className=" text-sm items-center mt-6 text-(--gray-6) space-y-3">
          <div className="flex justify-between gap-5 ">
            <div>
              <span>Campaign</span>
              <div className="font-bold text-lg">{campaign}</div>
            </div>
            <div>
              <span>Requested Month</span>
              <div className="font-bold text-lg">{requestedMonth}</div>
            </div>
            <div>
              <span>Channel</span>
              <div className="font-bold text-lg">{channel}</div>
            </div>
            <div>
              <span>Reporting Manager</span>
              <div className="font-bold text-lg">{reportingManager}</div>
            </div>
            <div className="">
              <p className="mb-1"> status</p>

              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}
              >
                {status}
              </span>
            </div>
          </div>
          <div className="flex justify-start gap-8 mt-8 text-lg font-semibold text-(--gray-8)">
            <div>
              <div className="text-(--gray-5) text-xs font-normal">Total Calls</div>
              <div>{totalCalls.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-(--gray-5) text-xs font-normal">Total Calls</div>
              <div>{totalCalls.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-(--gray-5) text-xs font-normal">Total Calls</div>
              <div>{totalCalls.toLocaleString()}</div>
            </div>
          </div>

          {/* Status Badge */}
        </div>
      </div>
    </div>
  );
}
