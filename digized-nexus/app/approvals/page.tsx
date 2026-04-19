import PageShell from "@/src/components/layout/PageShell";
import { approvals } from "@/src/lib/data/approvals";

function ApprovalRow({
  actionTitle,
  relatedIncident,
  riskLevel,
  requestedBy,
  status,
}: {
  actionTitle: string;
  relatedIncident: string;
  riskLevel: string;
  requestedBy: string;
  status: string;
}) {
  return (
    <div className="grid grid-cols-[2.2fr_1.2fr_0.9fr_1fr_1.5fr] gap-4 border-b border-slate-200 px-4 py-3 text-sm text-slate-700 last:border-b-0">
      <div className="font-medium text-slate-900">{actionTitle}</div>
      <div>{relatedIncident}</div>
      <div>{riskLevel}</div>
      <div>{requestedBy}</div>
      <div className="flex gap-2">
        <button className="rounded border border-slate-300 bg-white px-3 py-1 text-xs text-slate-700 hover:bg-slate-100">
          Approve
        </button>
        <button className="rounded border border-slate-300 bg-white px-3 py-1 text-xs text-slate-700 hover:bg-slate-100">
          Reject
        </button>
      </div>
    </div>
  );
}

export default function ApprovalsPage() {
  return (
    <PageShell
      title="Approvals"
      subtitle="A small mock queue of approval requests."
    >
      <div className="rounded-lg border border-slate-200 bg-slate-50">
        <div className="grid grid-cols-[2.2fr_1.2fr_0.9fr_1fr_1.5fr] gap-4 border-b border-slate-200 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
          <div>Action</div>
          <div>Incident</div>
          <div>Risk</div>
          <div>Requested by</div>
          <div>Status</div>
        </div>
        {approvals.map((item) => (
          <ApprovalRow key={item.id} {...item} />
        ))}
      </div>
    </PageShell>
  );
}
