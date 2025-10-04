"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getFormErrorMessage } from "@/lib/actions/actions";
import { useAuthLoading } from "@/hooks/use-loading-state";
import LoaderOverlay from "@/components/shared/loader-overlay";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type FormValues = z.infer<typeof schema>;

export default function SignupPage() {
  const t = useTranslations("auth.signup");
  const vt = useTranslations("auth.validation");
  const { isLoading, executeWithLoading } = useAuthLoading();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(values: FormValues) {
    await executeWithLoading(async () => {
      // Simulate API signup; integrate axios client here
      // const { data } = await api.auth.signup(values)

      // Simulate network delay
      const { sleep } = await import("@/lib/actions/actions");
      await sleep(1500);

      window.location.href = "/auth/login";
    });
  }
  return (
    <div className="relative space-y-6">
      <LoaderOverlay isLoading={isLoading} />
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">{t("title")}</h1>
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
        <div className="grid gap-2">
          <label htmlFor="password" className="text-sm font-medium">
            {t("passwordLabel")}
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
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? t("submittingButton") : t("submitButton")}
        </Button>
      </form>
      <p className="text-sm text-muted-foreground">
        {t("hasAccountText")}{" "}
        <a className="underline" href="/auth/login">
          {t("loginLink")}
        </a>
      </p>
    </div>
  );
}
