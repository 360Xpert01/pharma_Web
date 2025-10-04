"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getFormErrorMessage } from "@/lib/actions/actions";
import { useTranslations } from "next-intl";
import { useAuthLoading } from "@/hooks/use-loading-state";
import LoaderOverlay from "@/components/shared/loader-overlay";

const schema = z.object({
  code: z.string().min(6),
});
type FormValues = z.infer<typeof schema>;

export default function OtpPage() {
  const t = useTranslations("auth.otp");
  const vt = useTranslations("auth.validation");
  const { isLoading, executeWithLoading } = useAuthLoading();

  const form = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { code: "" } });

  async function onSubmit(values: FormValues) {
    await executeWithLoading(async () => {
      // Simulate API call
      const { sleep } = await import("@/lib/actions/actions");
      await sleep(1500);
      // Verify OTP and redirect
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
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? t("submittingButton") : t("submitButton")}
        </Button>
      </form>
      <div className="text-center space-y-2">
        <p className="text-sm text-muted-foreground">
          {t("resendText")} <button className="underline text-primary">{t("resendButton")}</button>
        </p>
        <p className="text-sm text-muted-foreground">
          <a className="underline" href="/auth/login">
            {t("backToLogin")}
          </a>
        </p>
      </div>
    </div>
  );
}
