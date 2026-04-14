"use client";

import React, { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import CenturoTable from "@/components/shared/table/CeturoTable";
import TablePagination from "@/components/TablePagination";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchCrmExpenses, ExpenseClaim } from "@/store/slices/expense/expenseSlice";
import { updateExpenseStatus } from "@/store/slices/expense/expenseStatusSlice";
import { toast } from "sonner";

const DEFAULT_AVATAR = "/girlPic.png";

interface ExpanseTableProps {
  searchTerm?: string;
  filters?: {
    status?: string;
  };
}

export default function ExpenseApprovalTable({ searchTerm = "", filters = {} }: ExpanseTableProps) {
  const dispatch = useAppDispatch();
  const { data, pagination, loading, statusUpdating, error } = useAppSelector(
    (state) => state.expense
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [activeId, setActiveId] = useState<{ id: string; action: "approved" | "rejected" } | null>(
    null
  );

  useEffect(() => {
    dispatch(
      fetchCrmExpenses({
        page: currentPage,
        limit: pageSize,
        search: searchTerm,
        status: filters.status,
      })
    );
  }, [dispatch, currentPage, pageSize, searchTerm, filters.status]);

  const handlePaginationChange = (page: number, size: number) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  const handleRetry = () => {
    dispatch(
      fetchCrmExpenses({
        page: currentPage,
        limit: pageSize,
        search: searchTerm,
        status: filters.status,
      })
    );
  };

  const handleStatusUpdate = async (callId: string, status: "approved" | "rejected") => {
    setActiveId({ id: callId, action: status });
    try {
      await dispatch(updateExpenseStatus({ callId, status })).unwrap();
      toast.success(`Expense ${status} successfully`);
      // Re-fetch with current state to ensure data integrity
      dispatch(
        fetchCrmExpenses({
          page: currentPage,
          limit: pageSize,
          search: searchTerm,
          status: filters.status,
        })
      );
    } catch (err: any) {
      toast.error(err || `Failed to ${status} expense`);
    } finally {
      setActiveId(null);
    }
  };

  const columns: ColumnDef<ExpenseClaim>[] = [
    {
      header: "Employee",
      accessorKey: "salesRepName",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <img
            src={row.original.salesRepImage || DEFAULT_AVATAR}
            alt={row.original.salesRepName}
            className="w-10 h-10 rounded-8 object-cover border-2 border-(--light) shadow-soft flex-shrink-0"
          />
          <div className="truncate">
            <div className="t-td-b truncate">{row.original.salesRepName}</div>
            <div className="t-cap truncate">Sales Representative</div>
          </div>
        </div>
      ),
    },
    {
      header: "Doctor / Party",
      accessorKey: "partyName",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <img
            src={row.original.partyImage || DEFAULT_AVATAR}
            alt={row.original.partyName || "Unknown"}
            className="w-10 h-10 rounded-8 object-cover border-2 border-(--light) shadow-soft flex-shrink-0"
          />
          <div className="truncate">
            <div className="t-td-b truncate">{row.original.partyName || "N/A"}</div>
            <div className="t-cap truncate">{row.original.partySpecialization || "N/A"}</div>
          </div>
        </div>
      ),
    },
    {
      header: "Total Expense",
      accessorKey: "totalExpense",
      cell: ({ row }) => (
        <div className="flex items-center gap-2 justify-start w-full">
          <div className="t-val-sm t-warn">
            {row.original.totalExpense.toLocaleString()}
            <span className="t-sm t-warn pl-1 font-normal opacity-70 uppercase">PKR</span>
          </div>
        </div>
      ),
    },
    {
      header: "Approved",
      accessorKey: "approvedAmount",
      cell: ({ row }) => (
        <div className="flex items-center gap-2 justify-start w-full">
          <div className="t-val-sm t-ok">
            {row.original.approvedAmount.toLocaleString()}
            <span className="t-sm t-ok pl-1 font-normal opacity-70 uppercase">PKR</span>
          </div>
        </div>
      ),
    },
    {
      header: "Rejected",
      accessorKey: "rejectedAmount",
      cell: ({ row }) => (
        <div className="flex items-center gap-2 justify-start w-full">
          <div className="t-val-sm t-err">
            {row.original.rejectedAmount.toLocaleString()}
            <span className="t-sm t-err pl-1 font-normal opacity-70 uppercase">PKR</span>
          </div>
        </div>
      ),
    },
    {
      id: "actions",
      header: () => <div className="text-center w-full">Actions</div>,
      enableSorting: false,
      cell: ({ row }) => {
        const { status } = row.original;
        const isUpdatingRow = statusUpdating && activeId?.id === row.original.callId;
        const isUpdatingApprove = isUpdatingRow && activeId?.action === "approved";
        const isUpdatingReject = isUpdatingRow && activeId?.action === "rejected";

        if (status?.toLowerCase() === "pending") {
          return (
            <div className="flex gap-3 justify-center w-full">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleStatusUpdate(row.original.callId, "approved");
                }}
                className="px-6 py-1.5 bg-(--primary) text-(--light) font-semibold rounded-8 hover:bg-(--primary-2) active:scale-95 transition-all shadow-soft disabled:opacity-50 disabled:grayscale-[0.3] disabled:cursor-not-allowed min-w-[100px] flex items-center justify-center text-sm"
                disabled={loading || statusUpdating}
              >
                {isUpdatingApprove ? (
                  <div className="w-5 h-5 border-2 border-(--light)/30 border-t-(--light) rounded-full animate-spin" />
                ) : (
                  "Approve"
                )}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleStatusUpdate(row.original.callId, "rejected");
                }}
                className="px-6 py-1.5 bg-[var(--background)] text-(--destructive) font-semibold rounded-8 border border-(--destructive) hover:bg-(--destructive-0) active:scale-95 transition-all shadow-soft disabled:opacity-50 disabled:grayscale-[0.3] disabled:cursor-not-allowed min-w-[100px] flex items-center justify-center text-sm"
                disabled={loading || statusUpdating}
              >
                {isUpdatingReject ? (
                  <div className="w-5 h-5 border-2 border-(--destructive)/30 border-t-(--destructive) rounded-full animate-spin" />
                ) : (
                  "Reject"
                )}
              </button>
            </div>
          );
        }

        return (
          <div className="flex justify-center w-full">
            <span
              className={`px-4 py-1.5 rounded-8 text-[10px] font-bold uppercase tracking-widest border shadow-sm ${
                status?.toLowerCase() === "approved"
                  ? "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800"
                  : "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800"
              }`}
            >
              {status}
            </span>
          </div>
        );
      },
    },
  ];

  return (
    <div className="w-full bg-(--gray-0)/50 p-4">
      <CenturoTable
        data={data}
        columns={columns}
        loading={loading}
        error={error}
        onRetry={handleRetry}
        enablePagination={true}
        serverSidePagination={true}
        pageSize={pageSize}
        totalItems={pagination.totalCount}
        onPaginationChange={handlePaginationChange}
        PaginationComponent={TablePagination}
        emptyMessage="No expense data found"
      />
    </div>
  );
}
