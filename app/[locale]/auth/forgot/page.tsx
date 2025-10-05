"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getFormErrorMessage } from "@/lib/actions/actions";
import { useAuthLoading } from "@/hooks/use-loading-state";
import LoaderOverlay from "@/components/shared/loader-overlay";
import { authAPI } from "@/lib/api/auth";
import { AuthFlowManager } from "@/lib/auth-flow";
import { useAppDispatch } from "@/store/hooks";
import { authActions } from "@/store/slices/auth-slice";
import { useToast } from "@/hooks/use-toast";

const schema = z.object({ email: z.string().email() });
type FormValues = z.infer<typeof schema>;

export default function ForgotPage() {
  const t = useTranslations("auth.forgot");
  const vt = useTranslations("auth.validation");
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const { isLoading, executeWithLoading } = useAuthLoading();

  const form = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { email: "" } });

  async function onSubmit(values: FormValues) {
    await executeWithLoading(async () => {
      const response = await authAPI.forgotPassword(values.email);

      if (!response.success) {
        toast({
          title: "Request Failed",
          description: response.error || "Failed to send reset email. Please try again.",
          variant: "destructive",
        });
        return;
      }

      // Set flow state for reset password if reset token is provided
      const resetData = response.data as any;
      const resetToken = resetData?.resetToken;
      if (resetToken) {
        AuthFlowManager.setFlow({
          step: "reset-password",
          email: values.email,
          resetToken,
        });

        dispatch(
          authActions.setFlowStep({
            step: "reset-password",
            email: values.email,
            resetToken,
          })
        );

        toast({
          title: "Reset Link Sent",
          description: "Please check your email for password reset instructions.",
        });

        router.push("/auth/reset");
      } else {
        toast({
          title: "Email Sent",
          description: "If an account with this email exists, you will receive reset instructions.",
        });
      }
    });
  }
  return (
    <div className="relative space-y-6">
      <LoaderOverlay isLoading={isLoading} />
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">{t("title")}</h1>
        <p className="text-muted-foreground">{t("subtitle")}</p>
      </div>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <div className="grid gap-2">
          <label htmlFor="email" className="text-sm font-medium">
            {t("emailLabel")}
          </label>
          <Input
            id="email"
            type="email"
            {...form.register("email")}
            aria-invalid={!!form.formState.errors.email}
          />
          {form.formState.errors.email && (
            <p className="text-sm text-destructive">
              {getFormErrorMessage(form.formState.errors.email)}
            </p>
          )}
        </div>
        <Button type="submit" className="w-full cursor-pointer" disabled={isLoading}>
          {isLoading ? t("submittingButton") : t("submitButton")}
        </Button>
      </form>
      <p className="text-sm text-muted-foreground text-center">
        <a className="underline hover:text-primary cursor-pointer" href="/auth/login">
          {t("backToLogin")}
        </a>
      </p>
    </div>
  );
}
