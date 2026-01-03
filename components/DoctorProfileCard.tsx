// components/DoctorProfileCard.tsx
import Image from "next/image";
import { MapPin, Clock } from "lucide-react";

export default function DoctorProfileCard() {
  return (
    <div className="space-y-6 shadow-soft h-[100%] bg-(--background) rounded-8 p-6">
      {/* Photo + Name */}

      <div className="t-h2 border-b">Doctor Profile</div>

      <div className="flex items-center gap-5">
        <div className="relative w-28 h-28 rounded-8 ">
          <Image src="/capMan.svg" alt="Dr. Sarah Ali" fill className="object-cover" />
        </div>
        <div>
          <h1 className="t-h1">Sarah Ali</h1>
          <p className="t-lg">Cardiologist</p>
        </div>
      </div>

      {/* Clinic */}
      <div className="flex">
        <div className="">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-(--primary) mt-1" />
            <div>
              <p className="t-label-b">Skin Health Center</p>
              <p className="t-sm">12-B, Main Boulevard, Lahore</p>
            </div>
          </div>

          {/* Timings */}
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-(--primary) mt-1" />
            <div>
              <p className="t-label">Timings</p>
              <p className="t-sm">Monday 10am - 10pm</p>
            </div>
          </div>
        </div>
        <div className="">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-(--primary) mt-1" />
            <div>
              <p className="t-label-b">Skin Health Center</p>
              <p className="t-sm">12-B, Main Boulevard, Lahore</p>
            </div>
          </div>

          {/* Timings */}
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-(--primary) mt-1" />
            <div>
              <p className="t-label">Timings</p>
              <p className="t-sm">Monday 10am - 10pm</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
