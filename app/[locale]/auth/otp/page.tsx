"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getFormErrorMessage } from "@/lib/actions/actions";
import { useTranslations } from "next-intl";
import { useAuthLoading } from "@/hooks/use-loading-state";
import LoaderOverlay from "@/components/shared/loader-overlay";
import { AuthRouteGuard } from "@/components/auth/auth-route-guard";
import { authAPI } from "@/lib/api/auth";
import { AuthFlowManager, setAuthSession } from "@/lib/auth-flow";
import { useAppDispatch } from "@/store/hooks";
import { authActions } from "@/store/slices/auth-slice";
import { toast } from "sonner";
import { createOtpSchema, type OtpFormValues } from "@/validations/authValidation";

export default function OtpPage() {
  const t = useTranslations("auth.otp");
  const vt = useTranslations("auth.validation");
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const otpSchema = createOtpSchema(vt);
  const form = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: { code: "" },
  });

  async function onSubmit(values: OtpFormValues) {
    setIsLoading(true);

    try {
      const flow = AuthFlowManager.getFlow();
      if (!flow?.email) {
        toast.error("Session Expired", {
          description: "Please login again.",
        });
        router.push("/auth/login");
        return;
      }

      const response = await authAPI.verifyOtp({
        email: flow.email,
        otp: values.code,
      });

      if (!response.success) {
        toast.error("Verification Failed", {
          description: response.error || "Invalid or expired OTP code.",
        });
        return;
      }

      // OTP verified successfully
      const { token, user } = response.data as { token: string; user: any };
      setAuthSession(token, user);
      dispatch(authActions.setSession({ token, user }));

      toast.success("Welcome!", {
        description: "Your account has been verified successfully.",
      });

      router.push("/dashboard");
    } catch (error) {
      toast.error("Verification Failed", {
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthRouteGuard requiresFlow="otp">
      <div className="relative space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">{t("title")}</h1>
          <p className="text-muted-foreground">{t("subtitle")}</p>
        </div>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)} noValidate>
          <div className="grid gap-2">
            <label htmlFor="code" className="text-sm font-medium">
              {t("codeLabel")}
            </label>
            <Input id="code" inputMode="numeric" {...form.register("code")} />
            {form.formState.errors.code && (
              <p className="text-sm text-destructive">
                {getFormErrorMessage(form.formState.errors.code)}
              </p>
            )}
          </div>
          <Button
            type="submit"
            className="w-full cursor-pointer text-sm md:text-base font-medium"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                {t("submittingButton")}
              </div>
            ) : (
              t("submitButton")
            )}
          </Button>
        </form>
        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            {t("resendText")}{" "}
            <button className="underline text-primary hover:text-primary/80 cursor-pointer">
              {t("resendButton")}
            </button>
          </p>
          <p className="text-sm text-muted-foreground">
            <a className="underline hover:text-primary cursor-pointer" href="/auth/login">
              {t("backToLogin")}
            </a>
          </p>
        </div>
      </div>
    </AuthRouteGuard>
  );
}
