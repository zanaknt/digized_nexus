import Link from "next/link";
import PageShell from "@/src/components/layout/PageShell";
import Badge from "@/src/components/ui/Badge";
import ListRow from "@/src/components/ui/ListRow";
import { getOutputs } from "@/src/lib/data-access";

function OutputItem({
  id,
  title,
  type,
  relatedAgentId,
  relatedAgent,
  relatedEntity,
  createdAt,
  preview,
}: {
  id: string;
  title: string;
  type: string;
  relatedAgentId: string;
  relatedAgent: string;
  relatedEntity: string;
  createdAt: string;
  preview: string;
}) {
  return (
    <ListRow className="py-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <Link
            href={`/outputs/${id}`}
            className="flex items-center gap-2 hover:text-slate-700"
          >
            <h3 className="font-medium text-slate-900">{title}</h3>
            <Badge type="status" value={type} />
          </Link>
          <div className="mt-1 text-slate-600">
            Agent:{" "}
            <Link
              href={`/agents/${relatedAgentId}`}
              className="underline hover:text-slate-700"
            >
              {relatedAgent}
            </Link>{" "}
            · Entity: {relatedEntity}
          </div>
          <p className="mt-2 text-slate-700">{preview}</p>
        </div>
        <div className="text-slate-500">{createdAt}</div>
      </div>
    </ListRow>
  );
}

export default function OutputsPage() {
  const sortedOutputs = [...getOutputs()].sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt),
  );

  return (
    <PageShell
      title="Outputs"
      subtitle="Recent agent-generated reports, logs, and analyses."
    >
      <div className="rounded-lg border border-slate-200 bg-slate-50">
        <div className="border-b border-slate-200 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
          Agent Outputs
        </div>
        {sortedOutputs.map((output) => (
          <OutputItem key={output.id} {...output} />
        ))}
      </div>
    </PageShell>
  );
}
