import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { fetchScheduleByFilter } from "@/store/slices/plan-Manage/sinleScheduleByFilter";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const meetings = [
  {
    id: 1,
    type: "Meeting with James Brown",
    doctor: "Dr. Herbert R.",
    specialty: "Heart Specialist",
    location: "A.O Clinic",
    address: "4-F 15/6, Noorabad No. 4, Karachi",
  },
  {
    id: 2,
    type: "Follow-up Consultation",
    doctor: "Dr. Sarah K.",
    specialty: "Pediatrician",
    location: "Kids Care Hospital",
    address: "123 Elm Street, Karachi",
  },
  {
    id: 3,
    type: "Annual Checkup",
    doctor: "Dr. Ali M.",
    specialty: "General Practitioner",
    location: "Health First Clinic",
    address: "456 Oak Avenue, Karachi",
  },
  {
    id: 4,
    type: "Specialist Review",
    doctor: "Dr. Fatima Q.",
    specialty: "Endocrinologist",
    location: "Metabolic Health Center",
    address: "789 Maple Road, Karachi",
  },
  {
    id: 5,
    type: "Diabetes Management Session",
    doctor: "Dr. Ahmed H.",
    specialty: "Diabetes Specialist",
    location: "Wellness Clinic",
    address: "321 Pine Street, Karachi",
  },
];

export default function PlanRequestMeetings({
  scheduleDetail,
  selectedDateData,
  id,
}: {
  scheduleDetail: any;
  selectedDateData: any;
  id: string;
}) {
  const dispatch = useDispatch();
  const { detail, isLoading, errorMessage } = useSelector((state: any) => state.scheduleByFilter);
  const [meetingsData, setMeetingsData] = useState([]);

  useEffect(() => {
    setMeetingsData(detail?.calls[0]?.doctor || []);
  }, [detail]);

  const meetingsList = meetingsData;

  useEffect(() => {
    dispatch(fetchScheduleByFilter(`${id}?callDate=${selectedDateData}`));
  }, [selectedDateData, id, dispatch]);

  return (
    <div className="bg-(--background) rounded-8 shadow-soft p-6 max-h-screen overflow-y-auto sticky top-6">
      <div className="mb-6 pb-6 ">
        <p className="t-h1">
          {scheduleDetail?.month}, {scheduleDetail?.day} {scheduleDetail?.year}
        </p>
        <p className="t-sm mt-1">Sunday, 12 Call schedule for today</p>
      </div>

      <div className="space-y-3">
        {meetingsData.map((m, index) => (
          <div key={`${m.id}-${index}`} className="border border-(--gray-2) rounded-8 p-2 ">
            <h4 className="t-label-b mb-3">{m.specialization}</h4>
            <div className="flex items-start gap-4">
              <Avatar className="h-12 w-12 mt-1">
                <AvatarImage src={m.profilePicture} />
                {/* <AvatarFallback>DR</AvatarFallback> */}
              </Avatar>
              <div className="flex  items-center gap-5 justify-between text-sm">
                <div>
                  <p className="t-label-b">{m.fullname}</p>
                  <p className="t-cap">{m.specialization}</p>
                </div>
                <div className="">
                  <p className="t-label-b">{m.qualification}</p>
                  <p className="t-cap">{m.email}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
