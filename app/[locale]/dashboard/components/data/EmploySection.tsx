"use client";

import React, { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import SalesDashboard1 from "../SalesDashboard1";
import TableHeader from "@/components/TableHeader";
import TableColumnHeader from "@/components/TableColumnHeader";
import { useAppDispatch, useAppSelector } from "@/store";
import { getAllUsers } from "@/store/slices/employee/getAllUsersSlice";
import { getAllRoles } from "@/store/slices/role/getAllRolesSlice";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  supervisor: string;
  roleBy: string;
}

export default function SalesTeamTable() {
  const dispatch = useAppDispatch();
  const { users, loading } = useAppSelector((state) => state.allUsers);
  const { roles } = useAppSelector((state) => state.allRoles);

  const [openRowId, setOpenRowId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAllRoles());
  }, [dispatch]);

  const toggleRow = (id: string) => {
    setOpenRowId((prev) => (prev === id ? null : id));
  };

  const teamMembers: TeamMember[] = users.map((user) => {
    const supervisor = users.find((u) => u.id === user.supervisorId);
    const supervisorName = supervisor ? `${supervisor.firstName} ${supervisor.lastName}` : "N/A";

    // Find role name from roleId
    const userRole = roles.find((r) => r.id === user.roleId);
    const roleName = userRole ? userRole.roleName : "N/A";

    return {
      id: user.id,
      name: `${user.firstName}${user.middleName ? " " + user.middleName : ""} ${user.lastName}`,
      email: user.email,
      phone: user.mobileNumber || "N/A",
      role: user.pulseCode,
      supervisor: supervisorName,
      roleBy: roleName,
    };
  });

  // Define columns for the table header
  const employeeColumns = [
    { label: "Employee ID", className: "w-[20%] ml-4" },
    { label: "Name", className: "w-[19%]" },
    { label: "Email", className: "w-[25%]" },
    { label: "Contact No #", className: "w-[24%]" },
    { label: "Supervisor", className: "w-[10%]" },
  ];

  return (
    <div className="mx-auto bg-(--gray-0) min-h-screen">
      <div className="bg-(--background) rounded-xl shadow-[0px_5px_10px_rgba(0,0,0,0.20)] overflow-hidden">
        <div className="overflow-x-auto">
          <TableHeader title="Sales Team" campHeading="All User's" filterT searchT exportT />

          <TableColumnHeader
            columns={employeeColumns}
            containerClassName="flex w-[80%] px-5"
            showBackground={false}
          />

          {loading ? (
            <div className="px-8 py-12 text-center text-(--gray-5)">Loading users...</div>
          ) : teamMembers.length === 0 ? (
            <div className="px-8 py-12 text-center text-(--gray-5)">No users found</div>
          ) : (
            <div>
              {teamMembers.map((member) => (
                <div key={member.id}>
                  {/* Main Row */}
                  <div className="px-3 py-3 w-[98%] flex items-center gap-6 hover:bg-(--gray-0) transition-all cursor-pointer border border-(--gray-2) mx-4 my-3 rounded-2xl">
                    <div
                      onClick={() => toggleRow(member.id)}
                      className="w-[15%] text-sm font-bold text-(--gray-9)"
                    >
                      {member.role}
                    </div>

                    <div
                      onClick={() => toggleRow(member.id)}
                      className="flex w-[15%] items-center gap-4"
                    >
                      <Image
                        src="/girlPic.svg"
                        alt={member.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div>
                        <p className="font-bold text-(--gray-9)">{member.name}</p>
                        <span className="text-xs text-(--gray-5) font-medium">{member.roleBy}</span>
                      </div>
                    </div>

                    <div
                      onClick={() => toggleRow(member.id)}
                      className="w-[20%] text-sm text-(--gray-6)"
                    >
                      {member.email}
                    </div>

                    <div onClick={() => toggleRow(member.id)} className="w-[20%]">
                      <span className="font-bold text-(--gray-9)">{member.phone}</span>
                    </div>

                    <div
                      onClick={() => toggleRow(member.id)}
                      className="w-[20%] text-sm font-bold text-(--gray-9)"
                    >
                      {member.supervisor}
                    </div>

                    <Link href="/dashboard/Employee-Profile" className="w-[10%] ml-auto">
                      <button className="flex items-center gap-1 text-sm text-(--gray-5)">
                        View Details
                        <ChevronRight className="w-6 h-6 text-(--primary)" />
                      </button>
                    </Link>
                  </div>

                  {/* Expanded Row */}
                  {openRowId === member.id && (
                    <div className="bg-(--gray-0) -mt-3 mx-4 rounded-b-2xl border-t">
                      <div className="px-6 py-8">
                        <SalesDashboard1 member={member} />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
