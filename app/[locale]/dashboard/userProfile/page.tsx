"use client";
import { DashboardContent } from "../components/dashboard-content";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-(--page-background)">
      <DashboardContent
        sample={"User Profile"}
        descrip={"Unlock the potential of your candidates"}
        table={"All Request"}
        hideHeader={true}
        hideMetrics={true}
        hideData={true}
        btnTrue={true}
      />
    </div>
  );
}

//  <div className="p-8 ">
//       <SalesPersonCard
//         name="Mohammad Amir"
//         email="samikhan099@gmail.com"
//         phone="+92 312 283 8270"
//         photoUrl="/girlPic.png" // optional
//         campaign="Diabetics"
//         requestedMonth="September"
//         channel="Doctors"
//         reportingManager="Jon-Deo"
//         totalCalls={220}
//         status="Under Review"
//       />
//     </div>
