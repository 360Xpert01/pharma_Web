"use client";

import React, { useState } from "react";
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
import ExpenseApprovalList from "@/components/ExpenseApprovalList";
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
import DoctorSegments from "@/components/DoctorSegments";
import AllDoctorSegments from "@/components/AllDoctorSegments";
import Qualifications from "@/components/Qualifications";
import AllQualifications from "@/components/AllQualifications";
import Specialities from "@/components/Specialities";
import AllSpecialities from "@/components/AllSpecialities";
import AddSampleForm from "@/components/AddSampleForm";
import AddGiveawayForm from "@/components/AddGiveawayForm";
import ProductForm from "@/components/ProductForm";
import AddDoctorForm from "@/components/AddDoctorForm";
import AddEmployeeForm from "@/components/AddEmployee";
import UserRoles from "@/components/UserRoles";
import AddCallPoints from "@/components/AddCallPoints";
import CallPointTable from "@/components/CallPointTable";
import AddNewTeamForm from "@/components/TeamForm";
import SetTargetPage from "@/components/SetTargetPage";
import UpdateEmployees from "@/components/UpdateEmployee";
import AddPrefixNameComponent from "@/components/AddPrefix";
import PreFixTable from "@/components/PreFixTable";
import TargetListView from "@/components/TargetListView";
import EmployeeProfileTabs from "@/components/EmployeeProfileTabs";
import AddAllocateGivewaySample from "@/components/AddAllocateGivewaySample";
import BricksHierarchyWrapper from "@/components/BricksHierarchyWrapper";
import RoleHierarchyWrapper from "@/components/RoleHierarchyWrapper";
import AllocatedGiveawaysTable from "@/components/AllocatedGiveawaysTable";
import ProductCategories from "@/components/ProductCategories";
import AllProductCategories from "@/components/AllProductCategories";
import AllSpecializations from "@/components/AllSpecializations";
import DoctorDetail from "@/components/DoctorDetail";
import CsvUploadMapper from "@/components/CsvUploadMapper";
import UpdateProductForm from "@/components/UpdateProduct";
import UpdateGiveawayForm from "@/components/UpdateGiveaway";
import GiveawayForm from "@/components/GivewayForm";
import UpdateDoctorForm from "@/components/UpdateDoctorForm";
import ProductDetails from "@/components/ProducDetails";

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
  teamFormTabel,
  setTargetlist,
  ActiveOn,
  UpdateEmp,
  employeeId,
  prefixPro,
  targetListView,
  showTabs,
  allocateGiveaways,
  AddAllocateGiveaway,
  bricksHierarchy,
  roleHierarchy,
  allocatedGiveawaysTable,
  productCategoriesD,
  productCategoriesTrue,
  specializationsD,
  specializationsTrue,
  doctorDetail,
  csvIMP,
  UpdateProduct,
  productId,
  doctorSegmentsD,
  doctorSegmentsTrue,
  qualificationsD,
  qualificationsTrue,
  specialitiesD,
  specialitiesTrue,
  UpdateGiveaway,
  giveawayId,
  id,
  idForm,
  UpdateDoctor,
  partyId,
  channelId,
  productDetailBtn,
}: DashboardProps) {
  const { isLoading, isLocalLoading, handleRefresh } = useDashboard();
  const router = useRouter();
  const combinedLoading = externalLoading || isLoading;
  const topHcps = dataCard?.topHcps || [];

  // State for segment editing
  const [selectedSegmentId, setSelectedSegmentId] = useState<string | null>(null);
  // State for speciality editing
  const [selectedSpecialityId, setSelectedSpecialityId] = useState<string | null>(null);
  // State for qualification editing
  const [selectedQualificationId, setSelectedQualificationId] = useState<string | null>(null);

  // State for Doctor Table Search
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<{
    segmentId?: string;
    specializationId?: string;
    status?: string;
  }>({});

  // State for Employee Table Filters
  const [employeeFilters, setEmployeeFilters] = useState<{
    status?: string;
    roleId?: string;
    teamId?: string;
    supervisorId?: string;
  }>({});

  // State for Product Table Filters
  const [productFilters, setProductFilters] = useState<{
    categoryId?: string;
    status?: string;
  }>({});

  // State for Giveaway Table Filters
  const [giveawayFilters, setGiveawayFilters] = useState<{
    status?: string;
  }>({});

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

  const handleEditSegment = (segmentId: string) => {
    setSelectedSegmentId(segmentId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleUpdateComplete = () => {
    setSelectedSegmentId(null);
  };

  const handleEditSpeciality = (specialityId: string) => {
    setSelectedSpecialityId(specialityId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSpecialityUpdateComplete = () => {
    setSelectedSpecialityId(null);
  };

  const handleEditQualification = (qualificationId: string) => {
    setSelectedQualificationId(qualificationId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleQualificationUpdateComplete = () => {
    setSelectedQualificationId(null);
  };

  return (
    <div className="space-y-1 px-3 mt-30 bg-(--gray-0)">
      {!channalTrue &&
        !productCategoriesTrue &&
        !specializationsTrue &&
        !doctorSegmentsTrue &&
        !qualificationsTrue &&
        !specialitiesTrue && (
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
        <div className="grid mt-1 gap-6 sm:grid-cols-2  lg:grid-cols-4">
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
            <div className="shadow-soft rounded-md p-3 mt-10 bg-[var(--background)]">
              <TableHeader campHeading={campHeading} filterT={filterT} showDoctorFilters={true} />
              <AllChannalB />
            </div>
          </div>
        )}

        {doctorSegmentsD && (
          <div>
            <DoctorSegments updateId={selectedSegmentId} onUpdateComplete={handleUpdateComplete} />
            <div className="shadow-soft rounded-md p-3 mt-10 bg-[var(--background)]">
              <TableHeader campHeading={campHeading} filterT={filterT} />
              <AllDoctorSegments onEditSegment={handleEditSegment} />
            </div>
          </div>
        )}

        {qualificationsD && (
          <div>
            <Qualifications
              updateId={selectedQualificationId}
              onUpdateComplete={handleQualificationUpdateComplete}
            />
            <div className="shadow-soft rounded-md p-3 mt-10 bg-[var(--background)]">
              <TableHeader campHeading={campHeading} filterT={filterT} />
              <AllQualifications onEditQualification={handleEditQualification} />
            </div>
          </div>
        )}

        {specialitiesD && (
          <div>
            <Specialities
              updateId={selectedSpecialityId}
              onUpdateComplete={handleSpecialityUpdateComplete}
            />
            <div className="shadow-soft rounded-md p-3 mt-10 bg-[var(--background)]">
              <TableHeader campHeading={campHeading} filterT={filterT} />
              <AllSpecialities onEditSpeciality={handleEditSpeciality} />
            </div>
          </div>
        )}

        {prefixPro && (
          <div>
            <AddPrefixNameComponent />
            <div className="shadow-soft rounded-md p-3 mt-10 bg-[var(--background)]">
              <TableHeader campHeading={campHeading} filterT={filterT} />
              <PreFixTable />
            </div>
          </div>
        )}

        {campTabel && (
          <div className="rounded-md p-3 shadow-soft bg-[var(--background)]">
            <TableHeader campHeading={campHeading} filterT={filterT} onSearch={setSearchTerm} />
            <CampaignsTable searchTerm={searchTerm} />
          </div>
        )}

        {prodTabel && (
          <div className="rounded-md p-3 shadow-soft bg-[var(--background)]">
            <TableHeader
              campHeading={campHeading}
              filterT={filterT}
              showInactiveToggle={true}
              showProductFilters={true}
              onSearch={setSearchTerm}
              onApplyFilters={setProductFilters}
            />
            <ProductTableM searchTerm={searchTerm} filters={productFilters} />
          </div>
        )}

        {productForm && (
          <div className="rounded-md p-3 shadow-soft bg-[var(--background)]">
            <ProductForm mode="add" />
          </div>
        )}

        {doctorTable && (
          <div className="rounded-md p-3 shadow-soft bg-[var(--background)]">
            <TableHeader
              campHeading={campHeading}
              filterT={filterT}
              onSearch={setSearchTerm}
              showDoctorFilters={true}
              channelId={id || ""}
              onApplyFilters={setFilters}
            />
            <DoctorsTable id={id || ""} searchTerm={searchTerm} filters={filters} />
          </div>
        )}

        {csvIMP && (
          <div className="rounded-md shadow-soft bg-[var(--background)]">
            <CsvUploadMapper />
          </div>
        )}

        {setTargetlist && <SetTargetPage />}

        {allocateGiveaways && (
          <div className="">
            {" "}
            {/* rounded-md p-3 shadow-[0px_0.63px_5.5px_0px_rgba(0,0,0,0.1)]  */}
            <AddAllocateGivewaySample />
          </div>
        )}

        {AddAllocateGiveaway && (
          <div className="">
            <AddAllocateGivewaySample />
          </div>
        )}

        {doctorForm && (
          <div className="rounded-md shadow-soft bg-[var(--background)]">
            <AddDoctorForm idForm={idForm} />
          </div>
        )}

        {sampleTable && (
          <div className="rounded-md p-3 shadow-soft bg-[var(--background)]">
            <TableHeader campHeading={campHeading} filterT={filterT} />
            <SampleManagTable />
          </div>
        )}

        {sampleForm && (
          <div className="rounded-md p-3 shadow-soft bg-[var(--background)]">
            <AddSampleForm />
          </div>
        )}

        {giveawayTable && (
          <div className="rounded-md p-3 shadow-soft bg-[var(--background)]">
            <TableHeader
              campHeading={campHeading}
              filterT={filterT}
              showGiveawayFilters={true}
              onSearch={setSearchTerm}
              onApplyFilters={setGiveawayFilters}
            />
            <GiveawayTable searchTerm={searchTerm} filters={giveawayFilters} />
          </div>
        )}

        {GivawayForm && (
          <div className="rounded-md p-3 shadow-soft bg-[var(--background)]">
            {/* Use GiveawayForm in add mode, just like ProductForm */}
            <GiveawayForm mode="add" />
          </div>
        )}

        {OrderCap && (
          <div className="rounded-md p-3 shadow-soft bg-[var(--background)]">
            <TableHeader campHeading={campHeading} filterT={filterT} />
            <OrderCapTable />
          </div>
        )}

        {DCRTable && (
          <div className="rounded-md p-3 shadow-soft bg-[var(--background)]">
            <TableHeader campHeading={campHeading} filterT={filterT} />
            <DcrTable />
          </div>
        )}

        {UserRoleTable && (
          <div className="rounded-md p-3 shadow-soft bg-[var(--background)]">
            <TableHeader campHeading={campHeading} filterT={filterT} />
            <UserRoles />
          </div>
        )}

        {PlanTable && (
          <div className="rounded-md p-3 shadow-soft bg-[var(--background)]">
            <TableHeader campHeading={campHeading} filterT={filterT} />
            <PlansTableManag />
          </div>
        )}

        {ExpansTable && (
          <div className="rounded-md p-3 shadow-soft bg-[var(--background)]">
            <TableHeader campHeading={campHeading} filterT={filterT} />
            <ExpanseTable />
          </div>
        )}

        {ReqTabel && (
          <div className="rounded-md p-3 shadow-soft bg-[var(--background)]">
            <TableHeader campHeading={campHeading} filterT={filterT} />
            <RequestViewTable />
          </div>
        )}

        {proBar && (
          <div className="rounded-md p-3 shadow-soft bg-[var(--background)]">
            <TableHeader
              campHeading="All User's"
              filterT
              onSearch={setSearchTerm}
              showEmployeeFilters={true}
              onApplyFilters={setEmployeeFilters}
            />
            <SalesTeamTable searchTerm={searchTerm} filters={employeeFilters} />
          </div>
        )}

        {employeeProfileBtn && showTabs && <EmployeeProfileTabs candidate={candidate} />}

        {AddemployeeBtn && <AddEmployeeForm ActiveOn={ActiveOn} />}
        {UpdateEmp && <UpdateEmployees employeeId={employeeId} />}

        {AddCallPointTrue && (
          <div>
            <AddCallPoints />
            <div className="shadow-soft rounded-md p-3 mt-10 bg-[var(--background)]">
              <TableHeader campHeading="Call Points" filterT={filterT} />
              <CallPointTable />
            </div>
          </div>
        )}

        {btnApprovel && <ExpenseApprovalList />}

        {teamFormTabel && <AddNewTeamForm />}

        {targetListView && (
          <div className="rounded-md p-3 shadow-soft bg-[var(--background)]">
            <TableHeader campHeading="All Employees" filterT={filterT} />
            <TargetListView />
          </div>
        )}

        {bricksHierarchy && (
          <div className="rounded-md p-3 shadow-soft bg-[var(--background)]">
            <BricksHierarchyWrapper />
          </div>
        )}

        {roleHierarchy && <RoleHierarchyWrapper />}

        {allocatedGiveawaysTable && (
          <div className="rounded-md p-3 shadow-soft bg-[var(--background)]">
            <TableHeader campHeading={campHeading} filterT={filterT} />
            <AllocatedGiveawaysTable />
          </div>
        )}

        {productCategoriesTrue && (
          <div>
            <ProductCategories />
            <div className="shadow-soft rounded-md p-3 mt-10 bg-[var(--background)]">
              <TableHeader campHeading="Product Categories" filterT={filterT} />
              <AllProductCategories />
            </div>
          </div>
        )}

        {productDetailBtn && <ProductDetails candidate={candidate} />}

        {doctorDetail && <DoctorDetail />}

        {UpdateProduct && (
          <div className="rounded-md p-3 shadow-soft bg-[var(--background)]">
            <UpdateProductForm productId={productId} />
          </div>
        )}
        {UpdateGiveaway && giveawayId && (
          <div className="rounded-md p-3 shadow-soft bg-[var(--background)]">
            <UpdateGiveawayForm giveawayId={giveawayId} />
          </div>
        )}

        {UpdateDoctor && partyId && (
          <div className="rounded-md shadow-soft bg-[var(--background)]">
            <UpdateDoctorForm partyId={partyId} channelId={channelId || ""} />
          </div>
        )}

        {/* Quick Stats Footer */}
        {/* <PerformanceStats isLoading={combinedLoading} /> */}
      </div>
    </div>
  );
}
