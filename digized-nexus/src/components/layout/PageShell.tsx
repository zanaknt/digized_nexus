import type { ReactNode } from "react";

type PageShellProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
};

export default function PageShell({
  title,
  subtitle,
  children,
}: PageShellProps) {
  return (
    <main className="min-h-full flex-1 bg-[var(--shell-background)] p-5 lg:p-6">
      <div className="rounded-2xl border border-[var(--shell-border)] bg-[var(--panel-background)] p-6 shadow-[var(--shell-shadow)]">
        <div className="mb-6 space-y-2">
          <h1 className="text-xl font-semibold tracking-tight text-[var(--shell-foreground)]">
            {title}
          </h1>
          {subtitle ? (
            <p className="text-sm leading-6 text-[var(--shell-muted)]">
              {subtitle}
            </p>
          ) : null}
        </div>
        {children}
      </div>
    </main>
  );
}
