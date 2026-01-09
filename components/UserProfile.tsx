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
    <div className="w-full bg-background rounded-8 p-6 shadow-soft border border-gray-1 flex flex-col items-center">
      {/* Profile Image */}
      <div className="relative w-36 h-36 rounded-8 overflow-hidden mb-3">
        <Image
          src="/capMan.svg"
          alt={candidate.name}
          width={144}
          height={144}
          className="object-cover"
        />
      </div>

      {/* Name */}
      <h2 className="text-4xl font-bold text-center text-gray-9 mb-2">{candidate.name}</h2>

      {/* Email */}
      <p className="text-lg font-thin text-center mb-2">{candidate.email}</p>

      {/* Address */}
      <p className="text-lg text-(--gray-5) font-thin text-center mb-3 leading-relaxed">
        B-121, Block-2, Gulshan-e-Iqbal,
        <br />
        Karachi, Pakistan
      </p>

      {/* Phone */}
      <p className="text-lg text-(--gray-5) font-thin text-center mb-2">{candidate.phone}</p>

      {/* Date of Birth */}
      <p className="text-lg text-(--gray-5) font-thin text-center mb-4">19-Jan-1997</p>

      {/* Employee ID Badge */}
      <div className="bg-primary text-white text-sm px-6 py-1.5 rounded-8 font-semibold">
        PLS_EMP- 000124
      </div>
    </div>
  );
};

export default CandidateCard;
