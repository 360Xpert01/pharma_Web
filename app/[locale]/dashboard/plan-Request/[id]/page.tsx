"use client";

import { use, useEffect, useState } from "react";
import PlanRequestHeader from "@/components/PlanRequestHeader";
import PlanRequestCalendar from "@/components/PlanRequestCalendar";
import PlanRequestMeetings from "@/components/PlanRequestMeetings";
import { useDispatch, useSelector } from "react-redux";
import {
  clearScheduleDetail,
  fetchScheduleDetail,
} from "@/store/slices/plan-Manage/singleScheduleDetailSlice";

interface PageProps {
  params: Promise<{
    id: string;
    locale: string;
  }>;
}

export default function PlanRequest({ params }: PageProps) {
  const { id } = use(params);
  const [selectedDateData, setSelectedDateData] = useState<any>(null);

  const dispatch = useDispatch<any>();
  const { data, loading, error } = useSelector((state: any) => state.singleScheduleDetail);

  useEffect(() => {
    if (id) {
      dispatch(fetchScheduleDetail(id));
    }
    return () => {
      dispatch(clearScheduleDetail());
    };
  }, [dispatch, id]);

  const saleRep = data?.saleRep;
  const schedule = data?.schedule;
  const callsCount = data?.callsCount;
  const scheduleStatus = data?.schedule?.status;
  const scheduleDetailCalls = data?.calls;

  const handleDateSelect = (dateData: any) => {
    setSelectedDateData(dateData);
  };

  const [filteredDoctorsData, setFilteredDoctorsData] = useState<any>([]);

  useEffect(() => {
    if (!selectedDateData || !data?.calls) {
      setFilteredDoctorsData([]);
      return;
    }

    const selectedDate = selectedDateData.callDate || selectedDateData;

    const matchedCallData = data?.calls.find((call: any) => call.callDate == selectedDate);

    if (matchedCallData) {
      console.log("Filtered Doctors:", matchedCallData.party);
      setFilteredDoctorsData(matchedCallData.party);
    } else {
      setFilteredDoctorsData([]);
    }
  }, [selectedDateData, data?.calls]);

  if (loading && !data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-(--primary)"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-(--destructive)">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-(--background) mt-20 p-6 min-h-screen">
      <PlanRequestHeader
        id={id}
        scheduleStatus={scheduleStatus || "N/A"}
        saleRep={saleRep}
        schedule={schedule}
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-2 space-y-6">
          <PlanRequestCalendar
            scheduleDetail={saleRep}
            callsCount={callsCount}
            scheduleStatus={schedule}
            calls={scheduleDetailCalls}
            onDateSelect={handleDateSelect}
            scheduletitle={scheduleStatus}
          />
        </div>
        <PlanRequestMeetings
          scheduleDetail={schedule}
          selectedDateData={selectedDateData}
          id={id}
          filteredDoctorsData12={filteredDoctorsData}
          callsCount={callsCount}
        />
      </div>
    </div>
  );
}
