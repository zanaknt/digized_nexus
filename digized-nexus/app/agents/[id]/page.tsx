import PageShell from "@/src/components/layout/PageShell";
import Link from "next/link";
import { incidents } from "@/src/lib/data/incidents";
import { agents } from "@/src/lib/data/agents";

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

  return (
    <PageShell
      title={agent.name}
      subtitle={`Role: ${agent.role} · Status: ${agent.status}`}
    >
      <div className="space-y-6">
        <section className="rounded-lg border border-slate-200 bg-slate-50 p-5">
          <div className="text-sm text-slate-600">Last run</div>
          <div className="mt-1 text-base font-medium text-slate-900">
            {agent.lastRun}
          </div>
          <div className="mt-4 text-sm text-slate-700">{agent.description}</div>
        </section>

        <section className="rounded-lg border border-slate-200 bg-slate-50 p-5">
          <h2 className="text-sm font-semibold text-slate-900">
            Recent outputs
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            {agent.recentOutputs.map((output, index) => (
              <li
                key={index}
                className="rounded-md bg-white border border-slate-200 px-3 py-2"
              >
                {output}
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-lg border border-slate-200 bg-slate-50 p-5">
          <h2 className="text-sm font-semibold text-slate-900">
            Linked incidents
          </h2>
          {linkedIncidents.length ? (
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              {linkedIncidents.map((incident) => (
                <li
                  key={incident.id}
                  className="rounded-md bg-white border border-slate-200 px-3 py-2"
                >
                  <div className="font-medium text-slate-900">
                    {incident.title}
                  </div>
                  <div className="text-slate-600">
                    {incident.status} · {incident.severity}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-slate-600">No linked incidents.</p>
          )}
        </section>

        <Link href="/agents" className="text-sm text-slate-700 underline">
          Back to agents
        </Link>
      </div>
    </PageShell>
  );
}
