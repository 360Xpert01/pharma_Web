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
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { employeeRegistrationSchema } from "@/validations";
import { ProfileImageUpload, FormInput, FormSelect, StatusToggle } from "@/components/form";

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

  // Form States
  const [status, setStatus] = useState<"Active" | "Inactive">("Active");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dob, setDob] = useState("");
  const [fullAddress, setFullAddress] = useState("");
  const [legacyCode, setLegacyCode] = useState("");
  const [pulseCode, setPulseCode] = useState("");
  const [selectedRoleId, setSelectedRoleId] = useState("");
  const [selectedSupervisorId, setSelectedSupervisorId] = useState("");

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

    // Fetch roles and users for dropdowns
    dispatch(getAllRoles());
    dispatch(getAllUsers());

    return () => {
      if (isUpdateMode) {
        dispatch(resetGetUserByIdState());
        dispatch(resetUpdateEmployeeState());
      } else {
        dispatch(resetGeneratePrefixState());
        dispatch(resetEmployeeState());
      }
    };
  }, [dispatch, isUpdateMode, userId]);

  // Populate form with fetched employee data (Update mode only)
  useEffect(() => {
    if (isUpdateMode && employeeData) {
      setFirstName(employeeData.firstName || "");
      setMiddleName(employeeData.middleName || "");
      setLastName(employeeData.lastName || "");
      setEmail(employeeData.email || "");
      setPhoneNumber(employeeData.mobileNumber || "");
      setDob(employeeData.dob || "");
      setFullAddress(employeeData.fullAddress || "");
      setLegacyCode(employeeData.empLegacyCode || "");
      setPulseCode(employeeData.pulseCode || "");
      setSelectedRoleId(employeeData.roleId || "");
      setSelectedSupervisorId(employeeData.supervisorId || "");
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

    // Prepare form data for validation
    const formData = {
      email,
      firstName,
      middleName,
      lastName,
      fullAddress,
      roleId: selectedRoleId,
      mobileNumber: phoneNumber,
      pulseCode: isUpdateMode ? pulseCode : generatedPrefix || "",
      empLegacyCode: legacyCode,
      profilePicture: imagePreview || "",
      dob,
      supervisorId: selectedSupervisorId,
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
    if (validatedData.pulseCode) payload.pulseCode = validatedData.pulseCode;
    if (validatedData.empLegacyCode) payload.empLegacyCode = validatedData.empLegacyCode;
    if (validatedData.profilePicture) payload.profilePicture = validatedData.profilePicture;
    if (validatedData.dob) payload.dob = validatedData.dob;
    if (validatedData.supervisorId) payload.supervisorId = validatedData.supervisorId;
    if (validatedData.verifiedDevices) payload.verifiedDevices = validatedData.verifiedDevices;

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
        setFirstName("");
        setMiddleName("");
        setLastName("");
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
        <div className="bg-(--background) rounded-2xl shadow-soft p-12 flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 animate-spin text-(--primary)" />
          <p className="text-lg font-medium text-(--gray-7)">Loading employee data...</p>
        </div>
      </div>
    );
  }

  // Error state for update mode
  if (isUpdateMode && fetchError && !employeeData) {
    return (
      <div className="bg-(--gray-0) flex items-center justify-center min-h-[600px]">
        <div className="bg-(--background) rounded-2xl shadow-soft p-12 flex flex-col items-center gap-4">
          <p className="text-lg font-medium text-(--destructive)">Failed to load employee data</p>
          <p className="text-sm text-(--gray-6)">{fetchError}</p>
          <Button onClick={handleDiscard} variant="primary" size="default" rounded="full">
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  const loading = isUpdateMode ? updateLoading : registerLoading || prefixLoading;
  const buttonText = isUpdateMode
    ? updateLoading
      ? "Updating..."
      : "Update Employee"
    : registerLoading
      ? "Adding..."
      : "Add Employee";

  return (
    <div className="bg-(--gray-0)">
      <div className="bg-(--background) rounded-2xl shadow-soft p-8 space-y-10">
        {/* Section: Basic Info */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-(--gray-9)">Basic Info</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left: Profile Image Upload */}
            <ProfileImageUpload
              imagePreview={imagePreview}
              onImageChange={setImagePreview}
              className="space-y-6"
            />

            {/* Right: Form Fields */}
            <div className="md:col-span-2 space-y-6">
              {/* Row 1: Pulse Code, Legacy Code, Status */}
              <div className="grid grid-cols-3 gap-4 items-center">
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
                <StatusToggle status={status} onChange={setStatus} />
              </div>

              {/* Names */}
              <div className="grid grid-cols-3 gap-4">
                <FormInput
                  label="First Name"
                  name="firstName"
                  value={firstName}
                  onChange={(value) => {
                    setFirstName(value);
                    clearFieldError("firstName");
                  }}
                  placeholder="First Name"
                  required
                  error={getErrorMessage("firstName")}
                />
                <FormInput
                  label="Middle Name"
                  name="middleName"
                  value={middleName}
                  onChange={(value) => {
                    setMiddleName(value);
                    clearFieldError("middleName");
                  }}
                  placeholder="Middle Name"
                  error={getErrorMessage("middleName")}
                />
                <FormInput
                  label="Last Name"
                  name="lastName"
                  value={lastName}
                  onChange={(value) => {
                    setLastName(value);
                    clearFieldError("lastName");
                  }}
                  placeholder="Last Name"
                  required
                  error={getErrorMessage("lastName")}
                />
              </div>

              {/* Email, Phone, DOB */}
              <div className="grid grid-cols-3 gap-4">
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
                error={getErrorMessage("fullAddress")}
                className="md:col-span-2"
              />

              {/* Assign Role */}
              <div className="md:col-span-2 space-y-6 pt-4">
                <h2 className="text-2xl font-bold text-(--gray-9)">Assign Role</h2>
                <div className="grid grid-cols-2 gap-8">
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
                      const filteredUsers = parentRoleId
                        ? users.filter((user) => user.roleId === parentRoleId)
                        : [];

                      return filteredUsers.map((user) => ({
                        value: user.id,
                        label: `${user.firstName} ${user.lastName} ${user.pulseCode ? `(${user.pulseCode})` : ""}`,
                      }));
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
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
}
