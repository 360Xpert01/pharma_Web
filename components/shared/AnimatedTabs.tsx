"use client";

import React, { useRef, useEffect, useState } from "react";

interface Tab {
  id: string;
  label: string;
}

interface AnimatedTabsProps<T extends string> {
  tabs: Tab[];
  activeTab: T;
  onTabChange: (tabId: T) => void;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

export default function AnimatedTabs<T extends string>({
  tabs,
  activeTab,
  onTabChange,
  variant = "primary",
  size = "md",
  fullWidth = false,
}: AnimatedTabsProps<T>) {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 });

  // Size configurations
  const sizeClasses = {
    sm: "py-1.5 px-4 text-xs",
    md: "py-2 px-6 text-sm",
    lg: "py-2.5 px-8 text-base",
  };

  useEffect(() => {
    const activeIndex = tabs.findIndex((tab) => tab.id === activeTab);
    const activeTabElement = tabRefs.current[activeIndex];

    if (activeTabElement) {
      const { offsetLeft, offsetWidth } = activeTabElement;
      setIndicatorStyle({
        left: offsetLeft,
        width: offsetWidth,
      });
    }
  }, [activeTab, tabs]);

  return (
    <div className={`${fullWidth ? "w-full" : "w-fit"}`}>
      <div className="relative bg-(--gray-1) rounded-8 p-1 shadow-inner">
        {/* Sliding indicator */}
        <div
          className={`absolute top-1 h-[calc(100%-8px)] rounded-8 transition-all duration-300 ease-out shadow-soft ${
            variant === "primary" ? "bg-(--primary)" : "bg-(--background)"
          }`}
          style={{
            width: `${indicatorStyle.width}px`,
            transform: `translateX(${indicatorStyle.left}px)`,
          }}
        />

        {/* Tab buttons */}
        <div className="relative flex gap-1">
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              onClick={() => onTabChange(tab.id as T)}
              className={`relative z-10 cursor-pointer font-medium transition-all duration-300 rounded-8 whitespace-nowrap ${
                sizeClasses[size]
              } ${
                activeTab === tab.id
                  ? variant === "primary"
                    ? "text-(--light)"
                    : "text-(--gray-9)"
                  : "text-(--gray-6) hover:text-(--gray-8)"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
