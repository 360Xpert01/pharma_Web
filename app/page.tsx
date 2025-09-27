"use client";
import { useEffect } from "react";
import { useLayout } from "@/contexts/layout-context";
import { Button } from "@/components/common/button";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { DynamicLayout } from "@/components/layout/dynamic-layout";

export default function HomePage() {
  const { applyPreset } = useLayout();

  useEffect(() => {
    // Apply website preset for landing page
    applyPreset('website');
  }, [applyPreset]);

  return (
    <DynamicLayout>
      {/* Landing page content - this will be wrapped by the dynamic layout */}
      <div className="min-h-screen flex flex-col">
        {/* Custom header for landing page when using website preset */}
        <div className="flex-1 py-16">
          <div className="mx-auto max-w-6xl px-6 grid gap-8 md:grid-cols-2 items-center">
            <div className="space-y-6">
              <h1 className="text-3xl md:text-5xl font-bold text-balance">
                Ship fast with a configurable, typed, and scalable Next.js starter
              </h1>
              <p className="text-muted-foreground leading-relaxed">
                Includes Redux Toolkit + Persist, React Query, Zod + React Hook Form, next-themes with
                light/dark/ocean, axios with interceptors, and a powerful configurable layout system
                that adapts to websites, dashboards, and portals.
              </p>
              <div className="flex gap-3">
                <Button asChild>
                  <a href="/dashboard" aria-label="Open dashboard">
                    Open Dashboard
                  </a>
                </Button>
                <Button variant="secondary" asChild>
                  <a href="/dashboard/layout-settings" aria-label="Try layout settings">
                    Try Layout Settings
                  </a>
                </Button>
              </div>
            </div>
            <div className="rounded-lg border p-6">
              <div className="aspect-video rounded-md bg-muted flex items-center justify-center">
                <div className="text-center space-y-2">
                  <div className="text-2xl font-bold">🎨</div>
                  <p className="text-sm text-muted-foreground">
                    Configurable Layout System
                  </p>
                </div>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Dynamically configure headers, sidebars, footers, and content layouts with real-time preview.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DynamicLayout>
  );
}
