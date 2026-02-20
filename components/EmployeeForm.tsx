"use client";

import React, { useState, useEffect } from "react";
import { Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button/button";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  generatePrefix,
  resetGeneratePrefixState,
} from "@/store/slices/preFix/generatePrefixSlice";
import { getAllRoles } from "@/store/slices/role/getAllRolesSlice";
import { registerEmployee, resetEmployeeState } from "@/store/slices/employee/registerEmployee";
import {
  updateEmployee,
  resetUpdateEmployeeState,
} from "@/store/slices/employee/updateEmployeeSlice";
import { getUserById, resetGetUserByIdState } from "@/store/slices/employee/getUserByIdSlice";
import { getAllUsers } from "@/store/slices/employee/getAllUsersSlice";
import { uploadImageAction, resetUploadState } from "@/store/slices/upload/uploadSlice";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { employeeRegistrationSchema } from "@/validations";
import { ProfileImageUpload, FormInput, FormSelect, StatusToggle } from "@/components/form";
import { getTeamAll } from "@/store/slices/team/getTeamAllSlice";
import {
  getAllTerritories,
  resetTerritoriesState,
} from "@/store/slices/territory/getAllTerritoriesSlice";

interface EmployeeFormProps {
  mode: "add" | "update";
  userId?: string; // Required for update mode
}

export default function EmployeeForm({ mode, userId }: EmployeeFormProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isUpdateMode = mode === "update";

  // Redux selectors
  const {
    generatedPrefix,
    loading: prefixLoading,
    error: prefixError,
  } = useAppSelector((state) => state.generatePrefix);
  const { roles, loading: rolesLoading } = useAppSelector((state) => state.allRoles);
  const { users, loading: usersLoading } = useAppSelector((state) => state.allUsers);
  const { territories, loading: territoriesLoading } = useAppSelector(
    (state) => state.allTerritories
  );
  const { teams, loading: teamsLoading } = useAppSelector((state) => state.teamAll);
  const {
    loading: registerLoading,
    success: registerSuccess,
    error: registerError,
    message: registerMessage,
  } = useAppSelector((state) => state.registerEmployee);
  const {
    loading: updateLoading,
    success: updateSuccess,
    error: updateError,
    message: updateMessage,
  } = useAppSelector((state) => state.updateEmployee);
  const {
    user: employeeData,
    loading: fetchingUser,
    error: fetchError,
  } = useAppSelector((state) => state.getUserById);

  // Cloudinary/upload state
  const {
    loading: uploadLoading,
    success: uploadSuccess,
    error: uploadError,
    uploadedFiles,
  } = useAppSelector((state) => state.upload);

  // Form States
  const [status, setStatus] = useState<"Active" | "Inactive">("Active");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dob, setDob] = useState("");
  const [joiningDate, setJoiningDate] = useState("");
  const [fullAddress, setFullAddress] = useState("");
  const [legacyCode, setLegacyCode] = useState("");
  const [pulseCode, setPulseCode] = useState("");
  const [selectedRoleId, setSelectedRoleId] = useState("");
  const [selectedSupervisorId, setSelectedSupervisorId] = useState("");
  const [selectedTeamId, setSelectedTeamId] = useState("");
  const [selectedTerritoryId, setSelectedTerritoryId] = useState("");
  const [enableMobileAccess, setEnableMobileAccess] = useState<"Enable" | "Disable">("Disable");
  const [mobileView, setMobileView] = useState<"Sales Rep" | "Area Manager">("Sales Rep");

  // Validation errors state
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // Initial data loading
  useEffect(() => {
    if (isUpdateMode && userId) {
      // Update mode: Fetch existing user data
      dispatch(getUserById(userId));
    } else if (!isUpdateMode) {
      // Add mode: Generate prefix
      dispatch(generatePrefix({ entity: "User" }));
    }

    // Fetch roles, users, teams, and territories for dropdowns
    dispatch(getAllRoles());
    dispatch(getAllUsers({ limit: 10000 })); // Fetch more users to increase chances of finding supervisors
    dispatch(getTeamAll());
    dispatch(getAllTerritories({ notassigned: true })); // Fetch unassigned territories without pagination

    return () => {
      if (isUpdateMode) {
        dispatch(resetGetUserByIdState());
        dispatch(resetUpdateEmployeeState());
      } else {
        dispatch(resetGeneratePrefixState());
        dispatch(resetEmployeeState());
      }
      dispatch(resetUploadState());
      dispatch(resetTerritoriesState());
    };
  }, [dispatch, isUpdateMode, userId]);

  // Image upload effect
  useEffect(() => {
    if (uploadSuccess && uploadedFiles.length > 0) {
      setImagePreview(uploadedFiles[0].url);
      toast.success("Image uploaded successfully!");
    }
    if (uploadError) {
      console.error("EmployeeForm: Upload error", uploadError);
      toast.error(uploadError);
    }
  }, [uploadSuccess, uploadedFiles, uploadError]);

  const handleImageChange = async (file: File | null) => {
    if (file) {
      dispatch(uploadImageAction(file));
    } else {
      setImagePreview(null);
      dispatch(resetUploadState());
    }
  };

  // Populate form with fetched employee data (Update mode only)
  useEffect(() => {
    if (isUpdateMode && employeeData) {
      const fullName = [employeeData.firstName, employeeData.middleName, employeeData.lastName]
        .filter(Boolean)
        .join(" ");
      setName(fullName || "");
      setEmail(employeeData.email || "");
      setPhoneNumber(employeeData.mobileNumber || "");
      setDob(
        (employeeData.dateOfBirth
          ? employeeData.dateOfBirth.split("T")[0]
          : employeeData.dob?.split("T")[0]) || ""
      );
      setFullAddress(employeeData.fullAddress || "");
      setLegacyCode(employeeData.empLegacyCode || "");
      setPulseCode(employeeData.pulseCode || "");
      setSelectedRoleId(employeeData.roleId || employeeData.role?.id || "");

      // Mapping Line Manager (Supervisor)
      setSelectedSupervisorId(employeeData.supervisorId || employeeData.supervisor?.id || "");

      // Mapping Team (Pick the first team if teamId is missing)
      const teamId =
        employeeData.teamId ||
        (employeeData.teams && employeeData.teams.length > 0 ? employeeData.teams[0].id : "");
      setSelectedTeamId(teamId || "");

      // Mapping Territory (Brick)
      const territoryId =
        employeeData.territoryId || employeeData.brickId || employeeData.territory?.id || "";
      setSelectedTerritoryId(territoryId || "");

      setJoiningDate(
        (employeeData.joiningDate ? employeeData.joiningDate.split("T")[0] : "") || ""
      );
      setEnableMobileAccess(employeeData.enableMobileAccess ? "Enable" : "Disable");
      setMobileView((employeeData.mobileView as "Sales Rep" | "Area Manager") || "Sales Rep");
      setImagePreview(employeeData.profilePicture || null);
      setStatus(employeeData.status === "Inactive" ? "Inactive" : "Active");
    }
  }, [employeeData, isUpdateMode]);

  // Show error if fetching user fails
  useEffect(() => {
    if (isUpdateMode && fetchError) {
      toast.error(fetchError);
    }
  }, [fetchError, isUpdateMode]);

  // Helper function to get error message for a field
  const getErrorMessage = (fieldName: string) => validationErrors[fieldName] || "";

  // Helper function to clear error for a specific field when user types
  const clearFieldError = (fieldName: string) => {
    if (validationErrors[fieldName]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Validate userId for update mode
    if (isUpdateMode && !userId) {
      toast.error("No user ID provided");
      return;
    }

    // Split name into parts (first, middle, last)
    const nameParts = name.trim().split(/\s+/);
    const firstName = nameParts[0] || "";
    const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : "";
    const middleName = nameParts.length > 2 ? nameParts.slice(1, -1).join(" ") : "";

    // Get the selected role name for conditional validation
    const selectedRole = roles.find((r) => r.id === selectedRoleId);
    const roleName = selectedRole?.roleName || "";

    // Prepare form data for validation
    const formData = {
      email,
      firstName,
      middleName,
      lastName,
      fullAddress,
      roleId: selectedRoleId,
      roleName, // Add roleName for conditional validation
      mobileNumber: phoneNumber,
      pulseCode: isUpdateMode ? pulseCode : generatedPrefix || "",
      empLegacyCode: legacyCode,
      profilePicture: imagePreview || "",
      dob,
      supervisorId: selectedSupervisorId,
      teamId: selectedTeamId,
      territoryId: selectedTerritoryId,
      brickId: selectedTerritoryId, // Sending both for compatibility as per user request
      joiningDate,
      enableMobileAccess: enableMobileAccess === "Enable",
      mobileView,
      verifiedDevices: [],
    };

    // Validate using Zod schema
    const validation = employeeRegistrationSchema.safeParse(formData);

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

    // Use validated and transformed data
    const validatedData = validation.data;

    // Prepare final payload
    const payload: any = isUpdateMode
      ? { userId } // Include userId for update
      : {};

    // Add required fields
    if (validatedData.email) payload.email = validatedData.email;
    if (validatedData.firstName) payload.firstName = validatedData.firstName;
    if (validatedData.lastName) payload.lastName = validatedData.lastName;
    if (validatedData.mobileNumber) payload.mobileNumber = validatedData.mobileNumber;

    // Add optional fields only if they have values
    if (validatedData.middleName) payload.middleName = validatedData.middleName;
    if (validatedData.fullAddress) payload.fullAddress = validatedData.fullAddress;
    if (validatedData.roleId) payload.roleId = validatedData.roleId;

    // New fields (bypassing validation for now or assuming schema will be updated)
    if (selectedTeamId) payload.teamId = selectedTeamId;
    if (selectedTerritoryId) payload.territoryId = selectedTerritoryId;
    if (joiningDate) payload.joiningDate = joiningDate;
    payload.enableMobileAccess = enableMobileAccess === "Enable";
    if (enableMobileAccess === "Enable") {
      payload.mobileView = mobileView;
    }

    // pulseCode can only be set during registration, not during update
    if (!isUpdateMode && validatedData.pulseCode) {
      payload.pulseCode = validatedData.pulseCode;
    }

    if (validatedData.empLegacyCode) payload.empLegacyCode = validatedData.empLegacyCode;
    if (validatedData.profilePicture) payload.profilePicture = validatedData.profilePicture;
    if (validatedData.dob) payload.dob = validatedData.dob;
    if (validatedData.supervisorId) payload.supervisorId = validatedData.supervisorId;
    if (validatedData.teamId) payload.teamId = validatedData.teamId;
    if (validatedData.territoryId) payload.territoryId = validatedData.territoryId;
    if (validatedData.brickId) payload.brickId = validatedData.brickId;
    if (validatedData.verifiedDevices) payload.verifiedDevices = validatedData.verifiedDevices;

    // Add status field (convert to lowercase for API)
    if (isUpdateMode) {
      payload.status = status.toLowerCase();
    }

    // Dispatch appropriate action based on mode
    const result = isUpdateMode
      ? await dispatch(updateEmployee(payload))
      : await dispatch(registerEmployee(payload));

    // Handle success/error
    const isSuccess = isUpdateMode
      ? updateEmployee.fulfilled.match(result)
      : registerEmployee.fulfilled.match(result);

    if (isSuccess) {
      const successMsg = isUpdateMode
        ? updateMessage || "Employee updated successfully!"
        : registerMessage || "Employee registered successfully!";

      toast.success(successMsg);

      if (!isUpdateMode) {
        // Reset form for add mode
        setName("");
        setEmail("");
        setPhoneNumber("");
        setDob("");
        setFullAddress("");
        setLegacyCode("");
        setSelectedRoleId("");
        setSelectedSupervisorId("");
        setImagePreview(null);
        setValidationErrors({});
        dispatch(resetGeneratePrefixState());
      }

      router.push("/dashboard/Employees-Management");
    } else {
      // Extract error message from the rejected action
      const errorMsg =
        (result.payload as string) ||
        (isUpdateMode ? updateError : registerError) ||
        `Failed to ${isUpdateMode ? "update" : "register"} employee`;

      // Check if the error is about duplicate email
      if (errorMsg.toLowerCase().includes("email already registered")) {
        setValidationErrors({
          email: "Email Already Taken",
        });
        toast.error("Email Already Taken");
      } else {
        toast.error(errorMsg);
      }
    }
  };

  const handleDiscard = () => {
    router.push("/dashboard/Employees-Management");
  };

  // Loading state for update mode
  if (isUpdateMode && fetchingUser) {
    return (
      <div className="bg-(--gray-0) flex items-center justify-center min-h-[600px]">
        <div className="bg-(--background) rounded-8 shadow-soft p-12 flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 animate-spin text-(--primary)" />
          <p className="t-lg">Loading employee data...</p>
        </div>
      </div>
    );
  }

  // Error state for update mode
  if (isUpdateMode && fetchError && !employeeData) {
    return (
      <div className="bg-(--gray-0) flex items-center justify-center min-h-[600px]">
        <div className="bg-(--background) rounded-8 shadow-soft p-12 flex flex-col items-center gap-4">
          <p className="t-lg t-err">Failed to load employee data</p>
          <p className="t-md">{fetchError}</p>
          <Button onClick={handleDiscard} variant="primary" size="default" rounded="full">
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  const loading =
    (isUpdateMode ? updateLoading : registerLoading) || prefixLoading || uploadLoading;
  const buttonText = isUpdateMode
    ? updateLoading
      ? "Updating..."
      : "Update Employee"
    : registerLoading
      ? "Adding..."
      : "Add Employee";

  return (
    <div className="bg-(--gray-0)">
      <div className="bg-(--background) rounded-8 shadow-soft p-8 space-y-10">
        {/* Section: Basic Info */}
        <div className="space-y-6">
          <h2 className="t-h2">Basic Info</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left: Profile Image Upload */}
            <ProfileImageUpload
              imagePreview={imagePreview}
              onImageChange={handleImageChange}
              loading={uploadLoading}
              className="space-y-6"
            />

            {/* Right: Form Fields */}
            <div className="md:col-span-2 space-y-6">
              {/* Row 1: Pulse Code, Legacy Code */}
              <div className="grid grid-cols-2 gap-4">
                <FormInput
                  label="Pulse Code"
                  name="pulseCode"
                  value={isUpdateMode ? pulseCode : generatedPrefix || ""}
                  onChange={() => {}}
                  placeholder={
                    isUpdateMode
                      ? pulseCode || "N/A"
                      : prefixLoading
                        ? "Generating..."
                        : "EMP_000152"
                  }
                  readOnly
                />
                <FormInput
                  label="Legacy code"
                  name="legacyCode"
                  value={legacyCode}
                  onChange={(value) => {
                    setLegacyCode(value);
                    clearFieldError("empLegacyCode");
                  }}
                  placeholder="000152"
                />
              </div>

              {/* Row 2: Name, Email */}
              <div className="grid grid-cols-2 gap-4">
                <FormInput
                  label="Name"
                  name="name"
                  value={name}
                  onChange={(value) => {
                    setName(value);
                    clearFieldError("firstName");
                    clearFieldError("middleName");
                    clearFieldError("lastName");
                  }}
                  placeholder="Enter full name"
                  required
                  error={getErrorMessage("firstName") || getErrorMessage("lastName")}
                />
                <FormInput
                  label="Email Address"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(value) => {
                    setEmail(value);
                    clearFieldError("email");
                  }}
                  placeholder="e.g. abc123@gmail.com"
                  required
                  error={getErrorMessage("email")}
                />
              </div>

              {/* Row 3: Mobile Number, Date of Birth */}
              <div className="grid grid-cols-2 gap-4">
                <FormInput
                  label="Mobile Number"
                  name="mobileNumber"
                  type="tel"
                  value={phoneNumber}
                  onChange={(value) => {
                    setPhoneNumber(value);
                    clearFieldError("mobileNumber");
                  }}
                  placeholder="e.g. 923456789010"
                  required
                  error={getErrorMessage("mobileNumber")}
                />
                <FormInput
                  label="Date of Birth"
                  name="dob"
                  type="date"
                  value={dob}
                  onChange={(value) => {
                    setDob(value);
                    clearFieldError("dob");
                  }}
                  error={getErrorMessage("dob")}
                />
              </div>

              {/* Full Address */}
              <FormInput
                label="Full Address"
                name="fullAddress"
                value={fullAddress}
                onChange={(value) => {
                  setFullAddress(value);
                  clearFieldError("fullAddress");
                }}
                placeholder="e.g. B121, Block-2, Gulshan-e-Iqbal, Karachi, Pakistan"
                required
                error={getErrorMessage("fullAddress")}
              />

              {/* Row 4: Joining Date, Status */}
              <div className="grid grid-cols-2 gap-4 items-end">
                <FormInput
                  label="Joining Date"
                  name="joiningDate"
                  type="date"
                  value={joiningDate}
                  onChange={(value) => {
                    setJoiningDate(value);
                    clearFieldError("joiningDate");
                  }}
                  error={getErrorMessage("joiningDate")}
                />
                <div className="flex flex-col gap-2">
                  <StatusToggle status={status} onChange={setStatus} />
                </div>
              </div>

              {/* Role & Access Section */}
              <div className="space-y-6 pt-4">
                <h2 className="t-h2">Role & Access</h2>

                {/* Row 5: Team, Select Role */}
                <div className="grid grid-cols-2 gap-4">
                  <FormSelect
                    label="Team"
                    name="teamId"
                    value={selectedTeamId}
                    onChange={(value) => {
                      setSelectedTeamId(value);
                      clearFieldError("teamId");
                    }}
                    options={(() => {
                      const teamOptions = teams.map((t) => ({
                        value: t.id,
                        label: t.name,
                      }));

                      // In update mode, ensure current team is present
                      if (
                        isUpdateMode &&
                        selectedTeamId &&
                        !teamOptions.find((opt) => opt.value === selectedTeamId)
                      ) {
                        const currentTeam = employeeData?.teams?.find(
                          (t) => t.id === selectedTeamId
                        );
                        teamOptions.push({
                          value: selectedTeamId,
                          label: currentTeam?.name || "Current Team",
                        });
                      }
                      return teamOptions;
                    })()}
                    placeholder="Select Team"
                    loading={teamsLoading}
                    error={getErrorMessage("teamId")}
                  />
                  <FormSelect
                    label="Select Role"
                    name="roleId"
                    value={selectedRoleId}
                    onChange={(value) => {
                      setSelectedRoleId(value);
                      setSelectedSupervisorId("");
                      clearFieldError("roleId");
                      clearFieldError("supervisorId");
                    }}
                    options={roles.map((role) => ({
                      value: role.id,
                      label: role.roleName,
                    }))}
                    placeholder="Select a role"
                    loading={rolesLoading}
                    error={getErrorMessage("roleId")}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {/* Row 6: Line Manager */}
                  <FormSelect
                    label="Select Line Manager"
                    name="supervisorId"
                    value={selectedSupervisorId}
                    onChange={(value) => {
                      setSelectedSupervisorId(value);
                      clearFieldError("supervisorId");
                    }}
                    options={(() => {
                      const selectedRole = roles.find((r) => r.id === selectedRoleId);
                      const parentRoleId = selectedRole?.parentRoleId;

                      // Filter users by parent role
                      const filteredUsers = parentRoleId
                        ? users.filter((user) => user.roleId === parentRoleId)
                        : [];

                      // Map to options
                      const userOptions = filteredUsers.map((user) => ({
                        value: user.id,
                        label: `${user.firstName} ${user.lastName} ${user.pulseCode ? `(${user.pulseCode})` : ""}`,
                      }));

                      // In update mode, ensure current supervisor is present in options even if not in filtered list
                      if (
                        isUpdateMode &&
                        employeeData?.supervisor &&
                        !userOptions.find((opt) => opt.value === employeeData.supervisor?.id)
                      ) {
                        userOptions.push({
                          value: employeeData.supervisor.id,
                          label: `${employeeData.supervisor.firstName} ${employeeData.supervisor.lastName} (Current)`,
                        });
                      }

                      return userOptions;
                    })()}
                    placeholder={
                      !selectedRoleId
                        ? "Select a role first"
                        : (() => {
                            const selectedRole = roles.find((r) => r.id === selectedRoleId);
                            if (!selectedRole?.parentRoleId)
                              return "No supervisor required for this role";
                            const parentRole = roles.find(
                              (r) => r.id === selectedRole.parentRoleId
                            );
                            return parentRole
                              ? `Select ${parentRole.roleName}`
                              : "Select a line manager";
                          })()
                    }
                    disabled={!selectedRoleId}
                    loading={usersLoading}
                    error={getErrorMessage("supervisorId")}
                  />

                  {/* Territory Condition - Only for Sales Rep */}
                  {roles
                    .find((r) => r.id === selectedRoleId)
                    ?.roleName?.toLowerCase()
                    .includes("sales rep") && (
                    <FormSelect
                      label="Territory"
                      name="territoryId"
                      value={selectedTerritoryId}
                      onChange={(value) => {
                        setSelectedTerritoryId(value);
                        clearFieldError("territoryId");
                      }}
                      options={(() => {
                        const territoryOptions = territories.map((territory) => ({
                          value: territory.id,
                          label: territory.pulseCode,
                        }));

                        // In update mode, ensure current territory is present
                        if (
                          isUpdateMode &&
                          selectedTerritoryId &&
                          !territoryOptions.find((opt) => opt.value === selectedTerritoryId)
                        ) {
                          territoryOptions.push({
                            value: selectedTerritoryId,
                            label:
                              employeeData?.territory?.pulseCode ||
                              (selectedTerritoryId.startsWith("TER")
                                ? selectedTerritoryId
                                : `Current (${selectedTerritoryId.slice(0, 8)})`),
                          });
                        }
                        return territoryOptions;
                      })()}
                      placeholder="Select Territory"
                      loading={territoriesLoading}
                      error={getErrorMessage("territoryId")}
                    />
                  )}
                </div>
                {/* Mobile Access Toggles */}
                <div className="flex gap-8 items-start flex-wrap pt-4">
                  {/* Enable Mobile Access Toggle */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-[var(--text-secondary)]">
                      Mobile Access
                    </label>
                    <div className="inline-flex border border-[var(--gray-3)] rounded-full p-1 bg-[var(--gray-0)] overflow-hidden">
                      <button
                        type="button"
                        onClick={() => setEnableMobileAccess("Disable")}
                        className={`px-6 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                          enableMobileAccess === "Disable"
                            ? "bg-[var(--primary)] text-[var(--light)]"
                            : "text-[var(--gray-6)] hover:bg-[var(--gray-1)]"
                        }`}
                      >
                        Disable
                      </button>
                      <button
                        type="button"
                        onClick={() => setEnableMobileAccess("Enable")}
                        className={`px-6 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                          enableMobileAccess === "Enable"
                            ? "bg-[var(--primary)] text-[var(--light)]"
                            : "text-[var(--gray-6)] hover:bg-[var(--gray-1)]"
                        }`}
                      >
                        Enable
                      </button>
                    </div>
                  </div>

                  {/* Mobile View Toggle */}
                  {enableMobileAccess === "Enable" && (
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-[var(--text-secondary)]">
                        Mobile View
                      </label>
                      <div className="inline-flex border border-[var(--gray-3)] rounded-full p-1 bg-[var(--gray-0)] overflow-hidden">
                        <button
                          type="button"
                          onClick={() => setMobileView("Sales Rep")}
                          className={`px-6 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                            mobileView === "Sales Rep"
                              ? "bg-[var(--primary)] text-[var(--light)]"
                              : "text-[var(--gray-6)] hover:bg-[var(--gray-1)]"
                          }`}
                        >
                          Sales Rep
                        </button>
                        <button
                          type="button"
                          onClick={() => setMobileView("Area Manager")}
                          className={`px-6 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                            mobileView === "Area Manager"
                              ? "bg-[var(--primary)] text-[var(--light)]"
                              : "text-[var(--gray-6)] hover:bg-[var(--gray-1)]"
                          }`}
                        >
                          Area Manager
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 pt-6">
          <Button
            type="button"
            onClick={handleDiscard}
            variant="outline"
            size="lg"
            rounded="full"
            className="px-6"
          >
            Discard
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            loading={loading}
            icon={Plus}
            variant="primary"
            size="lg"
            rounded="full"
            className="px-8 shadow-soft"
          >
            {uploadLoading ? "Uploading..." : buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
}
