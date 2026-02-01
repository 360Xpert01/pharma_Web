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

  const handlePaginationChange = (page: number, pageSize: number) => {
    setPaginationState({ pageIndex: page - 1, pageSize });
  };

  React.useEffect(() => {
    dispatch(
      getPartiesByChannelType({
        channelTypeId: id,
        page: paginationState.pageIndex + 1,
        limit: paginationState.pageSize,
        search: searchTerm,
        segmentId: filters?.segmentId,
        specializationId: filters?.specializationId,
        status: filters?.status,
      })
    );
  }, [dispatch, id, paginationState.pageIndex, paginationState.pageSize, searchTerm, filters]);

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
      header: "ID",
      accessorKey: "id",
      cell: ({ row }) => <span>{row.original?.id || "N/A"}</span>,
    });

    // PMDC Number - conditional
    if (fieldConfig.pmdcNumber) {
      cols.push({
        header: "PMDC Number",
        accessorKey: "pmdcNumber",
        cell: ({ row }) => (
          <span>{row.original?.attributes?.pmdcNumber || row.original?.pmdcNumber || "N/A"}</span>
        ),
      });
    }

    // Name - conditional
    if (fieldConfig.name) {
      cols.push({
        header: "Name",
        accessorKey: "name",
        cell: ({ row }) => <span>{row.original?.party_name || "N/A"}</span>,
      });
    }

    // Specialization - conditional
    if (fieldConfig.specialty) {
      cols.push({
        header: "Specialization",
        accessorKey: "specialty",
        cell: ({ row }) => (
          <span className="text-[var(--muted-foreground)]">
            {row.original?.attributes?.specialization || row.original?.specialization || "N/A"}
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
        header: "Segment",
        accessorKey: "segment_name",
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
        header: "Phone No",
        accessorKey: "phone",
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
        header: "Parent",
        accessorKey: "parent",
        cell: ({ row }) => <span>{row.original?.parent || "N/A"}</span>,
      });
    }

    // Location - conditional (mapped to locations in config)
    if (fieldConfig.locations) {
      cols.push({
        header: "Location",
        accessorKey: "city",
        cell: ({ row }) => <span>{row.original?.locations?.[0]?.city || "N/A"}</span>,
      });
    }

    // Status - always show
    cols.push({
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => (
        <div className="flex justify-center">
          <StatusBadge status={row.original?.status} />
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
              router.push(`/dashboard/update-doctor/${row.original?.party_id}?channelId=${id}`);
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
        totalItems={pagination?.total || 0}
        onPaginationChange={handlePaginationChange}
        pageSize={paginationState.pageSize}
        PaginationComponent={TablePagination}
        emptyMessage="No doctors found"
      />
    </div>
  );
}
