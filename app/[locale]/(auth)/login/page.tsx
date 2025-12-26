"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, RotateCw } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux"; // ← Manual dispatch & selector
import { requestOtp } from "../../../../store/slices/auth/loginSlice";
import { verifyOtp } from "../../../../store/slices/auth/verifyOtp";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);

  const [isOtpSent, setIsOtpSent] = useState(false);
  const [userNotFound, setUserNotFound] = useState(false);
  const [otpSentState, setOtpSentState] = useState(false);
  const [InvalidOtp, setInvalidOtp] = useState(false);
  console.log("isOtpSent", isOtpSent);
  const [countdown, setCountdown] = useState(0);
  const [isVerifying, setIsVerifying] = useState(false);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();

  // Manual dispatch (without typed hook)
  const dispatch = useDispatch();
  const { loading, success, error, message } = useSelector((state: any) => state.auth);

  // Device ID
  const deviceId = "ewb-123";

  // Countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

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

    // Clear error state when user starts typing
    if (InvalidOtp) {
      setInvalidOtp(false);
    }

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Move to next input if value exists and not last input
    if (value && index < 3) {
      otpRefs.current[index + 1]?.focus();
    }

    // Auto-verify when 4th digit is entered
    if (index === 3 && value) {
      const fullOtp = newOtp.join("");
      if (fullOtp.length === 4) {
        // Pass the complete OTP directly to avoid state delay
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden">
          <div className="p-10 space-y-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
              <p className="text-gray-500 mt-2">Login with your email</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter your Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !isOtpSent && email.includes("@") && !loading) {
                      handleSendOTP();
                    }
                  }}
                  placeholder="user@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-base"
                  disabled={isOtpSent}
                />
              </div>
              {userNotFound && <p className="text-red-600 text-sm">User not found</p>}
              {otpSentState && (
                <p className="text-red-600 text-sm">An OTP has already been sent to this email.</p>
              )}

              {!isOtpSent ? (
                <button
                  onClick={handleSendOTP}
                  disabled={loading || !email.includes("@")}
                  className="w-full py-3.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <RotateCw className="w-5 h-5 animate-spin" />
                      Sending OTP...
                    </>
                  ) : (
                    <>Send OTP</>
                  )}
                </button>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-4 text-center">
                      Enter 4-Digit OTP
                    </label>
                    <div className="flex justify-center gap-4">
                      {[0, 1, 2, 3].map((index) => (
                        <input
                          key={index}
                          ref={(el) => (otpRefs.current[index] = el)}
                          type="text"
                          maxLength={1}
                          value={otp[index]}
                          onChange={(e) => handleOtpChange(index, e.target.value)}
                          onKeyDown={(e) => handleKeyDown(index, e)}
                          disabled={isVerifying}
                          className="w-16 h-16 text-center text-2xl font-bold border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                        />
                      ))}
                    </div>

                    {/* Verification Status */}
                    {isVerifying && (
                      <div className="mt-4 flex items-center justify-center gap-2 text-blue-600">
                        <RotateCw className="w-5 h-5 animate-spin" />
                        <span className="text-sm font-medium">Verifying OTP...</span>
                      </div>
                    )}
                  </div>

                  {InvalidOtp && (
                    <p className="text-red-600 text-sm text-center">
                      Invalid OTP. Please try again.
                    </p>
                  )}

                  {/* Resend OTP Link */}
                  <div className="text-center">
                    <button
                      onClick={handleResendOTP}
                      disabled={loading || countdown > 0 || isVerifying}
                      className="text-sm text-blue-600 hover:text-blue-700 disabled:text-gray-400 disabled:cursor-not-allowed underline cursor-pointer transition"
                    >
                      {countdown > 0 ? `Resend OTP in ${countdown}s` : "Resend OTP"}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="text-center py-6 text-sm text-gray-500">Pulse by CRM • © 2025</div>
      </div>
    </div>
  );
}
