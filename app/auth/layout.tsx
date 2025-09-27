"use client";
import Image from "next/image";
import { type PropsWithChildren, useEffect } from "react";
import { useLayout } from "@/contexts/layout-context";

export default function AuthLayout({ children }: PropsWithChildren) {
  const { setHeader } = useLayout();
  useEffect(() => setHeader(false), [setHeader]);

  return (
    <div className="min-h-dvh grid grid-cols-1 md:grid-cols-2">
      <div className="relative hidden md:block">
        <Image
          src="/images/auth-image.jpg"
          alt="Abstract ocean themed illustration"
          fill
          priority
          className="object-cover"
        />
      </div>
      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
