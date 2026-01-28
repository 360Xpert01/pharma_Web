"use client";
import { DashboardContent } from "../../components/dashboard-content";
import { useParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { getAllChannels } from "@/store/slices/channel/getAllChannelsSlice";

export default function DashboardPage() {
  const params = useParams();
  const giveawayId = params.id;
  const dispatch = useAppDispatch();

  // Fetch channels
  const { channels, loading } = useAppSelector((state) => state.allChannels);

  useEffect(() => {
    dispatch(getAllChannels());
  }, [dispatch]);

  // Find the channel associated with this ID
  const currentChannel = useMemo(() => {
    if (!channels || channels.length === 0 || !giveawayId) return null;
    return channels.find((ch) => ch.id === giveawayId);
  }, [channels, giveawayId]);

  // Generate dynamic title
  const pageTitle = currentChannel ? `Add a ${currentChannel.name}` : "Add a Record";

  return (
    <div className="">
      <DashboardContent
        sample={pageTitle}
        descrip={"Unlock the potential of your candidates"}
        btnTrue={true}
        hideMetrics={true}
        doctorForm={true}
        idForm={giveawayId as string}
      />
    </div>
  );
}
