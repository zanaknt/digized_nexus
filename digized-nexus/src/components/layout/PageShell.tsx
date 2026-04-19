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
      <div className="rounded-2xl border border-[var(--shell-border)] bg-[var(--panel-background)] p-6 shadow-[0_8px_30px_rgba(15,23,42,0.06)]">
        <div className="mb-6 space-y-2">
          <h1 className="text-xl font-semibold tracking-tight text-slate-900">
            {title}
          </h1>
          {subtitle ? (
            <p className="text-sm leading-6 text-slate-600">{subtitle}</p>
          ) : null}
        </div>
        {children}
      </div>
    </main>
  );
}
