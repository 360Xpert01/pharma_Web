import DoctorProfileCard from "@/components/DoctorProfileCard";
import DoctorInfoCard from "@/components/DoctorInfoCard";
import DoctorStatsCard from "@/components/DoctorStatsCard";
import DoctordetailDrop from "@/components/DoctordetailDrop";
import TableHeader from "@/components/TableHeader";
import ByBrands from "./ByBrands";
import ProductPreDoctor from "./ProductPerDoctor";

export default function DoctorDetail() {
  return (
    <div className="">
      <div className="w-full flex">
        {/* Left - Profile */}
        <div className="w-[25%] flex flex-col justify-between">
          <DoctorProfileCard />
          <DoctorInfoCard />
        </div>
        <div className="w-[85%]">
          <div className="w-[100%]">
            <DoctorStatsCard />
            <div className="flex mt-8 justify-between  ">
              <div className="w-[49%]">
                <ByBrands height={380} />
              </div>
              <div className="w-[49%]">
                <ProductPreDoctor />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-(--background) rounded-8 px-3 py-1 shadow-soft mt-7 border border-gray-200">
        <TableHeader campHeading={"Plans"} filterT={false} />
        <DoctordetailDrop />
      </div>
    </div>
  );
}
