import Link from "next/link";
import PageShell from "@/src/components/layout/PageShell";
import Badge from "@/src/components/ui/Badge";
import { getProjects } from "@/src/lib/data-access";

function ProjectItem({
  id,
  name,
  status,
  owner,
  linkedAgentIds,
  linkedIncidentIds,
  description,
}: {
  id: string;
  name: string;
  status: string;
  owner: string;
  linkedAgentIds: string[];
  linkedIncidentIds: string[];
  description: string;
}) {
  return (
    <Link
      href={`/projects/${id}`}
      className="block border-b border-slate-200 px-4 py-4 text-sm text-slate-700 last:border-b-0 hover:bg-slate-100"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-medium text-slate-900">{name}</h3>
            <Badge type="status" value={status} />
          </div>
          <div className="mt-1 text-slate-600">
            Owner: {owner} · Agents: {linkedAgentIds.length} · Incidents:{" "}
            {linkedIncidentIds.length}
          </div>
          <p className="mt-2 text-slate-700">{description}</p>
        </div>
      </div>
    </Link>
  );
}

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <PageShell
      title="Projects"
      subtitle="Active projects and their associated agents and incidents."
    >
      <div className="rounded-lg border border-slate-200 bg-slate-50">
        <div className="border-b border-slate-200 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
          Projects
        </div>
        {projects.map((project) => (
          <ProjectItem key={project.id} {...project} />
        ))}
      </div>
    </PageShell>
  );
}
