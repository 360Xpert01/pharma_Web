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
  const { isLoading, executeWithLoading } = useAuthLoading();

  const schema = createSchema(vt("passwordMismatch"));

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  async function onSubmit(values: FormValues) {
    await executeWithLoading(async () => {
      // Simulate API call
      const { sleep } = await import("@/lib/actions/actions");
      await sleep(1500);
      // Reset password and redirect
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
          <label htmlFor="password" className="text-sm font-medium">
            {t("newPasswordLabel")}
          </label>
          <Input
            id="password"
            type="password"
            {...form.register("password")}
            aria-invalid={!!form.formState.errors.password}
          />
          {form.formState.errors.password && (
            <p className="text-sm text-destructive">
              {getFormErrorMessage(form.formState.errors.password)}
            </p>
          )}
        </div>
        <div className="grid gap-2">
          <label htmlFor="confirmPassword" className="text-sm font-medium">
            {t("confirmPasswordLabel")}
          </label>
          <Input
            id="confirmPassword"
            type="password"
            {...form.register("confirmPassword")}
            aria-invalid={!!form.formState.errors.confirmPassword}
          />
          {form.formState.errors.confirmPassword && (
            <p className="text-sm text-destructive">
              {getFormErrorMessage(form.formState.errors.confirmPassword)}
            </p>
          )}
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? t("submittingButton") : t("submitButton")}
        </Button>
      </form>
      <p className="text-sm text-muted-foreground text-center">
        <a className="underline" href="/auth/login">
          {t("backToLogin")}
        </a>
      </p>
    </div>
  );
}
