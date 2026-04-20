import type { ReactNode } from "react";

type ListRowProps = {
  children: ReactNode;
  className?: string;
};

export default function ListRow({ children, className = "" }: ListRowProps) {
  return (
    <div
      className={`border-b border-[var(--shell-border)] px-4 text-sm text-[var(--shell-foreground)] last:border-b-0 ${className}`.trim()}
    >
      {children}
    </div>
  );
}
