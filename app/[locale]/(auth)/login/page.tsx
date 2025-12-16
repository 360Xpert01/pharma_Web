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
  const handleVerifyOTP = async () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length !== 4) {
      toast.error("Please enter 4-digit OTP");
      return;
    }

    setIsVerifying(true);

    try {
      const result = await dispatch(
        verifyOtp({
          deviceId,
          otp: Number(enteredOtp),
        })
      );

      if (result.payload?.success) {
        const loginData = result?.payload?.data?.accessToken;

        localStorage.setItem("userSession", JSON.stringify(loginData));
        document.cookie = `userSession=${JSON.stringify(loginData)}; path=/; max-age=86400`;

        toast.success("Login Successful! Welcome back 🎉");
        router.push("/dashboard");
      } else {
        setInvalidOtp(true);
        toast.error(result.payload?.message || "Invalid OTP. Please try again.");
      }
    } catch (err: any) {
      setInvalidOtp(true);
      toast.error(err.message || "Invalid OTP. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 3) {
      otpRefs.current[index + 1]?.focus();
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
                  placeholder=" user@example.com"
                  className="w-full px-2 py-4 border border-gray-300 rounded-2xl  outline-none transition-all text-lg"
                  disabled={isOtpSent}
                />
              </div>
              {userNotFound && <p className="text-red-600 text-xs ">User not found</p>}
              {otpSentState && (
                <p className="text-red-600 text-xs ">An OTP has already been sent to this email.</p>
              )}

              {!isOtpSent ? (
                <button
                  onClick={handleSendOTP}
                  disabled={loading || !email.includes("@")}
                  className="w-full py-4 bg-blue-600 text-white font-semibold rounded-2xl hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 shadow-lg flex items-center justify-center gap-3"
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
                          className="w-16 h-16 text-center text-2xl font-bold border-2 border-gray-300 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none transition-all"
                        />
                      ))}
                    </div>
                  </div>
                  {InvalidOtp && <p className="text-red-600 text-xs ">Invalid OTP</p>}
                  <div className="space-y-4">
                    <button
                      onClick={handleResendOTP}
                      disabled={loading || countdown > 0}
                      className="w-full py-3 border border-gray-300 text-gray-600 font-medium rounded-xl hover:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
                    >
                      Resend OTP
                    </button>

                    <button
                      onClick={handleVerifyOTP}
                      disabled={isVerifying}
                      className="w-full py-4 bg-blue-600 text-white font-semibold rounded-2xl hover:bg-blue-700 disabled:bg-gray-400 transition shadow-lg flex items-center justify-center gap-3"
                    >
                      {isVerifying ? (
                        <>
                          <RotateCw className="w-5 h-5 animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        "Login"
                      )}
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
