"use client";

import React, { useState, useRef, useEffect } from "react";
import { RotateCw } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../../../../store";
import { requestOtp } from "../../../../store/slices/auth/loginSlice";
import { verifyOtp } from "../../../../store/slices/auth/verifyOtp";

export default function OtpPage() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [invalidOtp, setInvalidOtp] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();
  const params = useParams();
  const locale = params?.locale || "en";

  const dispatch = useAppDispatch();
  const { userEmail, deviceId, loading: loginLoading } = useAppSelector((state) => state.login);

  // Redirect to login if essential data is missing
  useEffect(() => {
    if (!userEmail || !deviceId) {
      router.push(`/${locale}/login`);
    }
  }, [userEmail, deviceId, router, locale]);

  useEffect(() => {
    if (otpRefs.current[0]) {
      otpRefs.current[0].focus();
    }
  }, []);

  const handleResendOTP = async () => {
    if (!userEmail || !deviceId) return;

    setOtp(["", "", "", ""]);
    setInvalidOtp(false);

    try {
      const result: any = await dispatch(requestOtp({ email: userEmail, deviceId }));
      if (result.payload?.success || result.payload === "OTP request already exists") {
        toast.success("OTP Resent Successfully");
        otpRefs.current[0]?.focus();
      } else {
        toast.error(result.payload || "Failed to resend OTP");
      }
    } catch (error) {
      toast.error("Failed to resend OTP");
    }
  };

  const handleVerifyOTP = async (otpToVerify?: string) => {
    const enteredOtp = otpToVerify || otp.join("");

    if (enteredOtp.length !== 4) {
      toast.error("Please enter 4-digit OTP");
      return;
    }

    if (!deviceId) return;

    setIsVerifying(true);
    setInvalidOtp(false);

    try {
      const result: any = await dispatch(
        verifyOtp({
          deviceId,
          otp: Number(enteredOtp),
        })
      );

      if (result.type === "auth/verifyOtp/fulfilled" && result.payload?.success) {
        const loginData = result?.payload?.data?.accessToken;
        localStorage.setItem("userSession", loginData);
        document.cookie = `userSession=${JSON.stringify(loginData)}; path=/; max-age=86400`;

        toast.success("Login Successful");
        router.push(`/${locale}/dashboard`);
      } else {
        const errorMsg =
          result.payload ||
          result.payload?.message ||
          result.error?.message ||
          "Invalid OTP. Please try again.";

        if (errorMsg === "Access denied. Please use the mobile app.") {
          toast.error(errorMsg);
          setOtp(["", "", "", ""]);
          otpRefs.current[0]?.focus();
        } else {
          setInvalidOtp(true);
          toast.error(errorMsg);
        }
      }
    } catch (err: any) {
      setInvalidOtp(true);
      toast.error("OTP verification failed");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    if (invalidOtp) {
      setInvalidOtp(false);
    }

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 3) {
      otpRefs.current[index + 1]?.focus();
    }

    if (index === 3 && value) {
      const fullOtp = newOtp.join("");
      if (fullOtp.length === 4) {
        setTimeout(() => {
          handleVerifyOTP(fullOtp);
        }, 100);
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  if (!userEmail || !deviceId) {
    return null; // Don't render anything while redirecting
  }

  return (
    <div className="bg-background rounded-8 shadow-soft px-14 py-24 space-y-6 w-full">
      <div className="text-center space-y-1">
        <h1 className="t-h1 text-[var(--gray-9)]">Verification</h1>
        <p className="t-sm text-[var(--gray-5)]">Enter the OTP sent to {userEmail}</p>
      </div>

      <div className="space-y-5">
        <div>
          <label className="t-label text-[var(--gray-7)] mb-4 text-center block">
            Enter 4-Digit OTP
          </label>
          <div className="flex justify-center gap-3">
            {[0, 1, 2, 3].map((index) => (
              <input
                key={index}
                ref={(el) => {
                  otpRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={otp[index]}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                disabled={isVerifying}
                className="w-14 h-14 text-center text-2xl font-bold border-2 border-[var(--gray-3)] rounded-8 focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary-0)] outline-none transition-all disabled:bg-[var(--gray-1)] disabled:cursor-not-allowed"
              />
            ))}
          </div>

          {isVerifying && (
            <div className="mt-4 flex items-center justify-center gap-2 text-[var(--primary)]">
              <RotateCw className="w-5 h-5 animate-spin" />
              <span className="t-sm font-medium">Verifying OTP...</span>
            </div>
          )}

          {invalidOtp && (
            <p className="mt-4 t-sm text-[var(--destructive)] text-center">
              Invalid OTP. Please try again.
            </p>
          )}
        </div>

        <div className="text-center">
          <button
            onClick={handleResendOTP}
            disabled={loginLoading || isVerifying}
            className="t-link text-[var(--primary)] hover:text-[var(--primary-2)] disabled:text-[var(--gray-4)] disabled:cursor-not-allowed underline transition"
          >
            {loginLoading ? "Resending..." : "Resend OTP"}
          </button>
        </div>
      </div>
    </div>
  );
}
