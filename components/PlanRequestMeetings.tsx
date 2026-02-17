import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function PlanRequestMeetings({
  scheduleDetail,
  selectedDateData,
  id,
  filteredDoctorsData12,
  callsCount,
}: {
  scheduleDetail: any;
  selectedDateData: any;
  id: string;
  filteredDoctorsData12: any;
  callsCount: number;
}) {
  // Extract date from selectedDateData
  const extractedDate = selectedDateData ? selectedDateData.split("T")[0] : null;
  const dateObj = extractedDate ? new Date(extractedDate) : null;
  const formattedDate = dateObj
    ? dateObj.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    : null;

  return (
    <div className="bg-(--background) rounded-8 shadow-soft p-6 max-h-screen overflow-y-auto sticky top-6">
      <div className="mb-6 pb-6 ">
        <p className="t-h1">
          {formattedDate ? formattedDate : `${scheduleDetail?.month},${scheduleDetail?.year}`}
        </p>
        <p className="t-sm mt-1">{filteredDoctorsData12.length} Call scheduled</p>
      </div>

      <div className="space-y-3">
        {filteredDoctorsData12.map((m, index) => (
          <div key={`${m.id}-${index}`} className="border border-(--gray-2) rounded-8 p-2 ">
            <h4 className="t-label-b mb-3">{m.attributes?.specialization}</h4>
            <div className="flex items-start gap-4">
              <Avatar className="h-12 w-12 mt-1">
                <AvatarImage src={m.image || "/capMan.svg"} />
                {/* <AvatarFallback>DR</AvatarFallback> */}
              </Avatar>
              <div className="flex  items-center w-[100%] justify-between text-sm">
                <div>
                  <p className="t-label-b">{m.party_name}</p>
                  <p className="t-cap">{m.attributes?.qualification}</p>
                </div>
                <div className="">
                  <p className="t-label-b">{m.locations?.city}</p>
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
