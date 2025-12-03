// components/CandidateCard.tsx
import Image from "next/image";
import { FC } from "react";

interface Candidate {
  name: string;
  email: string;
  phone: string;
  reportingManager: string;
  campaign: string;
  requestedMonth: string;
  channel: string;
  status: string;
  totalCalls: string | number;
}

interface CandidateCardProps {
  candidate: Candidate;
}

const CandidateCard: FC<CandidateCardProps> = ({ candidate }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
      <div className="flex justify-between w-[100%]  gap-3">
        {/* Left - Avatar + Basic Info */}
        <div className="flex items-center gap-6 w-[30%] ">
          <div className="relative w-24 h-24 rounded-md overflow-hidden  shadow-lg">
            <Image
              src="/capMan.svg"
              alt={candidate.name}
              width={100}
              height={100}
              className="object-cover"
            />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900">{candidate.name}</h2>
            <p className="text-slate-600">{candidate.email}</p>
            <p className="text-slate-600">{candidate.phone}</p>
          </div>
        </div>

        {/* Middle Left */}

        <div className="flex justify-between gap-15 w-[60%] ">
          <div className="space-y-4">
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wider">Campaign</p>
              <p className="font-semibold text-xl text-slate-900">{candidate.campaign}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wider">Total Call</p>
              <p className="font-semibold text-xl text-slate-900">{candidate.totalCalls}</p>
            </div>
          </div>

          {/* Middle Right */}
          <div className="space-y-4">
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wider">Requested Month</p>
              <p className="font-semibold text-xl text-slate-900">{candidate.requestedMonth}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wider">Total Call</p>
              <p className="font-semibold text-xl text-slate-900">{candidate.totalCalls}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wider">Channal</p>
              <p className="font-semibold text-xl text-slate-900">{candidate.channel}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wider">Total Call</p>
              <p className="font-semibold text-xl text-slate-900">{candidate.totalCalls}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wider">Reporting Manager</p>
              <p className="font-semibold text-xl text-slate-900">{candidate.reportingManager}</p>
            </div>
          </div>

          {/* Right - Status + Calls */}
          <div className=" space-y-4">
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wider">Status</p>
              <span
                className={`inline-block px-4 py-1.5 rounded-full text-xs font-medium text-white mt-1 ${
                  candidate.status.toLowerCase() === "active" ||
                  candidate.status.toLowerCase() === "approved"
                    ? "bg-green-500"
                    : candidate.status.toLowerCase().includes("pending") ||
                        candidate.status.toLowerCase().includes("review")
                      ? "bg-yellow-500"
                      : "bg-gray-500"
                }`}
              >
                {candidate.status}
              </span>
            </div>

            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wider">Total Calls</p>
              <p className="text-2xl font-bold text-slate-900">{candidate.totalCalls}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateCard;
