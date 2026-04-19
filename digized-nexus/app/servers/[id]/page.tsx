import Link from "next/link";
import PageShell from "@/src/components/layout/PageShell";
import Badge from "@/src/components/ui/Badge";
import DetailSection from "@/src/components/ui/DetailSection";
import { activities } from "@/src/lib/data/activity";
import { incidents } from "@/src/lib/data/incidents";
import { projects } from "@/src/lib/data/projects";
import { servers } from "@/src/lib/data/servers";

export default function ServerDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const server = servers.find((item) => item.id === params.id);

  if (!server) {
    return (
      <PageShell title="Server not found">
        <p className="text-sm text-slate-600">No server matches that ID.</p>
        <Link
          href="/servers"
          className="mt-4 inline-block text-sm text-slate-700 underline"
        >
          Back to servers
        </Link>
      </PageShell>
    );
  }

  const linkedProjects = projects.filter((project) =>
    server.linkedProjectIds.includes(project.id),
  );
  const recentIncidents = incidents.filter((incident) =>
    server.recentIncidentIds.includes(incident.id),
  );
  const recentActivity = activities.filter((activity) =>
    server.recentActivityIds.includes(activity.id),
  );

  return (
    <PageShell
      title={server.name}
      subtitle={`Environment: ${server.environment} · Status: ${server.status}`}
    >
      <div className="space-y-6">
        <DetailSection title="Overview">
          <div className="mt-4 grid gap-4 text-sm text-slate-700 sm:grid-cols-3">
            <div>
              <div className="font-semibold text-slate-900">Environment</div>
              <div className="mt-1">{server.environment}</div>
            </div>
            <div>
              <div className="font-semibold text-slate-900">Status</div>
              <div className="mt-1">
                <Badge type="status" value={server.status} />
              </div>
            </div>
            <div>
              <div className="font-semibold text-slate-900">Uptime</div>
              <div className="mt-1">{server.uptime}</div>
            </div>
          </div>
          <p className="mt-4 text-sm text-slate-700">{server.description}</p>
        </DetailSection>

        <DetailSection title="Linked projects">
          {linkedProjects.length ? (
            <ul className="mt-3 space-y-2">
              {linkedProjects.map((project) => (
                <li
                  key={project.id}
                  className="rounded-md border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700"
                >
                  <Link
                    href={`/projects/${project.id}`}
                    className="font-medium text-slate-900 hover:text-slate-700"
                  >
                    {project.name}
                  </Link>
                  <div className="mt-1 flex items-center gap-2 text-slate-600">
                    <span>{project.owner}</span>
                    <Badge type="status" value={project.status} />
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-slate-600">No linked projects.</p>
          )}
        </DetailSection>

        <DetailSection title="Recent incidents">
          {recentIncidents.length ? (
            <ul className="mt-3 space-y-2">
              {recentIncidents.map((incident) => (
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
            <p className="mt-3 text-sm text-slate-600">No recent incidents.</p>
          )}
        </DetailSection>

        <DetailSection title="Recent activity">
          {recentActivity.length ? (
            <ul className="mt-3 space-y-2">
              {recentActivity.map((activity) => (
                <li
                  key={activity.id}
                  className="rounded-md border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-slate-900">
                      {activity.title}
                    </span>
                    <Badge type="status" value={activity.type} />
                  </div>
                  <div className="mt-1 text-slate-600">
                    {activity.relatedEntity} · {activity.timestamp}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-slate-600">No recent activity.</p>
          )}
        </DetailSection>

        <Link href="/servers" className="text-sm text-slate-700 underline">
          Back to servers
        </Link>
      </div>
    </PageShell>
  );
}
