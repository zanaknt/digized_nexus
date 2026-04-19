import PageShell from "@/src/components/layout/PageShell";
import Badge from "@/src/components/ui/Badge";
import { activities } from "@/src/lib/data/activity";

function ActivityItem({
  title,
  type,
  relatedEntity,
  timestamp,
}: {
  title: string;
  type: string;
  relatedEntity: string;
  timestamp: string;
}) {
  return (
    <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 text-sm text-slate-700 last:border-b-0">
      <div className="flex items-center gap-4">
        <div className="font-medium text-slate-900">{title}</div>
        <Badge type="status" value={type} />
        <div className="text-slate-600">· {relatedEntity}</div>
      </div>
      <div className="text-slate-500">{timestamp}</div>
    </div>
  );
}

export default function ActivityPage() {
  const sortedActivities = [...activities].sort((a, b) =>
    b.timestamp.localeCompare(a.timestamp),
  );

  return (
    <PageShell
      title="Activity"
      subtitle="A chronological list of recent system activity."
    >
      <div className="rounded-lg border border-slate-200 bg-slate-50">
        <div className="border-b border-slate-200 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
          Recent Activity
        </div>
        {sortedActivities.map((activity) => (
          <ActivityItem key={activity.id} {...activity} />
        ))}
      </div>
    </PageShell>
  );
}
