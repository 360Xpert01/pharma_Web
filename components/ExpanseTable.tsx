"use client";

import React, { useState } from "react";
import TableLoadingState from "@/components/shared/table/TableLoadingState";
import TableErrorState from "@/components/shared/table/TableErrorState";
import TableEmptyState from "@/components/shared/table/TableEmptyState";
import TablePagination from "@/components/TablePagination";

interface ExpenseRow {
  id: string;
  employee1: { name: string; role: string; avatar?: string };
  employee2: { name: string; role: string; avatar?: string };
  totalExpense: number;
  approved: number;
  rejected: number;
}

const expenseData: ExpenseRow[] = [
  {
    id: "1",
    employee1: { name: "Sarah Johnson", role: "Marketing Specialist" },
    employee2: { name: "Dr. Herbert R.", role: "Heart Specialist" },
    totalExpense: 2550,
    approved: 1500,
    rejected: 150,
  },
  {
    id: "2",
    employee1: { name: "Michael Smith", role: "Software Engineer" },
    employee2: { name: "Dr. Emily T.", role: "Neurosurgeon" },
    totalExpense: 3000,
    approved: 2000,
    rejected: 100,
  },
  {
    id: "3",
    employee1: { name: "Jessica Williams", role: "Product Designer" },
    employee2: { name: "Dr. Kevin L.", role: "Orthopedic Surgeon" },
    totalExpense: 4000,
    approved: 2500,
    rejected: 150,
  },
  {
    id: "4",
    employee1: { name: "David Brown", role: "Data Analyst" },
    employee2: { name: "Dr. Laura P.", role: "Pediatrician" },
    totalExpense: 3550,
    approved: 2000,
    rejected: 150,
  },
  {
    id: "5",
    employee1: { name: "Linda Garcia", role: "UX Researcher" },
    employee2: { name: "Dr. Alex Q.", role: "Dermatologist" },
    totalExpense: 4450,
    approved: 3000,
    rejected: 150,
  },
  {
    id: "6",
    employee1: { name: "James Miller", role: "Web Developer" },
    employee2: { name: "Dr. Nancy S.", role: "Cardiologist" },
    totalExpense: 5000,
    approved: 3500,
    rejected: 150,
  },
  {
    id: "7",
    employee1: { name: "Patricia Martinez", role: "Content Writer" },
    employee2: { name: "Dr. Mark T.", role: "Oncologist" },
    totalExpense: 3320,
    approved: 1700,
    rejected: 150,
  },
  {
    id: "8",
    employee1: { name: "Robert Davis", role: "Sales Executive" },
    employee2: { name: "Dr. Susan W.", role: "Gynecologist" },
    totalExpense: 4420,
    approved: 2700,
    rejected: 150,
  },
  {
    id: "9",
    employee1: { name: "Jennifer Lee", role: "Graphic Designer" },
    employee2: { name: "Dr. William H.", role: "Urologist" },
    totalExpense: 3770,
    approved: 2200,
    rejected: 150,
  },
];

const DEFAULT_AVATAR = "/girlPic.svg";

export default function ExpenseApprovalTable() {
  // Simulate loading and error states (replace with actual API call state)
  const [loading] = useState(false);
  const [error] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const handleRetry = () => {
    // Add retry logic here when connected to API
    window.location.reload();
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  // Calculate paginated data
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedExpenses = expenseData.slice(startIndex, endIndex);

  return (
    <div className="w-full bg-(--gray-0)/50">
      {loading ? (
        <div className="p-4">
          <TableLoadingState
            variant="skeleton"
            rows={5}
            columns={5}
            message="Loading expenses..."
          />
        </div>
      ) : error ? (
        <TableErrorState error={error} onRetry={handleRetry} title="Failed to load expenses" />
      ) : expenseData.length === 0 ? (
        <TableEmptyState
          message="No expense data found"
          description="There are currently no expense records to display."
        />
      ) : (
        <div className="space-y-1 p-4 ">
          {paginatedExpenses.map((row) => (
            <div
              key={row.id}
              className="bg-[var(--background)] rounded-8 border border-(--gray-2) "
            >
              <div className="px-3 py-3">
                <div className="flex items-center justify-between gap-6 text-sm">
                  {/* Employee 1 */}
                  <div className="flex w-40 items-center gap-3 ">
                    <img
                      src={row.employee1.avatar || DEFAULT_AVATAR}
                      alt={row.employee1.name}
                      className="w-12 h-12 rounded-8 object-cover border-2 border-(--light) shadow-soft"
                    />
                    <div className="truncate">
                      <div className="font-bold text-(--gray-9) truncate">{row.employee1.name}</div>
                      <div className="text-xs text-(--gray-5) truncate">{row.employee1.role}</div>
                    </div>
                  </div>

                  {/* Employee 2 */}
                  <div className="flex items-center gap-3 ">
                    <img
                      src={row.employee2.avatar || DEFAULT_AVATAR}
                      alt={row.employee2.name}
                      className="w-12 h-12 rounded-8 object-cover border-2 border-(--light) shadow-soft"
                    />
                    <div className="truncate">
                      <div className="font-bold text-(--gray-9) truncate">{row.employee2.name}</div>
                      <div className="text-xs text-(--gray-5) truncate">{row.employee2.role}</div>
                    </div>
                  </div>

                  {/* Total Expense */}
                  <div className="text-center">
                    <div className="text-xs text-(--gray-5)">Total Expense</div>
                    <div className="font-bold text-(--warning-2) text-lg">
                      {row.totalExpense.toLocaleString()}
                      <span className="font-bold text-(--warning-2) pl-1 text-sm">PKR</span>
                    </div>
                  </div>

                  {/* Approved */}
                  <div className="text-center">
                    <div className="text-xs text-(--gray-5)">Approved</div>
                    <div className="font-bold text-(--success) text-lg">
                      {row.approved.toLocaleString()}
                      <span className="font-bold text-(--success) pl-1 text-sm">PKR</span>
                    </div>
                  </div>

                  {/* Rejected */}
                  <div className="text-center">
                    <div className="text-xs text-(--gray-5)">Rejected</div>
                    <div className="font-bold text-(--destructive) text-lg">
                      {row.rejected.toLocaleString()}
                      <span className="font-bold text-(--destructive) pl-1 text-sm">PKR</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button className="px-6 py-1 bg-(--primary) text-(--light) font-medium rounded-8 hover:bg-(--primary-2) transition shadow-soft">
                      Approve
                    </button>
                    <button className="px-6 py-1 bg-[var(--background)] text-(--destructive) font-medium rounded-8 border border-(--destructive) hover:bg-(--destructive-0) transition shadow-soft">
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Pagination */}
          {expenseData.length > 0 && (
            <TablePagination
              currentPage={currentPage}
              totalItems={expenseData.length}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
              onItemsPerPageChange={handleItemsPerPageChange}
              pageSizeOptions={[10, 20, 30, 50]}
              showPageInfo={true}
              showItemsPerPageSelector={true}
            />
          )}
        </div>
      )}
    </div>
  );
}
