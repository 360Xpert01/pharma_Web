import Header from "../../../../components/Header";
import MonthlyTargets from "../../../../components/MonthlyTargets";
import MostSoldProducts from "../../../../components/MostSoldProducts";
import ByBrands from "../../../../components/ByBrands";
import MonthlyAttendance from "../../../../components//MonthlyAttendance";
import SaleAndCalls from "../../../../components/SaleAndCalls";

export default function SalesDashboard() {
  return (
    <div className=" text-black p-1">
      <div className="w-full bg-gray-50 p-2 rounded-xl ">
        {/* <Header /> */}

        <div className="flex justify-between gap-2">
          <div className="w-[70%] flex justify-between">
            <MonthlyTargets />
            <MostSoldProducts />
            <div className="w-[33%]">
              <ByBrands height={260} />
            </div>
          </div>

          <div className="w-[30%]">
            <MonthlyAttendance />
            <SaleAndCalls />
          </div>
        </div>
      </div>
    </div>
  );
}
