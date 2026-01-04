// components/DoctorProfileCard.tsx
import Image from "next/image";
import { MapPin, Clock } from "lucide-react";

export default function DoctorProfileCard() {
  return (
    <div className="shadow-soft h-[100%] bg-(--background) rounded-8 p-5">
      {/* Heading */}
      <h2 className="t-h2">Doctor Details</h2>

      <div className="border-b my-4"></div>

      {/* Photo + Name */}
      <div className="flex items-center gap-4 mb-5">
        <div className="relative w-24 h-24 rounded-8 overflow-hidden">
          <Image src="/capMan.svg" alt="Dr. Sarah Ali" fill className="object-cover" />
        </div>
        <div>
          <h1 className="t-h1 leading-tight">Sarah Ali</h1>
          <p className="t-lg text-(--gray-6)">Cardiologist</p>
        </div>
      </div>

      {/* Clinic & Timings Sections */}
      <div className="grid grid-cols-[1fr_1px_1fr] gap-2 items-start">
        {/* Left Section */}
        <div className="space-y-5">
          <div className="flex items-start gap-3">
            <div className="bg-(--primary-0) p-1.5 rounded-full">
              <MapPin className="w-5 h-5 text-(--primary)" />
            </div>
            <div className="space-y-0.5 min-w-0">
              <h3 className="t-h3 leading-tight whitespace-nowrap overflow-hidden text-ellipsis">
                Skin Health Center
              </h3>
              <p className="t-md text-(--gray-6) leading-snug break-words">
                12-B, Main Boulevard, Lahore
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="bg-(--primary-0) p-1.5 rounded-full">
              <Clock className="w-5 h-5 text-(--primary)" />
            </div>
            <div className="flex-1 space-y-1.5">
              <h3 className="t-h3 leading-tight">Timings</h3>
              <div className="flex justify-between items-center t-md text-(--gray-9)">
                <span>Monday</span>
                <span>10am - 10pm</span>
              </div>
            </div>
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="w-[1px] h-full bg-(--gray-2) self-stretch"></div>

        {/* Right Section */}
        <div className="space-y-5">
          <div className="flex items-start gap-3">
            <div className="bg-(--primary-0) p-1.5 rounded-full">
              <MapPin className="w-5 h-5 text-(--primary)" />
            </div>
            <div className="space-y-0.5 min-w-0">
              <h3 className="t-h3 leading-tight whitespace-nowrap overflow-hidden text-ellipsis">
                Skin Health Center
              </h3>
              <p className="t-md text-(--gray-6) leading-snug break-words">
                12-B, Main Boulevard, Lahore
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="bg-(--primary-0) p-1.5 rounded-full">
              <Clock className="w-5 h-5 text-(--primary)" />
            </div>
            <div className="flex-1 space-y-1.5">
              <h3 className="t-h3 leading-tight">Timings</h3>
              <div className="flex justify-between items-center t-md text-(--gray-9)">
                <span>Monday</span>
                <span>10am - 10pm</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
