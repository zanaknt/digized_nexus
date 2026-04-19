import Link from "next/link";
import PageShell from "@/src/components/layout/PageShell";
import Badge from "@/src/components/ui/Badge";
import { servers } from "@/src/lib/data/servers";

function ServerItem({
  id,
  name,
  environment,
  status,
  uptime,
  linkedProjectIds,
  description,
}: {
  id: string;
  name: string;
  environment: string;
  status: string;
  uptime: string;
  linkedProjectIds: string[];
  description: string;
}) {
  return (
    <Link
      href={`/servers/${id}`}
      className="block border-b border-slate-200 px-4 py-4 text-sm text-slate-700 last:border-b-0 hover:bg-slate-100"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-medium text-slate-900">{name}</h3>
            <Badge type="status" value={status} />
          </div>
          <div className="mt-1 text-slate-600">
            Environment: {environment} · Uptime: {uptime} · Projects:{" "}
            {linkedProjectIds.length}
          </div>
          <p className="mt-2 text-slate-700">{description}</p>
        </div>
      </div>
    </Link>
  );
}

export default function ServersPage() {
  return (
    <PageShell
      title="Servers"
      subtitle="A simple list of servers and their current status."
    >
      <div className="rounded-lg border border-slate-200 bg-slate-50">
        <div className="border-b border-slate-200 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
          Servers
        </div>
        {servers.map((server) => (
          <ServerItem key={server.id} {...server} />
        ))}
      </div>
    </PageShell>
  );
}
