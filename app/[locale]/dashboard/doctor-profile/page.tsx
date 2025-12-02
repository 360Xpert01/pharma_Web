// app/doctor-detail/page.tsx  (ya jahan chahiye)
import DoctorProfileCard from "@/components/DoctorProfileCard";
import DoctorInfoCard from "@/components/DoctorInfoCard";
import DoctorStatsCard from "@/components/DoctorStatsCard";
import { MetricsSection } from "../components/metrics/metrics-section";
import DoctordetailDrop from "@/components/DoctordetailDrop";
import TableHeader from "@/components/TableHeader";

export default function DoctorDetailPage() {
  return (
    <div className=" bg-gray-50 w-[100%] mt-18 py-8 px-4 ">
      <div className="w-[100%] flex justify-between ">
        {/* Left - Profile */}
        <div className="w-[30%]">
          <DoctorProfileCard />
        </div>
        <div className="w-[69%] space-y-5 ">
          <div className="w-[100%]">
            <DoctorInfoCard />
          </div>
          <DoctorStatsCard />
        </div>
      </div>
      <div className="bg-white rounded-2xl px-3 py-1 shadow-sm mt-7 border border-gray-200">
        <TableHeader campHeading={"plan"} filterT={false} />
        <DoctordetailDrop />
      </div>
    </div>
  );
}
