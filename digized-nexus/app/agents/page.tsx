import Link from "next/link";
import PageShell from "@/src/components/layout/PageShell";
import Badge from "@/src/components/ui/Badge";
import { agents } from "@/src/lib/data/agents";

function AgentRow({
  id,
  name,
  role,
  status,
  lastRun,
}: {
  id: string;
  name: string;
  role: string;
  status: string;
  lastRun: string;
}) {
  return (
    <Link
      href={`/agents/${id}`}
      className="grid grid-cols-4 gap-4 border-b border-slate-200 px-4 py-3 text-sm text-slate-700 last:border-b-0 hover:bg-slate-100"
    >
      <div className="font-medium text-slate-900">{name}</div>
      <div>{role}</div>
      <div>
        <Badge type="status" value={status} />
      </div>
      <div>{lastRun}</div>
    </Link>
  );
}

export default function AgentsPage() {
  return (
    <PageShell
      title="Agents"
      subtitle="A simple mock list of Digized Nexus agents."
    >
      <div className="rounded-lg border border-slate-200 bg-slate-50">
        <div className="grid grid-cols-4 gap-4 border-b border-slate-200 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
          <div>Name</div>
          <div>Role</div>
          <div>Status</div>
          <div>Last run</div>
        </div>
        {agents.map((agent) => (
          <AgentRow key={agent.id} {...agent} />
        ))}
      </div>
    </PageShell>
  );
}
