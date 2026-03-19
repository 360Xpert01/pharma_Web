"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../../../../store";
import { requestOtp, logout as loginLogout } from "../../../../store/slices/auth/loginSlice";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [subDomain, setSubDomain] = useState("");
  const [userNotFound, setUserNotFound] = useState(false);
  const [otpSentState, setOtpSentState] = useState(false);
  const router = useRouter();
  const params = useParams();
  const locale = params?.locale || "en";

  const dispatch = useAppDispatch();
  const { loading, success, error, message } = useAppSelector((state) => state.login);

  const deviceId = "ewb-123";

  // Reset state on mount to ensure clean login flow
  useEffect(() => {
    dispatch(loginLogout());
  }, [dispatch]);

  const handleSendOTP = async () => {
    if (!email.trim() || !email.includes("@")) {
      toast.error("Please enter a valid email");
      return;
    }

    try {
      localStorage.setItem("tenantName", subDomain.toLowerCase());
      const result = await dispatch(requestOtp({ email: email.trim(), deviceId }));

      if (requestOtp.fulfilled.match(result)) {
        toast.success(result.payload.message || "OTP sent successfully!");
        router.push(`/${locale}/otp`);
      } else if (requestOtp.rejected.match(result)) {
        const errorMsg = result.payload as string;

        if (errorMsg === "OTP request already exists") {
          toast.success("An OTP has already been sent. Please verify.");
          router.push(`/${locale}/otp`);
        } else {
          toast.error(errorMsg || "Failed to send OTP");
          if (errorMsg === "User not found") {
            setUserNotFound(true);
          }
        }
      }
    } catch (error: any) {
      toast.error("An unexpected error occurred");
    }
  };

  return (
    <div className="bg-background rounded-8 shadow-soft px-14 py-24 space-y-6 w-full">
      <div className="text-center space-y-1">
        <h1 className="t-h1 text-[var(--gray-9)]">Welcome</h1>
        <p className="t-sm text-[var(--gray-5)]">Login with your email</p>
      </div>

      <div className="space-y-5">
        {/* Email Input */}
        <div className="space-y-2">
          <label className="t-label text-[var(--gray-9)]">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && email.includes("@") && subDomain.trim() && !loading) {
                handleSendOTP();
              }
            }}
            placeholder="Enter your email"
            disabled={loading}
            className="w-full h-12 px-4 py-3 border border-[var(--gray-2)] rounded-8 outline-none transition-all focus:ring-2 focus:ring-[var(--primary-1)] focus:border-[var(--primary-1)] disabled:bg-[var(--gray-1)] disabled:cursor-not-allowed bg-white text-sm"
          />
          <div className="min-h-[20px]">
            {(userNotFound || otpSentState) && (
              <p className="t-sm text-[var(--destructive)]">
                {userNotFound ? "User not found" : "An OTP has already been sent to this email."}
              </p>
            )}
          </div>
        </div>

        {/* Tenant Name Input */}
        <div className="space-y-2">
          <label className="t-label text-[var(--gray-9)]">Tenant Name</label>
          <input
            type="text"
            value={subDomain}
            maxLength={3}
            onChange={(e) => {
              const val = e.target.value.replace(/[^a-zA-Z]/g, "").toUpperCase();
              setSubDomain(val);
            }}
            placeholder="Enter tenant name"
            disabled={loading}
            onKeyDown={(e) => {
              if (e.key === "Enter" && email.includes("@") && subDomain.trim() && !loading) {
                handleSendOTP();
              }
            }}
            className="w-full h-12 px-4 py-3 border border-[var(--gray-2)] rounded-8 outline-none transition-all focus:ring-2 focus:ring-[var(--primary-1)] focus:border-[var(--primary-1)] disabled:bg-[var(--gray-1)] disabled:cursor-not-allowed bg-white text-sm tracking-widest"
          />
          <div className="min-h-[20px]" />
        </div>

        {/* Send OTP Button */}
        <button
          onClick={handleSendOTP}
          disabled={loading || !email.includes("@") || !subDomain.trim()}
          className="w-full h-12 cursor-pointer bg-gradient-to-r from-[var(--primary-gradient-start)] to-[var(--primary-gradient-end)] hover:from-[var(--primary-gradient-start-hover)] hover:to-[var(--primary-gradient-end-hover)] text-white font-semibold rounded-8 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Sending..." : "Send OTP"}
        </button>
      </div>
    </div>
  );
}
