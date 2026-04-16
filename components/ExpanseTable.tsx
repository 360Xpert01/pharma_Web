"use client";

import React, { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import CenturoTable from "@/components/shared/table/CeturoTable";
import TablePagination from "@/components/TablePagination";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchCrmExpenses, ExpenseClaim } from "@/store/slices/expense/expenseSlice";
import { updateExpenseStatus } from "@/store/slices/expense/expenseStatusSlice";
import { toast } from "sonner";
import { format } from "date-fns";
import { Eye } from "lucide-react";
import ExpenseDetailsModal from "./ExpenseDetailsModal";

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
  const [showModal, setShowModal] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<any>(null);

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
      header: "Date",
      accessorKey: "callDate",
      cell: ({ row }) => (
        <div className="t-label-sm">
          {row.original.callDate ? format(new Date(row.original.callDate), "dd MMM yyyy") : "N/A"}
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

        return (
          <div className="flex items-center justify-center gap-3 w-full">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedExpense({
                  id: row.original.callId,
                  totalExpense: row.original.totalExpense,
                  approvedExpense: row.original.approvedAmount,
                  rejectedExpense: row.original.rejectedAmount,
                  callExpenses: [], // Will be fetched or shown as empty if not available in row
                });
                setShowModal(true);
              }}
              className="p-2 hover:bg-gray-100 rounded-full text-blue-600 transition-colors"
              title="View Details"
            >
              <Eye size={18} />
            </button>
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

      <ExpenseDetailsModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        selectedExpenseData={selectedExpense}
        isLoading={loading}
        onSuccess={() => {
          dispatch(
            fetchCrmExpenses({
              page: currentPage,
              limit: pageSize,
              search: searchTerm,
              status: filters.status,
            })
          );
        }}
      />
    </div>
  );
}
