"use client";
import { useEffect } from "react";
import { useLayout } from "@/contexts/layout-context";
import { Button } from "@/components/common/button";
import { ThemeToggle } from "@/components/layout/theme-toggle";

export default function HomePage() {
  const { setHeader } = useLayout();

  useEffect(() => {
    // landing experience: no admin header/sidebar
    setHeader(false);
  }, [setHeader]);

  return (
    <main className="min-h-dvh flex flex-col">
      <header className="w-full border-b">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-md bg-primary" aria-hidden />
            <span className="font-semibold text-pretty">Next Tailwind TS Starter</span>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button asChild>
              <a href="/auth/login" aria-label="Go to login">
                Login
              </a>
            </Button>
          </div>
        </div>
      </header>

      <section className="flex-1">
        <div className="mx-auto max-w-6xl px-6 py-16 grid gap-8 md:grid-cols-2 items-center">
          <div className="space-y-6">
            <h1 className="text-3xl md:text-5xl font-bold text-balance">
              Ship fast with a typed, themed, and scalable Next.js starter
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              Includes Redux Toolkit + Persist, React Query, Zod + React Hook Form, next-themes with
              light/dark/ocean, axios with interceptors, and starter layouts for landing, auth, and
              admin.
            </p>
            <div className="flex gap-3">
              <Button asChild>
                <a href="/dashboard" aria-label="Open dashboard">
                  Open Dashboard
                </a>
              </Button>
              <Button variant="secondary" asChild>
                <a href="/auth/signup" aria-label="Create an account">
                  Create Account
                </a>
              </Button>
            </div>
          </div>
          <div className="rounded-lg border p-6">
            <div className="aspect-video rounded-md bg-muted" aria-hidden />
            <p className="mt-4 text-sm text-muted-foreground">
              Starter includes typed API client, sockets, utilities, and RBAC examples.
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t">
        <div className="mx-auto max-w-6xl px-6 py-8 text-sm text-muted-foreground">
          © {new Date().getFullYear()} Next Tailwind TS Starter
        </div>
      </footer>
    </main>
  );
}
