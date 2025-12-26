"use client";

import React, { useState, useRef, useEffect } from "react";
import { Plus, Upload, X } from "lucide-react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  generatePrefix,
  resetGeneratePrefixState,
} from "@/store/slices/preFix/generatePrefixSlice";
import { getAllRoles } from "@/store/slices/role/getAllRolesSlice";
import { registerEmployee, resetEmployeeState } from "@/store/slices/employee/registerEmployee";
import { getAllUsers } from "@/store/slices/employee/getAllUsersSlice";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { employeeRegistrationSchema } from "@/validations";

export default function AddEmployeeForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const {
    generatedPrefix,
    loading: prefixLoading,
    error: prefixError,
  } = useAppSelector((state) => state.generatePrefix);
  const { roles, loading: rolesLoading } = useAppSelector((state) => state.allRoles);
  const { users, loading: usersLoading } = useAppSelector((state) => state.allUsers);
  const {
    loading: registerLoading,
    success,
    error: registerError,
    message,
  } = useAppSelector((state) => state.registerEmployee);

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
  const [selectedRoleId, setSelectedRoleId] = useState("");
  const [selectedSupervisorId, setSelectedSupervisorId] = useState("");

  // Validation errors state
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // 🔥 Always call generate for "User" entity
    // Employee = User entity (business logic, not dynamic)
    // The /generate API is idempotent - handles existence automatically
    dispatch(generatePrefix({ entity: "User" }));

    // Fetch all roles for dropdown
    dispatch(getAllRoles());

    // Fetch all users for line manager dropdown
    dispatch(getAllUsers());

    return () => {
      dispatch(resetGeneratePrefixState());
      dispatch(resetEmployeeState());
    };
  }, [dispatch]);

  const handleImageClick = () => fileInputRef.current?.click();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Optional: Size check (5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should be less than 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Helper function to get error message for a field
  const getErrorMessage = (fieldName: string) => validationErrors[fieldName] || "";

  // Helper function to check if a field has an error
  const hasError = (fieldName: string) => !!validationErrors[fieldName];

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

  // Helper function to get input CSS classes based on validation state
  const getInputClasses = (fieldName: string) => {
    const baseClasses = "mt-1 w-full px-4 py-3 border rounded-xl outline-none transition-all";
    if (hasError(fieldName)) {
      return `${baseClasses} border-red-500 focus:ring-2 focus:ring-red-500 focus:border-red-500`;
    }
    return `${baseClasses} border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500`;
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Prepare form data for validation
    const formData = {
      email,
      firstName,
      middleName,
      lastName,
      fullAddress,
      roleId: selectedRoleId,
      mobileNumber: phoneNumber,
      pulseCode: generatedPrefix || "",
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

    // Use validated and transformed data (email lowercased, phone sanitized, etc.)
    const validatedData = validation.data;

    // Prepare final payload - only include non-empty optional fields
    const payload: any = {
      email: validatedData.email,
      firstName: validatedData.firstName,
      lastName: validatedData.lastName,
      mobileNumber: validatedData.mobileNumber,
    };

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

    const result = await dispatch(registerEmployee(payload));

    if (registerEmployee.fulfilled.match(result)) {
      toast.success(message || "Employee registered successfully!");
      // Reset form
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
      setValidationErrors({}); // Clear validation errors
      dispatch(resetGeneratePrefixState());
      router.push("/dashboard/Employees-Management");
    } else {
      // Extract error message from the rejected action
      const errorMsg = (result.payload as string) || registerError || "Failed to register employee";

      // Check if the error is about duplicate email
      if (errorMsg.toLowerCase().includes("email already registered")) {
        // Set validation error on the email field
        setValidationErrors({
          email: "Email Already Taken",
        });
        toast.error("Email Already Taken");
      } else {
        // Show generic error for other cases
        toast.error(errorMsg);
      }
    }
  };

  return (
    <div className=" bg-gray-50">
      <div className="bg-white rounded-2xl shadow-lg p-8 space-y-10">
        {/* Section: Basic Info */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Basic Info</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left: Profile Image Upload */}
            <div className="space-y-6">
              {/* Main Image Upload Box */}
              <div className="relative">
                <div
                  onClick={handleImageClick}
                  className="relative w-full h-96 bg-gray-100 border-2 border-dashed border-gray-300 rounded-3xl cursor-pointer overflow-hidden group hover:border-gray-400 transition-all"
                >
                  {imagePreview ? (
                    <>
                      <Image
                        src={imagePreview}
                        alt="Employee Profile"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <button
                        onClick={removeImage}
                        className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-700 p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-white shadow-lg"
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-gray-400 px-8">
                      <Upload className="w-16 h-16 mb-4" />
                      <p className="text-lg font-medium">Click to upload image</p>
                      <p className="text-sm">PNG, JPG up to 5MB</p>
                    </div>
                  )}
                </div>

                {/* Hidden File Input - Inside the upload area */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/jpg"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>

              {/* Optional: Small Thumbnails (if needed later) */}
              {/* <div className="flex gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-24 h-24 bg-gray-200 border-2 border-dashed rounded-xl" />
                ))}
              </div> */}
            </div>

            {/* Right: Form Fields */}
            <div className="md:col-span-2 space-y-6">
              {/* Row 1: Pulse Code, Legacy Code, Status */}
              <div className="grid grid-cols-3 gap-4 items-center">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Pulse Code</label>
                  <input
                    type="text"
                    value={generatedPrefix || ""}
                    placeholder={prefixLoading ? "Generating..." : "PLS_EMP_000152"}
                    readOnly
                    className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-700 cursor-not-allowed outline-none"
                    title={prefixError || "Auto-generated pulse code (read-only)"}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Legacy code</label>
                  <input
                    type="text"
                    value={legacyCode}
                    onChange={(e) => {
                      setLegacyCode(e.target.value);
                      clearFieldError("empLegacyCode");
                    }}
                    placeholder="000152"
                    className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                </div>

                <div className="flex">
                  <div className="inline-flex border border-gray-300 rounded-full p-1 bg-gray-50 overflow-hidden">
                    <button
                      onClick={() => setStatus("Active")}
                      className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                        status === "Active"
                          ? "bg-blue-600 text-white"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      Active
                    </button>
                    <button
                      onClick={() => setStatus("Inactive")}
                      className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                        status === "Inactive"
                          ? "bg-blue-600 text-white"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      Inactive
                    </button>
                  </div>
                </div>
              </div>

              {/* Names */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">First Name*</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                      clearFieldError("firstName");
                    }}
                    placeholder="First Name"
                    className={getInputClasses("firstName")}
                  />
                  {hasError("firstName") && (
                    <p className="mt-1 text-sm text-red-600">{getErrorMessage("firstName")}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Middle Name</label>
                  <input
                    type="text"
                    value={middleName}
                    onChange={(e) => {
                      setMiddleName(e.target.value);
                      clearFieldError("middleName");
                    }}
                    placeholder="Middle Name"
                    className={getInputClasses("middleName")}
                  />
                  {hasError("middleName") && (
                    <p className="mt-1 text-sm text-red-600">{getErrorMessage("middleName")}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Last Name*</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                      clearFieldError("lastName");
                    }}
                    placeholder="Last Name"
                    className={getInputClasses("lastName")}
                  />
                  {hasError("lastName") && (
                    <p className="mt-1 text-sm text-red-600">{getErrorMessage("lastName")}</p>
                  )}
                </div>
              </div>

              {/* Email, Phone, DOB */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email Address*</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      clearFieldError("email");
                    }}
                    placeholder="e.g. abc123@gmail.com"
                    className={getInputClasses("email")}
                  />
                  {hasError("email") && (
                    <p className="mt-1 text-sm text-red-600">{getErrorMessage("email")}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Mobile Number*</label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => {
                      setPhoneNumber(e.target.value);
                      clearFieldError("mobileNumber");
                    }}
                    placeholder="e.g. 923456789010"
                    className={getInputClasses("mobileNumber")}
                  />
                  {hasError("mobileNumber") && (
                    <p className="mt-1 text-sm text-red-600">{getErrorMessage("mobileNumber")}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                  <input
                    type="date"
                    value={dob}
                    onChange={(e) => {
                      setDob(e.target.value);
                      clearFieldError("dob");
                    }}
                    className={getInputClasses("dob")}
                  />
                  {hasError("dob") && (
                    <p className="mt-1 text-sm text-red-600">{getErrorMessage("dob")}</p>
                  )}
                </div>
              </div>

              {/* Full Address */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Full Address</label>
                <input
                  type="text"
                  value={fullAddress}
                  onChange={(e) => {
                    setFullAddress(e.target.value);
                    clearFieldError("fullAddress");
                  }}
                  placeholder="e.g. B121, Block-2, Gulshan-e-Iqbal, Karachi, Pakistan"
                  className={getInputClasses("fullAddress")}
                />
                {hasError("fullAddress") && (
                  <p className="mt-1 text-sm text-red-600">{getErrorMessage("fullAddress")}</p>
                )}
              </div>

              {/* Assign Role - aligned below Full Address */}
              <div className="md:col-span-2 space-y-6 pt-4">
                <h2 className="text-2xl font-bold text-gray-900">Assign Role</h2>
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Select Role</label>
                    <select
                      value={selectedRoleId}
                      onChange={(e) => {
                        setSelectedRoleId(e.target.value);
                        clearFieldError("roleId");
                      }}
                      className={getInputClasses("roleId")}
                    >
                      <option value="">Select a role</option>
                      {rolesLoading ? (
                        <option disabled>Loading roles...</option>
                      ) : (
                        roles.map((role) => (
                          <option key={role.id} value={role.id}>
                            {role.roleName}
                          </option>
                        ))
                      )}
                    </select>
                    {hasError("roleId") && (
                      <p className="mt-1 text-sm text-red-600">{getErrorMessage("roleId")}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Select Line Manager
                    </label>
                    <select
                      value={selectedSupervisorId}
                      onChange={(e) => {
                        setSelectedSupervisorId(e.target.value);
                        clearFieldError("supervisorId");
                      }}
                      className={getInputClasses("supervisorId")}
                    >
                      <option value="">Select a line manager</option>
                      {usersLoading ? (
                        <option disabled>Loading users...</option>
                      ) : (
                        users.map((user) => (
                          <option key={user.id} value={user.id}>
                            {user.firstName} {user.lastName}{" "}
                            {user.pulseCode && `(${user.pulseCode})`}
                          </option>
                        ))
                      )}
                    </select>
                    {hasError("supervisorId") && (
                      <p className="mt-1 text-sm text-red-600">{getErrorMessage("supervisorId")}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 pt-6">
          <button
            type="button"
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition"
          >
            Discard
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={registerLoading || prefixLoading}
            className={`px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition flex cursor-pointer items-center gap-2 shadow-lg ${
              registerLoading || prefixLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <Plus className="w-5 h-5" />
            {registerLoading ? "Adding..." : "Add Employee"}
          </button>
        </div>
      </div>
    </div>
  );
}
