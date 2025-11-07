import Header from "../../../../components/Header";
import MonthlyTargets from "../../../../components/MonthlyTargets";
import MostSoldProducts from "../../../../components/MostSoldProducts";
import ByBrands from "../../../../components/ByBrands";
import MonthlyAttendance from "../../../../components//MonthlyAttendance";
import SaleAndCalls from "../../../../components/SaleAndCalls";

export default function SalesDashboard() {
  return (
    <div className=" bg-gray-50 text-black p-6">
      <div className="">
        <Header />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 ">
          <MonthlyTargets />
          <MostSoldProducts />
          <ByBrands />

          <div className="">
            <MonthlyAttendance />
            <SaleAndCalls />
          </div>
        </div>
      </div>
    </div>
  );
}
