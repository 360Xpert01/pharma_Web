// components/DoctorProfileCard.tsx
import Image from "next/image";
import { MapPin, Clock } from "lucide-react";

export default function DoctorProfileCard() {
  return (
    <div className="space-y-6 shadow-soft h-[100%]  rounded-2xl p-6">
      {/* Photo + Name */}

      <div className="text-2xl border-b font-bold text-gray-800">Doctor Profile</div>

      <div className="flex items-center gap-5">
        <div className="relative w-28 h-28 rounded-2xl ">
          <Image src="/capMan.svg" alt="Dr. Sarah Ali" fill className="object-cover" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sarah Ali</h1>
          <p className="text-xl text-gray-600">Cardiologist</p>
        </div>
      </div>

      {/* Clinic */}
      <div className="flex">
        <div className="">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-blue-500 mt-1" />
            <div>
              <p className="font-semibold text-gray-800">Skin Health Center</p>
              <p className="text-sm text-gray-500">12-B, Main Boulevard, Lahore</p>
            </div>
          </div>

          {/* Timings */}
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-blue-500 mt-1" />
            <div>
              <p className="font-medium text-gray-800">Timings</p>
              <p className="text-sm text-gray-600">Monday  10am - 10pm</p>
            </div>
          </div>
        </div>
        <div className="">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-blue-500 mt-1" />
            <div>
              <p className="font-semibold text-gray-800">Skin Health Center</p>
              <p className="text-sm text-gray-500">12-B, Main Boulevard, Lahore</p>
            </div>
          </div>

          {/* Timings */}
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-blue-500 mt-1" />
            <div>
              <p className="font-medium text-gray-800">Timings</p>
              <p className="text-sm text-gray-600">Monday  10am - 10pm</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
