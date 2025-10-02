"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getFormErrorMessage } from "@/lib/actions/actions";

const schema = z.object({ email: z.string().email() });
type FormValues = z.infer<typeof schema>;

export default function ForgotPage() {
  const t = useTranslations("auth.forgot");
  const form = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { email: "" } });
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">{t("title")}</h1>
        <p className="text-muted-foreground">{t("subtitle")}</p>
      </div>
      <form className="space-y-4" onSubmit={form.handleSubmit(() => {})} noValidate>
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
        <Button type="submit" className="w-full">
          {t("submitButton")}
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
