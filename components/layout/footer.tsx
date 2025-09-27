"use client";
import Link from "next/link";
import { footerLinks } from "@/navigation/links";

export function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-7xl px-4 py-6 text-sm flex flex-wrap items-center gap-x-4 gap-y-2">
        {footerLinks.map((l) => (
          <Link key={l.href} href={l.href} className="text-muted-foreground hover:underline">
            {l.label}
          </Link>
        ))}
        <span className="ml-auto text-muted-foreground">© {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}
