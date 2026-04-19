"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/agents", label: "Agents" },
  { href: "/incidents", label: "Incidents" },
  { href: "/approvals", label: "Approvals" },
  { href: "/activity", label: "Activity" },
  { href: "/settings", label: "Settings" },
  { href: "/outputs", label: "Outputs" },
  { href: "/projects", label: "Projects" },
  { href: "/servers", label: "Servers" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 min-h-screen border-r border-slate-200 bg-white p-4">
      <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-3">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          Cockpit
        </div>
        <div className="mt-2 text-sm font-semibold text-slate-900">
          Digized Nexus
        </div>
      </div>
      <nav className="mt-6 space-y-1 text-sm text-slate-700">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block rounded-md px-3 py-2 transition ${
                isActive
                  ? "bg-slate-900 font-medium text-white"
                  : "hover:bg-slate-100"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
