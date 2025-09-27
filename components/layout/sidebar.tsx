"use client";
import Link from "next/link";

export function Sidebar() {
  return (
    <div className="p-4 space-y-2">
      <Link href="/dashboard" className="block rounded px-3 py-2 hover:bg-muted">
        Overview
      </Link>
      <Link href="/dashboard" className="block rounded px-3 py-2 hover:bg-muted">
        Reports
      </Link>
      <Link href="/dashboard" className="block rounded px-3 py-2 hover:bg-muted">
        Settings
      </Link>
    </div>
  );
}
