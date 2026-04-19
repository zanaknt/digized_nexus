import type { ReactNode } from "react";

type DetailSectionProps = {
  title: string;
  children: ReactNode;
};

export default function DetailSection({
  title,
  children,
}: DetailSectionProps) {
  return (
    <section className="rounded-lg border border-slate-200 bg-slate-50 p-5">
      <h2 className="text-sm font-semibold text-slate-900">{title}</h2>
      {children}
    </section>
  );
}
