
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", path: "/" },
    { name: "Pipelines", path: "/pipeline" },
    { name: "Applications", path: "/applications" },
    { name: "Analytics", path: "/analytics" },
    { name: "Settings", path: "/settings" },
  ];

  return (
    <div className="hidden md:flex md:w-64 md:flex-col bg-slate-800 text-white p-6">
      <h2 className="text-2xl font-bold">CareerTrack</h2>

      <nav className="mt-8">
        <ul className="space-y-4 text-lg">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className={`block rounded-lg px-4 py-3 text-base ${
                  pathname === item.path
                    ? "bg-slate-700 text-white"
                    : "hover:bg-slate-700"
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
