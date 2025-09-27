"use client";

import { type PropsWithChildren, useEffect } from "react";
import { useLayout } from "@/contexts/layout-context";
import { Header } from "./header";
import { Sidebar } from "./sidebar";
import { Footer } from "./footer";
import { MobileHamburgerMenu as MobileSidebarOverlay } from "./mobile-sidebar-overlay";
import { cn } from "@/lib/utils";

interface DynamicLayoutProps extends PropsWithChildren {
  className?: string;
}

export function DynamicLayout({ children, className }: DynamicLayoutProps) {
  const { config, state, computed, closeMobileMenu } = useLayout();
  const { showHeader, showSidebar, showFooter, sidebarWidth, headerHeight, contentClasses, isMobile, isSidebarCollapsed } = computed;

  // Close mobile menu on route change or screen resize
  useEffect(() => {
    if (state.mobileMenuOpen && !isMobile) {
      closeMobileMenu();
    }
  }, [isMobile, closeMobileMenu, state.mobileMenuOpen]);

  // Calculate sidebar widths for different states
  const getSidebarWidthPixels = () => {
    const widthMap = {
      sm: 192, // w-48
      md: 256, // w-64  
      lg: 288, // w-72
      xl: 320, // w-80
    };
    return widthMap[config.sidebar.width];
  };

  const sidebarWidthPx = getSidebarWidthPixels();
  const isDesktopSidebarVisible = showSidebar && !isMobile && config.sidebar.variant === 'fixed';

  // Main layout wrapper classes
  const mainWrapperClasses = cn(
    "min-h-screen bg-background",
    className
  );

  // Header classes with proper z-index
  const headerClasses = cn({
    "fixed top-0 left-0 right-0 z-50": config.header.fixed,
    "relative z-10": !config.header.fixed,
  });

  // Sidebar classes with proper z-index and positioning
  const sidebarClasses = cn(
    "transition-all duration-300 ease-in-out border-r border-border/40 bg-background",
    sidebarWidth,
    {
      // Desktop fixed sidebar
      "fixed left-0 z-40": isDesktopSidebarVisible && config.sidebar.variant === 'fixed',
      "top-0": isDesktopSidebarVisible && config.sidebar.variant === 'fixed' && !config.header.fixed,
      "top-12": isDesktopSidebarVisible && config.sidebar.variant === 'fixed' && config.header.fixed && config.header.height === 'sm',
      "top-16": isDesktopSidebarVisible && config.sidebar.variant === 'fixed' && config.header.fixed && config.header.height === 'md',
      "top-20": isDesktopSidebarVisible && config.sidebar.variant === 'fixed' && config.header.fixed && config.header.height === 'lg',
      "bottom-0": isDesktopSidebarVisible && config.sidebar.variant === 'fixed',
      // Collapsed state
      "translate-x-0": !isSidebarCollapsed,
      "-translate-x-full": isSidebarCollapsed,
    }
  );

  // Main content area classes that adjust to sidebar
  const mainContentClasses = cn(
    "transition-all duration-300 ease-in-out min-h-screen flex flex-col",
    {
      // Adjust margin when desktop sidebar is visible and not collapsed
      [`ml-0`]: !isDesktopSidebarVisible || isSidebarCollapsed,
      [`ml-48`]: isDesktopSidebarVisible && !isSidebarCollapsed && config.sidebar.width === 'sm',
      [`ml-64`]: isDesktopSidebarVisible && !isSidebarCollapsed && config.sidebar.width === 'md',
      [`ml-72`]: isDesktopSidebarVisible && !isSidebarCollapsed && config.sidebar.width === 'lg',
      [`ml-80`]: isDesktopSidebarVisible && !isSidebarCollapsed && config.sidebar.width === 'xl',
    }
  );

  // Content wrapper classes
  const contentWrapperClasses = cn(
    "flex-1 flex flex-col",
    {
      // Add top padding if header is fixed
      "pt-12": showHeader && config.header.fixed && config.header.height === 'sm',
      "pt-16": showHeader && config.header.fixed && config.header.height === 'md', 
      "pt-20": showHeader && config.header.fixed && config.header.height === 'lg',
      // Add bottom padding if footer is fixed
      "pb-16": showFooter && config.footer.fixed,
    }
  );

  const actualContentClasses = cn(
    contentClasses,
    "flex-1"
  );

  return (
    <div className={mainWrapperClasses}>
      {/* Header */}
      {showHeader && (
        <Header className={headerClasses} />
      )}

      {/* Desktop Sidebar */}
      {isDesktopSidebarVisible && (
        <aside className={sidebarClasses}>
          <Sidebar />
        </aside>
      )}

      {/* Main Content Area */}
      <div className={mainContentClasses}>
        <div className={contentWrapperClasses}>
          <main className={actualContentClasses}>
            {children}
          </main>

          {/* Footer */}
          {showFooter && (
            <Footer 
              className={cn({
                "fixed bottom-0 left-0 right-0 z-30": config.footer.fixed,
                "relative": !config.footer.fixed,
              })}
            />
          )}
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobile && showSidebar && <MobileSidebarOverlay />}

      {/* Mobile menu backdrop */}
      {state.mobileMenuOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black/50 z-45 md:hidden"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}
    </div>
  );
}

export default DynamicLayout;