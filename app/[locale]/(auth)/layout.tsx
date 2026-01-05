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
      <div className="w-full mx-auto flex">
        {/* Left Side - Logo and Illustration */}
        <div className="hidden md:flex md:w-1/2 bg-[var(--background)] relative overflow-hidden flex-col py-8 px-10 lg:py-10 lg:px-14 xl:py-12 xl:px-16">
          {/* Logo and Tagline */}
          <div className="mb-auto">
            <Logo className="w-48 h-auto mb-4 lg:w-56 xl:w-64 2xl:w-72" />
            <p className="t-lg text-[var(--gray-4)] leading-relaxed max-w-sm lg:max-w-md xl:text-base xl:max-w-xl">
              Pulse by Ceturo provides real-time, medical-grade heart monitoring. It simplifies
              vital tracking to help you take proactive control of your health.
            </p>
          </div>

          {/* LoginFrame Illustration - positioned higher to prevent cutoff */}
          <div className="flex-1 flex items-center justify-start lg:items-end lg:pb-8 xl:items-center xl:pb-0">
            <LoginFrame className="w-full max-w-lg lg:max-w-lg xl:max-w-lg" />
          </div>
        </div>

        {/* Right Side - Form with Background Shape */}
        <div className="w-full md:w-1/2 relative overflow-hidden flex flex-col">
          {/* Form Background SVG - Fixed positioning to cover completely */}
          <div className="absolute inset-0 -right-15">
            <FormBg className="w-[calc(100%+4rem)] h-full object-cover" />
          </div>

          {/* Form Content - Centered */}
          <div className="relative z-10 flex-1 flex items-center justify-center pl-38">
            {/* Children (Login Form) */}
            <div className="w-[400px]">{children}</div>
          </div>

          {/* Footer with Line Separator */}
          <div className="relative z-10 pb-4 pr-30 flex items-center justify-end gap-2">
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
