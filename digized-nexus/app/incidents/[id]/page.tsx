import Link from "next/link";
import PageShell from "@/src/components/layout/PageShell";
import Badge from "@/src/components/ui/Badge";
import DetailSection from "@/src/components/ui/DetailSection";
import {
  findAgentById,
  findIncidentById,
} from "@/src/lib/data-access";

export default function IncidentDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const incident = findIncidentById(params.id);

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

  const agent = findAgentById(incident.linkedAgentId);

  return (
    <PageShell
      title={incident.title}
      subtitle={`${incident.severity} · ${incident.status} · ${incident.source}`}
    >
      <div className="space-y-6">
        <DetailSection title="Details">
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
        </DetailSection>

        <DetailSection title="Summary">
          <p className="mt-3 text-sm text-slate-700">{incident.summary}</p>
        </DetailSection>

        <DetailSection title="Suggested action">
          <p className="mt-3 text-sm text-slate-700">
            {incident.suggestedAction}
          </p>
        </DetailSection>

        <DetailSection title="Related agent">
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
        </DetailSection>

        <Link href="/incidents" className="text-sm text-slate-700 underline">
          Back to incidents
        </Link>
      </div>
    </PageShell>
  );
}
