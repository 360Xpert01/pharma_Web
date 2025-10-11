import { usePathname } from "@/routes/hooks";
import Heading from "./heading";
import UserNav from "./user-nav";
import { ModeToggle } from "./theme-toggle";
import { usePermissions } from "@/hooks/usePermissions";
import { navigationMenu } from "@/constants/navigation";
import { useSidebar } from "@/hooks/use-sidebar";
import { useEffect, useState } from "react";

const useMatchedPath = (pathname: string) => {
  const { hasPermission } = usePermissions();

  const filterNavigationItems = () => {
    return navigationMenu.filter((item) => {
      if (item.permission && !hasPermission(item.permission)) {
        return false;
      }
      return true;
    });
  };

  const visibleNavItems = filterNavigationItems();

  const matchedPath =
    visibleNavItems.find((item) => item.href === pathname) ||
    visibleNavItems.find((item) => pathname.startsWith(item.href + "/") && item.href !== "/");
  return matchedPath?.title || "";
};

export default function Header() {
  const pathname = usePathname();
  const headingText = useMatchedPath(pathname);
  const { isMinimized } = useSidebar();

  // Sidebar width: expanded = 18rem (288px), minimized = 100px
  const leftOffset = isMinimized ? 110 : 298; // px
  const rightOffset = 32; // px

  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // On mobile reduce left offset to 15px (for hamburger space)
  const mobileLeftOffset = 50;

  const style = {
    minHeight: "64px",
    top: "14px",
    border: "1px solid var(--layout-border-color)",
    boxShadow: "var(--layout-shadow)",
    transition: "left 0.3s, width 0.3s",
    left: windowWidth < 768 ? mobileLeftOffset : leftOffset,
    right: windowWidth < 768 ? 8 : rightOffset,
    width:
      windowWidth < 768
        ? `calc(100vw - ${mobileLeftOffset}px - 8px)`
        : `calc(100vw - ${leftOffset}px - ${rightOffset}px)`,
  };

  return (
    <div
      className="fixed z-40 flex items-center justify-between gap-3 rounded-xl border border-gray-200 bg-secondary
                 px-4 py-3 shadow-lg md:px-6 md:py-4"
      style={style}
    >
      <Heading title={headingText} />
      <div className="flex items-center gap-2 md:ml-6">
        <div
          className="flex items-center gap-2"
          style={{ fontSize: windowWidth < 768 ? "0.8rem" : "1rem" }}
        >
          <UserNav />
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}
