import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { X, ChevronRight } from "lucide-react";
import Image from "next/image";

const avatars = ["/woman-1.png", "/woman-2.png", "/man-1.png", "/woman-3.png", "/man-2.png"];

const candidate = {
  name: "Sami Kashan",
  email: "samikashan099@gmail.com",
  phone: "+92 312 283 8270",
  reportingManager: "A. Aziz Warsi",
  campaign: "Diabetics",
  requestedMonth: "September",
  channel: "Doctors",
  totalCalls: 220,
  status: "Under Review",
};

export default function PlanRequestHeader() {
  return (
    <div className="flex items-start justify-between mb-6">
      <div>
        <h1 className="t-h1">Plan Request</h1>
        <p className="t-md mt-1">Unlock the potential of your candidates</p>
      </div>

      <div className="flex space-x-1 mt-5">
        {avatars.map((src, i) => (
          <Avatar key={i} className="h-12 w-12 border-2 border-(--light)">
            <AvatarImage src="/girlPic.svg" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        ))}
      </div>
      <div className="flex mt-5 gap-8">
        <div className="flex gap-3">
          <button className="text-(--destructive) border border-(--destructive) rounded-8 flex items-center gap-2 px-4 py-2 bg-(--background) hover:bg-(--destructive-0)">
            <X className="w-4" />
            Reject
          </button>
          <button className="bg-(--primary) hover:bg-(--primary-2) text-(--light) rounded-8 flex items-center gap-2 px-4 py-2">
            Accept
            <ChevronRight className="w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
