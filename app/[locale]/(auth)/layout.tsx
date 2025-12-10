"use client";
import Image from "next/image";
import { type PropsWithChildren, useEffect } from "react";
import { useLayout } from "@/contexts/layout-context";
import { BaseGrid } from "@/components/shared/base-grid";

export default function AuthLayout({ children }: PropsWithChildren) {
  const { setHeader } = useLayout();
  // useEffect(() => setHeader(false), [setHeader]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="relative w-full h-screen overflow-hidden">
        {/* Actual Image */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/90 to-transparent pointer-events-none z-10" />
        <Image
          src="/ceturoLogin.jpg"
          alt="Cozy rustic room with natural light"
          fill
          priority
          className="object-contain"
          sizes="100vw"
        />

        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white/90 to-transparent pointer-events-none z-10" />
      </div>
      <div className="flex items-center justify-center  w-full md:w-[40%] ">
        <div className="w-full space-y-6">{children}</div>
      </div>
    </div>
  );
}
