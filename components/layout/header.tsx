"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Search, Bell, User, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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
  const [hoveredItem, setHoveredItem] = useState<string | null>(null); // for hover
  const [clickedItem, setClickedItem] = useState<string | null>(null); // for click (mobile)
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const navItems: NavItem[] = [
    {
      label: "Dashboard",
      href: "/",
    },
    {
      label: "People & Teams",
      items: [
        { label: "Employees (Rep, Manager, Admin)", href: "/dashboard/Employees-Management" },
        { label: "Campaigns/Teams", href: "/dashboard/campaign-Management" },
        { label: "Attendance & Tracking", href: "/dashboard/product-Management" },
        { label: "Leave Management", href: "/dashboard" },
        { label: "Expense Requests", href: "/dashboard/request-View" },
      ],
    },
    {
      label: "Accounts",
      items: [
        { label: "Doctors / HCP Directory", href: "/dashboard/account-Management" },
        { label: "Pharmacies & Chemists", href: "/dashboard/account-Pharmacies" },
        { label: "Hospitals / Institutions", href: "/dashboard/account-Hospitals" },
        { label: "Key Accounts (KAM)", href: "/dashboard/account-Management" },
      ],
    },
    {
      label: "Products",
      items: [
        { label: "Products", href: "/dashboard/product-Management" },
        {
          label: "Promotional Materials",
          items: [
            { label: "Samples & Promotional", href: "/dashboard/sample-Management" },
            { label: "Gifts / Merchandise", href: "/dashboard/giveaway-Management" },
          ],
        },
      ],
    },
    {
      label: "DCR",
      items: [
        { label: "Daily Call Reports", href: "/dashboard/DCR" },
        { label: "Sample Distribution", href: "/" },
        { label: "Order Capture Log", href: "/dashboard/DCR-order" },
      ],
    },
    {
      label: "Field Ops",
      items: [
        {
          label: "Planning",
          href: "/dashboard/plan-Management",

          items: [
            { label: "Monthly Work plans", href: "/dashboard/plan-Request" },
            { label: "Revenue Targets & Achievement", href: "/dashboard/giveaway-Management" },
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
      ],
    },
    {
      label: "Analytics",
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
          label: "Advanced Insights",
          items: [
            { label: "Sales vs Visit Correlation", href: "/dashboard" },
            { label: "Doctor Engagement Trends", href: "/dashboard" },
            { label: "Expense Analysis", href: "/dashboard" },
          ],
        },
        { label: "BI Dashboards", href: "/analytics/bi" },
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
      label: "Integrations",
      items: [
        { label: "Import / Export (CSV)", href: "/integrations/csv" },
        { label: "CRM API Management", href: "/integrations/api" },
        { label: "Integration / CSV Import Logs", href: "/integrations/import" },
        { label: "BI / Reporting Tools", href: "/integrations/bi" },
      ],
    },
    {
      label: "Support",
      items: [
        { label: "Help Center / Knowledge Base", href: "/support/help" },
        { label: "Training Resources", href: "/support/training" },
        { label: "Submit a Ticket", href: "/support/ticket" },
      ],
    },
    {
      label: "Control Center",
      items: [
        {
          label: "Organization",
          items: [
            { label: "Company Profile", href: "/dashboard" },
            { label: "Branches / Divisions", href: "/dashboard" },
            { label: "Organization Hierarchy", href: "/dashboard" },
            { label: "Channels", href: "/dashboard" },
            { label: "Call Points", href: "/dashboard" },
          ],
        },
        {
          label: "Access & Security",
          items: [
            { label: "User Access Control", href: "/dashboard" },
            { label: "Roles & Permissions", href: "/dashboard" },
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
            { label: "Doctor Segments(A/B/C)", href: "/dashboard" },
            { label: "Visit Frequency Rules", href: "/dashboard" },
            { label: "Expense Policies", href: "/dashboard" },
            { label: "Notification Templates", href: "/dashboard" },
          ],
        },
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

  // Determine which one is active
  const activeDropdown = hoveredItem || clickedItem;

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Close on outside click (only for clicked state - mobile)
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
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
  }, [clickedItem]);

  const renderDropdownItems = (items: DropdownItem[], isSubmenu = false) => {
    return items.map((item) => (
      <div
        key={item.label}
        className="relative group"
        onMouseEnter={() => item.items && setActiveSubmenu(item.label)}
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
            className="flex items-center  transition-all duration-200  justify-between px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 border-b border-gray-100"
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
          <div className="flex items-center justify-between px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 border-b border-gray-100 cursor-default">
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
          </div>
        )}

        {/* Flyout Submenu */}
        {item.items && activeSubmenu === item.label && (
          <div
            className="absolute left-60 top-0 mt-2 bg-white  w-64 z-50"
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
    <nav className="bg-white border-b fixed top-0 left-0 right-0 z-50 border-gray-200">
      {/* Your top bar code remains same */}
      <div className="mx-auto px-6">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-8">
            <div>
              <Image
                src="/loginPic.svg"
                alt="Ceturvi Logo"
                width={150}
                height={50}
                className="object-contain"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 bg-white rounded-full px-4 py-2.5 w-full max-w-md border border-gray-300 hover:border-gray-400 transition-colors">
              <Search className="h-5 w-5 text-blue-600 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search here..."
                value={query}
                onChange={handleChange}
                className="border-0 bg-transparent text-gray-900 focus:outline-none text-sm w-full"
              />
            </div>

            <button className="relative p-2 text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
              {/* <Bell className="w-5 h-5 text-blue-600" /> */}
              <div>
                <Image
                  src="/notification.svg"
                  alt="Ceturvi Logo"
                  width={60}
                  height={60}
                  className="object-contain"
                />
              </div>
              <span className="absolute top-1.5 right-2 w-4 h-4 bg-black text-white text-xs rounded-full">
                9
              </span>
            </button>

            <div className="flex items-center gap-2 p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                {/* <User className="w-5 h-5 text-gray-600" /> */}
                <Image
                  src="/girlPic.svg"
                  alt="Ceturvi Logo"
                  width={60}
                  height={60}
                  className="object-contain"
                />
              </div>
              <div>
                <div className="text-sm font-medium">Nirma Amir</div>
                <div className="text-xs text-gray-500">namraamir@ceturo.com</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="border-gray-200" />

      <div className="flex items-center justify-around bg-white text-gray-700">
        {navItems.map((item) => (
          <div
            key={item.label}
            className="relative"
            ref={(el) => (dropdownRefs.current[item.label] = el)}
            onMouseEnter={() => item.items && handleMouseEnter(item.label)}
            onMouseLeave={item.items ? handleMouseLeave : undefined}
          >
            {item.items ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  item.items && toggleClick(item.label);
                }}
                className={`flex items-center gap-1 px-2 py-3 text-sm font-medium transition-all duration-200 hover:bg-gray-50 ${
                  activeDropdown === item.label ? "text-blue-600" : "text-gray-600"
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
                className="px-4 py-3 text-sm font-medium hover:text-blue-600 hover:bg-gray-50 transition-all"
              >
                {item.label}
              </Link>
            )}

            {/* Mega Menu Dropdown */}
            {item.items && activeDropdown === item.label && (
              <div
                className="absolute top-full left-1/2 -translate-x-1/2 mt-1  w-60 bg-white py-3 z-50"
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
