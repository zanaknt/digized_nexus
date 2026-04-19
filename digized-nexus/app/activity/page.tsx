import PageShell from "@/src/components/layout/PageShell";
import Badge from "@/src/components/ui/Badge";
import ListRow from "@/src/components/ui/ListRow";
import { getActivities } from "@/src/lib/data-access";

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
    <ListRow className="flex items-center justify-between py-3">
      <div className="flex items-center gap-4">
        <div className="font-medium text-slate-900">{title}</div>
        <Badge type="status" value={type} />
        <div className="text-slate-600">· {relatedEntity}</div>
      </div>
      <div className="text-slate-500">{timestamp}</div>
    </ListRow>
  );
}

export default function ActivityPage() {
  const sortedActivities = [...getActivities()].sort((a, b) =>
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
