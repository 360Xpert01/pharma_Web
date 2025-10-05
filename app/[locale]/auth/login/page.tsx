"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/store/hooks";
import { authActions } from "@/store/slices/auth-slice";
import { getFormErrorMessage } from "@/lib/actions/actions";
import { useAuthLoading } from "@/hooks/use-loading-state";
import LoaderOverlay from "@/components/shared/loader-overlay";
import { authAPI } from "@/lib/api/auth";
import { AuthFlowManager, setAuthSession } from "@/lib/auth-flow";
import { Eye, EyeOff } from "@/lib/icons";
import { toast } from "sonner";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type FormValues = z.infer<typeof schema>;

export default function LoginPage() {
  const t = useTranslations("auth.login");
  const vt = useTranslations("auth.validation");
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);

    try {
      const response = await authAPI.login(values);

      if (!response.success) {
        toast.error("Login Failed", {
          description: response.error || "Please check your credentials and try again.",
        });
        return;
      }

      // Check if the API response requires OTP verification
      const loginData = response.data as any;
      if (loginData?.requiresOtp) {
        // Set auth flow to awaiting OTP
        AuthFlowManager.setFlow({
          step: "awaiting-otp",
          email: values.email,
        });

        dispatch(
          authActions.setFlowStep({
            step: "awaiting-otp",
            email: values.email,
          })
        );

        toast.success("OTP Sent", {
          description: "Please check your email for the verification code.",
        });

        router.push("/auth/otp");
      } else {
        // Direct login success
        const { token, user } = loginData as { token: string; user: any };
        setAuthSession(token, user);
        dispatch(authActions.setSession({ token, user }));

        toast.success("Welcome back!", {
          description: "You have been logged in successfully.",
        });

        router.push("/dashboard");
      }
    } catch (error) {
      toast.error("Login Failed", {
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
            href="/auth/forgot"
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
            href="/auth/signup"
          >
            {t("signupLink")}
          </a>
        </p>
      </div>
    </div>
  );
}
