"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button/button";
import { getFormErrorMessage } from "@/lib/actions/actions";
import { useAuthLoading } from "@/hooks/use-loading-state";
import LoaderOverlay from "@/components/shared/loader-overlay";
import { Eye, EyeOff } from "@/lib/icons";
import { toast } from "sonner";
import { createSignupSchema, type SignupFormValues } from "@/validations/authValidation";

export default function SignupPage() {
  const t = useTranslations("auth.signup");
  const vt = useTranslations("auth.validation");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const signupSchema = createSignupSchema(vt);
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(values: SignupFormValues) {
    setIsLoading(true);

    try {
      const response = await authAPI.signup(values);

      if (!response.success) {
        toast.error("Signup Failed", {
          description: response.error || "Failed to create account. Please try again.",
        });
        return;
      }

      toast.success("Account Created!", {
        description: "Your account has been created successfully. Please login.",
      });

      router.push("/auth/login");
    } catch (error) {
      toast.error("Signup Failed", {
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className="relative space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">{t("title")}</h1>
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
      <p className="text-sm md:text-base text-muted-foreground text-center">
        {t("hasAccountText")}{" "}
        <a
          className="underline hover:text-primary cursor-pointer transition-colors font-medium"
          href="/auth/login"
        >
          {t("loginLink")}
        </a>
      </p>
    </div>
  );
}
