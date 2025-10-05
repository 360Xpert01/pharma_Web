"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { AuthFlowManager } from "@/lib/auth-flow";
import { useAppDispatch } from "@/store/hooks";
import { authActions } from "@/store/slices/auth-slice";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff } from "@/lib/icons";

const createSchema = (passwordMismatchMsg: string) =>
  z
    .object({
      password: z.string().min(6),
      confirmPassword: z.string().min(6),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: passwordMismatchMsg,
      path: ["confirmPassword"],
    });

type FormValues = {
  password: string;
  confirmPassword: string;
};

export default function ResetPage() {
  const t = useTranslations("auth.reset");
  const vt = useTranslations("auth.validation");
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const { isLoading, executeWithLoading } = useAuthLoading();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const schema = createSchema(vt("passwordMismatch"));

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  async function onSubmit(values: FormValues) {
    await executeWithLoading(async () => {
      const flow = AuthFlowManager.getFlow();
      if (!flow?.resetToken) {
        toast({
          title: "Error",
          description: "Reset session expired. Please request a new reset link.",
          variant: "destructive",
        });
        router.push("/auth/forgot");
        return;
      }

      const response = await authAPI.resetPassword({
        token: flow.resetToken,
        password: values.password,
      });

      if (!response.success) {
        toast({
          title: "Reset Failed",
          description: response.error || "Failed to reset password. Please try again.",
          variant: "destructive",
        });
        return;
      }

      // Clear flow state and redirect to login
      AuthFlowManager.clearFlow();
      dispatch(authActions.clearFlow());

      toast({
        title: "Password Reset Successfully",
        description: "Your password has been updated. Please login with your new password.",
      });

      router.push("/auth/login");
    });
  }

  return (
    <AuthRouteGuard requiresFlow="reset">
      <div className="relative space-y-6">
        <LoaderOverlay isLoading={isLoading} />
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">{t("title")}</h1>
          <p className="text-muted-foreground">{t("subtitle")}</p>
        </div>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)} noValidate>
          <div className="grid gap-2">
            <label htmlFor="password" className="text-sm md:text-base font-medium">
              {t("newPasswordLabel")}
            </label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                className="text-sm md:text-base pr-10"
                {...form.register("password")}
                aria-invalid={!!form.formState.errors.password}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {form.formState.errors.password && (
              <p className="text-sm text-destructive">
                {getFormErrorMessage(form.formState.errors.password)}
              </p>
            )}
          </div>
          <div className="grid gap-2">
            <label htmlFor="confirmPassword" className="text-sm md:text-base font-medium">
              {t("confirmPasswordLabel")}
            </label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                className="text-sm md:text-base pr-10"
                {...form.register("confirmPassword")}
                aria-invalid={!!form.formState.errors.confirmPassword}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {form.formState.errors.confirmPassword && (
              <p className="text-sm text-destructive">
                {getFormErrorMessage(form.formState.errors.confirmPassword)}
              </p>
            )}
          </div>
          <Button
            type="submit"
            className="w-full cursor-pointer text-sm md:text-base font-medium"
            disabled={isLoading}
          >
            {isLoading ? t("submittingButton") : t("submitButton")}
          </Button>
        </form>
        <p className="text-sm md:text-base text-muted-foreground text-center">
          <a
            className="underline hover:text-primary cursor-pointer transition-colors font-medium"
            href="/auth/login"
          >
            {t("backToLogin")}
          </a>
        </p>
      </div>
    </AuthRouteGuard>
  );
}
