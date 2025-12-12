// components/CandidateCard.tsx
import Image from "next/image";
import { FC } from "react";
import { Edit, Plus, PencilLine } from "lucide-react";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  const handlePush = () => {
    router.push("/dashboard/UpdateEmployees");
  };

  return (
    <div className=" ">
      <div className="flex justify-between w-[100%]   gap-3">
        {/* Left - Avatar + Basic Info */}
        <div className="flex justify-between gap-6 w-[39%]  rounded-lg shadow-sm p-4 border border-gray-100 ">
          <div className="flex gap-3 justify-center">
            <div className="relative w-38 h-38 rounded-lg overflow-hidden  shadow-lg">
              <Image
                src="/capMan.svg"
                alt={candidate.name}
                width={160}
                height={170}
                className="object-cover"
              />
            </div>

            <div>
              <div className="flex item-center gap-3 mb-2 ">
                <div className="bg-blue-600 w-[60%] text-white text-[10px] font-bold px-3 py-1.5 rounded-full">
                  PLS_EMP-000124
                </div>
                |<span className="text-[12px] my-auto"> 000124</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900">{candidate.name}</h2>
              <p className="text-slate-900 mt-1 mb-2 font-semibold text-[13px]">
                Repoting Manager
                <span className="text-slate-400 text-[13px] font-normal"> Saboor raza</span>
              </p>
              <p className="text-slate-600 text-[13px]">{candidate.email}</p>
              <p className="text-slate-600 text-[13px]">{candidate.phone}</p>
              <p className="text-slate-600 text-[13px] ">19th January 97</p>
            </div>
          </div>
          <div className="flex flex-col justify-between h-full">
            <div className="flex justify-end">
              <button
                onClick={handlePush}
                className="bg-blue-600 w-[50%] cursor-pointer p-2 gap-2 text-[13px] flex  rounded-full text-white"
              >
                <PencilLine className="h-4 w-4 mr-1" />
                Edit Employee
              </button>
            </div>
            <div>
              <p className="font-semibold text-[15px]">Full Address</p>
              <p className="text-[12px]">B-121, Block-2, Gulshan-e-Iqbal, Karachi, Pakistan</p>
            </div>
          </div>
        </div>

        {/* Middle Left */}

        <div className="flex justify-between gap-15 w-[60%] rounded-lg shadow-sm p-4 border border-gray-200 ">
          <div className="space-y-14">
            <div>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider">Campaign</p>
              <p className="font-semibold text-xl text-slate-900">{candidate.campaign}</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider">Total Call</p>
              <p className="font-semibold text-xl text-slate-900">{candidate.totalCalls}</p>
            </div>
          </div>

          {/* Middle Right */}
          <div className="space-y-14">
            <div>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider">Requested Month</p>
              <p className="font-semibold text-xl text-slate-900">{candidate.requestedMonth}</p>
            </div>
            <div>
              <p className="text-[10px]text-slate-500 uppercase tracking-wider">Total Call</p>
              <p className="font-semibold text-xl text-slate-900">{candidate.totalCalls}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider">Channal</p>
              <p className="font-semibold text-xl text-slate-900">{candidate.channel}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider">Total Call</p>
              <p className="font-semibold text-xl text-slate-900">{candidate.totalCalls}</p>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateCard;
