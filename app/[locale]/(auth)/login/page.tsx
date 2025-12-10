"use client";

import React, { useState, useRef } from "react";
import { Send, RotateCw } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LoginScreen() {
  const [phoneOrEmail, setPhoneOrEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();
  const [emailError, setEmailError] = useState("");

  const isValidEmail = (email: string) => {
    return email.includes("@") && email.includes(".") && email.length > 5;
  };
  const handleSendOTP = () => {
    if (!phoneOrEmail.trim()) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsOtpSent(true);
      setIsLoading(false);
      setCountdown(30);
      toast.success("OTP sent successfully!");

      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }, 1500);
  };

  const handleResendOTP = () => {
    setCountdown(30);
    setOtp(["", "", "", ""]);
    otpRefs.current[0]?.focus();
    toast.success("OTP Resent!");
  };

  const handleVerifyOTP = () => {
    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 4) {
      toast.error("Please enter 4-digit OTP");
      return;
    }

    if (enteredOtp === "7866") {
      // Success: Save login data in localStorage
      const loginData = {
        email: phoneOrEmail.trim(),
        otp: enteredOtp,
        isLoggedIn: true,
        loginTime: new Date().toISOString(),
      };

      localStorage.setItem("userSession", JSON.stringify(loginData));
      // Optional: Cookies mein bhi daal do (extra safety)
      document.cookie = `userSession=${JSON.stringify(loginData)}; path=/; max-age=86400`; // 24 hours

      toast.success("Login Successful! Welcome back 🎉");

      // Redirect to dashboard
      router.push("/dashboard");
    } else {
      toast.error("Invalid OTP. Please try again.");
      alert("Invalid OTP. Please try again.");
    }
  };

  // Baki functions same
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
    <div className="">
      <div className="w-full ">
        <div className="bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden">
          <div className="p-10 space-y-8">
            {/* Title */}
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
                  type="email" // ← type="text" se "email" kar diya (extra safety)
                  value={phoneOrEmail}
                  onChange={(e) => {
                    setPhoneOrEmail(e.target.value);
                    setEmailError(""); // clear error on typing
                  }}
                  onBlur={() => {
                    if (phoneOrEmail && !phoneOrEmail.includes("@")) {
                      setEmailError("Email must contain @ symbol");
                      toast.error("Please enter a valid email with @");
                    }
                  }}
                  placeholder=" user@example.com"
                  className={`w-full px-5 py-4 border rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-lg ${
                    emailError ? "border-red-500" : "border-gray-300"
                  }`}
                  disabled={isOtpSent}
                />
                {emailError && <p className="text-red-500 text-sm mt-2">{emailError}</p>}
              </div>

              {!isOtpSent ? (
                <button
                  onClick={handleSendOTP}
                  disabled={!phoneOrEmail.includes("@") || isLoading}
                  className="w-full py-4 bg-blue-600 text-white font-semibold rounded-2xl hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 shadow-lg flex items-center justify-center gap-3"
                >
                  {isLoading ? (
                    <>
                      <RotateCw className="w-5 h-5 animate-spin" />
                      Sending OTP...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send OTP
                    </>
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

                  <div className="space-y-4">
                    <button
                      onClick={handleResendOTP}
                      disabled={countdown > 0}
                      className="w-full py-3 border border-gray-300 text-gray-600 font-medium rounded-xl hover:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
                    >
                      <RotateCw className={`w-4 h-4 ${countdown > 0 ? "animate-spin" : ""}`} />
                      {countdown > 0 ? `Resend OTP in ${countdown}s` : "Resend OTP"}
                    </button>

                    <button
                      onClick={handleVerifyOTP}
                      className="w-full py-4 bg-blue-600 text-white font-semibold rounded-2xl hover:bg-blue-700 transition shadow-lg flex items-center justify-center gap-3"
                    >
                      Login
                    </button>
                  </div>

                  <div className="text-center text-sm text-green-600 font-medium">
                    OTP sent successfully!
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
