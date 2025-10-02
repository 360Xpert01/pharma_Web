"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getFormErrorMessage } from "@/lib/actions/actions";
import { AUTH_TEXTS } from "@/constants";

const schema = z.object({
  code: z.string().min(6),
});
type FormValues = z.infer<typeof schema>;

export default function OtpPage() {
  const form = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { code: "" } });
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">{AUTH_TEXTS.otp.title}</h1>
        <p className="text-muted-foreground">{AUTH_TEXTS.otp.subtitle}</p>
      </div>
      <form className="space-y-4" onSubmit={form.handleSubmit(() => {})} noValidate>
        <div className="grid gap-2">
          <label htmlFor="code" className="text-sm font-medium">
            {AUTH_TEXTS.otp.codeLabel}
          </label>
          <Input id="code" inputMode="numeric" {...form.register("code")} />
          {form.formState.errors.code && (
            <p className="text-sm text-destructive">
              {getFormErrorMessage(form.formState.errors.code)}
            </p>
          )}
        </div>
        <Button type="submit" className="w-full">
          {AUTH_TEXTS.otp.submitButton}
        </Button>
      </form>
      <div className="text-center space-y-2">
        <p className="text-sm text-muted-foreground">
          {AUTH_TEXTS.otp.resendText}{" "}
          <button className="underline text-primary">{AUTH_TEXTS.otp.resendButton}</button>
        </p>
        <p className="text-sm text-muted-foreground">
          <a className="underline" href="/auth/login">
            {AUTH_TEXTS.otp.backToLogin}
          </a>
        </p>
      </div>
    </div>
  );
}
