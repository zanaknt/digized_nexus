"use client";

import { useEffect, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";

const sectionLabels: Record<string, string> = {
  dashboard: "Dashboard",
  agents: "Agents",
  incidents: "Incidents",
  approvals: "Approvals",
  activity: "Activity",
  settings: "Settings",
  outputs: "Outputs",
  projects: "Projects",
  servers: "Servers",
};

function getSectionLabel(pathname: string) {
  const firstSegment = pathname.split("/").filter(Boolean)[0];

  if (!firstSegment) {
    return "Dashboard";
  }

  return sectionLabels[firstSegment] ?? "Workspace";
}

function subscribeToThemeChange(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
  };
}

function getPreferredTheme(): "light" | "dark" {
  const savedTheme = window.localStorage.getItem("digized-nexus-theme");

  if (savedTheme === "dark" || savedTheme === "light") {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export default function Header() {
  const pathname = usePathname();
  const theme = useSyncExternalStore(
    subscribeToThemeChange,
    getPreferredTheme,
    () => "light",
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  function toggleTheme() {
    const nextTheme = theme === "dark" ? "light" : "dark";

    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("digized-nexus-theme", nextTheme);
    window.dispatchEvent(new Event("storage"));
  }

  return (
    <header className="border-b border-[var(--shell-border)] bg-[var(--shell-surface)] px-5 py-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--shell-muted)]">
            Digized Nexus Cockpit
          </div>
          <div className="mt-2 flex items-center gap-3">
            <h1 className="truncate text-lg font-semibold text-[var(--shell-foreground)]">
              {getSectionLabel(pathname)}
            </h1>
            <span className="hidden rounded-full border border-[var(--shell-border)] bg-[var(--shell-elevated)] px-2.5 py-1 text-xs text-[var(--shell-muted)] sm:inline-flex">
              AI operations workspace
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 self-start lg:self-auto">
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex items-center rounded-full border border-[var(--shell-border)] bg-[var(--shell-elevated)] px-3 py-2 text-xs font-medium text-[var(--shell-foreground)] transition hover:border-slate-400"
          >
            {theme === "dark" ? "Light mode" : "Dark mode"}
          </button>

          <div className="flex items-center gap-3 rounded-full border border-[var(--shell-border)] bg-[var(--shell-elevated)] px-3 py-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--shell-foreground)] text-xs font-semibold text-[var(--shell-surface)]">
              OP
            </div>
            <div className="leading-tight">
              <div className="text-sm font-medium text-[var(--shell-foreground)]">
                Operator
              </div>
              <div className="text-xs text-[var(--shell-muted)]">
                Login placeholder
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
