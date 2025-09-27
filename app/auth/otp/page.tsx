"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getFormErrorMessage } from "@/lib/actions/actions";

const schema = z.object({
  code: z.string().min(6),
});
type FormValues = z.infer<typeof schema>;

export default function OtpPage() {
  const form = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { code: "" } });
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Verify code</h1>
      <form className="space-y-4" onSubmit={form.handleSubmit(() => {})} noValidate>
        <div className="grid gap-2">
          <label htmlFor="code" className="text-sm font-medium">
            OTP Code
          </label>
          <Input id="code" inputMode="numeric" {...form.register("code")} />
          {form.formState.errors.code && (
            <p className="text-sm text-destructive">{getFormErrorMessage(form.formState.errors.code)}</p>
          )}
        </div>
        <Button type="submit" className="w-full">
          Verify
        </Button>
      </form>
    </div>
  );
}
