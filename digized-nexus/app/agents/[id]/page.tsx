import PageShell from "@/src/components/layout/PageShell";
import Link from "next/link";
import Badge from "@/src/components/ui/Badge";
import DetailSection from "@/src/components/ui/DetailSection";
import { incidents } from "@/src/lib/data/incidents";
import { agents } from "@/src/lib/data/agents";
import { outputs } from "@/src/lib/data/outputs";

export default function AgentDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const agent = agents.find((item) => item.id === params.id);

  if (!agent) {
    return (
      <PageShell title="Agent not found">
        <p className="text-sm text-slate-600">No agent matches that ID.</p>
        <Link
          href="/agents"
          className="mt-4 inline-block text-sm text-slate-700 underline"
        >
          Back to agents
        </Link>
      </PageShell>
    );
  }

  const linkedIncidents = incidents.filter((incident) =>
    agent.linkedIncidentIds.includes(incident.id),
  );
  const relatedOutputs = outputs
    .filter((output) => output.relatedAgentId === agent.id)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  return (
    <PageShell
      title={agent.name}
      subtitle={`Role: ${agent.role} · Status: ${agent.status}`}
    >
      <div className="space-y-6">
        <DetailSection title="Overview">
          <div className="mt-4 grid gap-4 text-sm text-slate-700 sm:grid-cols-3">
            <div>
              <div className="font-semibold text-slate-900">Role</div>
              <div className="mt-1">{agent.role}</div>
            </div>
            <div>
              <div className="font-semibold text-slate-900">Status</div>
              <div className="mt-1">
                <Badge type="status" value={agent.status} />
              </div>
            </div>
            <div>
              <div className="font-semibold text-slate-900">Last run</div>
              <div className="mt-1">{agent.lastRun}</div>
            </div>
          </div>
          <div className="mt-4 text-sm text-slate-700">{agent.description}</div>
        </DetailSection>

        <DetailSection title="Recent outputs">
          {relatedOutputs.length ? (
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              {relatedOutputs.map((output) => (
                <li
                  key={output.id}
                  className="rounded-md border border-slate-200 bg-white px-3 py-3"
                >
                  <Link
                    href={`/outputs/${output.id}`}
                    className="font-medium text-slate-900 hover:text-slate-700"
                  >
                    {output.title}
                  </Link>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-slate-600">
                    <Badge type="status" value={output.type} />
                    <span>{output.createdAt}</span>
                  </div>
                  <p className="mt-2 text-slate-700">{output.preview}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-slate-600">No recent outputs.</p>
          )}
        </DetailSection>

        <DetailSection title="Linked incidents">
          {linkedIncidents.length ? (
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              {linkedIncidents.map((incident) => (
                <li
                  key={incident.id}
                  className="rounded-md bg-white border border-slate-200 px-3 py-3"
                >
                  <Link
                    href={`/incidents/${incident.id}`}
                    className="font-medium text-slate-900 hover:text-slate-700"
                  >
                    {incident.title}
                  </Link>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-slate-600">
                    <Badge type="status" value={incident.status} />
                    <Badge type="severity" value={incident.severity} />
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-slate-600">No linked incidents.</p>
          )}
        </DetailSection>

        <Link href="/agents" className="text-sm text-slate-700 underline">
          Back to agents
        </Link>
      </div>
    </PageShell>
  );
}
