import DoctorProfileCard from "@/components/DoctorProfileCard";
import DoctorInfoCard from "@/components/DoctorInfoCard";
import DoctorStatsCard from "@/components/DoctorStatsCard";
import DoctordetailDrop from "@/components/DoctordetailDrop";
import TableHeader from "@/components/TableHeader";
import ByBrands from "./ByBrands";
import ProductPreDoctor from "./ProductPerDoctor";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store";

export default function DoctorDetail() {
  const { id } = useParams();

  const dispatch = useAppDispatch();
  const { data: party, loading, error } = useAppSelector((state) => state.partyById);

  const partyData = party || {};

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] gap-4">
        <p className="text-red-500 font-semibold">{error}</p>
        <button
          onClick={() => id && dispatch(fetchPartyById(id as string))}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Left - Profile & Info (Narrowed to col-span-2) */}
      <div className="col-span-3 flex flex-col gap-8">
        <DoctorProfileCard partyData={partyData} />
        <DoctorInfoCard partyData={partyData} />
      </div>

      {/* Right - Stats & Charts (Widened to col-span-10) */}
      <div className="col-span-9 flex flex-col gap-6">
        <DoctorStatsCard />

        <div className="flex gap-6 w-[100%] h-[47vh] mt-1 ">
          <div className="w-[50%]">
            <ByBrands height={300} />
          </div>
          <div className="w-[50%]">
            <ProductPreDoctor />
          </div>
        </div>
      </div>

      {/* Bottom - Plans Table */}
      <div className="col-span-12 bg-(--background) rounded-8 px-3 py-1 shadow-soft border border-gray-200">
        <DoctordetailDrop id={id} />
      </div>
    </div>
  );
}
