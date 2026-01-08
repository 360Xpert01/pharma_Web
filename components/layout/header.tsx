"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Search, Bell, User, ChevronRight, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { persistor, useAppDispatch, useAppSelector } from "@/store";
import { getAllChannels } from "@/store/slices/channel/getAllChannelsSlice";

interface DropdownItem {
  label: string;
  href?: string;
  items?: DropdownItem[];
}

interface NavItem {
  label: string;
  href?: string;
  items?: DropdownItem[];
}

const Navbar = () => {
  const router = useRouter();
  const locale = useLocale();
  const dispatch = useAppDispatch();
  const { channels, loading: channelsLoading } = useAppSelector((state) => state.allChannels);

  const [hoveredItem, setHoveredItem] = useState<string | null>(null); // for hover
  const [clickedItem, setClickedItem] = useState<string | null>(null); // for click (mobile)
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const profileRef = useRef<HTMLDivElement | null>(null);
  const [dropdownAlignment, setDropdownAlignment] = useState<{ [key: string]: "left" | "right" }>(
    {}
  );
  const [submenuAlignment, setSubmenuAlignment] = useState<{ [key: string]: "left" | "right" }>({});

  // Fetch channels on component mount
  useEffect(() => {
    dispatch(getAllChannels());
  }, [dispatch]);

  // Dynamic nav items with channels
  const navItems: NavItem[] = [
    {
      label: "Dashboard",
      href: "/",
    },
    {
      label: "People & Teams",
      items: [
        // TODO: add <span> for roles like (Rep, Manager, Admin) in future.
        // { label: "Employees (Rep, Manager, Admin)", href: "/dashboard/Employees-Management" },
        { label: "Employees", href: "/dashboard/Employees-Management" },
        { label: "Teams", href: "/dashboard/campaign-Management" },
        { label: "Attendance & Tracking", href: "/dashboard/product-Management" },
        { label: "Leave Management", href: "/dashboard" },
        { label: "Expense Requests", href: "/dashboard/request-View" },
      ],
    },
    {
      label: "Accounts",
      items: channels.map((channel) => ({
        label: channel.name,
        href: `/dashboard/${channel.name
          .toLowerCase()
          .replace(/[^a-z0-9\s]/g, "")
          .replace(/\s+/g, "-")}`,
      })),
    },
    {
      label: "Products & Samples",
      items: [
        { label: "Products", href: "/dashboard/product-Management" },
        { label: "Samples", href: "/dashboard/sample-Management" },
        { label: "Gifts / Merchandise", href: "/dashboard/giveaway-Management" },
        { label: "Allocate Giveaways & Samples", href: "/dashboard/allocate-giveways-sample" },
      ],
    },
    {
      label: "DCR & Field Ops",
      items: [
        {
          label: "Planning",

          items: [
            { label: "Monthly Work plans", href: "/dashboard/plan-Management" },
            { label: "Revenue Targets", href: "/dashboard/target-listview" },
          ],
        },
        {
          label: "Execution",
          items: [
            { label: "Live GPS Tracking", href: "/dashboard/plan-Management" },
            { label: "Attendance", href: "/dashboard/giveaway-Management" },
            { label: "Travel & Mileage", href: "/dashboard/giveaway-Management" },
          ],
        },
        {
          label: "Admin",
          items: [
            { label: "Leave Requests", href: "/dashboard/plan-Management" },
            { label: "Expense Claims", href: "/dashboard/expense-claims" },
            { label: "Audit & Geo Verification", href: "/dashboard/giveaway-Management" },
            { label: "Requests", href: "/dashboard/request-View" },
          ],
        },
        {
          label: "Reports",

          items: [
            { label: "Daily Call Reports", href: "/dashboard/DCR" },
            { label: "Sample Distribution", href: "/" },
            { label: "Order Capture Log", href: "/dashboard/DCR-order" },
          ],
        }
      ],
    },
    // {
    //   label: "Field Ops",
    //   items: [
    //     {
    //       label: "Planning",

    //       items: [
    //         { label: "Monthly Work plans", href: "/dashboard/plan-Management" },
    //         { label: "Revenue Targets & Achievement", href: "/dashboard/giveaway-Management" },
    //       ],
    //     },
    //     {
    //       label: "Execution",
    //       items: [
    //         { label: "Live GPS Tracking", href: "/dashboard/plan-Management" },
    //         { label: "Attendance", href: "/dashboard/giveaway-Management" },
    //         { label: "Travel & Mileage", href: "/dashboard/giveaway-Management" },
    //       ],
    //     },
    //     {
    //       label: "Admin",
    //       items: [
    //         { label: "Leave Requests", href: "/dashboard/plan-Management" },
    //         { label: "Expense Claims", href: "/dashboard/expense-claims" },
    //         { label: "Audit & Geo Verification", href: "/dashboard/giveaway-Management" },
    //         { label: "Requests", href: "/dashboard/request-View" },
    //       ],
    //     },
    //   ],
    // },
    {
      label: "Analytics & Reports",
      items: [
        {
          label: "Performance",
          items: [
            { label: "Field Force Performance", href: "/dashboard" },
            { label: "Product vs Region Analysis", href: "/dashboard" },
            { label: "Achievement vs Target", href: "/dashboard" },
          ],
        },
        {
          label: "Advanced Reports",
          items: [
            { label: "Sales vs Visit Correlation", href: "/dashboard" },
            { label: "Doctor Engagement Trends", href: "/dashboard" },
            { label: "Expense Analysis", href: "/dashboard" },
          ],
        },
        {
          label: "AI & Insights",
          items: [
            { label: "Predictive Analytics", href: "/ai/predictive" },
            { label: "NLP Sentiment", href: "/ai/sentiment" },
            { label: "Recommendations", href: "/ai/recommendations" },
            { label: "AI-Generated Summaries", href: "/ai/summaries" },
          ],
        },
        { label: "BI Dashboards", href: "/analytics/bi" }
      ],
    },
    {
      label: "Compliance",
      items: [
        {
          label: "Monitoring",
          items: [
            { label: "Geo & Time Verification", href: "/dashboard" },
            { label: "Flagged Activities", href: "/dashboard" },
            { label: "Suspected Fake Calls", href: "/dashboard" },
          ],
        },
        {
          label: "Logs",
          items: [
            { label: "Audit Trails (User Actions)", href: "/dashboard" },
            { label: "Device & Version History", href: "/dashboard" },
          ],
        },
        {
          label: "Governance",
          items: [
            { label: "Policy Violations", href: "/dashboard" },
            { label: "Data Integrity Report", href: "/dashboard" },
            { label: "Compliance Scorecard", href: "/dashboard" },
          ],
        },
      ],
    },
    {
      label: "Support",
      items: [
        { label: "Knowledge Base", href: "/support/help" },
        { label: "Training Resources", href: "/support/training" },
        { label: "Submit a Ticket", href: "/support/ticket" },
      ],
    },
    {
      label: "Control Center",
      items: [
        {
          label: "Organization & Setup",
          items: [
            { label: "Company Profile", href: "/dashboard" },
            { label: "Branches / Divisions", href: "/dashboard/bricks-hierarchy" },
            { label: "Organization Hierarchy", href: "/dashboard/role-hierarchy" },
            { label: "Document Numbering", href: "/dashboard/AddPrefix" },
          ],
        },
        {
          label: "Classifications",
          items: [
            { label: "Channels", href: "/dashboard/Channals" },
            { label: "Call Points", href: "/dashboard/Add-Call-points" },
            { label: "Product Categories", href: "/dashboard/product-categories" },
            { label: "Doctor Specializations", href: "/dashboard/doctor-specializations" },
            { label: "Doctor Segments(A/B/C)", href: "/dashboard" },
          ],
        },
        {
          label: "Access & Security",
          items: [
            { label: "User Access Control", href: "/dashboard" },
            { label: "Roles & Permissions", href: "/dashboard/User-Role" },
          ],
        },
        {
          label: "Product Setup",
          items: [
            { label: "Division / Business Lines", href: "/dashboard" },
            { label: "Therapeutic Categories", href: "/dashboard" },
            { label: "Sample / Gift Type", href: "/dashboard" },
          ],
        },
        {
          label: "Business Rules",
          items: [
            { label: "Visit Frequency Rules", href: "/dashboard" },
            { label: "Expense Policies", href: "/dashboard" },
            { label: "Notification Templates", href: "/dashboard" },
          ],
        },
        {
          label: "Integrations",
          items: [
            { label: "CSV Import", href: "/dashboard/csvImports" },
            { label: "CRM API Management", href: "/integrations/api" },
            { label: "Integration / Import Logs", href: "/integrations/import" },
            { label: "BI / Reporting Tools", href: "/integrations/bi" },
          ],
        },
      ],
    },
    // {
    //   label: "AI & Insights",
    //   items: [
    //     { label: "Predictive Analytics", href: "/ai/predictive" },
    //     { label: "NLP Sentiment", href: "/ai/sentiment" },
    //     { label: "Recommendations", href: "/ai/recommendations" },
    //     { label: "AI-Generated Summaries", href: "/ai/summaries" },
    //   ],
    // },
  ];

  // Open on hover (desktop)
  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setHoveredItem(label);
    setClickedItem(null); // hover overrides click
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setHoveredItem(null);
    }, 150); // small delay so user can move to dropdown
  };

  // Click support for mobile/touch
  const toggleClick = (label: string) => {
    setClickedItem((prev) => (prev === label ? null : label));
    setHoveredItem(null); // click overrides hover
  };

  // Determine which one is active - MUST BE DECLARED BEFORE renderDropdownItems
  const activeDropdown = hoveredItem || clickedItem;

  useEffect(() => {
    if (activeDropdown) {
      const ref = dropdownRefs.current[activeDropdown];
      if (ref) {
        const rect = ref.getBoundingClientRect();
        const dropdownWidth = 240; // w-60 is 15rem = 240px
        if (rect.left + dropdownWidth > window.innerWidth) {
          setDropdownAlignment((prev) => ({ ...prev, [activeDropdown]: "right" }));
        } else {
          setDropdownAlignment((prev) => ({ ...prev, [activeDropdown]: "left" }));
        }
      }
    }
  }, [activeDropdown]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Close on outside click (only for clicked state - mobile)
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      // Close profile dropdown
      if (
        showProfileDropdown &&
        profileRef.current &&
        !profileRef.current.contains(e.target as Node)
      ) {
        setShowProfileDropdown(false);
      }

      // Close nav dropdowns
      if (clickedItem) {
        const clickedOutside = Object.values(dropdownRefs.current).every(
          (ref) => ref && !ref.contains(e.target as Node)
        );
        if (clickedOutside) {
          setClickedItem(null);
          setActiveSubmenu(null);
        }
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [clickedItem, showProfileDropdown]);

  // Logout handler
  const handleLogout = async () => {
    try {
      // Clear Redux persist store
      await persistor.purge();

      // Clear cookies - specifically the userSession cookie
      document.cookie = "userSession=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

      // Clear all other cookies
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
        document.cookie = name + "=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
      }

      // Clear localStorage and sessionStorage
      localStorage.clear();
      sessionStorage.clear();

      // Close dropdown
      setShowProfileDropdown(false);

      // Redirect to login with locale
      router.push(`/${locale}/login`);
    } catch (error) {
      console.error("Logout error:", error);
      // Still redirect even if there's an error
      router.push(`/${locale}/login`);
    }
  };

  const renderDropdownItems = (items: DropdownItem[], isSubmenu = false) => {
    return items.map((item) => (
      <div
        key={item.label}
        className="relative group"
        onMouseEnter={(e) => {
          if (item.items) {
            setActiveSubmenu(item.label);
            const rect = e.currentTarget.getBoundingClientRect();
            const submenuWidth = 232; // w-58 is 14.5rem = 232px
            if (rect.right + submenuWidth > window.innerWidth) {
              setSubmenuAlignment((prev) => ({ ...prev, [item.label]: "right" }));
            } else {
              setSubmenuAlignment((prev) => ({ ...prev, [item.label]: "left" }));
            }
          }
        }}
        onMouseLeave={() => item.items && setActiveSubmenu(null)}
      >
        {item.href ? (
          <Link
            href={item.href}
            onClick={() => {
              setHoveredItem(null);
              setClickedItem(null);
              setActiveSubmenu(null);
            }}
            className="flex items-center  transition-all duration-200  justify-between px-4 py-3 text-sm text-(--gray-7)  border-b border-(--gray-1) hover:bg-(--gray-1)"
          >
            <span>{item.label}</span>
            {item.items && (
              <Image
                src="/arrow-down.png"
                alt="Ceturvi Logo"
                width={20}
                height={20}
                // className="object-contain"
                className={`w-4 h-4 object-contai transition-transform duration-200 ${
                  activeDropdown === item.label ? "rotate-100" : ""
                }`}
              />
            )}
          </Link>
        ) : (
          <div className="flex items-center cursor-pointer justify-between px-4 py-3 text-sm text-(--gray-7)  border-b border-(--gray-1) hover:bg-(--gray-1)">
            <span>{item.label}</span>
            {item.items && (
              <Image
                src="/arrow-down.png"
                alt="Ceturvi Logo"
                width={20}
                height={20}
                // className="object-contain"
                className={`w-4 h-4 object-contain cursor-pointer transition-transform duration-200 ${
                  activeSubmenu === item.label ? "rotate-90" : ""
                }`}
              />
            )}
          </div>
        )}

        {/* Flyout Submenu */}
        {item.items && activeSubmenu === item.label && (
          <div
            className={`absolute cursor-pointer top-0 bg-(--background) w-58 z-50 shadow-soft ${
              submenuAlignment[item.label] === "right" ? "right-full" : "left-full"
            }`}
            style={{ top: -8 }}
            onMouseEnter={() => setActiveSubmenu(item.label)}
            onMouseLeave={() => setActiveSubmenu(null)}
          >
            {renderDropdownItems(item.items, true)}
          </div>
        )}
      </div>
    ));
  };

  const [query, setQuery] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
  };

  return (
    <nav className="bg-(--background) border-b fixed top-0 left-0 right-0 z-50 border-(--gray-3) shadow-header">
      {/* Your top bar code remains same */}
      <div className="mx-auto px-6 py-1">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-8">
            <div>
              <Image
                src="/pulsByCeturo.svg"
                alt="Ceturvi Logo"
                width={150}
                height={50}
                className="object-contain"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 bg-(--background) rounded-8 px-4 py-2.5 w-full max-w-md border border-(--gray-3) hover:border-(--gray-4)transition-colors">
              <Search className="h-5 w-5 text-(--primary) flex-shrink-0" />
              <input
                type="text"
                placeholder="Search here..."
                value={query}
                onChange={handleChange}
                className="border-0 bg-transparent focus:outline-none text-(--gray-9) text-sm w-full"
              />
            </div>

            <button className="relative p-2 text-(--gray-6) hover:text-(--gray-9) bg-(--gray-1) hover:bg-(--gray-2) rounded-8 transition-colors">
              {/* <Bell className="w-5 h-5 text-(--primary)" /> */}
              <div>
                <Image
                  src="/notification.svg"
                  alt="Ceturvi Logo"
                  width={60}
                  height={60}
                  className="object-contain"
                />
              </div>
              <span className="absolute top-1.5 right-2 w-4 h-4 bg-(--dark) text-(--light) text-xs rounded-8">
                9
              </span>
            </button>

            <div className="relative" ref={profileRef}>
              <div
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="flex items-center gap-2 p-2 text-(--gray-7) hover:text-(--gray-9) hover:bg-(--gray-0) rounded-8 transition-colors cursor-pointer"
              >
                <div className="w-8 h-8 bg-(--gray-2) rounded-8 flex items-center justify-center">
                  <Image
                    src="/girlPic.svg"
                    alt="Profile"
                    width={60}
                    height={60}
                    className="object-contain"
                  />
                </div>
                <div>
                  <div className="t-label">Nirma Amir</div>
                  <div className="t-cap">namraamir@ceturo.com</div>
                </div>
              </div>

              {/* Profile Dropdown */}
              {showProfileDropdown && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-(--background) rounded-8 shadow-soft border border-(--header-border) py-2 z-50">
                  {/* Profile Info */}
                  <div className="px-4 py-3 border-b border-(--gray-2)">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-(--gray-2) rounded-8 flex items-center justify-center">
                        <Image
                          src="/girlPic.svg"
                          alt="Profile"
                          width={60}
                          height={60}
                          className="object-contain"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="t-label-b">Nirma Amir</div>
                        <div className="t-cap">namraamir@ceturo.com</div>
                      </div>
                    </div>
                  </div>

                  {/* Logout Button */}
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-(--destructive) hover:bg-(--destructive-0) transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <hr className="border-(--header-border)" />

      <div className="flex items-center ml-1 lg:ml-2 xl:ml-6 bg-(--background) text-(--gray-7)">
        {navItems.map((item) => (
          <div
            key={item.label}
            className="relative"
            ref={(el) => {
              dropdownRefs.current[item.label] = el;
            }}
            onMouseEnter={() => item.items && handleMouseEnter(item.label)}
            onMouseLeave={item.items ? handleMouseLeave : undefined}
          >
            {item.items ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  item.items && toggleClick(item.label);
                }}
                className={`flex items-center gap-0.5 lg:gap-1 cursor-pointer px-1 lg:px-2 xl:px-5 py-3 text-md font-medium transition-all duration-200 hover:bg-(--gray-1) ${
                  activeDropdown === item.label ? "bg-(--gray-1)" : "text-(--gray-6)"
                }`}
              >
                {item.label}
                <Image
                  src="/arrow-down.png"
                  alt="Ceturvi Logo"
                  width={20}
                  height={20}
                  // className="object-contain"
                  className={`w-4 h-4 object-contai transition-transform duration-200 ${
                    activeDropdown === item.label ? "rotate-180" : ""
                  }`}
                />
                {/* <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    activeDropdown === item.label ? "rotate-180" : ""
                  }`}
                /> */}
              </button>
            ) : (
              <Link
                href={item.href || "#"}
                className="flex items-center gap-0.5 lg:gap-1 cursor-pointer px-1 lg:px-2 xl:px-5 py-3 text-md font-medium transition-all duration-200 hover:bg-(--gray-1) text-(--gray-6)"
              >
                {item.label}
              </Link>
            )}

            {/* Mega Menu Dropdown */}
            {item.items && activeDropdown === item.label && (
              <div
                className={`absolute shadow-soft top-full mt-0.5 w-60 bg-(--background) py-3 z-50 ${
                  dropdownAlignment[item.label] === "right" ? "right-0" : "left-0"
                }`}
                onMouseEnter={() => hoveredItem && handleMouseEnter(item.label)}
                onMouseLeave={handleMouseLeave}
              >
                <div className="mt-1 ">{renderDropdownItems(item.items)}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
