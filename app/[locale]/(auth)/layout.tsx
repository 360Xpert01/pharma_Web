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
      <div className="hidden lg:flex lg:w-1/2 bg-white relative overflow-hidden flex-col p-8 lg:p-12">
        {/* Logo at Top */}
        <div className="mb-6">
          <Logo className="w-44 h-auto" />
        </div>

        {/* Tagline */}
        <div className="mb-8">
          <p className="text-gray-400 text-xs leading-relaxed max-w-sm">
            Pulse by Ceturo provides real-time, medical-grade heart monitoring. It simplifies vital
            tracking to help you take proactive control of your health.
          </p>
        </div>

        {/* LoginFrame Illustration - centered and larger */}
        <div className="flex-1 flex items-center justify-center w-full max-w-lg mx-auto">
          <LoginFrame className="w-full h-auto" />
        </div>
      </div>

      {/* Right Side - Form with Background Shape */}
      <div className="w-full lg:w-1/2 relative overflow-hidden flex flex-col">
        {/* Form Background SVG */}
        <div className="absolute inset-0">
          <FormBg className="w-full h-full object-cover" />
        </div>

        {/* Form Content - Centered */}
        <div className="relative z-10 flex-1 flex items-center justify-center px-6 lg:px-16">
          <div className="w-full max-w-sm">
            {/* Mobile Logo */}
            <div className="lg:hidden mb-8 flex justify-center">
              <Logo className="w-40 h-auto" />
            </div>

            {/* Children (Login Form) */}
            {children}
          </div>
        </div>

        {/* Footer - Fixed at Bottom */}
        <div className="relative z-10 pb-8 text-center text-[11px] text-white/90">
          Pulse by CRM | © 2026 All Rights Reserved
        </div>
      </div>
    </div>
  );
}
