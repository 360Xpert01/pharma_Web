"use client";

import { type PropsWithChildren, useEffect, useMemo } from "react";
import { useLayout } from "@/contexts/layout-context";
import { Header } from "./header";
import { Sidebar } from "./sidebar";
import MobileHamburgerMenu from "./mobile-hamburger-menu";
import { cn } from "@/lib/utils";
import { Footer } from "./footer/index";
import { getSidebarContainerClasses } from "@/lib/layout-utils";

interface DynamicLayoutProps extends PropsWithChildren {
  className?: string;
}

export function DynamicLayout({ children, className }: DynamicLayoutProps) {
  const { config, state, computed, closeMobileMenu, toggleSidebar } = useLayout();
  const {
    showHeader,
    showSidebar,
    showFooter,
    contentClasses,
    isMobile,
    isSidebarCollapsed,
    headerHeight,
  } = computed;

  // Close mobile menu on route change or when switching to desktop
  useEffect(() => {
    if (state.mobileMenuOpen && !isMobile) closeMobileMenu();
  }, [isMobile, state.mobileMenuOpen, closeMobileMenu]);

  const isDesktopSidebarVisible = showSidebar && !isMobile && config.sidebar.variant === "fixed";

  // Memoize layout classes for performance
  const layoutClasses = useMemo(() => {
    const mainWrapperClasses = cn(
      "min-h-screen bg-background",
      "grid",
      {
        "grid-cols-[auto_1fr]": isDesktopSidebarVisible,
        "grid-cols-1": !isDesktopSidebarVisible,
      },
      className
    );

    const sidebarContainerClasses = getSidebarContainerClasses(
      isDesktopSidebarVisible,
      isSidebarCollapsed,
      config.sidebar.width
    );

    return { mainWrapperClasses, sidebarContainerClasses };
  }, [isDesktopSidebarVisible, isSidebarCollapsed, config.sidebar.width, className]);

  const rightColumnClasses = cn(
    "flex flex-col min-h-screen",
    "transition-all duration-300 ease-in-out",
    {
      "pt-16": showHeader, // Adjust based on your header height (h-16 = 64px)
    }
  );

  const headerContainerClasses = cn("transition-all duration-300 ease-in-out", {
    block: showHeader,
    hidden: !showHeader,
  });

  const contentWrapperClasses = cn("flex-1 flex flex-col overflow-auto");
  const actualContentClasses = cn(contentClasses, "flex-1");

  return (
    <div className={layoutClasses.mainWrapperClasses}>
      {/* Desktop Sidebar */}
      {isDesktopSidebarVisible && (
        <div className={layoutClasses.sidebarContainerClasses}>
          <Sidebar />
        </div>
      )}

      {/* Right: Header + Content */}
      <div className={rightColumnClasses}>
        {showHeader && (
          <div className={headerContainerClasses}>
            <Header />
          </div>
        )}

        <div className={contentWrapperClasses}>
          <main className={actualContentClasses}>{children}</main>
          {showFooter && <Footer className={cn({ relative: !config.footer.fixed })} />}
        </div>
      </div>

      {/* Mobile: Drawer and Backdrop controlled by layout state */}
      {isMobile && state.mobileMenuOpen && (
        <>
          <MobileHamburgerMenu onClose={closeMobileMenu} />
          <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={closeMobileMenu} />
        </>
      )}
    </div>
  );
}

export default DynamicLayout;
