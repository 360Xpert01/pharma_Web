"use client";
import { type PropsWithChildren, useEffect } from "react";
import { useLayout } from "@/contexts/layout-context";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";

export default function DashboardLayout({ children }: PropsWithChildren) {
  const { header, setHeader } = useLayout();

  useEffect(() => {
    // dashboard prefers admin chrome enabled
    if (!header) setHeader(true);
  }, [header, setHeader]);

  return (
    <div className="min-h-dvh grid grid-rows-[auto_1fr]">
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr]">
        <aside className="hidden md:block border-r">
          <Sidebar />
        </aside>
        <main className="p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
