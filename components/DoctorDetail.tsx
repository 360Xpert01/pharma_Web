import DoctorProfileCard from "@/components/DoctorProfileCard";
import DoctorInfoCard from "@/components/DoctorInfoCard";
import DoctorStatsCard from "@/components/DoctorStatsCard";
import DoctordetailDrop from "@/components/DoctordetailDrop";
import TableHeader from "@/components/TableHeader";
import ByBrands from "./ByBrands";
import ProductPreDoctor from "./ProductPerDoctor";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { useEffect } from "react";
import { fetchPartyById } from "@/store/slices/party/partygetId";
import { clearParty } from "@/store/slices/party/partygetId";

export default function DoctorDetail() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const { data: party, loading, error } = useSelector((state: RootState) => state.partyById);

  const partyData = party || {};
  console.log(partyData, "party");

  useEffect(() => {
    if (id) {
      dispatch(fetchPartyById(id));
    }

    return () => {
      dispatch(clearParty()); // cleanup when leaving page
    };
  }, [dispatch, id]);

  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Left - Profile & Info */}
      <div className="col-span-3 flex flex-col gap-6">
        <DoctorProfileCard partyData={partyData} />
        <DoctorInfoCard partyData={partyData} />
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
        <DoctordetailDrop id={id} />
      </div>
    </div>
  );
}
