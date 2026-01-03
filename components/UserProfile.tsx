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
        <div className="flex justify-between gap-6 w-[39%] bg-(--background) rounded-8 shadow-soft p-4 border border-(--gray-1) ">
          <div className="flex gap-3 justify-center">
            <div className="relative w-38 h-38 rounded-8 overflow-hidden  shadow-soft">
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
                <div className="bg-(--primary) w-[60%] text-(--light) t-cap px-3 py-1.5 rounded-8">
                  EMP-000124
                </div>
                <span className="t-sm bg-(--light) my-auto">|</span>
                <span className="t-sm my-auto"> 000124</span>
              </div>
              <h2 className="t-h2">{candidate.name}</h2>
              <p className="t-label mt-1 mb-2">
                Repoting Manager
                <span className="t-sm"> Saboor raza</span>
              </p>
              <p className="t-sm">{candidate.email}</p>
              <p className="t-sm">{candidate.phone}</p>
              <p className="t-sm">19th January 97</p>
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
                className="w-[50%] t-sm"
              >
                Edit Employee
              </Button>
            </div>
            <div>
              <p className="t-label-b">Full Address</p>
              <p className="t-sm">B-121, Block-2, Gulshan-e-Iqbal, Karachi, Pakistan</p>
            </div>
          </div>
        </div>

        {/* Middle Left */}

        <div className="flex justify-between gap-15 w-[60%] bg-(--background) rounded-8 shadow-soft p-4 border border-(--gray-2) ">
          <div className="space-y-14">
            <div>
              <p className="t-over">Campaign</p>
              <p className="t-val-sm">{candidate.campaign}</p>
            </div>
            <div>
              <p className="t-over">Total Call</p>
              <p className="t-val-sm">{candidate.totalCalls}</p>
            </div>
          </div>

          {/* Middle Right */}
          <div className="space-y-14">
            <div>
              <p className="t-over">Requested Month</p>
              <p className="t-val-sm">{candidate.requestedMonth}</p>
            </div>
            <div>
              <p className="t-over">Total Call</p>
              <p className="t-val-sm">{candidate.totalCalls}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <p className="t-over">Channal</p>
              <p className="t-val-sm">{candidate.channel}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <p className="t-over">Total Call</p>
              <p className="t-val-sm">{candidate.totalCalls}</p>
            </div>
          </div>

          {/* Right - Status + Calls */}
          <div className=" space-y-4">
            <div>
              <p className="t-over">Status</p>
              <span
                className={`inline-block px-4 py-1.5 rounded-8 t-cap font-medium text-(--light) mt-1 ${
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
