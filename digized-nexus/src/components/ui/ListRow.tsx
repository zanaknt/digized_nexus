import type { ReactNode } from "react";

type ListRowProps = {
  children: ReactNode;
  className?: string;
};

export default function ListRow({ children, className = "" }: ListRowProps) {
  return (
    <div
      className={`border-b border-slate-200 px-4 text-sm text-slate-700 last:border-b-0 ${className}`.trim()}
    >
      {children}
    </div>
  );
}
