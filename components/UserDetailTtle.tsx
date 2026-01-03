import React from "react";
import { Mail, Phone, User } from "lucide-react";
import StatusBadge from "@/components/shared/StatusBadge";

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
    <div className="w-full bg-(--background) rounded-8 shadow-soft border border-(--gray-2) p-5 hover:shadow-soft transition-shadow">
      <div className="flex items-start justify-between">
        {/* Left Section - Profile */}
        <div className="flex items-center gap-5">
          <div className="relative">
            {photoUrl ? (
              <img
                src={photoUrl}
                alt={name}
                className="w-40 h-50 rounded-8 object-cover border-2 border-(--gray-2)"
              />
            ) : (
              <div className="w-20 h-60 bg-(--gray-2) border-2 border-dashed border-(--gray-4) rounded-8 flex items-center justify-center">
                <User className="w-10 h-10 text-(--gray-4)" />
              </div>
            )}
          </div>

          <div>
            <h2 className="t-h2">{name}</h2>
            <div className="flex items-center gap-2 t-md mt-1">
              <span>{email}</span>
            </div>
            <div className="flex items-center gap-2 t-md mt-1">
              <span>{phone}</span>
            </div>
          </div>
        </div>

        {/* Right Section - Details */}
        <div className=" text-sm items-center mt-6 text-(--gray-6) space-y-3">
          <div className="flex justify-between gap-5 ">
            <div>
              <span className="t-sm">Campaign</span>
              <div className="t-val-sm">{campaign}</div>
            </div>
            <div>
              <span className="t-sm">Requested Month</span>
              <div className="t-val-sm">{requestedMonth}</div>
            </div>
            <div>
              <span className="t-sm">Channel</span>
              <div className="t-val-sm">{channel}</div>
            </div>
            <div>
              <span className="t-sm">Reporting Manager</span>
              <div className="t-val-sm">{reportingManager}</div>
            </div>
            <div className="">
              <p className="mb-1">status</p>
              <StatusBadge status={status} />
            </div>
          </div>
          <div className="flex justify-start gap-8 mt-8 text-lg font-semibold text-(--gray-8)">
            <div>
              <div className="t-cap">Total Calls</div>
              <div className="t-val-sm">{totalCalls.toLocaleString()}</div>
            </div>
            <div>
              <div className="t-cap">Total Calls</div>
              <div className="t-val-sm">{totalCalls.toLocaleString()}</div>
            </div>
            <div>
              <div className="t-cap">Total Calls</div>
              <div className="t-val-sm">{totalCalls.toLocaleString()}</div>
            </div>
          </div>

          {/* Status Badge */}
        </div>
      </div>
    </div>
  );
}
