"use client";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  return (
    <header className="border-b">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        <Link href="/dashboard" className="font-semibold">
          Dashboard
        </Link>
        <nav className="hidden md:flex items-center gap-4 text-sm">
          <Link href="/dashboard" className="hover:underline">
            Home
          </Link>
          <Link href="/" className="hover:underline">
            Site
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
