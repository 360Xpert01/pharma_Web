"use client";
import { type PropsWithChildren, useEffect } from "react";
import { useLayout } from "@/contexts/layout-context";
import Logo from "@/components/svgs/logo";
import LoginFrame from "@/components/svgs/login-frame";
import FormBg from "@/components/svgs/form-bg";

export default function AuthLayout({ children }: PropsWithChildren) {
  const { setHeader } = useLayout();
  // useEffect(() => setHeader(false), [setHeader]);

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Logo and Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-white relative overflow-hidden flex-col p-8 lg:pl-16 lg:pr-12 lg:py-8">
        {/* Logo at Top */}
        <div className="mb-4">
          <Logo className="w-56 h-auto" />
        </div>

        {/* Tagline */}
        <div className="mb-8">
          <p className="text-gray-300 text-xs leading-relaxed max-w-md">
            Pulse by Ceturo provides real-time, medical-grade heart monitoring. It simplifies vital
            tracking to help you take proactive control of your health.
          </p>
        </div>

        {/* LoginFrame Illustration - aligned left */}
        <div className="flex-1 flex items-center justify-start w-full">
          <LoginFrame className="w-full max-w-xl h-auto" />
        </div>
      </div>

      {/* Right Side - Form with Background Shape */}
      <div className="w-full lg:w-1/2 relative overflow-hidden flex flex-col">
        {/* Form Background SVG */}
        <div className="absolute inset-0 -right-30">
          <FormBg className="w-full h-full object-cover" />
        </div>

        {/* Form Content - Centered */}
        <div className="relative z-10 flex-1 flex items-center justify-center px-6 lg:px-16 py-12 lg:py-16">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-8 flex justify-center absolute top-8 left-0 right-0">
            <Logo className="w-40 h-auto" />
          </div>

          {/* Children (Login Form) */}
          {children}
        </div>

        {/* Footer - Fixed at Bottom */}
        <div className="relative z-10 pb-8 text-center text-[11px] text-white/90">
          Pulse by CRM | © 2026 All Rights Reserved
        </div>
      </div>
    </div>
  );
}
