"use client";
import { useTheme } from "next-themes";
import { Button } from "@/components/common/button";

const next = (current: string | undefined) => {
  const order = ["light", "dark", "ocean"];
  const idx = Math.max(0, order.indexOf(current || "light"));
  return order[(idx + 1) % order.length];
};

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <Button variant="secondary" onClick={() => setTheme(next(theme))} aria-label="Toggle theme">
      Theme: {theme ?? "system"}
    </Button>
  );
}
