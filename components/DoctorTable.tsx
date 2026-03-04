"use client";

import React, { useState, useMemo } from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";
import CenturoTable from "@/components/shared/table/CeturoTable";
import TablePagination from "@/components/TablePagination";
import StatusBadge from "@/components/shared/StatusBadge";
import { useAppSelector, useAppDispatch } from "@/store";
import { getFieldConfigByChannel } from "@/utils/doctorFormConfig";
import { getPartiesByChannelType, PartyItem } from "@/store/slices/party/partiesSlice";
import EditIcon from "@/components/svgs/edit-icon";
import EyeIcon from "@/components/svgs/eye-icon";

interface Doctor extends PartyItem {}

export default function DoctorsTable({
  id,
  searchTerm,
  filters,
}: {
  id: string;
  searchTerm?: string;
  filters?: { segmentId?: string; specializationId?: string; status?: string };
}) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { parties, loading, error, pagination } = useAppSelector((state) => state.parties);

  const [paginationState, setPaginationState] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const [sorting, setSorting] = useState<any[]>([{ id: "party_name", desc: false }]);

  // Maps UI column ids to actual DB column names for server-side sorting
  const SORT_FIELD_MAP: Record<string, string> = {
    pulse_code: "pulse_code",
    pmdcNumber: "pmdcNumber",
    party_name: "party_name",
    specialization_id: "specialization_name",
    segment_id: "segment_name",
    phone: "phone_number",
    parent_id: "party_parent_name",
    region_description: "region_description",
    status: "status",
  };

  const handlePaginationChange = (page: number, pageSize: number) => {
    setPaginationState({ pageIndex: page - 1, pageSize });
  };

  React.useEffect(() => {
    const rawSortField = sorting.length > 0 ? sorting[0].id : "party_name";
    const sortField = SORT_FIELD_MAP[rawSortField] ?? "party_name";
    const sortOrder = sorting.length > 0 ? (sorting[0].desc ? "desc" : "asc") : "asc";

    dispatch(
      getPartiesByChannelType({
        channelTypeId: id,
        page: paginationState.pageIndex + 1,
        limit: paginationState.pageSize,
        search: searchTerm,
        segmentId: filters?.segmentId,
        specializationId: filters?.specializationId,
        status: filters?.status,
        sort: sortField,
        order: sortOrder as any,
      })
    );
  }, [
    dispatch,
    id,
    paginationState.pageIndex,
    paginationState.pageSize,
    searchTerm,
    filters,
    sorting,
  ]);

  console.log("parties12321", parties);

  const doctorsDataApi = parties || [];

  // Redux state for channels (fetched by parent component)
  const { channels, loading: channelsLoading } = useAppSelector((state) => state.allChannels);

  // Find the channel associated with this ID
  const currentChannel = useMemo(() => {
    if (!channels || channels.length === 0 || !id) return null;
    return channels.find((ch) => ch.id === id);
  }, [channels, id]);

  // Get field configuration based on channel name
  const fieldConfig = useMemo(() => {
    if (currentChannel) {
      console.log("Table - Current channel found:", currentChannel.name);
      return getFieldConfigByChannel(currentChannel.name);
    }
    // Default: show all columns if no channel is found
    console.log("Table - No channel found, using deault config");
    return getFieldConfigByChannel();
  }, [currentChannel]);

  // Define columns for CenturoTable based on field configuration
  const columns: ColumnDef<Doctor>[] = useMemo(() => {
    const cols: ColumnDef<Doctor>[] = [];

    // ID column - always show
    cols.push({
      id: "pulse_code",
      header: "ID",
      accessorKey: "pulse_code",
      enableSorting: true,
      cell: ({ row }) => (
        <span>{row.original?.pulsecode || row.original?.pulse_code || "N/A"}</span>
      ),
    });

    // PMDC Number - conditional
    if (fieldConfig.pmdcNumber) {
      cols.push({
        id: "pmdcNumber",
        header: "PMDC Number",
        accessorKey: "pmdcNumber",
        enableSorting: true,
        cell: ({ row }) => (
          <span>{row.original?.attributes?.pmdcNumber || row.original?.pmdcNumber || "N/A"}</span>
        ),
      });
    }

    // Name - conditional
    if (fieldConfig.name) {
      cols.push({
        id: "party_name",
        header: "Name",
        accessorKey: "party_name",
        enableSorting: true,
        cell: ({ row }) => <span>{row.original?.party_name || "N/A"}</span>,
      });
    }

    // Specialization - conditional
    if (fieldConfig.specialty) {
      cols.push({
        id: "specialization_id",
        header: "Specialization",
        accessorKey: "specialization_name",
        enableSorting: true,
        cell: ({ row }) => (
          <span className="text-[var(--muted-foreground)]">
            {row.original?.specialization_name ||
              row.original?.attributes?.specialization ||
              row.original?.specialization ||
              "N/A"}
          </span>
        ),
      });
    }

    // Qualification - conditional
    // if (fieldConfig.qualification) {
    //   cols.push({
    //     header: "Qualification",
    //     accessorKey: "qualification",
    //     cell: ({ row }) => (
    //       <span>
    //         {row.original?.attributes?.qualification || row.original?.qualification || "N/A"}
    //       </span>
    //     ),
    //   });
    // }

    // Segment - conditional
    if (fieldConfig.segment) {
      cols.push({
        id: "segment_id",
        header: "Segment",
        accessorKey: "segment_name",
        enableSorting: true,
        cell: ({ row }) => <span>{row.original?.segment_name || "N/A"}</span>,
      });
    }

    // Designation - conditional
    // if (fieldConfig.designation) {
    //   cols.push({
    //     header: "Designation",
    //     accessorKey: "designation",
    //     cell: ({ row }) => (
    //       <span>{row.original?.attributes?.designation || row.original?.designation || "N/A"}</span>
    //     ),
    //   });
    // }

    // Email - conditional
    // if (fieldConfig.email) {
    //   cols.push({
    //     header: "Email",
    //     accessorKey: "email",
    //     cell: ({ row }) => <span>{row.original?.email || "N/A"}</span>,
    //   });
    // }

    // Phone/Contact Number - conditional
    if (fieldConfig.contactNumber) {
      cols.push({
        id: "phone",
        header: "Phone No",
        accessorKey: "phone_number",
        enableSorting: true,
        cell: ({ row }) => (
          <span className="text-[var(--muted-foreground)]">
            {row.original?.phone_number || "N/A"}
          </span>
        ),
      });
    }

    // Date of Birth - conditional
    // if (fieldConfig.dateOfBirth) {
    //   cols.push({
    //     header: "D.O.B",
    //     accessorKey: "dateOfBirth",
    //     cell: ({ row }) => (
    //       <span>
    //         {row.original?.attributes?.date_of_birth || row.original?.date_of_birth || "N/A"}
    //       </span>
    //     ),
    //   });
    // }

    // Parent - conditional
    if (fieldConfig.parent) {
      cols.push({
        id: "parent_id",
        header: "Parent",
        accessorKey: "organization.party_parent_name",
        enableSorting: true,
        cell: ({ row }) => (
          <span>
            {row.original?.organization?.party_parent_name || row.original?.parent || "N/A"}
          </span>
        ),
      });
    }

    // Location - conditional (mapped to locations in config)
    if (fieldConfig.locations) {
      cols.push({
        id: "region_description",
        header: "Location",
        accessorKey: "region_description",
        enableSorting: true,
        cell: ({ row }) => <span>{row.original?.locations?.[0]?.region_description || "N/A"}</span>,
      });
    }

    // Status - always show
    cols.push({
      id: "status",
      header: "Status",
      accessorKey: "status",
      enableSorting: true,
      cell: ({ row }) => (
        <div className="flex justify-right">
          <StatusBadge status={row.original?.status || "inactive"} />
        </div>
      ),
    });

    // Actions - always show
    cols.push({
      id: "actions",
      header: "",
      enableSorting: false,
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          {/* Edit Icon */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              const partyId = row.original?.party_id || row.original?.id;
              if (partyId) {
                router.push(`/dashboard/update-doctor/${partyId}?channelId=${id}`);
              }
            }}
            className="group hover:opacity-80 transition cursor-pointer"
            title="Edit Doctor"
          >
            <EditIcon />
          </button>

          {/* View Icon */}
          <Link
            href={`/dashboard/details-profile/${row.original?.party_id}`}
            className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
            title="View Details"
          >
            <EyeIcon />
          </Link>
        </div>
      ),
    });

    return cols;
  }, [fieldConfig]);

  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="w-full">
      <CenturoTable
        data={doctorsDataApi}
        columns={columns}
        loading={loading}
        error={error}
        onRetry={handleRetry}
        enablePagination={true}
        serverSidePagination={true}
        enableSorting={true}
        serverSideSorting={true}
        sorting={sorting}
        totalItems={pagination?.total || 0}
        onPaginationChange={handlePaginationChange}
        onSortChange={(newSorting) => setSorting(newSorting)}
        pageSize={paginationState.pageSize}
        PaginationComponent={TablePagination}
        emptyMessage="No doctors found"
      />
    </div>
  );
}
