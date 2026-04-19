import Link from "next/link";
import PageShell from "@/src/components/layout/PageShell";
import Badge from "@/src/components/ui/Badge";
import ListRow from "@/src/components/ui/ListRow";
import { getActivities } from "@/src/lib/data-access";

function getActivityHref(type: string, id: string) {
  switch (type) {
    case "agent":
      return `/agents/${id}`;
    case "incident":
      return `/incidents/${id}`;
    case "approval":
      return `/approvals/${id}`;
    case "output":
      return `/outputs/${id}`;
    case "project":
      return `/projects/${id}`;
    case "server":
      return `/servers/${id}`;
    default:
      return null;
  }
}

function ActivityItem({
  title,
  type,
  relatedEntity,
  relatedEntityType,
  relatedEntityId,
  timestamp,
}: {
  title: string;
  type: string;
  relatedEntity: string;
  relatedEntityType: string;
  relatedEntityId: string;
  timestamp: string;
}) {
  const href = getActivityHref(relatedEntityType, relatedEntityId);

  return (
    <ListRow className="flex items-center justify-between py-3">
      <div className="flex items-center gap-4">
        {href ? (
          <Link
            href={href}
            className="font-medium text-slate-900 hover:text-slate-700"
          >
            {title}
          </Link>
        ) : (
          <div className="font-medium text-slate-900">{title}</div>
        )}
        <Badge type="status" value={type} />
        <div className="text-slate-600">
          ·{" "}
          {href ? (
            <Link href={href} className="underline hover:text-slate-700">
              {relatedEntity}
            </Link>
          ) : (
            relatedEntity
          )}
        </div>
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
