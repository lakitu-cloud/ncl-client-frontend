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


export interface NavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
}

// This function reads the latest role every time it's called
export const getNavigation = (): NavItem[] => {
  const role = (typeof window !== "undefined"
    ? localStorage.getItem("preferredAccountType")
    : null) as "zone" | "sales" | null;

  const isZone = role === "zone";
  const isSales = role === "sales" || !role; // fallback to sales

  const basePath = isZone ? "/manager/zone" : "/manager/sales";

  const items: NavItem[] = [
    {
      name: "Dashboard",
      href: `${basePath}/dashboard`,
      icon: <IoHomeOutline className="w-6 h-6" />,
    },
    {
      name: isZone ? "Managers" : "Customers",
      href: isZone ? `${basePath}/managers` : `${basePath}/subscribers`,
      icon: <IoPeopleOutline className="w-6 h-6" />,
    },
    {
      name: "Meters",
      href: `${basePath}/meters`,
      icon: <IoFlashOutline className="w-6 h-6" />,
    },
     {
      name: "Transactions",
      href: `/manager/transactions`,
      icon: <IoCashOutline className="w-6 h-6" />,
    },
  ];

  // Only Sales sees these
  if (isSales) {
    items.push(
      {
        name: "Top Up",
        href: `${basePath}/topup`,
        icon: <IoCashOutline className="w-6 h-6" />,
      },
      {
        name: "Wakala",
        href: `${basePath}/wakalas`,
        icon: <IoBusinessOutline className="w-6 h-6" />,
      }
    );
  }

  // Only Zone sees this
  if (isZone) {
    items.push({
      name: "Intergration",
      href: `${basePath}/intergration`,
      icon: <IoDocumentTextOutline className="w-6 h-6" />,
    });
  }

  return items;
};


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