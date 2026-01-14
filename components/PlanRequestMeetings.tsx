import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function PlanRequestMeetings({
  scheduleDetail,
  selectedDateData,
  id,
  filteredDoctorsData12,
}: {
  scheduleDetail: any;
  selectedDateData: any;
  id: string;
  filteredDoctorsData12: any;
}) {
  return (
    <div className="bg-(--background) rounded-8 shadow-soft p-6 max-h-screen overflow-y-auto sticky top-6">
      <div className="mb-6 pb-6 ">
        <p className="t-h1">
          {scheduleDetail?.month}, {scheduleDetail?.day} {scheduleDetail?.year}
        </p>
        <p className="t-sm mt-1">Sunday, 12 Call schedule for today</p>
      </div>

      <div className="space-y-3">
        {filteredDoctorsData12.map((m, index) => (
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
