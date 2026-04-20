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
    <aside className="w-64 min-h-screen border-r border-[var(--shell-border)] bg-[var(--shell-surface)] p-4 backdrop-blur-xl">
      <div className="rounded-xl border border-[var(--shell-border)] bg-[var(--shell-elevated)] px-3 py-3 shadow-[var(--shell-shadow)]">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--shell-muted)]">
          Cockpit
        </div>
        <div className="mt-2 text-sm font-semibold text-[var(--shell-foreground)]">
          Digized Nexus
        </div>
        <div className="mt-1 text-xs text-[var(--shell-muted)]">
          Agent workspace
        </div>
      </div>
      <nav className="mt-6 space-y-1 text-sm text-[var(--shell-foreground)]">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block rounded-lg px-3 py-2 transition ${
                isActive
                  ? "bg-[var(--shell-foreground)] font-medium text-[var(--panel-background)]"
                  : "text-[var(--shell-muted)] hover:bg-[var(--panel-hover)] hover:text-[var(--shell-foreground)]"
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
