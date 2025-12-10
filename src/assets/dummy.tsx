// src/lib/navigation.tsx (or wherever you keep it)
import Cookies from "js-cookie";
import React from "react";
import {
  IoHomeOutline,
  IoPeopleOutline,
  IoDocumentTextOutline,
  IoStatsChartOutline,
  IoCalendarOutline,
  IoMailOutline,
  IoCartOutline,
  IoConstructOutline,
  IoFlashOutline,
  IoCashOutline, // for Topup
  IoBusinessOutline, // for Wakala
} from "react-icons/io5";

interface NavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
}

// Safe role detection (SSR-safe)
const getUserRole = (): "zone" | "sales" => {
  if (typeof window === "undefined") return "sales";
  return (localStorage.getItem("preferredAccountType") as "zone" | "sales" | null) || "sales";
};

const role = getUserRole();
const isZone = role === "zone";
const isSales = role === "sales";

const basePath = isZone ? "/manager/zone" : "/manager/sales";

// Role-based conditional items
const conditionalItems: NavItem[] = [];

// Only Sales sees "Topup"
if (isSales) {
  conditionalItems.push({
    name: `${isSales} is sales`,
    href: "/manager/sales/topup",
    icon: <IoCashOutline className="w-6 h-6" />,
  });
}

// Only Zone sees "Documents"
if (isZone) {
  conditionalItems.push({
    name: 'Reports',
    href: "/documents",
    icon: <IoDocumentTextOutline className="w-6 h-6" />,
  });
}

// Only Sales sees "Wakala"
if (isSales) {
  conditionalItems.push({
    name:  `${isSales}`,
    href: "/manager/sales/wakala",
    icon: <IoBusinessOutline className="w-6 h-6" />,
  });
}

export const navigation: NavItem[] = [
  {
    name: "Dashboards",
    href: `${basePath}/dashboard`,
    icon: <IoHomeOutline className="w-6 h-6" />,
  },

  // Dynamic: "Managers" (Zone) or "Subscribers" (Sales)
  {
    name: "Users",
    href: "/manager/zone/managers",
    icon: <IoPeopleOutline className="w-6 h-6" />,
  },

  {
    name: "Meters",
    href: "/manager/zone/meters",
    icon: <IoFlashOutline className="w-6 h-6" />, // you can change icon later
  },

  // Conditional items inserted here
  ...conditionalItems,

  // {
  //   name: "Analytics",
  //   href: "/analytics",
  //   icon: <IoStatsChartOutline className="w-6 h-6" />,
  // },
  // {
  //   name: "Calendar",
  //   href: "/calendar",
  //   icon: <IoCalendarOutline className="w-6 h-6" />,
  // },
  // {
  //   name: "Messages",
  //   href: "/messages",
  //   icon: <IoMailOutline className="w-6 h-6" />,
  // },
  // {
  //   name: "Shop",
  //   href: "/shop",
  //   icon: <IoCartOutline className="w-6 h-6" />,
  // },
  // {
  //   name: "Settings",
  //   href: "/settings",
  //   icon: <IoConstructOutline className="w-6 h-6" />,
  // },
];


export const Line = () => {
    return (
        <svg 
            width="395" 
            height="46" 
            viewBox="0 0 395 46" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg">
            <path 
                d="M392 7L392 36.9996C392 41.4179 388.418 44.9996 384 44.9996L1 45" stroke="white" 
                strokeLinecap="round" 
                strokeDasharray="10 10" />
            <circle cx="392" cy="3" r="3" transform="rotate(-180 392 3)" fill="white" />
        </svg>
    )
}