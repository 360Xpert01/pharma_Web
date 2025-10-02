"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getFormErrorMessage } from "@/lib/actions/actions";
import { AUTH_TEXTS } from "@/constants";

const schema = z
  .object({
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: AUTH_TEXTS.validation.passwordMismatch,
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof schema>;

export default function ResetPage() {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">{AUTH_TEXTS.reset.title}</h1>
        <p className="text-muted-foreground">{AUTH_TEXTS.reset.subtitle}</p>
      </div>
      <form className="space-y-4" onSubmit={form.handleSubmit(() => {})} noValidate>
        <div className="grid gap-2">
          <label htmlFor="password" className="text-sm font-medium">
            {AUTH_TEXTS.reset.newPasswordLabel}
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
            {AUTH_TEXTS.reset.confirmPasswordLabel}
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
        <Button type="submit" className="w-full">
          {AUTH_TEXTS.reset.submitButton}
        </Button>
      </form>
      <p className="text-sm text-muted-foreground text-center">
        <a className="underline" href="/auth/login">
          {AUTH_TEXTS.reset.backToLogin}
        </a>
      </p>
    </div>
  );
}
