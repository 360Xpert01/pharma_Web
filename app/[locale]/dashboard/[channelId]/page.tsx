"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store";
import { getAllChannels } from "@/store/slices/channel/getAllChannelsSlice";
import { DashboardContent } from "../components/dashboard-content";

export default function ChannelPage() {
  const params = useParams();
  const channelSlug = params.channelId as string;
  const dispatch = useAppDispatch();
  const { channels, loading } = useAppSelector((state) => state.allChannels);

  useEffect(() => {
    dispatch(getAllChannels());
  }, [dispatch]);

  // Convert channel name to slug for comparison
  const createSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .replace(/\s+/g, "-");
  };

  // Debug: Log channels and slug
  useEffect(() => {
    if (channels.length > 0) {
      console.log(
        "Available channels:",
        channels.map((ch) => ({
          name: ch.name,
          slug: createSlug(ch.name),
        }))
      );
      console.log("Looking for slug:", channelSlug);
    }
  }, [channels, channelSlug]);

  // Find the current channel by matching the slug
  const currentChannel = channels.find((ch) => createSlug(ch.name) === channelSlug);

  // If loading, show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading channel data...</p>
        </div>
      </div>
    );
  }

  // If channel not found after loading
  if (!loading && !currentChannel) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Channel Not Found</h1>
          <p className="text-gray-600 mb-4">
            The requested channel "{channelSlug}" does not exist.
          </p>
          <p className="text-sm text-gray-500">
            Available channels: {channels.map((ch) => createSlug(ch.name)).join(", ")}
          </p>
        </div>
      </div>
    );
  }

  // If no current channel yet, return null
  if (!currentChannel) {
    return null;
  }

  return (
    <div className="bg-background">
      <DashboardContent
        sample={"Account Management"}
        descrip={`Manage ${currentChannel.name}`}
        table={`All ${currentChannel.name}`}
        btnAdd={`Add ${currentChannel.name}`}
        campHeading={`All ${currentChannel.name}`}
        filterT={true}
        doctorTable={true}
        hideMetrics={true}
        hideHeader={true}
        settingsRoute={"/dashboard/doctor-form"}
        dataCard={{
          title: "Calls Completed vs Planned",
          value: 430,
          valueLabel: "Calls Completed",
          subtitle: "81.7% completed . 22 pending",
          detailValue: "180K",
          progress: 75,
          colorVariant: "1",
        }}
      />
    </div>
  );
}
