// components/VisitHistoryAccordion.tsx
"use client";

import React, { useState, useRef, useMemo, useEffect } from "react";
import { Paperclip, Gift, Calendar, MoreVertical } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import CenturoTable from "@/components/shared/table/CeturoTable";
import TablePagination from "@/components/TablePagination";
import AnimatedTabs from "@/components/shared/AnimatedTabs";
import VisitExpandedDetails from "@/components/VisitExpandedDetails";
import SamplesTable from "@/components/SamplesTable";
import GiveawaysTable from "@/components/GiveawaysTable";
import { useSelector } from "react-redux";
import { clearPartyPlan, fetchPartyPlan, CallRecord } from "@/store/slices/party/partyPlanSlice";
import { RootState, useAppDispatch } from "@/store";

// Importing CallRecord from partyPlanSlice
type Visit = CallRecord;

type Tab = "Calls Report" | "samples" | "giveaways";

export default function VisitHistoryAccordion({ id }: any) {
  const [activeTab, setActiveTab] = useState<Tab>("Calls Report");

  const dispatch = useAppDispatch();
  const { plan, loading, error } = useSelector((state: RootState) => state.partyPlan);

  const planData = plan || [];

  useEffect(() => {
    if (id) {
      dispatch(fetchPartyPlan(id) as any);
    }

    return () => {
      dispatch(clearPartyPlan());
    };
  }, [dispatch, id]);

  const tabs = [
    { id: "Calls Report" as Tab, label: "Calls Report" },
    { id: "samples" as Tab, label: "Samples" },
    { id: "giveaways" as Tab, label: "Giveaways" },
  ];

  // Define columns for CenturoTable
  const columns = useMemo<ColumnDef<Visit>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        enableSorting: true,
        sortingFn: "alphanumeric",
        cell: ({ row }) => <p className="font-medium">{row.original?.pulseCode}</p>,
      },
      {
        accessorKey: "saleRep",
        header: "Sale Rep",
        enableSorting: true,
        sortingFn: "alphanumeric",
        cell: ({ row }) => (
          <p
            className="font-semibold text-(--primary) cursor-pointer hover:underline"
            onClick={(e) => {
              e.stopPropagation();
              row.toggleExpanded();
            }}
          >
            {row.original?.saleRep}
          </p>
        ),
      },
      {
        accessorKey: "location",
        header: "Location",
        enableSorting: true,
        sortingFn: "alphanumeric",
        cell: ({ row }) => <p className="font-medium">{row.original.location}</p>,
      },
      {
        accessorKey: "date",
        header: "Date",
        enableSorting: true,
        sortingFn: "alphanumeric",
        cell: ({ row }) => <p className="text-(--gray-5)">{row.original?.callDate}</p>,
      },
      {
        accessorKey: "actions",
        header: "",
        enableSorting: false,
        cell: ({ row }) => (
          <div className="flex items-center justify-center text-(--primary) gap-4">
            {row.original?.giveawayItems?.length > 0 && <Gift className="w-5 h-5" />}
            {row.original?.attachments?.length > 0 && (
              <Paperclip className="w-5 h-5 rotation-120" />
            )}
          </div>
        ),
      },
    ],
    []
  );

  // Render expanded row content
  const renderExpandedRow = (visit: Visit) => (
    <VisitExpandedDetails
      visitId={visit.callId}
      sampleItems={visit.sampleItems || []}
      giveawayItems={visit.giveawayItems || []}
      remarks={visit.remarks || ""}
      attachments={visit.attachments || []}
    />
  );

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="w-full max-w-md my-6">
        <AnimatedTabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          variant="primary"
          size="md"
        />
      </div>

      {/* Tab Content */}
      {activeTab === "Calls Report" && (
        <div className="mb-5">
          <CenturoTable
            data={planData}
            columns={columns}
            loading={loading}
            error={error}
            enableExpanding={true}
            enablePagination={true}
            pageSize={10}
            emptyMessage="No visit history found"
            renderExpandedRow={renderExpandedRow}
            PaginationComponent={TablePagination}
          />
        </div>
      )}

      {activeTab === "samples" && (
        <div className="mb-5">
          <SamplesTable id={id} />
        </div>
      )}

      {activeTab === "giveaways" && (
        <div className="mb-5">
          <GiveawaysTable id={id} />
        </div>
      )}
    </div>
  );
}
