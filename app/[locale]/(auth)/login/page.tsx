"use client";

import React, { useState, useRef, useEffect } from "react";
import { RotateCw } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { requestOtp } from "../../../../store/slices/auth/loginSlice";
import { verifyOtp } from "../../../../store/slices/auth/verifyOtp";
import FormInput from "../../../../components/form/FormInput";
import { Button } from "../../../../components/ui/button/button";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [userNotFound, setUserNotFound] = useState(false);
  const [otpSentState, setOtpSentState] = useState(false);
  const [invalidOtp, setInvalidOtp] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();

  const dispatch = useDispatch();
  const { loading, success, error, message } = useSelector((state: any) => state.auth);

  const deviceId = "ewb-123";

  // Handle OTP send success
  useEffect(() => {
    if (success && !isOtpSent) {
      setIsOtpSent(true);
      toast.success(message || "OTP sent successfully!");
      otpRefs.current[0]?.focus();
    }
    if (error) {
      toast.error(error);
    }
  }, [success, error, message, isOtpSent]);

  const handleSendOTP = async () => {
    if (!email.trim() || !email.includes("@")) {
      toast.error("Please enter a valid email");
      return;
    }

    try {
      const result = await dispatch(requestOtp({ email: email.trim(), deviceId }));
      if (result.payload?.success) {
        setIsOtpSent(true);
        setUserNotFound(false);
        toast.success("OTP sent successfully!");
        otpRefs.current[0]?.focus();
      }

      if (result.payload === "User not found") {
        setUserNotFound(true);
      }

      if (result.payload === "OTP request already exists") {
        setOtpSentState(true);
        setUserNotFound(false);
        setIsOtpSent(true);
      } else {
        toast.error(result.payload?.error?.message || "Failed to send OTP");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to send OTP");
    }
  };

  const handleResendOTP = () => {
    setOtp(["", "", "", ""]);
    otpRefs.current[0]?.focus();
    setIsOtpSent(false);
    setUserNotFound(false);
    setInvalidOtp(false);
  };

  // Manual POST request for Verify OTP (without thunk)
  const handleVerifyOTP = async (otpToVerify?: string) => {
    const enteredOtp = otpToVerify || otp.join("");
    console.log("🔍 Verifying OTP:", enteredOtp);

    if (enteredOtp.length !== 4) {
      toast.error("Please enter 4-digit OTP");
      return;
    }

    setIsVerifying(true);
    setInvalidOtp(false); // Clear any previous errors

    try {
      const result: any = await dispatch(
        verifyOtp({
          deviceId,
          otp: Number(enteredOtp),
        })
      );

      console.log("📦 Full result:", result);
      console.log("✅ Result type:", result.type);
      console.log("📝 Result payload:", result.payload);

      // Check if the action was fulfilled (successful)
      if (result.type === "auth/verifyOtp/fulfilled" && result.payload?.success) {
        console.log("✅ OTP Verified Successfully!");
        const loginData = result?.payload?.data?.accessToken;

        localStorage.setItem("userSession", loginData);
        document.cookie = `userSession=${JSON.stringify(loginData)}; path=/; max-age=86400`;

        toast.success("Login Successful! Welcome back 🎉");
        router.push("/dashboard");
      } else {
        console.log("❌ OTP Verification Failed");
        setInvalidOtp(true);
        const errorMsg =
          result.payload?.message || result.error?.message || "Invalid OTP. Please try again.";
        toast.error(errorMsg);
      }
    } catch (err: any) {
      console.error("❌ Error during OTP verification:", err);
      setInvalidOtp(true);
      toast.error(err.message || "Invalid OTP. Please try again.");
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

  return (
    <div className="bg-[var(--background)] rounded-8 shadow-soft px-14 py-14 space-y-6 w-full">
      <div className="text-center space-y-1">
        <h1 className="t-h2 text-[var(--gray-9)]">Welcome</h1>
        <p className="t-sm text-[var(--gray-5)]">Login with your email</p>
      </div>

      <div className="space-y-5">
        {!isOtpSent ? (
          <>
            {/* Email Input */}
            <div className="space-y-2">
              <label className="t-label text-[var(--gray-9)]">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && email.includes("@") && !loading) {
                    handleSendOTP();
                  }
                }}
                placeholder="Enter your email"
                disabled={loading}
                className="w-full h-12 px-4 py-3 border border-[var(--gray-2)] rounded-8 outline-none transition-all focus:ring-2 focus:ring-[var(--primary-1)] focus:border-[var(--primary-1)] disabled:bg-[var(--gray-1)] disabled:cursor-not-allowed bg-white text-sm"
              />
              {/* Error message with reserved space */}
              <div className="min-h-[20px]">
                {(userNotFound || otpSentState) && (
                  <p className="t-sm text-[var(--destructive)]">
                    {userNotFound
                      ? "User not found"
                      : "An OTP has already been sent to this email."}
                  </p>
                )}
              </div>
            </div>

            {/* Send OTP Button */}
            <button
              onClick={handleSendOTP}
              disabled={loading || !email.includes("@")}
              className="w-full h-12 bg-gradient-to-r from-[var(--primary-gradient-start)] to-[var(--primary-gradient-end)] hover:from-[var(--primary-gradient-start-hover)] hover:to-[var(--primary-gradient-end-hover)] text-white font-semibold rounded-8 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </>
        ) : (
          <>
            {/* OTP Input */}
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

              {/* Verification Status */}
              {isVerifying && (
                <div className="mt-4 flex items-center justify-center gap-2 text-[var(--primary)]">
                  <RotateCw className="w-5 h-5 animate-spin" />
                  <span className="t-sm font-medium">Verifying OTP...</span>
                </div>
              )}

              {/* Error Message */}
              {invalidOtp && (
                <p className="mt-4 t-sm text-[var(--destructive)] text-center">
                  Invalid OTP. Please try again.
                </p>
              )}
            </div>

            {/* Resend OTP */}
            <div className="text-center">
              <button
                onClick={handleResendOTP}
                disabled={loading || isVerifying}
                className="t-link text-[var(--primary)] hover:text-[var(--primary-2)] disabled:text-[var(--gray-4)] disabled:cursor-not-allowed underline transition"
              >
                Resend OTP
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
