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
    <section className="rounded-lg border border-[var(--shell-border)] bg-[var(--panel-subtle)] p-5">
      <h2 className="text-sm font-semibold text-[var(--shell-foreground)]">
        {title}
      </h2>
      {children}
    </section>
  );
}
