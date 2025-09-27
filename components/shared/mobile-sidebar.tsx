import DashboardNav from "@/components/shared/dashboard-nav";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";
import { usePermissions } from "@/hooks/usePermissions";
import { navigationMenu } from "@/constants/navigation";
import { Icons } from "@/components/ui/icons";
import { useSettings } from "@/context/settings-context";
import { getMedia } from "@/utils/getMedia";

type TMobileSidebarProps = {
  className?: string;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
  sidebarOpen: boolean;
};
export default function MobileSidebar({ setSidebarOpen, sidebarOpen }: TMobileSidebarProps) {
  const { hasPermission } = usePermissions();
  const { settings } = useSettings();

  // Filter navigation items based on permissions and convert to NavItem format
  const filterNavigationItems = () => {
    const filteredItems = navigationMenu.filter((item) => {
      // Check if user has permission for this menu item
      if (item.permission && !hasPermission(item.permission)) {
        return false;
      }

      // Filter children recursively
      if (item.children) {
        const filteredChildren = item.children.filter(
          (child) => !child.permission || hasPermission(child.permission)
        );
        if (filteredChildren.length === 0) {
          return false; // Hide parent if no children are visible
        }
        item.children = filteredChildren;
      }

      return true;
    });

    // Convert MenuItem to NavItem format
    return filteredItems.map((item) => ({
      title: item.title,
      href: item.href,
      icon: getIconKey(item.icon),
      label: item.title,
      disabled: false,
      external: false,
      logout: item.title === "Logout",
    }));
  };

  // Helper function to convert icon component to icon key
  const getIconKey = (iconComponent: any): keyof typeof Icons => {
    if (!iconComponent) return "dashboard";

    // Map icon components to icon keys
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
      BarChart3: "dashboard", // Use dashboard as fallback for analytics
      LogOut: "logout",
    };

    const componentName = iconComponent.displayName || iconComponent.name;
    return iconMap[componentName] || "dashboard";
  };

  const visibleNavItems = filterNavigationItems();

  return (
    <>
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="bg-background !px-0">
          <div className="space-y-4 py-4">
            <div className="space-y-4 px-3 py-2">
              <Link to="/" className="flex items-center gap-3 px-2 py-2">
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
                <span className="font-bold text-primary" style={{ fontSize: "16px" }}>
                  {settings?.businessName || "Floor Masters"}
                </span>
              </Link>
              <div className="space-y-1 px-2">
                <DashboardNav items={visibleNavItems} setOpen={setSidebarOpen} isMobileNav={true} />
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
