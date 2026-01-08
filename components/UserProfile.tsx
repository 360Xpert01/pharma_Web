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
    <div className="w-full max-w-[320px]">
      {/* Compact Profile Card */}
      <div className="bg-background rounded-16 shadow-soft p-6 border border-gray-1 flex flex-col items-center">
        {/* Profile Image */}
        <div className="relative w-24 h-24 rounded-16 overflow-hidden shadow-soft mb-4">
          <Image
            src="/capMan.svg"
            alt={candidate.name}
            width={96}
            height={96}
            className="object-cover"
          />
        </div>

        {/* Name */}
        <h2 className="t-h3 text-center mb-1">{candidate.name}</h2>

        {/* Email */}
        <p className="t-sm text-gray-6 text-center mb-1">{candidate.email}</p>

        {/* Address */}
        <p className="t-sm text-gray-6 text-center mb-3">
          B-121, Block-2, Gulshan-e-Iqbal, Karachi, Pakistan
        </p>

        {/* Phone */}
        <p className="t-sm text-gray-9 font-medium mb-1">{candidate.phone}</p>

        {/* Date of Birth */}
        <p className="t-sm text-gray-6 mb-4">19-Jan-1997</p>

        {/* Employee ID Badge */}
        <div className="bg-primary text-background t-cap px-4 py-1.5 rounded-full text-center font-medium mb-4">
          ELS-EMP: 000124
        </div>
      </div>
    </div>
  );
};

export default CandidateCard;
