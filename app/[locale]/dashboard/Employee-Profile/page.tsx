// export default function Page() {
//   return (
//     <div className="p-8 mt-16 bg-gray-50 min-h-screen">
//       <UserProfile candidate={candidate} />
//     </div>
//   );
// }

"use client";
import { DashboardContent } from "../components/dashboard-content";

export default function DashboardPage() {
  const candidate = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+92 300 1234567",
    reportingManager: "Sarah Hammaz",
    campaign: "Diabetics",
    requestedMonth: "January 2025",
    channel: "Doctor",
    status: "Under Review",
    totalCalls: "248",
  };

  return (
    <div className=" bg-white mt-16">
      <DashboardContent
        sample={"User Profile"}
        descrip={"Unlock the potential of your candidates"}
        table={"All product"}
        btnTrue={true}
        hideMetrics={true}
        employeeProfileBtn={true}
        candidate={candidate}
      />
    </div>
  );
}
