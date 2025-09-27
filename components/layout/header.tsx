"use client";
import Link from "next/link";
import { MenuIcon, CloseIcon } from "@/lib/icons";
import { ThemeToggle } from "./theme-toggle";
import { UserProfile } from "./user-profile";
import { MobileNavigationMenu } from "./mobile-navigation-menu";
import { useLayout } from "@/contexts/layout-context";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { headerNavigation } from "@/navigation/config";
import { useState } from "react";

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  const { config, state, computed, toggleSidebar } = useLayout();
  const { showSidebar, headerHeight, isMobile } = computed;
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const headerClasses = cn(
    "border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
    headerHeight,
    className
  );

  const containerClasses = cn(
    "h-full px-4 lg:px-6 flex items-center justify-between",
    {
      "max-w-7xl mx-auto": config.content.maxWidth === 'container',
      "max-w-4xl mx-auto": config.content.maxWidth === 'prose',
    }
  );

  return (
    <header className={headerClasses}>
      <div className={containerClasses}>
        {/* Left section: Mobile nav toggle + Logo + Desktop sidebar toggle */}
        <div className="flex items-center gap-3">
          {/* Mobile navigation hamburger button */}
          {isMobile && config.header.showNavigation && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className="md:hidden h-9 w-9 p-0"
              aria-label="Toggle mobile navigation"
            >
              {mobileNavOpen ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
            </Button>
          )}

          {/* Desktop sidebar toggle */}
          {(!isMobile && showSidebar && config.sidebar.collapsible) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleSidebar}
              className="hidden md:flex h-9 w-9 p-0"
              aria-label="Toggle sidebar"
            >
              <MenuIcon className="h-4 w-4" />
            </Button>
          )}

          {/* Logo/Brand */}
          {config.header.showLogo && (
            <Link 
              href="/dashboard" 
              className="flex items-center gap-2 font-semibold text-lg hover:opacity-80 transition-opacity"
              onClick={() => setMobileNavOpen(false)}
            >
              <div className="w-8 h-8 rounded-md bg-primary" />
              <span className="hidden sm:block">Dashboard</span>
            </Link>
          )}
        </div>

        {/* Center section: Desktop Navigation */}
        {config.header.showNavigation && config.navigation.style === 'horizontal' && (
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
            {headerNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-foreground/80 hover:text-foreground transition-colors px-3 py-2 rounded-md hover:bg-accent"
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
              >
                {item.title}
              </Link>
            ))}
          </nav>
        )}

        {/* Right section: User profile + Theme toggle */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          
          {config.header.showUserMenu && (
            <UserProfile className="ml-1" />
          )}
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobile && mobileNavOpen && config.header.showNavigation && (
        <MobileNavigationMenu 
          isOpen={mobileNavOpen} 
          onClose={() => setMobileNavOpen(false)} 
        />
      )}
    </header>
  );
}
