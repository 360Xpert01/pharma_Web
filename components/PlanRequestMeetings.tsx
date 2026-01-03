import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

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

export default function PlanRequestMeetings() {
  return (
    <div className="bg-(--background) rounded-8 shadow-soft p-6 h-fit sticky top-6">
      <div className="mb-6 pb-6 ">
        <p className="t-h1">September, 11 2025</p>
        <p className="t-sm mt-1">Sunday, 12 Call schedule for today</p>
      </div>

      <div className="space-y-3">
        {meetings.map((m) => (
          <div key={m.id} className="border border-(--gray-2) rounded-8 p-2 ">
            <h4 className="t-label-b mb-3">{m.type}</h4>
            <div className="flex items-start gap-4">
              <Avatar className="h-12 w-12 mt-1">
                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${m.doctor}`} />
                <AvatarFallback>DR</AvatarFallback>
              </Avatar>
              <div className="flex  items-center gap-5 justify-between text-sm">
                <div>
                  <p className="t-label-b">{m.doctor}</p>
                  <p className="t-cap">{m.specialty}</p>
                </div>
                <div className="">
                  <p className="t-label-b">{m.location}</p>
                  <p className="t-cap">{m.address}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
