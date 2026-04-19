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
    <main className="flex-1 bg-slate-50 p-6">
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
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
