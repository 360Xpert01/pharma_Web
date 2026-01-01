"use client";
import { useTranslations } from "next-intl";
import { TrustedByCard } from "./trusted-card";
import { TrustedByItem } from "../types";

export function TrustedBySection() {
  const t = useTranslations("home");

  const trustedByItems: TrustedByItem[] = [
    {
      id: "nextjs",
      name: "Next.js",
      icon: "⚡",
      description: t("trusted.nextjs") || "React Framework",
    },
    {
      id: "tailwind",
      name: "Tailwind CSS",
      icon: "🎨",
      description: t("trusted.tailwind") || "Utility-first CSS",
    },
    {
      id: "shadcn",
      name: "shadcn/ui",
      icon: "🧩",
      description: t("trusted.shadcn") || "Component Library",
    },
    {
      id: "vercel",
      name: "Vercel",
      icon: "▲",
      description: t("trusted.vercel") || "Deployment Platform",
    },
  ];

  return (
    <section className="relative z-10 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[var(--gray-4)] text-sm mb-8">{t("trusted.title")}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustedByItems.map((item) => (
            <TrustedByCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
