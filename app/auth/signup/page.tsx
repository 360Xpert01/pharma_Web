"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getFormErrorMessage } from "@/lib/actions/actions";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type FormValues = z.infer<typeof schema>;

export default function SignupPage() {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
  });
  async function onSubmit(values: FormValues) {
    // await api.auth.signup(values)
    window.location.href = "/auth/login";
  }
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Create an account</h1>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <div className="grid gap-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <Input
            id="email"
            type="email"
            {...form.register("email")}
            aria-invalid={!!form.formState.errors.email}
          />
          {form.formState.errors.email && (
            <p className="text-sm text-destructive">{getFormErrorMessage(form.formState.errors.email)}</p>
          )}
        </div>
        <div className="grid gap-2">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <Input
            id="password"
            type="password"
            {...form.register("password")}
            aria-invalid={!!form.formState.errors.password}
          />
          {form.formState.errors.password && (
            <p className="text-sm text-destructive">{getFormErrorMessage(form.formState.errors.password)}</p>
          )}
        </div>
        <Button type="submit" className="w-full">
          Sign up
        </Button>
      </form>
    </div>
  );
}
