"use client";
import { type PropsWithChildren, useEffect } from "react";
import { useLayout } from "@/contexts/layout-context";
import Logo from "@/components/svgs/logo";
import LoginFrame from "@/components/svgs/login-frame";
import FormBg from "@/components/svgs/form-bg";
import LoginLine from "@/components/svgs/login-line";

export default function AuthLayout({ children }: PropsWithChildren) {
  const { setHeader } = useLayout();
  // useEffect(() => setHeader(false), [setHeader]);

  return (
    <div className="w-screen min-h-screen h-screen flex overflow-hidden ceturo">
      <div className="w-full max-w-screen-2xl mx-auto flex">
        {/* Left Side - Logo and Illustration */}
        <div className="hidden md:flex md:w-2/5 lg:w-1/2 bg-[var(--background)] relative overflow-hidden flex-col py-6 px-8 md:py-8 md:px-10 lg:py-8 lg:px-12 xl:py-12 xl:px-16">
          {/* Logo and Tagline */}
          <div className="mb-auto">
            <Logo className="w-36 h-auto mb-3 md:w-40 lg:w-48 xl:w-64 2xl:w-72 md:mb-4" />
            <p className="text-xs text-[var(--gray-4)] leading-relaxed max-w-xs md:t-sm md:max-w-sm lg:max-w-sm xl:text-base xl:max-w-xl">
              Pulse by Ceturo provides real-time, medical-grade heart monitoring. It simplifies
              vital tracking to help you take proactive control of your health.
            </p>
          </div>

          {/* LoginFrame Illustration - left aligned */}
          <div className="flex-1 flex items-center justify-start ">
            <LoginFrame className="w-full max-w-md" />
          </div>
        </div>

        {/* Right Side - Form with Background Shape */}
        <div className="w-full lg:w-1/2 relative overflow-hidden -right-16 flex flex-col">
          {/* Form Background SVG */}
          <div className="absolute inset-0">
            <FormBg className="w-full h-full object-cover" />
          </div>

          {/* Form Content - Centered */}
          <div className="relative z-10 flex-1 flex items-center justify-center pl-20 ">
            {/* Children (Login Form) */}
            <div className="w-full max-w-sm">{children}</div>
          </div>

          {/* Footer with Line Separator */}
          <div className="relative z-10 pb-4 pr-40 flex items-center justify-end gap-2">
            <LoginLine />
            <div className="text-background text-xs whitespace-nowrap">
              Pulse by CRM | © 2024 All Rights Reserved
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
