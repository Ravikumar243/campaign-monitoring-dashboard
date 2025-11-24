"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const menu = [
    { name: "Home", path: "/" },
    { name: "All Campaigns", path: "/campaigns" },
    { name: "Platform Breakdown", path: "/platforms" },
    { name: "Performance Analytics", path: "/analytics" },
    { name: "Monitor", path: "/monitor" },
  ];

  return (
    <aside className="w-64 bg-gray-900 text-white h-screen p-6">
      <h2 className="text-2xl font-bold mb-10">My Dashboard</h2>

      <nav className="space-y-1">
        {menu.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`
              block py-2  transition 
              -mx-6 px-6  
              hover:bg-gray-700
              ${pathname === item.path ? "bg-gray-700" : ""}
            `}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
