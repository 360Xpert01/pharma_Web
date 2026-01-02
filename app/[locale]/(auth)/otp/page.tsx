"use client";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { AuthGuard } from "@/lib/auth/auth-guard";
import { axiosInstance } from "@/lib/axios/axios-instance";
import { OTPInput } from "@/components/ui/otp-input";

export default function OtpPage() {
  const t = useTranslations("auth.otp");
  const router = useRouter();
  const pathname = usePathname() || "/";
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [error, setError] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const getLocaleFromPath = (p: string) => {
    const m = p.match(/^\/(en|ur)/);
    return m?.[1] || "en";
  };
  const locale = getLocaleFromPath(pathname);

  // Countdown timer effect
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  async function handleVerify(code: string) {
    if (code.length !== 4) return;

    setIsLoading(true);
    setError(false);

    try {
      const response = await axiosInstance.post("/auth/verify-otp", {
        code,
      });

      if (response.data?.success) {
        toast.success(t("verifiedMessage") || "Verified", {
          description: t("verifiedDescription") || "Your code has been verified successfully.",
        });

        // Redirect to dashboard after successful verification
        router.push(`/${locale}/dashboard`);
      }
    } catch (err: any) {
      setError(true);
      const message = err?.response?.data?.message || err?.message || "Verification failed";
      toast.error(t("verificationFailed") || "Verification failed", {
        description: message,
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleResendCode() {
    if (countdown > 0) return; // Prevent resending if countdown is active

    setIsResending(true);
    // Start 60 second countdown immediately
    setCountdown(60);

    try {
      const response = await axiosInstance.post("/auth/resend-otp");

      if (response.data?.success) {
        toast.success(t("resendSuccess") || "Code Resent", {
          description:
            t("resendSuccessDescription") || "A new verification code has been sent to your email.",
        });
        // Clear the OTP input
        setOtpCode("");
        setError(false);
      }
    } catch (err: any) {
      const message = err?.response?.data?.message || err?.message || "Failed to resend code";
      toast.error(t("resendFailed") || "Resend Failed", {
        description: message,
      });
      // Reset countdown on error
      setCountdown(0);
    } finally {
      setIsResending(false);
    }
  }

  const handleOtpChange = (value: string) => {
    setOtpCode(value);
    setError(false);
  };

  const handleOtpComplete = (value: string) => {
    handleVerify(value);
  };

  return (
    <AuthGuard>
      <div className="relative space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">{t("title")}</h1>
          <p className="text-muted-foreground text-sm md:text-base">{t("subtitle")}</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm md:text-base font-medium block text-center">
              {t("codeLabel")}
            </label>
            <OTPInput
              length={4}
              value={otpCode}
              onChange={handleOtpChange}
              onComplete={handleOtpComplete}
              disabled={isLoading}
              error={error}
              className="my-4"
            />
            {error && (
              <p className="text-sm text-destructive text-center">
                {t("verificationFailed") || "Invalid verification code"}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={() => handleVerify(otpCode)}
            disabled={isLoading || otpCode.length !== 4}
            className="w-full cursor-pointer text-sm md:text-base font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-8 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-8 h-4 w-4 border-2 border-white border-t-transparent" />
                {t("submittingButton")}
              </div>
            ) : (
              t("submitButton")
            )}
          </button>
        </div>

        <div className="text-center space-y-2">
          <p className="text-sm md:text-base text-muted-foreground">
            {t("resendText")}{" "}
            <button
              type="button"
              onClick={handleResendCode}
              disabled={countdown > 0}
              className="underline text-primary hover:text-primary/80 cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {countdown > 0 ? `${countdown}` : t("resendButton")}
            </button>
          </p>
          <p className="text-sm md:text-base text-muted-foreground">
            <Link
              href={`/${locale}/login`}
              className="underline hover:text-primary cursor-pointer transition-colors"
            >
              {t("backToLogin")}
            </Link>
          </p>
        </div>
      </div>
    </AuthGuard>
  );
}
