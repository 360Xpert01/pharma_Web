import DoctorProfileCard from "@/components/DoctorProfileCard";
import DoctorInfoCard from "@/components/DoctorInfoCard";
import DoctorStatsCard from "@/components/DoctorStatsCard";
import DoctordetailDrop from "@/components/DoctordetailDrop";
import TableHeader from "@/components/TableHeader";

export default function DoctorDetail() {
  return (
    <div className="w-[100%]">
      <div className="w-[100%] flex justify-between ">
        {/* Left - Profile */}
        <div className="w-[40%]">
          <DoctorProfileCard />
        </div>
        <div className="w-[59%] ">
          <div className="w-[100%]">
            <DoctorInfoCard />
          </div>
          <DoctorStatsCard />
        </div>
      </div>
      <div className="bg-(--background) rounded-8 px-3 py-1 shadow-soft mt-7 border border-gray-200">
        <TableHeader campHeading={"Plans"} filterT={false} />
        <DoctordetailDrop />
      </div>
    </div>
  );
}
