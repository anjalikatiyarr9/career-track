
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Dashboard", path: "/" },
    { name: "Pipelines", path: "/pipeline" },
    { name: "Applications", path: "/applications" },
    { name: "Analytics", path: "/analytics" },
    { name: "Settings", path: "/settings" },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
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

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed left-4 top-4 z-50 rounded-lg bg-slate-800 px-4 py-2 text-lg text-white shadow-md md:hidden"
        aria-label="Open navigation menu"
      >
        ☰
      </button>

      {/* Mobile Navigation Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setIsOpen(false)}
          />

          <div className="relative h-full w-72 max-w-[85%] bg-slate-800 p-6 text-white shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">CareerTrack</h2>

              <button
                onClick={() => setIsOpen(false)}
                className="text-2xl text-white"
                aria-label="Close navigation menu"
              >
                ×
              </button>
            </div>

            <nav className="mt-8">
              <ul className="space-y-4 text-lg">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      href={item.path}
                      onClick={() => setIsOpen(false)}
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
        </div>
      )}
    </>
  );
}
