"use client";
import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import {
  createForgotPasswordSchema,
  type ForgotPasswordFormValues,
} from "@/validations/authValidation";
import { BaseForm } from "@/components/form/base-form";
import type { FormField } from "@/types/form";
import { axiosInstance } from "@/lib/axios/axios-instance";

export default function ForgotPage() {
  const t = useTranslations("auth.forgot");
  const vt = useTranslations("auth.validation");
  const router = useRouter();
  const pathname = usePathname() || "/";
  const [isLoading, setIsLoading] = useState(false);

  const getLocaleFromPath = (p: string) => {
    const m = p.match(/^\/(en|ur)/);
    return m?.[1] || "en";
  };
  const locale = getLocaleFromPath(pathname);

  const forgotPasswordSchema = createForgotPasswordSchema(vt);

  const formFields: FormField[] = [
    {
      id: "email",
      name: "email",
      label: t("emailLabel"),
      type: "email",
      placeholder: t("emailLabel"),
      required: true,
      className: "text-sm md:text-base",
    },
  ];

  async function onSubmit(values: ForgotPasswordFormValues) {
    setIsLoading(true);

    try {
      const response = await axiosInstance.post("/auth/forgot-password", {
        email: values.email,
      });

      if (response.data?.success) {
        toast.success(t("successMessage") || "Reset link sent", {
          description:
            t("successDescription") || "Please check your email for password reset instructions.",
        });

        // Optionally redirect to a confirmation page or stay on the same page
        // router.push(`/${locale}/login`);
      }
    } catch (err: any) {
      const message = err?.response?.data?.message || err?.message || "Failed to send reset link";
      toast.error(t("error") || "Request Failed", {
        description: message,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="relative space-y-6">
      <div className="space-y-2">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">{t("title")}</h1>
        <p className="text-muted-foreground text-sm md:text-sm">{t("subtitle")}</p>
      </div>

      <BaseForm
        fields={formFields}
        onSubmit={onSubmit}
        defaultValues={{ email: "" }}
        validationSchema={forgotPasswordSchema}
        submitText={t("submitButton")}
        renderSubmitButton={({ isSubmitting }) => (
          <button
            type="submit"
            className="w-full cursor-pointer text-sm md:text-base font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            disabled={isLoading || isSubmitting}
          >
            {isLoading || isSubmitting ? (
              <div className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
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
          className="underline hover:text-primary cursor-pointer transition-colors"
        >
          {t("backToLogin")}
        </Link>
      </div>
    </div>
  );
}
