"use client";

import React from "react";
import { useGlobalLoading } from "@/contexts/global-loading-context";
import LoaderOverlay from "@/components/shared/loader-overlay";

const GlobalLoadingOverlay: React.FC = () => {
  const { loadingState } = useGlobalLoading();

  return (
    <LoaderOverlay
      isLoading={loadingState.isLoading}
      text={loadingState.text}
      variant={loadingState.variant}
      size={loadingState.size}
    />
  );
};

export default GlobalLoadingOverlay;
