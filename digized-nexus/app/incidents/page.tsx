import Link from "next/link";
import PageShell from "@/src/components/layout/PageShell";
import Badge from "@/src/components/ui/Badge";
import { incidents } from "@/src/lib/data/incidents";

function IncidentRow({
  id,
  title,
  severity,
  status,
  source,
  createdAt,
}: {
  id: string;
  title: string;
  severity: string;
  status: string;
  source: string;
  createdAt: string;
}) {
  return (
    <Link
      href={`/incidents/${id}`}
      className="grid grid-cols-5 gap-4 border-b border-slate-200 px-4 py-3 text-sm text-slate-700 last:border-b-0 hover:bg-slate-100"
    >
      <div className="font-medium text-slate-900">{title}</div>
      <div>
        <Badge type="severity" value={severity} />
      </div>
      <div>
        <Badge type="status" value={status} />
      </div>
      <div>{source}</div>
      <div>{createdAt}</div>
    </Link>
  );
}

export default function IncidentsPage() {
  return (
    <PageShell
      title="Incidents"
      subtitle="A simple mock list of Digized Nexus incidents."
    >
      <div className="rounded-lg border border-slate-200 bg-slate-50">
        <div className="grid grid-cols-5 gap-4 border-b border-slate-200 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
          <div>Title</div>
          <div>Severity</div>
          <div>Status</div>
          <div>Source</div>
          <div>Created at</div>
        </div>

        {incidents.map((incident) => (
          <IncidentRow key={incident.id} {...incident} />
        ))}
      </div>
    </PageShell>
  );
}
