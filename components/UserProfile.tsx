// components/CandidateCard.tsx
import Image from "next/image";
import { FC } from "react";
import { Edit, Plus, PencilLine } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button/button";

interface Candidate {
  name: string;
  email?: string;
  phone?: string;
  pulseCode?: string;
  profilePicture?: string;
  fullAddress?: string;
  dob?: string;
}

interface UserProfileProps {
  candidate: Candidate;
  productData?: any;
}

const UserProfile: FC<UserProfileProps> = ({ candidate, productData }) => {
  const router = useRouter();

  // Determine display values based on whether it's a product or a person
  const name = productData?.productName || candidate.name;
  const subTitle = candidate.email;
  const description = productData?.productGroup || candidate.fullAddress;
  const extraInfo = productData?.productCategory || candidate.phone;
  const footerInfo = candidate.dob;
  const pulseCode = productData?.pulseCode || candidate.pulseCode;
  const profilePicture = productData?.imageUrl || candidate.profilePicture;
  const Name = productData?.name || candidate.name;

  return (
    <div className="w-full bg-background rounded-8 px-6 py-8 shadow-soft border border-gray-1 flex flex-col items-center">
      {/* Profile Image */}
      <div className="relative w-36 h-36 rounded-8 overflow-hidden mb-4">
        <Image
          src={profilePicture || "/girlPic.png"}
          alt={name}
          width={128}
          height={128}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Name */}
      <h2 className="text-3xl font-bold text-center text-gray-9 mb-2">{Name}</h2>

      {/* Subtitle (Email/Formula) */}
      {subTitle && <p className="text-base font-thin text-center mb-3">{subTitle}</p>}

      {/* Description (Address/Group) */}
      {description && description !== "N/A" && (
        <p className="text-base text-(--gray-5) font-thin text-center mb-3 leading-relaxed">
          {description}
        </p>
      )}

      {/* Extra Info (Phone/Category) */}
      {extraInfo && extraInfo !== "N/A" && (
        <p className="text-base text-(--gray-5) font-semibold text-center mb-3">({extraInfo})</p>
      )}

      {/* Footer Info (DOB/Code) */}
      {footerInfo && footerInfo !== "N/A" && (
        <p className="text-base text-(--gray-5) font-thin text-center mb-6">{footerInfo}</p>
      )}

      {/* Badge (PulseCode/Code) */}
      {pulseCode && (
        <div className="bg-primary text-white text-sm px-6 py-2 rounded-8 font-semibold">
          {pulseCode}
        </div>
      )}
    </div>
  );
};

export default UserProfile;
