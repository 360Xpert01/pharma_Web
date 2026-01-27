"use client";

import PlanRequestHeader from "@/components/PlanRequestHeader";
import PlanRequestCalendar from "@/components/PlanRequestCalendar";
import PlanRequestMeetings from "@/components/PlanRequestMeetings";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  clearScheduleDetail,
  fetchScheduleDetail,
} from "@/store/slices/plan-Manage/singleScheduleDetailSlice";

interface PageProps {
  params: {
    id: string;
  };
}

export default function PlanRequest({ params }: PageProps) {
  const { id } = params;
  const [selectedDateData, setSelectedDateData] = useState<any>(null);

  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.singleScheduleDetail);

  useEffect(() => {
    dispatch(fetchScheduleDetail(id));
    return () => {
      dispatch(clearScheduleDetail());
    };
  }, [dispatch, id]);

  const saleRep = data?.saleRep;
  const callsCount = data?.callsCount;
  const scheduleStatus = data?.schedule?.status;
  const scheduleDtatailcalls = data?.calls;
  const scheduleDetail = data?.schedule;

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

  return (
    <div className="bg-gradient-to-br mt-20 from-slate-50 to-slate-100 p-6 min-h-screen">
      <PlanRequestHeader id={id} scheduleStatus={scheduleStatus} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6  mt-8">
        <div className="lg:col-span-2 space-y-6">
          <PlanRequestCalendar
            scheduleDetail={saleRep}
            callsCount={callsCount}
            scheduleStatus={scheduleDetail}
            calls={scheduleDtatailcalls}
            onDateSelect={handleDateSelect}
            scheduletitle={scheduleStatus}
          />
        </div>
        <PlanRequestMeetings
          scheduleDetail={scheduleDetail}
          selectedDateData={selectedDateData}
          id={id}
          filteredDoctorsData12={filteredDoctorsData}
          callsCount={callsCount}
        />
      </div>
    </div>
  );
}
