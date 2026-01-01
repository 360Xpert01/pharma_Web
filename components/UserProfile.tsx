// components/CandidateCard.tsx
import Image from "next/image";
import { FC } from "react";
import { Edit, Plus, PencilLine } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button/button";

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
        <div className="flex justify-between gap-6 w-[39%] bg-(--background) rounded-lg shadow-soft p-4 border border-(--gray-1) ">
          <div className="flex gap-3 justify-center">
            <div className="relative w-38 h-38 rounded-lg overflow-hidden  shadow-soft">
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
                <div className="bg-(--primary) w-[60%] text-(--light) text-[10px] font-regular px-3 py-1.5 rounded-full">
                  PLS_EMP-000124
                </div>
                <span className="text-[12px] bg-(--light) my-auto">|</span>
                <span className="text-[12px] my-auto"> 000124</span>
              </div>
              <h2 className="text-2xl font-bold text-(--gray-9)">{candidate.name}</h2>
              <p className="text-(--gray-9) mt-1 mb-2 font-semibold text-[13px]">
                Repoting Manager
                <span className="text-(--gray-4) text-[13px] font-normal"> Saboor raza</span>
              </p>
              <p className="text-(--gray-6) text-[13px]">{candidate.email}</p>
              <p className="text-(--gray-6) text-[13px]">{candidate.phone}</p>
              <p className="text-(--gray-6) text-[13px] ">19th January 97</p>
            </div>
          </div>
          <div className="flex flex-col justify-between h-full">
            <div className="flex justify-end">
              <Button
                onClick={handlePush}
                icon={PencilLine}
                variant="primary"
                size="sm"
                rounded="full"
                className="w-[50%] text-[13px]"
              >
                Edit Employee
              </Button>
            </div>
            <div>
              <p className="font-semibold text-[15px]">Full Address</p>
              <p className="text-[12px]">B-121, Block-2, Gulshan-e-Iqbal, Karachi, Pakistan</p>
            </div>
          </div>
        </div>

        {/* Middle Left */}

        <div className="flex justify-between gap-15 w-[60%] bg-(--background) rounded-lg shadow-soft p-4 border border-(--gray-2) ">
          <div className="space-y-14">
            <div>
              <p className="text-[10px] text-(--gray-5) uppercase tracking-wider">Campaign</p>
              <p className="font-semibold text-xl text-(--gray-9)">{candidate.campaign}</p>
            </div>
            <div>
              <p className="text-[10px] text-(--gray-5) uppercase tracking-wider">Total Call</p>
              <p className="font-semibold text-xl text-(--gray-9)">{candidate.totalCalls}</p>
            </div>
          </div>

          {/* Middle Right */}
          <div className="space-y-14">
            <div>
              <p className="text-[10px] text-(--gray-5) uppercase tracking-wider">
                Requested Month
              </p>
              <p className="font-semibold text-xl text-(--gray-9)">{candidate.requestedMonth}</p>
            </div>
            <div>
              <p className="text-[10px] text-(--gray-5) uppercase tracking-wider">Total Call</p>
              <p className="font-semibold text-xl text-(--gray-9)">{candidate.totalCalls}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-[10px] text-(--gray-5) uppercase tracking-wider">Channal</p>
              <p className="font-semibold text-xl text-(--gray-9)">{candidate.channel}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-[10px] text-(--gray-5) uppercase tracking-wider">Total Call</p>
              <p className="font-semibold text-xl text-(--gray-9)">{candidate.totalCalls}</p>
            </div>
          </div>

          {/* Right - Status + Calls */}
          <div className=" space-y-4">
            <div>
              <p className="text-xs text-(--gray-5) uppercase tracking-wider">Status</p>
              <span
                className={`inline-block px-4 py-1.5 rounded-full text-xs font-medium text-(--light) mt-1 ${
                  candidate.status.toLowerCase() === "active" ||
                  candidate.status.toLowerCase() === "approved"
                    ? "bg-(--success)"
                    : candidate.status.toLowerCase().includes("pending") ||
                        candidate.status.toLowerCase().includes("review")
                      ? "bg-(--warning)"
                      : "bg-(--gray-5)"
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
