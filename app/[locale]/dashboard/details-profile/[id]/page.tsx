"use client";
import { useAppSelector, useAppDispatch } from "@/store";
import { fetchPartyById, clearParty } from "@/store/slices/party/partygetId";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import { DashboardContent } from "../../components/dashboard-content";

export default function DoctorDetailPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { data: party, loading } = useAppSelector((state) => state.partyById);
  const channelName = party?.channel_name || "Account";

  useEffect(() => {
    if (id) {
      dispatch(fetchPartyById(id as string));
    }
    return () => {
      dispatch(clearParty());
    };
  }, [dispatch, id]);

  return (
    <div className="bg-(--gray-0)">
      <DashboardContent
        sample={loading ? "Loading..." : `${channelName} Details`}
        descrip={"Unlock the potential of your candidates"}
        hideHeader={false}
        hideMetrics={true}
        hideData={true}
        btnTrue={true}
        doctorDetail
      />
    </div>
  );
}
