import Link from "next/link";
import PageShell from "@/src/components/layout/PageShell";
import Badge from "@/src/components/ui/Badge";
import { incidents } from "@/src/lib/data/incidents";
import { agents } from "@/src/lib/data/agents";

export default function IncidentDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const incident = incidents.find((item) => item.id === params.id);

  if (!incident) {
    return (
      <PageShell title="Incident not found">
        <p className="text-sm text-slate-600">No incident matches that ID.</p>
        <Link
          href="/incidents"
          className="mt-4 inline-block text-sm text-slate-700 underline"
        >
          Back to incidents
        </Link>
      </PageShell>
    );
  }

  const agent = agents.find((item) => item.id === incident.linkedAgentId);

  return (
    <PageShell
      title={incident.title}
      subtitle={`${incident.severity} · ${incident.status} · ${incident.source}`}
    >
      <div className="space-y-6">
        <section className="rounded-lg border border-slate-200 bg-slate-50 p-5">
          <h2 className="text-sm font-semibold text-slate-900">Details</h2>
          <div className="mt-4 grid gap-4 text-sm text-slate-700 sm:grid-cols-3">
            <div>
              <div className="font-semibold text-slate-900">Created at</div>
              <div className="mt-1">{incident.createdAt}</div>
            </div>
            <div>
              <div className="font-semibold text-slate-900">Source</div>
              <div className="mt-1">{incident.source}</div>
            </div>
            <div>
              <div className="font-semibold text-slate-900">Severity</div>
              <div className="mt-1">
                <Badge type="severity" value={incident.severity} />
              </div>
            </div>
            <div>
              <div className="font-semibold text-slate-900">Status</div>
              <div className="mt-1">
                <Badge type="status" value={incident.status} />
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-lg border border-slate-200 bg-slate-50 p-5">
          <h2 className="text-sm font-semibold text-slate-900">Summary</h2>
          <p className="mt-3 text-sm text-slate-700">{incident.summary}</p>
        </section>

        <section className="rounded-lg border border-slate-200 bg-slate-50 p-5">
          <h2 className="text-sm font-semibold text-slate-900">
            Suggested action
          </h2>
          <p className="mt-3 text-sm text-slate-700">
            {incident.suggestedAction}
          </p>
        </section>

        <section className="rounded-lg border border-slate-200 bg-slate-50 p-5">
          <h2 className="text-sm font-semibold text-slate-900">
            Related agent
          </h2>
          {agent ? (
            <Link
              href={`/agents/${agent.id}`}
              className="mt-3 inline-flex items-center gap-2 text-sm text-slate-700 hover:text-slate-900"
            >
              <span className="font-medium">{agent.name}</span>
              <span className="text-slate-600">· {agent.role}</span>
            </Link>
          ) : (
            <p className="mt-3 text-sm text-slate-600">
              No linked agent available.
            </p>
          )}
        </section>

        <Link href="/incidents" className="text-sm text-slate-700 underline">
          Back to incidents
        </Link>
      </div>
    </PageShell>
  );
}
