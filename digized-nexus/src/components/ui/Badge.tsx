type BadgeProps = {
  type: "status" | "severity";
  value: string;
};

const badgeStyles: Record<string, string> = {
  active: "bg-emerald-100/80 text-emerald-800 ring-1 ring-emerald-200",
  idle: "bg-slate-100/80 text-slate-700 ring-1 ring-slate-200",
  error: "bg-rose-100/80 text-rose-800 ring-1 ring-rose-200",
  open: "bg-rose-100/80 text-rose-800 ring-1 ring-rose-200",
  investigating: "bg-amber-100/80 text-amber-800 ring-1 ring-amber-200",
  resolved: "bg-emerald-100/80 text-emerald-800 ring-1 ring-emerald-200",
  pending: "bg-amber-100/80 text-amber-800 ring-1 ring-amber-200",
  approved: "bg-emerald-100/80 text-emerald-800 ring-1 ring-emerald-200",
  rejected: "bg-rose-100/80 text-rose-800 ring-1 ring-rose-200",
  incident: "bg-blue-100/80 text-blue-800 ring-1 ring-blue-200",
  agent: "bg-violet-100/80 text-violet-800 ring-1 ring-violet-200",
  approval: "bg-orange-100/80 text-orange-800 ring-1 ring-orange-200",
  report: "bg-green-100/80 text-green-800 ring-1 ring-green-200",
  analysis: "bg-indigo-100/80 text-indigo-800 ring-1 ring-indigo-200",
  log: "bg-gray-100/80 text-gray-800 ring-1 ring-gray-200",
  low: "bg-slate-100/80 text-slate-700 ring-1 ring-slate-200",
  medium: "bg-amber-100/80 text-amber-800 ring-1 ring-amber-200",
  high: "bg-rose-100/80 text-rose-800 ring-1 ring-rose-200",
};

export default function Badge({ type, value }: BadgeProps) {
  const key = value.toLowerCase();
  const styles = badgeStyles[key] ?? "bg-slate-100/80 text-slate-700 ring-1 ring-slate-200";
  const displayValue = value.charAt(0).toUpperCase() + value.slice(1);

  return (
    <span
      data-badge-type={type}
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold leading-none backdrop-blur-sm ${styles}`}
    >
      {displayValue}
    </span>
  );
}
