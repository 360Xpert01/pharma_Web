"use client";

import React from "react";
import { AlertCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button/button";

interface MonthRestrictionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MonthRestrictionModal({ isOpen, onClose }: MonthRestrictionModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-8 w-full max-w-md overflow-hidden shadow-soft animate-in fade-in zoom-in duration-200">
        <div className="p-8 pb-6 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-(--destructive-0) rounded-full flex items-center justify-center mb-6">
            <AlertCircle className="w-10 h-10 text-(--destructive)" />
          </div>

          <h2 className="t-h2 text-(--gray-9) mb-3">Update Restricted</h2>

          <p className="t-md text-(--gray-5) leading-relaxed">
            You cannot change the target for the current or previous months. These records are
            locked for historical consistency.
          </p>
        </div>

        <div className="p-8 pt-0 flex flex-col gap-3">
          <Button
            variant="primary"
            size="lg"
            rounded="full"
            className="w-full shadow-soft"
            onClick={onClose}
          >
            I Understand
          </Button>
        </div>
      </div>
    </div>
  );
}
