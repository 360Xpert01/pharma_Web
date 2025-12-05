"use client";

import { useDashboard } from "@/hooks/use-dashboard";
import { DashboardProps } from "../types";
import { ChartsSection } from "./charts/ChartsSection";
import { DashboardHeader } from "./dashboard-header";
import { DataSection } from "./data/data-section";
import { MetricsSection } from "./metrics/metrics-section";
import { PerformanceStats } from "./performance/performance-stats";
import SalesDashboard from "./charts/SalesDashboard";
import SalesDashboard1 from "./SalesDashboard1";
import { useRouter } from "next/navigation";
import ExpenseRequestItem from "@/components/ExpenseRequestItem";
import SalesTeamTable from "./data/EmploySection";
import { User } from "lucide-react";
import SalesPersonCard from "@/components/UserDetailTtle";
import CampaignsTable from "@/components/CampainTable";
import TableHeader from "@/components/TableHeader";
import DoctorsTable from "@/components/DoctorTable";
import ProductTableM from "@/components/ProductTableM";
import SampleManagTable from "@/components/SampleManagTable";
import GiveawayTable from "@/components/giveawayTable";
import OrderCapTable from "@/components/OrderCapTable";
import DcrTable from "@/components/DrcTable";
import PlansTableManag from "@/components/PlansTableManag";
import ExpanseTable from "@/components/ExpanseTable";
import RequestViewTable from "@/components/RequestViewTable";
import Channals from "@/components/Channals";
import AllChannalB from "@/components/AllChannalB";
import AddSampleForm from "@/components/AddSampleForm";
import AddGiveawayForm from "@/components/AddGiveawayForm";
import AddProductForm from "@/components/AddProductForm";
import AddDoctorForm from "@/components/AddDoctorForm";
import UserProfile from "@/components/UserProfile";
import MonthlyTargets from "@/components/TargetEmployees";
import EmployeeGraphRed from "@/components/EmployeeGraphRed";
import EmployeeSaleCall from "@/components/EmployeeSaleCall";
import AddEmployeeForm from "@/components/AddEmployee";
import WeeklyAttendance from "@/components/WeeklyAttendance";
import MonthlyAttendance from "@/components/MonthlyAttendance";
import WeekelyExpenses from "@/components/WeeklyExpenses";
import ExpansesListApprove from "@/components/ExpansesListApprove";
import ByBrands from "@/components/ByBrands";
import CountryMap from "@/components/CountryMap";
import MostSoldProducts from "@/components/MostSoldProducts";
import TodaysAppointments from "@/components/TodayAppoinment";
import UserRoles from "@/components/UserRoles";
import AddCallPoints from "@/components/AddCallPoints";
import CallPointTable from "@/components/CallPointTable";

export function DashboardContent({
  isLoading: externalLoading = false,
  data,
  sample,
  descrip,
  table,
  hideHeader,
  hideMetrics,
  hideData,
  btnTrue,
  btnAdd,
  proBar,
  settingsRoute,
  btntextReq,
  btnReqquest,
  btnApprovel,
  settingsRouteRequest,
  campTabel,
  campHeading,
  filterT,
  dataCard,
  doctorTable,
  prodTabel,
  sampleTable,
  giveawayTable,
  OrderCap,
  DCRTable,
  PlanTable,
  ExpansTable,
  ReqTabel,
  channalD,
  sampleForm,
  GivawayForm,
  productForm,
  doctorForm,
  channalTrue,
  employeeProfileBtn,
  candidate,
  AddemployeeBtn,
  UserRoleTable,
  AddCallPointTrue,
}: DashboardProps) {
  const { isLoading, isLocalLoading, handleRefresh } = useDashboard();
  const router = useRouter();
  const combinedLoading = externalLoading || isLoading;
  const topHcps = dataCard?.topHcps || [];
  const requests = [
    { title: "Client1", amount: 520 },
    { title: "Client2", amount: 520 },
    { title: "Client3", amount: 520 },
    { title: "Client4", amount: 520 },
    { title: "Client5", amount: 520 },
  ];
  const handleSettings = () => {
    if (settingsRoute) {
      router.push(settingsRoute);
    } else {
      console.log("Settings route not provided");
    }
  };

  const handleSettingView = () => {
    if (settingsRouteRequest) {
      router.push(settingsRouteRequest);
    } else {
      console.log("Settings route not provided");
    }
  };

  return (
    <div className="space-y-1 px-7 mt-26 bg-gray-50">
      {/* space-y-10 p-3 */}
      {/* Dashboard Header with Actions */}

      {!channalTrue && (
        <DashboardHeader
          onRefresh={handleRefresh}
          onSettings={handleSettings}
          isLoading={combinedLoading}
          title={sample}
          description={descrip}
          btnAdd={btnAdd}
          btnTrue={btnTrue}
          btntextReq={btntextReq}
          btnReqquest={btnReqquest}
          onSettingView={handleSettingView}
        />
      )}

      <div className="space-y-10 ">
        {/* Metrics Cards Section */}
        <div className="grid mt-6 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {!hideMetrics &&
            (topHcps?.length > 0 ? (
              topHcps.map((hcp, index) => (
                <MetricsSection
                  key={index}
                  title={hcp.title}
                  value={hcp.value}
                  valueLabel={hcp.valueLabel}
                  subtitle={hcp.subtitle}
                  detailLabel={hcp.detailLabel || ""}
                  detailValue={hcp.detailValue}
                  progress={hcp.progress}
                  colorVariant={hcp.colorVariant}
                />
              ))
            ) : (
              <div>No data available</div>
            ))}
        </div>

        {channalD && (
          <div>
            <Channals />
            <div className=" shadow-[0px_5px_10px_rgba(0,0,0,0.20)] rounded-md p-3 mt-10  ">
              <TableHeader campHeading={campHeading} filterT={filterT} />
              <AllChannalB />
            </div>
          </div>
        )}

        {campTabel && (
          <div className=" rounded-md p-3 shadow-[0px_5px_10px_rgba(0,0,0,0.20)] ">
            <TableHeader campHeading={campHeading} filterT={filterT} />
            <CampaignsTable />
          </div>
        )}

        {prodTabel && (
          <div className=" rounded-md p-3 shadow-[0px_5px_10px_rgba(0,0,0,0.20)] ">
            <TableHeader campHeading={campHeading} filterT={filterT} />
            <ProductTableM />
          </div>
        )}

        {productForm && (
          <div className=" rounded-md p-3 shadow-[0px_5px_10px_rgba(0,0,0,0.20)] ">
            <AddProductForm />
          </div>
        )}

        {doctorTable && (
          <div className=" rounded-md p-3 shadow-[0px_5px_10px_rgba(0,0,0,0.20)] ">
            <TableHeader campHeading={campHeading} filterT={filterT} />
            <DoctorsTable />
          </div>
        )}

        {doctorForm && (
          <div className=" rounded-md  shadow-[0px_5px_10px_rgba(0,0,0,0.20)] ">
            <AddDoctorForm />
          </div>
        )}

        {sampleTable && (
          <div className=" rounded-md p-3 shadow-[0px_5px_10px_rgba(0,0,0,0.20)] ">
            <TableHeader campHeading={campHeading} filterT={filterT} />
            <SampleManagTable />
          </div>
        )}

        {sampleForm && (
          <div className=" rounded-md p-3 shadow-[0px_5px_10px_rgba(0,0,0,0.20)] ">
            <AddSampleForm />
          </div>
        )}

        {giveawayTable && (
          <div className=" rounded-md p-3 shadow-[0px_5px_10px_rgba(0,0,0,0.20)] ">
            <TableHeader campHeading={campHeading} filterT={filterT} />
            <GiveawayTable />
          </div>
        )}

        {GivawayForm && (
          <div className=" rounded-md p-3 shadow-[0px_5px_10px_rgba(0,0,0,0.20)] ">
            <AddGiveawayForm />
          </div>
        )}

        {OrderCap && (
          <div className=" rounded-md p-3 shadow-[0px_5px_10px_rgba(0,0,0,0.20)] ">
            <TableHeader campHeading={campHeading} filterT={filterT} />
            <OrderCapTable />
          </div>
        )}

        {DCRTable && (
          <div className=" rounded-md p-3 shadow-[0px_5px_10px_rgba(0,0,0,0.20)] ">
            <TableHeader campHeading={campHeading} filterT={filterT} />
            <DcrTable />
          </div>
        )}

        {UserRoleTable && (
          <div className=" rounded-md p-3 shadow-[0px_5px_10px_rgba(0,0,0,0.20)] ">
            <TableHeader campHeading={campHeading} filterT={filterT} />
            <UserRoles />
          </div>
        )}

        {PlanTable && (
          <div className=" rounded-md p-3 shadow-[0px_5px_10px_rgba(0,0,0,0.20)] ">
            <TableHeader campHeading={campHeading} filterT={filterT} />
            <PlansTableManag />
          </div>
        )}

        {ExpansTable && (
          <div className=" rounded-md p-3 shadow-[0px_5px_10px_rgba(0,0,0,0.20)] ">
            <TableHeader campHeading={campHeading} filterT={filterT} />
            <ExpanseTable />
          </div>
        )}

        {ReqTabel && (
          <div className=" rounded-md p-3 shadow-[0px_5px_10px_rgba(0,0,0,0.20)] ">
            <TableHeader campHeading={campHeading} filterT={filterT} />
            <RequestViewTable />
          </div>
        )}

        {proBar && <SalesTeamTable />}

        {employeeProfileBtn && (
          <div className="space-y-6">
            <UserProfile candidate={candidate} />
            <div className=" flex justify-between gap-6 w-[100%]">
              <div className="w-[60%]">
                <MonthlyTargets currentMonth={75.08} lastMonth={45.27} date="September, 27 2025" />
              </div>
              <div className="w-[40%]">
                <EmployeeGraphRed />
              </div>
            </div>
            <div className="w-[100%] flex justify-between ">
              <div className="w-[59%]">
                <EmployeeSaleCall />
                <WeekelyExpenses />
                <ExpansesListApprove />
              </div>
              <div className="w-[39%] space-y-3 mt-3">
                <MonthlyAttendance />
                <WeeklyAttendance />
              </div>
            </div>
            <div className="flex w-[100%] justify-between ">
              <div className="w-[30%] h-[100%]">
                <ByBrands height={395} />
              </div>
              <div className="w-[69%] ">
                <CountryMap />
              </div>
            </div>
            <div className="flex w-[100%] justify-between">
              <div className="w-[69%]">
                <TodaysAppointments />
              </div>
              <div className="w-[30%]">
                <MostSoldProducts weight={100} />
              </div>
            </div>
          </div>
        )}

        {AddemployeeBtn && <AddEmployeeForm />}

        {AddCallPointTrue && (
          <div>
            <AddCallPoints />
            <CallPointTable />
          </div>
        )}

        {btnApprovel && (
          <div className=" mx-auto  space-y-2">
            {requests.map((req, i) => (
              <ExpenseRequestItem
                key={i}
                title={req.title}
                onApprove={() => alert(`Approved: ${req.title}`)}
                onReject={() => alert(`Rejected: ${req.title}`)}
              />
            ))}
          </div>
        )}

        {/* Quick Stats Footer */}
        {/* <PerformanceStats isLoading={combinedLoading} /> */}
      </div>
    </div>
  );
}
