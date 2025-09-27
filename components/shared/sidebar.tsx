import DashboardNav from "@/components/shared/dashboard-nav";
import { useSidebar } from "@/hooks/use-sidebar";
import { cn } from "@/lib/utils";
import { ChevronsLeft } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/context/auth-context";
import { usePermissions } from "@/hooks/usePermissions";
import { navigationMenu } from "@/constants/navigation";
import { Icons } from "@/components/ui/icons";
import { useSettings } from "@/context/settings-context";
import { getMedia } from "@/utils/getMedia";

type SidebarProps = {
  className?: string;
};

export default function Sidebar({ className }: SidebarProps) {
  const { isMinimized, toggle } = useSidebar();
  const [status, setStatus] = useState(false);
  const { logout } = useAuth();
  const { getRole } = usePermissions();
  const { settings } = useSettings();

  const handleToggle = () => {
    setStatus(true);
    toggle();
    setTimeout(() => setStatus(false), 500);
  };

  const getRoleBasedMenuAccess = () => {
    const userRole = getRole();

    switch (userRole) {
      case "ADMIN":
        return {
          dashboard: true,
          users: true,
          customers: true,
          appointments: true,
          materials: true,
          invoices: true,
          estimates: true,
          suppliers: true,
          settings: true,
        };
      case "SALES_REP":
        return {
          dashboard: false,
          users: false,
          customers: true,
          appointments: true,
          materials: true,
          invoices: true,
          estimates: true,
          suppliers: true,
          settings: false,
        };
      case "FITTER":
        return {
          dashboard: false,
          users: false,
          customers: false,
          appointments: true,
          materials: false,
          invoices: false,
          estimates: false,
          suppliers: false,
          settings: false,
        };
      default:
        return {
          dashboard: false,
          users: false,
          customers: false,
          appointments: false,
          materials: false,
          invoices: false,
          estimates: false,
          suppliers: false,
          settings: false,
        };
    }
  };

  const filterNavigationItems = () => {
    const roleAccess = getRoleBasedMenuAccess();

    const filteredItems = navigationMenu.filter((item) => {
      if (item.title === "Logout") {
        return false;
      }

      switch (item.title) {
        case "Dashboard":
          return roleAccess.dashboard;
        case "Users":
          return roleAccess.users;
        case "Customers":
          return roleAccess.customers;
        case "Appointments":
          return roleAccess.appointments;
        case "Material":
          return roleAccess.materials;
        case "Invoices":
          return roleAccess.invoices;
        case "Estimates":
          return roleAccess.estimates;
        case "Suppliers":
          return roleAccess.suppliers;
        case "Settings":
          return roleAccess.settings;
        default:
          return false;
      }
    });

    return filteredItems.map((item) => ({
      title: item.title,
      href: item.href,
      icon: getIconKey(item.icon),
      label: item.title,
      disabled: false,
      external: false,
      logout: false,
    }));
  };

  const getIconKey = (iconComponent: any): keyof typeof Icons => {
    if (!iconComponent) return "dashboard";

    const iconMap: Record<string, keyof typeof Icons> = {
      LayoutDashboard: "dashboard",
      Calendar: "calendar",
      Users: "customer",
      User: "user",
      UserCheck: "employee",
      Package: "package",
      Truck: "truck",
      CreditCard: "billing",
      FileText: "post",
      Ruler: "ruler",
      Settings: "settings",
      BarChart3: "dashboard",
      LogOut: "logout",
    };

    const componentName = iconComponent.displayName || iconComponent.name;
    return iconMap[componentName] || "dashboard";
  };

  const visibleNavItems = filterNavigationItems();

  // Hide sidebar on mobile (show only on md and up)
  // The 'hidden md:block' ensures sidebar is not visible on mobile
  return (
    <nav
      className={cn(
        `relative z-30 hidden h-screen flex-none border-r border-primary/10 bg-secondary px-3 shadow-lg md:block`, // Hide on mobile, show on md+
        status && "duration-500",
        !isMinimized ? "w-72" : "w-[80px]",
        className
      )}
      style={{
        minHeight: "100vh",
        borderRight: "1px solid var(--layout-border-color)",
        boxShadow: "var(--layout-shadow)",
      }}
    >
      <div
        className={cn(
          "flex items-center px-0 md:px-2",
          isMinimized ? "justify-center" : "justify-between"
        )}
        style={{ background: "inherit", zIndex: 2 }} // Ensure chevron stays above header
      >
        {!isMinimized ? (
          <div className="mt-6 flex items-center gap-1">
            {settings?.companyLogo ? (
              <div className="flex-shrink-0">
                <img
                  src={getMedia(settings.companyLogo)}
                  alt="Company Logo"
                  className="h-8 w-8 rounded-lg object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                  }}
                />
              </div>
            ) : (
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <Icons.settings className="h-5 w-5 text-primary" />
              </div>
            )}
            <h1 className="truncate font-bold text-primary sm:text-lg" style={{ fontSize: "19px" }}>
              {settings?.businessName || "Floor Masters"}
            </h1>
          </div>
        ) : (
          <div className="ml-12 mt-6 flex-shrink-0">
            {settings?.companyLogo ? (
              <img
                src={getMedia(settings.companyLogo)}
                alt="Company Logo"
                className="h-8 w-8 rounded-lg object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                }}
              />
            ) : (
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <Icons.settings className="h-5 w-5 text-primary" />
              </div>
            )}
          </div>
        )}
        {/* Chevron Button */}
        <div
          className={cn("relative z-20 ml-2", isMinimized ? "mt-6" : "mt-6")}
          style={{ position: "relative" }} // Ensure button is not overlapping header
        >
          <button
            type="button"
            aria-label={isMinimized ? "Expand sidebar" : "Minimize sidebar"}
            onClick={handleToggle}
            className={cn(
              "flex items-center justify-center rounded-full border bg-background text-muted-foreground transition-all duration-200 hover:bg-primary/10 hover:text-primary focus:outline-none",
              "size-8",
              isMinimized && "rotate-180 border-primary/30 shadow-lg"
            )}
            style={{
              zIndex: 30,
              position: "relative",
              borderRight: "1px solid var(--layout-border-color)",
              boxShadow: "var(--layout-shadow)",
            }}
          >
            <ChevronsLeft className="size-6" />
          </button>
        </div>
      </div>
      <div className="flex h-[calc(100vh-80px)] flex-col space-y-4 py-4">
        <div className="flex-1 overflow-y-auto px-2 py-2">
          <div className="mt-3 space-y-1">
            <DashboardNav items={visibleNavItems} />
          </div>
        </div>
        <div className="mb-4 px-2">
          <button
            type="button"
            className={cn(
              "flex w-full items-center gap-2 overflow-hidden rounded-md py-2 text-sm font-medium transition-colors duration-200",
              "bg-primary hover:bg-primary/90",
              "text-white"
            )}
            onClick={async () => await logout()}
          >
            <span className="ml-2.5">
              <Icons.logout className="size-5 text-white" />
            </span>
            {!isMinimized && <span className="mr-2 truncate">Logout</span>}
          </button>
        </div>
      </div>
    </nav>
  );
}
