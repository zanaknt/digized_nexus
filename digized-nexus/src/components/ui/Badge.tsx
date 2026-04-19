type BadgeProps = {
  type: "status" | "severity";
  value: string;
};

const badgeStyles: Record<string, string> = {
  active: "bg-emerald-100 text-emerald-800",
  idle: "bg-slate-100 text-slate-800",
  error: "bg-rose-100 text-rose-800",
  open: "bg-rose-100 text-rose-800",
  investigating: "bg-amber-100 text-amber-800",
  resolved: "bg-emerald-100 text-emerald-800",
  pending: "bg-amber-100 text-amber-800",
  incident: "bg-blue-100 text-blue-800",
  agent: "bg-purple-100 text-purple-800",
  approval: "bg-orange-100 text-orange-800",
  report: "bg-green-100 text-green-800",
  analysis: "bg-indigo-100 text-indigo-800",
  log: "bg-gray-100 text-gray-800",
  low: "bg-slate-100 text-slate-800",
  medium: "bg-amber-100 text-amber-800",
  high: "bg-rose-100 text-rose-800",
};

export default function Badge({ type, value }: BadgeProps) {
  const key = value.toLowerCase();
  const styles = badgeStyles[key] ?? "bg-slate-100 text-slate-800";
  const displayValue = value.charAt(0).toUpperCase() + value.slice(1);

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold leading-none ${styles}`}
    >
      {displayValue}
    </span>
  );
}
