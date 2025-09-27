"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/store/hooks";
import { authActions } from "@/store/slices/auth-slice";
import { getFormErrorMessage } from "@/lib/actions/actions";
import { useAuthLoading } from "@/hooks/use-loading-state";
import LoaderOverlay from "@/components/shared/loader-overlay";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type FormValues = z.infer<typeof schema>;

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const { isLoading, executeWithLoading } = useAuthLoading();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(values: FormValues) {
    await executeWithLoading(async () => {
      // Simulate API login; integrate axios client here
      // const { data } = await api.auth.login(values)
      // dispatch(authActions.setSession({ token: data.token, user: data.user }))
      
      // Simulate network delay
      const { sleep } = await import('@/lib/actions/actions');
      await sleep(1500);
      
      const fakeToken = "demo-token";
      dispatch(
        authActions.setSession({
          token: fakeToken,
          user: { id: "1", email: values.email, role: "user" },
        })
      );
    });
  }

  return (
    <div className="relative space-y-6">
      <LoaderOverlay isLoading={isLoading} />
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Welcome back</h1>
        <p className="text-muted-foreground">Log in to your account</p>
      </div>
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
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Signing in...' : 'Login'}
        </Button>
      </form>
      <p className="text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <a className="underline" href="/auth/signup">
          Sign up
        </a>
      </p>
    </div>
  );
}
