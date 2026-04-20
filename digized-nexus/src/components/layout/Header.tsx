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
    <header className="border-b border-[var(--shell-border)] bg-[var(--shell-surface)] px-5 py-4 backdrop-blur-xl">
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
          <div className="flex items-center gap-2 rounded-2xl border border-[var(--shell-border)] bg-[var(--shell-elevated)] px-2 py-2 shadow-[var(--shell-shadow)]">
            <div className="pl-2 pr-1 leading-tight">
              <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--shell-muted)]">
                Theme
              </div>
              <div className="mt-1 text-sm font-medium text-[var(--shell-foreground)]">
                {theme === "dark" ? "Dark mode" : "Light mode"}
              </div>
            </div>

            <button
              type="button"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              className="inline-flex items-center gap-2 rounded-xl border border-[var(--shell-border)] bg-[var(--panel-background)] px-3 py-2 text-xs font-medium text-[var(--shell-foreground)] transition hover:bg-[var(--panel-hover)]"
            >
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  theme === "dark" ? "bg-sky-400" : "bg-amber-400"
                }`}
              />
              <span>{theme === "dark" ? "Use light" : "Use dark"}</span>
            </button>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-[var(--shell-border)] bg-[var(--shell-elevated)] px-3 py-2 shadow-[var(--shell-shadow)]">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--shell-foreground)] text-xs font-semibold text-[var(--shell-surface)]">
              OP
            </div>
            <div className="leading-tight">
              <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--shell-muted)]">
                Operator session
              </div>
              <div className="mt-1 text-sm font-medium text-[var(--shell-foreground)]">
                Operator
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-[var(--shell-muted)]">
                <span>Mock access</span>
                <span className="h-1 w-1 rounded-full bg-[var(--shell-muted)]" />
                <span>Workspace controls placeholder</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
