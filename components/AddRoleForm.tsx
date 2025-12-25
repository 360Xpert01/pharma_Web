"use client";

import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/index";
import { createRole, resetRoleState } from "@/store/slices/role/addRole";
import { getAllRoles } from "@/store/slices/role/getAllRolesSlice";
import {
  generatePrefix,
  resetGeneratePrefixState,
} from "@/store/slices/preFix/generatePrefixSlice";
import toast from "react-hot-toast";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Responsibility {
  id: string;
  name: string;
  checked: boolean;
}

export default function AddNewRoleForm() {
  const [roleName, setRoleName] = useState("");
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
    plan: true,
    channel: true,
    product: true,
    team: true,
  });

  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, success, error, message } = useAppSelector((state) => state.addRole);
  const {
    generatedPrefix,
    loading: prefixLoading,
    error: prefixError,
  } = useAppSelector((state) => state.generatePrefix);

  useEffect(() => {
    // 🔥 Always call generate for "Role" entity
    // Role forms create roles (business logic, not dynamic)
    // The /generate API is idempotent - handles existence automatically
    dispatch(generatePrefix({ entity: "Role" }));

    return () => {
      dispatch(resetGeneratePrefixState());
    };
  }, [dispatch]);

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const responsibilities: Record<string, Responsibility[]> = {
    plan: [
      { id: "p1", name: "Create Campaign Plan", checked: true },
      { id: "p2", name: "Approve Budget Allocation", checked: false },
      { id: "p3", name: "Review Campaign Performance", checked: true },
    ],
    channel: [
      { id: "c1", name: "Manage Social Media Channels", checked: true },
      { id: "c2", name: "Publish Content Calendar", checked: true },
      { id: "c3", name: "Respond to Customer Queries", checked: false },
      { id: "c4", name: "Run Paid Ads", checked: true },
      { id: "c5", name: "Analyze Channel Analytics", checked: false },
      { id: "c6", name: "Collaborate with Influencers", checked: true },
    ],
    product: [
      { id: "pr1", name: "View Sample Products", checked: true },
      { id: "pr2", name: "Add/Edit/Delete Sample Product View", checked: false },
      { id: "pr3", name: "Export Product Data", checked: false },
      { id: "pr4", name: "View All Giveaway", checked: true },
      { id: "pr5", name: "Add/Edit/Delete Giveaway", checked: false },
      { id: "pr6", name: "Export Giveaway Data", checked: false },
    ],
    team: [
      { id: "t1", name: "Add New Team Member", checked: true },
      { id: "t2", name: "Assign Tasks", checked: true },
      { id: "t3", name: "Approve Leave Requests", checked: false },
      { id: "t4", name: "View Team Performance", checked: true },
    ],
  };

  const getSelectedCount = (section: string) => {
    return responsibilities[section].filter((r) => r.checked).length;
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!roleName.trim()) {
      toast.error("Role name is required");
      return;
    }

    if (!generatedPrefix) {
      toast.error("Pulse code is not generated yet. Please wait.");
      return;
    }

    const result = await dispatch(
      createRole({
        roleName: roleName.trim(),
        pulseCode: generatedPrefix,
      })
    );

    if (createRole.fulfilled.match(result)) {
      toast.success(message || "Role created successfully!");
      setRoleName("");
      dispatch(resetGeneratePrefixState());
      router.push("/dashboard/User-Role");
    } else {
      toast.error(error || "Failed to create role");
    }
  };

  return (
    <div className="w-full mt-24 bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
      <div className="p-8 space-y-10">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Add New Role</h1>
          <p className="text-sm text-gray-500 mt-2">Unlock the potential of your candidates</p>
        </div>
        {/* Pules Code and Role Name Inputs */}
        <div>
          {/* Labels Row */}
          <div className="flex w-full mb-2">
            <label className="block text-sm font-medium text-gray-700 w-[25%] mr-6">
              Pules Code
            </label>
            <label className="block text-sm font-medium text-gray-700 w-[25%] mr-6">
              Role Name
            </label>
          </div>

          {/* Inputs Row */}
          <div className="flex w-full items-start">
            <div className="relative w-[25%] mr-6">
              <input
                type="text"
                value={generatedPrefix || ""}
                placeholder={prefixLoading ? "Generating..." : "PLS_ROLE_000001"}
                readOnly
                className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-700 cursor-not-allowed outline-none"
                title={prefixError || "Auto-generated pulse code (read-only)"}
              />
            </div>
            <div className="relative w-[25%] mr-6">
              <input
                type="text"
                value={roleName}
                onChange={(e) => setRoleName(e.target.value)}
                placeholder="e.g. Sr. Sales Manager"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            <p className="text-xs text-gray-500 mt-2 w-[20%]">
              You can easily name the role you want and take on different responsibilities.
            </p>
          </div>
        </div>

        <hr className="border-gray-200" />

        {/* Assign Responsibilities */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Assign Responsibilities</h2>
          <p className="text-sm text-gray-500 mb-8">Unlock the potential of your candidates</p>

          <div className="space-y-6">
            {/* Plan Scheduling */}
            <div className="bg-gray-50/50 rounded-2xl overflow-hidden border border-gray-200">
              <button
                onClick={() => toggleSection("plan")}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-100 transition"
              >
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Plan Scheduling{" "}
                    <span className="text-gray-500">
                      ({responsibilities.plan.length} Responsibilities)
                    </span>
                  </h3>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    {getSelectedCount("plan")} Selected
                  </span>
                  {expandedSections.plan ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </div>
              </button>
              {expandedSections.plan && (
                <div className="px-6 pb-4 space-y-4">
                  {responsibilities.plan.map((item) => (
                    <label
                      key={item.id}
                      className="flex items-center justify-between py-3 cursor-pointer"
                    >
                      <span className="text-gray-700">{item.name}</span>
                      <input
                        type="checkbox"
                        defaultChecked={item.checked}
                        className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                      />
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Channel Managements */}
            <div className="bg-gray-50/50 rounded-2xl overflow-hidden border border-gray-200">
              <button
                onClick={() => toggleSection("channel")}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-100 transition"
              >
                <h3 className="font-semibold text-gray-900">
                  Channel Managements{" "}
                  <span className="text-gray-500">
                    ({responsibilities.channel.length} Responsibilities)
                  </span>
                </h3>
                {expandedSections.channel ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>
              {expandedSections.channel && (
                <div className="px-6 pb-4 space-y-4">
                  {responsibilities.channel.map((item) => (
                    <label
                      key={item.id}
                      className="flex items-center justify-between py-3 cursor-pointer"
                    >
                      <span className="text-gray-700">{item.name}</span>
                      <input
                        type="checkbox"
                        defaultChecked={item.checked}
                        className="w-5 h-5 text-blue-600 rounded"
                      />
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Product Managements */}
            <div className="bg-gray-50/50 rounded-2xl overflow-hidden border border-gray-200">
              <button
                onClick={() => toggleSection("product")}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-100 transition"
              >
                <div className="flex items-center justify-between w-full">
                  <h3 className="font-semibold text-gray-900">
                    Product Managements{" "}
                    <span className="text-gray-500">
                      ({responsibilities.product.length} Responsibilities)
                    </span>
                  </h3>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                      {getSelectedCount("product")} Selected
                    </span>
                    {expandedSections.product ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </div>
                </div>
              </button>
              {expandedSections.product && (
                <div className="px-6 pb-4 space-y-4">
                  {responsibilities.product.map((item) => (
                    <label
                      key={item.id}
                      className="flex items-center justify-between py-3 cursor-pointer hover:bg-white rounded-lg px-3 -mx-3"
                    >
                      <span className="text-gray-700">{item.name}</span>
                      <input
                        type="checkbox"
                        defaultChecked={item.checked}
                        className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                      />
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Team Management */}
            <div className="bg-gray-50/50 rounded-2xl overflow-hidden border border-gray-200">
              <button
                onClick={() => toggleSection("team")}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-100 transition"
              >
                <h3 className="font-semibold text-gray-900">
                  Team Management{" "}
                  <span className="text-gray-500">
                    ({responsibilities.team.length} Responsibilities)
                  </span>
                </h3>
                {expandedSections.team ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>
              {expandedSections.team && (
                <div className="px-6 pb-4 space-y-4">
                  {responsibilities.team.map((item) => (
                    <label
                      key={item.id}
                      className="flex items-center justify-between py-3 cursor-pointer"
                    >
                      <span className="text-gray-700">{item.name}</span>
                      <input
                        type="checkbox"
                        defaultChecked={item.checked}
                        className="w-5 h-5 text-blue-600 rounded"
                      />
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end gap-4 pt-8">
          <button
            type="button"
            className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-full hover:bg-gray-50 transition"
          >
            Discard
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading || prefixLoading}
            className={`px-8 py-3 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition flex items-center gap-2 shadow-lg ${
              loading || prefixLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <Plus className="w-5 h-5" />
            {loading ? "Creating..." : "Add Role"}
          </button>
        </div>
      </div>
    </div>
  );
}
