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
        <h1 className="text-3xl font-bold text-slate-900">Plan Request</h1>
        <p className="text-slate-500 mt-1">Unlock the potential of your candidates</p>
      </div>

      <div className="flex space-x-1 mt-5">
        {avatars.map((src, i) => (
          <Avatar key={i} className="h-12 w-12 border-2 border-white">
            <AvatarImage src="/girlPic.svg" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        ))}
      </div>
      <div className="flex mt-5 gap-8">
        <div className="flex gap-3">
          <button className="text-red-500 border border-red-500 rounded-xl flex items-center gap-2 px-4 py-2 bg-(--background) hover:bg-red-50">
            <X className="w-4" />
            Reject
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl flex items-center gap-2 px-4 py-2">
            Accept
            <ChevronRight className="w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
