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
import { roleCreationSchema } from "@/validations/roleValidation";
import { FormInput } from "@/components/form";
import { Button } from "@/components/ui/button/button";

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

  // Validation errors state
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

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

  // Helper functions for validation
  const getErrorMessage = (fieldName: string) => validationErrors[fieldName] || "";
  const hasError = (fieldName: string) => !!validationErrors[fieldName];
  const clearFieldError = (fieldName: string) => {
    if (validationErrors[fieldName]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    }
  };

  const getInputClasses = (fieldName: string) => {
    const baseClasses = "w-full px-4 py-3 border rounded-xl outline-none";
    if (hasError(fieldName)) {
      return `${baseClasses} border-(--destructive) focus:ring-2 focus:ring-(--destructive) focus:border-(--destructive)`;
    }
    return `${baseClasses} border-(--gray-2) focus:ring-2 focus:ring-(--primary) focus:border-transparent`;
  };

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

    // Prepare form data for validation
    const formData = {
      roleName,
      pulseCode: generatedPrefix || "",
    };

    // Validate using Zod schema
    const validation = roleCreationSchema.safeParse(formData);

    if (!validation.success) {
      // Create an errors object mapping field names to error messages
      const errors: Record<string, string> = {};
      validation.error.errors.forEach((err) => {
        const fieldName = err.path[0] as string;
        if (!errors[fieldName]) {
          errors[fieldName] = err.message;
        }
      });

      // Set validation errors to display inline
      setValidationErrors(errors);

      // Also show the first error as a toast for immediate feedback
      const firstError = validation.error.errors[0];
      toast.error(firstError.message);
      return;
    }

    // Clear any previous validation errors
    setValidationErrors({});

    // Use validated data
    const validatedData = validation.data;

    const result = await dispatch(
      createRole({
        roleName: validatedData.roleName,
        pulseCode: validatedData.pulseCode,
      })
    );

    if (createRole.fulfilled.match(result)) {
      toast.success(message || "Role created successfully!");
      setRoleName("");
      setValidationErrors({});
      dispatch(resetGeneratePrefixState());
      router.push("/dashboard/User-Role");
    } else {
      toast.error(error || "Failed to create role");
    }
  };

  return (
    <div className="w-full mt-24 bg-(--background) rounded-3xl shadow-soft border border-(--gray-1) overflow-hidden">
      <div className="p-8 space-y-10">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-(--gray-9)">Add New Role</h1>
          <p className="text-sm text-(--gray-5) mt-2">Unlock the potential of your candidates</p>
        </div>
        {/* Pules Code and Role Name Inputs */}
        <div>
          {/* Inputs Row */}
          <div className="flex w-full items-start">
            <div className="relative w-[25%] mr-6">
              <FormInput
                label="Pulse Code"
                name="pulseCode"
                type="text"
                value={generatedPrefix || ""}
                onChange={() => {}}
                placeholder={prefixLoading ? "Generating..." : "PLS_ROLE_000001"}
                readOnly
                required
                error={prefixError || ""}
              />
            </div>
            <div className="relative w-[25%] mr-6">
              <FormInput
                label="Role Name"
                name="roleName"
                type="text"
                value={roleName}
                required
                onChange={setRoleName}
                placeholder="e.g. Sr. Sales Manager"
                error={validationErrors.roleName}
              />
            </div>
            <p className="text-xs text-(--gray-5) mt-8 w-[20%]">
              You can easily name the role you want and take on different responsibilities.
            </p>
          </div>
        </div>

        <hr className="border-(--gray-2)" />

        {/* Assign Responsibilities */}
        <div>
          <h2 className="text-2xl font-bold text-(--gray-9) mb-6">Assign Responsibilities</h2>
          <p className="text-sm text-(--gray-5) mb-8">Unlock the potential of your candidates</p>

          <div className="space-y-6">
            {/* Plan Scheduling */}
            <div className="bg-(--gray-0) rounded-2xl overflow-hidden border border-(--gray-2)">
              <button
                onClick={() => toggleSection("plan")}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-(--gray-1) transition cursor-pointer"
              >
                <div>
                  <h3 className="font-semibold text-(--gray-9)">
                    Plan Scheduling{" "}
                    <span className="text-(--gray-5)">
                      ({responsibilities.plan.length} Responsibilities)
                    </span>
                  </h3>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-(--primary) bg-(--primary-0) px-3 py-1 rounded-full">
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
                      <span className="text-(--gray-7)">{item.name}</span>
                      <input
                        type="checkbox"
                        defaultChecked={item.checked}
                        className="w-5 h-5 text-(--primary) rounded focus:ring-(--primary) accent-(--primary)"
                      />
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Channel Managements */}
            <div className="bg-(--gray-0) rounded-2xl overflow-hidden border border-(--gray-2)">
              <button
                onClick={() => toggleSection("channel")}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-(--gray-1) transition cursor-pointer"
              >
                <h3 className="font-semibold text-(--gray-9)">
                  Channel Managements{" "}
                  <span className="text-(--gray-5)">
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
                      <span className="text-(--gray-7)">{item.name}</span>
                      <input
                        type="checkbox"
                        defaultChecked={item.checked}
                        className="w-5 h-5 text-(--primary) rounded accent-(--primary)"
                      />
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Product Managements */}
            <div className="bg-(--gray-0) rounded-2xl overflow-hidden border border-(--gray-2)">
              <button
                onClick={() => toggleSection("product")}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-(--gray-1) transition cursor-pointer"
              >
                <div className="flex items-center justify-between w-full">
                  <h3 className="font-semibold text-(--gray-9)">
                    Product Managements{" "}
                    <span className="text-(--gray-5)">
                      ({responsibilities.product.length} Responsibilities)
                    </span>
                  </h3>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-(--primary) bg-(--primary-0) px-3 py-1 rounded-full">
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
                      className="flex items-center justify-between py-3 cursor-pointer hover:bg-(--background) rounded-lg px-3 -mx-3"
                    >
                      <span className="text-(--gray-7)">{item.name}</span>
                      <input
                        type="checkbox"
                        defaultChecked={item.checked}
                        className="w-5 h-5 text-(--primary) rounded focus:ring-(--primary) accent-(--primary)"
                      />
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Team Management */}
            <div className="bg-(--gray-0) rounded-2xl overflow-hidden border border-(--gray-2)">
              <button
                onClick={() => toggleSection("team")}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-(--gray-1) transition cursor-pointer"
              >
                <h3 className="font-semibold text-(--gray-9)">
                  Team Management{" "}
                  <span className="text-(--gray-5)">
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
                      <span className="text-(--gray-7)">{item.name}</span>
                      <input
                        type="checkbox"
                        defaultChecked={item.checked}
                        className="w-5 h-5 text-(--primary) rounded accent-(--primary)"
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
          <Button variant="outline" size="lg" rounded="full">
            Discard
          </Button>
          <Button
            variant="primary"
            size="lg"
            icon={Plus}
            rounded="full"
            onClick={handleSubmit}
            loading={loading || prefixLoading}
          >
            {loading ? "Creating..." : "Add Role"}
          </Button>
        </div>
      </div>
    </div>
  );
}
