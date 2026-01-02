"use client";

import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { BaseForm } from "@/components/form/base-form";
import type { FormField } from "@/types/form";
import {
  createResetPasswordSchema,
  type ResetPasswordFormValues,
} from "@/validations/authValidation";
import { axiosInstance } from "@/lib/axios/axios-instance";

export default function ResetPage() {
  const t = useTranslations("auth.reset");
  const vt = useTranslations("auth.validation");
  const router = useRouter();
  const pathname = usePathname() || "/";
  const [isLoading, setIsLoading] = useState(false);
  const getLocaleFromPath = (p: string) => {
    const m = p.match(/^\/(en|ur)/);
    return m?.[1] || "en";
  };
  const locale = getLocaleFromPath(pathname);

  const resetPasswordSchema = createResetPasswordSchema(vt);

  const formFields: FormField[] = [
    {
      id: "password",
      name: "password",
      type: "password",
      label: t("newPasswordLabel"),
      placeholder: t("newPasswordLabel"),
      required: true,
      className: "text-sm md:text-base",
    },
    {
      id: "confirmPassword",
      name: "confirmPassword",
      type: "password",
      label: t("confirmPasswordLabel"),
      placeholder: t("confirmPasswordLabel"),
      required: true,
      className: "text-sm md:text-base",
    },
  ];

  async function onSubmit(values: ResetPasswordFormValues) {
    setIsLoading(true);

    try {
      const response = await axiosInstance.post("/auth/reset-password", {
        password: values.password,
        confirmPassword: values.confirmPassword,
      });

      if (response.data?.success) {
        toast.success(t("successMessage") || "Password Reset Successfully", {
          description:
            t("successDescription") ||
            "Your password has been updated. Please login with your new password.",
        });
        router.push(`/${locale}/login`);
      }
    } catch (err: any) {
      const message = err?.response?.data?.message || err?.message || "Password reset failed";
      toast.error(t("error") || "Reset Failed", {
        description: message,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="relative space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">{t("title")}</h1>
        <p className="text-muted-foreground text-sm md:text-base">{t("subtitle")}</p>
      </div>

      <BaseForm
        fields={formFields}
        onSubmit={onSubmit}
        defaultValues={{ password: "", confirmPassword: "" }}
        validationSchema={resetPasswordSchema}
        submitText={t("submitButton")}
        renderSubmitButton={({ isSubmitting }) => (
          <button
            type="submit"
            className="w-full cursor-pointer text-sm md:text-base font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-8 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            disabled={isLoading || isSubmitting}
          >
            {isLoading || isSubmitting ? (
              <div className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-8 h-4 w-4 border-2 border-white border-t-transparent" />
                {t("submittingButton")}
              </div>
            ) : (
              t("submitButton")
            )}
          </button>
        )}
      />

      <div className="text-center text-sm md:text-base text-muted-foreground">
        <Link
          href={`/${locale}/login`}
          className="underline hover:text-primary cursor-pointer transition-colors font-medium"
        >
          {t("backToLogin")}
        </Link>
      </div>
    </div>
  );
}
