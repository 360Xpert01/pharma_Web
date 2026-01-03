"use client";

import React, { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import SalesDashboard1 from "../SalesDashboard1";
import TableColumnHeader from "@/components/TableColumnHeader";
import TableLoadingState from "@/components/shared/table/TableLoadingState";
import TableErrorState from "@/components/shared/table/TableErrorState";
import TableEmptyState from "@/components/shared/table/TableEmptyState";
import TablePagination from "@/components/TablePagination";
import { useAppDispatch, useAppSelector } from "@/store";
import { getAllUsers } from "@/store/slices/employee/getAllUsersSlice";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  supervisor: string;
  roleBy: string;
  profilePicture: string;
}

export default function SalesTeamTable() {
  const dispatch = useAppDispatch();
  const { users, loading, error } = useAppSelector((state) => state.allUsers);

  const [openRowId, setOpenRowId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const toggleRow = (id: string) => {
    setOpenRowId((prev) => (prev === id ? null : id));
  };

  const teamMembers: TeamMember[] = users.map((user) => {
    const supervisor = users.find((u) => u.id === user.supervisorId);
    const supervisorName = supervisor ? `${supervisor.firstName} ${supervisor.lastName}` : "N/A";

    const roleName = user.role?.roleName || "N/A";
    const profileImage = user.profilePicture || "/girlPic.svg";

    return {
      id: user.id,
      name: `${user.firstName}${user.middleName ? " " + user.middleName : ""} ${user.lastName}`,
      email: user.email,
      phone: user.mobileNumber || "N/A",
      role: user.pulseCode,
      supervisor: supervisorName,
      roleBy: roleName,
      profilePicture: profileImage,
    };
  });

  const employeeColumns = [
    { label: "Employee ID", className: "w-[20%] ml-2" },
    { label: "Name", className: "w-[19%]" },
    { label: "Email", className: "w-[25%]" },
    { label: "Contact No #", className: "w-[24%]" },
    { label: "Supervisor", className: "w-[10%]" },
  ];

  const handleRetry = () => {
    dispatch(getAllUsers());
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
  const paginatedMembers = teamMembers.slice(startIndex, endIndex);

  return (
    <div>
      {loading ? (
        <div className="px-4">
          <TableLoadingState
            variant="skeleton"
            rows={5}
            columns={5}
            message="Loading employees..."
          />
        </div>
      ) : error ? (
        <TableErrorState error={error} onRetry={handleRetry} title="Failed to load employees" />
      ) : teamMembers.length === 0 ? (
        <TableEmptyState
          message="No employees found"
          description="There are currently no employees in the system."
        />
      ) : (
        <div>
          <TableColumnHeader
            columns={employeeColumns}
            containerClassName="flex w-[80%]"
            showBackground={false}
          />

          {paginatedMembers.map((member) => (
            <div key={member.id}>
              {/* Main Row */}
              <div className="px-3 py-3 w-[98%] flex items-center gap-6 hover:bg-(--gray-0) transition-all cursor-pointer border border-(--gray-2) mx-4 my-3 rounded-8 bg-[var(--background)]">
                <div
                  onClick={() => toggleRow(member.id)}
                  className="w-[15%] t-td-b truncate"
                  title={member.role}
                >
                  {member.role}
                </div>

                <div
                  onClick={() => toggleRow(member.id)}
                  className="flex w-[15%] items-center gap-4 min-w-0"
                >
                  <Image
                    src={member.profilePicture}
                    alt={member.name}
                    width={40}
                    height={40}
                    className="rounded-8 flex-shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="t-td-b truncate" title={member.name}>
                      {member.name}
                    </p>
                    <span className="t-cap truncate block" title={member.roleBy}>
                      {member.roleBy}
                    </span>
                  </div>
                </div>

                <div
                  onClick={() => toggleRow(member.id)}
                  className="w-[20%] t-td truncate"
                  title={member.email}
                >
                  {member.email}
                </div>

                <div
                  onClick={() => toggleRow(member.id)}
                  className="w-[20%] truncate"
                  title={member.phone}
                >
                  <span className="t-td-b">{member.phone}</span>
                </div>

                <div
                  onClick={() => toggleRow(member.id)}
                  className="w-[20%] t-td-b truncate"
                  title={member.supervisor}
                >
                  {member.supervisor}
                </div>

                <Link
                  href="/dashboard/Employee-Profile"
                  className="w-[10%] ml-auto cursor-pointer flex-shrink-0"
                >
                  <button className="flex items-center cursor-pointer gap-1 t-sm whitespace-nowrap">
                    View Details
                    <ChevronRight className="w-6 h-6 text-(--primary)" />
                  </button>
                </Link>
              </div>

              {/* Expanded Row */}
              {openRowId === member.id && (
                <div className="bg-[var(--background)] -mt-3 mx-4 rounded-b-2xl border-t">
                  <div className="">
                    <SalesDashboard1 />
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Pagination */}
          {teamMembers.length > 0 && (
            <TablePagination
              currentPage={currentPage}
              totalItems={teamMembers.length}
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
