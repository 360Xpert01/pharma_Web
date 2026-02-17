"use client";
import { DashboardContent } from "../../components/dashboard-content";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { getAllChannels } from "@/store/slices/channel/getAllChannelsSlice";

export default function UpdateDoctorPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const partyId = params.id as string;
  const channelId = searchParams.get("channelId");
  const dispatch = useAppDispatch();

  // Fetch channels
  const { channels } = useAppSelector((state) => state.allChannels);

  useEffect(() => {
    dispatch(getAllChannels());
  }, [dispatch]);

  // Find the channel associated with this ID
  const currentChannel = useMemo(() => {
    if (!channels || channels.length === 0 || !channelId) return null;
    return channels.find((ch) => ch.id === channelId);
  }, [channels, channelId]);

  // Generate dynamic title
  const pageTitle = currentChannel ? `Update ${currentChannel.name}` : "Update Doctor";

  return (
    <div className="">
      <DashboardContent
        sample={pageTitle}
        descrip={"Update doctor information"}
        btnTrue={true}
        hideMetrics={true}
        UpdateDoctor={true}
        partyId={partyId}
        channelId={channelId}
      />
    </div>
  );
}
