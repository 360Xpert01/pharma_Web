"use client";
import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { loginUser } from "@/store/slices/auth-slice";
import { toast } from "sonner";
import { createLoginSchema, type LoginFormValues } from "@/validations/authValidation";
import { BaseForm } from "@/components/form/base-form";
import type { FormField } from "@/types/form";

export default function LoginPage() {
  const t = useTranslations("auth.login");
  const vt = useTranslations("auth.validation");
  const router = useRouter();
  const pathname = usePathname() || "/";
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const getLocaleFromPath = (p: string) => {
    const m = p.match(/^\/(en|ur)/);
    return m?.[1] || "en";
  };
  const locale = getLocaleFromPath(pathname);

  const loginSchema = createLoginSchema(vt);

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
    {
      id: "password",
      name: "password",
      label: t("passwordLabel"),
      type: "password",
      placeholder: t("passwordLabel"),
      required: true,
      className: "text-sm md:text-base",
    },
  ];

  async function onSubmit(values: LoginFormValues) {
    setIsLoading(true);

    try {
      // use redux thunk that handles axios + cookie internally
      await dispatch(loginUser({ email: values.email, password: values.password })).unwrap();

      toast.success(t("success") || "Logged in");

      // go to dashboard after successful login
      router.push(`/${locale}/dashboard`);
    } catch (err: any) {
      const message = typeof err === "string" ? err : err?.message || "Login failed";
      toast.error(t("error") || "Login failed", {
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

      <div className="space-y-4">
        <BaseForm
          fields={formFields}
          onSubmit={onSubmit}
          defaultValues={{ email: "", password: "" }}
          validationSchema={loginSchema}
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

        <div className="text-right">
          <Link
            href={`/${locale}/forgot`}
            className="text-sm md:text-base text-muted-foreground underline hover:text-primary cursor-pointer transition-colors"
          >
            {t("forgotLink")}
          </Link>
        </div>
      </div>

      <div className="text-center text-sm md:text-base text-muted-foreground">
        <p>
          {t("noAccountText")}{" "}
          <Link
            href={`/${locale}/signup`}
            className="underline hover:text-primary cursor-pointer transition-colors font-medium"
          >
            {t("signupLink")}
          </Link>
        </p>
      </div>
    </div>
  );
}
