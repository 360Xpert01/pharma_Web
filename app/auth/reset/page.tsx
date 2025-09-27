"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/common/input";
import { Button } from "@/components/common/button";

const schema = z.object({ password: z.string().min(6) });
type FormValues = z.infer<typeof schema>;

export default function ResetPage() {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { password: "" },
  });
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Reset password</h1>
      <form className="space-y-4" onSubmit={form.handleSubmit(() => {})} noValidate>
        <div className="grid gap-2">
          <label htmlFor="password" className="text-sm font-medium">
            New Password
          </label>
          <Input
            id="password"
            type="password"
            {...form.register("password")}
            aria-invalid={!!form.formState.errors.password}
          />
          {form.formState.errors.password && (
            <p className="text-sm text-destructive">{form.formState.errors.password.message}</p>
          )}
        </div>
        <Button type="submit" className="w-full">
          Update password
        </Button>
      </form>
    </div>
  );
}
