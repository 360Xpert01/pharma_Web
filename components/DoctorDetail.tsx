import DoctorProfileCard from "@/components/DoctorProfileCard";
import DoctorInfoCard from "@/components/DoctorInfoCard";
import DoctorStatsCard from "@/components/DoctorStatsCard";
import DoctordetailDrop from "@/components/DoctordetailDrop";
import TableHeader from "@/components/TableHeader";
import ByBrands from "./ByBrands";
import ProductPreDoctor from "./ProductPerDoctor";

export default function DoctorDetail() {
  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Left - Profile & Info */}
      <div className="col-span-3 flex flex-col gap-6">
        <DoctorProfileCard />
        <DoctorInfoCard />
      </div>

      {/* Right - Stats & Charts */}
      <div className="col-span-9 flex flex-col gap-6">
        <DoctorStatsCard />

        <div className="grid grid-cols-2 gap-6">
          <ByBrands height={300} />
          <ProductPreDoctor />
        </div>
      </div>

      {/* Bottom - Plans Table */}
      <div className="col-span-12 bg-(--background) rounded-8 px-3 py-1 shadow-soft border border-gray-200">
        <TableHeader campHeading={"Plans"} filterT={false} />
        <DoctordetailDrop />
      </div>
    </div>
  );
}
