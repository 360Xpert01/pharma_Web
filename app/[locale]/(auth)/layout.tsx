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
      <div className="relative hidden md:block w-full md:w-[70%] h-screen">
        <Image
          src="https://images.pexels.com/photos/34094301/pexels-photo-34094301.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Cozy rustic room with natural light"
          fill
          priority
          className="object-cover"
          sizes="70vw"
        />
      </div>
      <div className="flex items-center justify-center p-6 w-full md:w-[30%] min-h-screen">
        <div className="w-full max-w-sm space-y-6">{children}</div>
      </div>
    </div>
  );
}
