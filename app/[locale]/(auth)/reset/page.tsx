"use client";

import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useToast } from "@/hooks/use-toast";
import { useAuthLoading } from "@/hooks/use-loading-state";
import { BaseForm } from "@/components/form/base-form";
import {
  createResetPasswordSchema,
  type ResetPasswordFormValues,
} from "@/validations/authValidation";

export default function ResetPage() {
  const t = useTranslations("auth.reset");
  const vt = useTranslations("auth.validation");
  const router = useRouter();
  const pathname = usePathname() || "/";
  const { toast } = useToast();
  const { isLoading, executeWithLoading } = useAuthLoading();

  // derive locale to keep redirects consistent with middleware/routes
  const getLocaleFromPath = (p: string) => {
    const m = p.match(/^\/(en|ur)/);
    return m?.[1] || "en";
  };
  const locale = getLocaleFromPath(pathname);

  const resetPasswordSchema = createResetPasswordSchema(vt);

  const fields = [
    {
      id: "password",
      name: "password",
      type: "password",
      label: t("newPasswordLabel") || "New password",
      placeholder: t("newPasswordLabel") || "New password",
    },
    {
      id: "confirmPassword",
      name: "confirmPassword",
      type: "password",
      label: t("confirmPasswordLabel") || "Confirm password",
      placeholder: t("confirmPasswordLabel") || "Confirm password",
    },
  ];

  async function onSubmit(values: ResetPasswordFormValues) {
    await executeWithLoading(async () => {
      try {
        // No API call here — simulate success (replace with real request when needed)
        toast({
          title: t("success.title") || "Password Reset Successfully",
          description:
            t("success.description") ||
            "Your password has been updated. Please login with your new password.",
        });

        router.push(`/${locale}/auth/login`);
      } catch (error) {
        toast({
          title: t("errors.resetFailed") || "Reset Failed",
          description: (error as Error)?.message || "Something went wrong.",
          variant: "destructive",
        });
      }
    });
  }

  return (
    <div className="relative space-y-6 max-w-md mx-auto">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">{t("title")}</h1>
        <p className="text-muted-foreground">{t("subtitle")}</p>
      </div>

      <BaseForm
        schema={{
          fields,
          onSubmit,
          defaultValues: { password: "", confirmPassword: "" },
          validationSchema: resetPasswordSchema,
        }}
        submitText={t("submitButton") || "Submit"}
        className=""
        loading={isLoading}
      />

      <p className="text-sm md:text-base text-muted-foreground text-center">
        <Link
          className="underline hover:text-primary cursor-pointer transition-colors font-medium"
          href={`/${locale}/login`}
        >
          {t("backToLogin")}
        </Link>
      </p>
    </div>
  );
}
