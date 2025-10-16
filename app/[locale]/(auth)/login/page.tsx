"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button/button";
import { useAppDispatch } from "@/store/hooks";
import { loginUser } from "@/store/slices/auth-slice";
import { getFormErrorMessage } from "@/lib/actions/actions";
import { Eye, EyeOff } from "@/lib/icons";
import { toast } from "sonner";
import { createLoginSchema, type LoginFormValues } from "@/validations/authValidation";

export default function LoginPage() {
  const t = useTranslations("auth.login");
  const vt = useTranslations("auth.validation");
  const router = useRouter();
  const pathname = usePathname() || "/";
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const loginSchema = createLoginSchema(vt);
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const getLocaleFromPath = (p: string) => {
    const m = p.match(/^\/(en|ur)/);
    return m?.[1] || "en";
  };
  const locale = getLocaleFromPath(pathname);

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
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <div className="grid gap-2">
          <label htmlFor="email" className="text-sm md:text-base font-medium">
            {t("emailLabel")}
          </label>
          <Input
            id="email"
            type="email"
            className="text-sm md:text-base"
            {...form.register("email")}
            aria-invalid={!!form.formState.errors.email}
          />
          {form.formState.errors.email && (
            <p className="text-sm text-destructive">
              {getFormErrorMessage(form.formState.errors.email)}
            </p>
          )}
        </div>
        <div className="grid gap-2">
          <label htmlFor="password" className="text-sm md:text-base font-medium">
            {t("passwordLabel")}
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
        <div className="text-right">
          <a
            className="text-sm md:text-base text-muted-foreground underline hover:text-primary cursor-pointer transition-colors"
            href={`/${locale}/forgot`}
          >
            {t("forgotLink")}
          </a>
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
      <div className="text-center text-sm md:text-base text-muted-foreground">
        <p>
          {t("noAccountText")}{" "}
          <a
            className="underline hover:text-primary cursor-pointer transition-colors font-medium"
            href={`/${locale}/signup`}
          >
            {t("signupLink")}
          </a>
        </p>
      </div>
    </div>
  );
}
