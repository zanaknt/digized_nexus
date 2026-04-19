import Link from "next/link";
import PageShell from "@/src/components/layout/PageShell";
import Badge from "@/src/components/ui/Badge";
import { agents } from "@/src/lib/data/agents";
import { incidents } from "@/src/lib/data/incidents";
import { outputs } from "@/src/lib/data/outputs";
import { projects } from "@/src/lib/data/projects";
import { servers } from "@/src/lib/data/servers";

export default function ProjectDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const project = projects.find((item) => item.id === params.id);

  if (!project) {
    return (
      <PageShell title="Project not found">
        <p className="text-sm text-slate-600">No project matches that ID.</p>
        <Link
          href="/projects"
          className="mt-4 inline-block text-sm text-slate-700 underline"
        >
          Back to projects
        </Link>
      </PageShell>
    );
  }

  const linkedAgents = agents.filter((agent) =>
    project.linkedAgentIds.includes(agent.id),
  );
  const linkedIncidents = incidents.filter((incident) =>
    project.linkedIncidentIds.includes(incident.id),
  );
  const recentOutputs = outputs.filter((output) =>
    project.recentOutputIds.includes(output.id),
  );
  const relatedServer = project.relatedServerId
    ? servers.find((server) => server.id === project.relatedServerId)
    : null;

  return (
    <PageShell
      title={project.name}
      subtitle={`Owner: ${project.owner} · Status: ${project.status}`}
    >
      <div className="space-y-6">
        <section className="rounded-lg border border-slate-200 bg-slate-50 p-5">
          <h2 className="text-sm font-semibold text-slate-900">Overview</h2>
          <div className="mt-4 grid gap-4 text-sm text-slate-700 sm:grid-cols-3">
            <div>
              <div className="font-semibold text-slate-900">Status</div>
              <div className="mt-1">
                <Badge type="status" value={project.status} />
              </div>
            </div>
            <div>
              <div className="font-semibold text-slate-900">Owner</div>
              <div className="mt-1">{project.owner}</div>
            </div>
            <div>
              <div className="font-semibold text-slate-900">Related server</div>
              <div className="mt-1">
                {relatedServer ? relatedServer.name : "No related server"}
              </div>
            </div>
          </div>
          <p className="mt-4 text-sm text-slate-700">{project.description}</p>
        </section>

        <section className="rounded-lg border border-slate-200 bg-slate-50 p-5">
          <h2 className="text-sm font-semibold text-slate-900">
            Linked agents
          </h2>
          {linkedAgents.length ? (
            <ul className="mt-3 space-y-2">
              {linkedAgents.map((agent) => (
                <li
                  key={agent.id}
                  className="rounded-md border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700"
                >
                  <Link
                    href={`/agents/${agent.id}`}
                    className="font-medium text-slate-900 hover:text-slate-700"
                  >
                    {agent.name}
                  </Link>
                  <div className="mt-1 flex items-center gap-2 text-slate-600">
                    <span>{agent.role}</span>
                    <Badge type="status" value={agent.status} />
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-slate-600">No linked agents.</p>
          )}
        </section>

        <section className="rounded-lg border border-slate-200 bg-slate-50 p-5">
          <h2 className="text-sm font-semibold text-slate-900">
            Linked incidents
          </h2>
          {linkedIncidents.length ? (
            <ul className="mt-3 space-y-2">
              {linkedIncidents.map((incident) => (
                <li
                  key={incident.id}
                  className="rounded-md border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700"
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
        </section>

        <section className="rounded-lg border border-slate-200 bg-slate-50 p-5">
          <h2 className="text-sm font-semibold text-slate-900">
            Recent outputs
          </h2>
          {recentOutputs.length ? (
            <ul className="mt-3 space-y-2">
              {recentOutputs.map((output) => (
                <li
                  key={output.id}
                  className="rounded-md border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-slate-900">
                      {output.title}
                    </span>
                    <Badge type="status" value={output.type} />
                  </div>
                  <div className="mt-1 text-slate-600">
                    Agent: {output.relatedAgent} · {output.createdAt}
                  </div>
                  <p className="mt-2">{output.preview}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-slate-600">No recent outputs.</p>
          )}
        </section>

        <Link href="/projects" className="text-sm text-slate-700 underline">
          Back to projects
        </Link>
      </div>
    </PageShell>
  );
}
