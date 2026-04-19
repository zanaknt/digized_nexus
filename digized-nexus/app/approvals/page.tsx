import PageShell from "@/src/components/layout/PageShell";
import Badge from "@/src/components/ui/Badge";
import ListRow from "@/src/components/ui/ListRow";
import { approvals } from "@/src/lib/data/approvals";

function ApprovalRow({
  actionTitle,
  relatedIncident,
  severity,
  requestedBy,
  status,
}: {
  actionTitle: string;
  relatedIncident: string;
  severity: string;
  requestedBy: string;
  status: string;
}) {
  return (
    <ListRow className="grid grid-cols-[2.2fr_1.2fr_0.9fr_1fr_1.5fr] gap-4 py-3">
      <div className="font-medium text-slate-900">{actionTitle}</div>
      <div>{relatedIncident}</div>
      <div>
        <Badge type="severity" value={severity} />
      </div>
      <div>{requestedBy}</div>
      <div className="flex items-center gap-2">
        <Badge type="status" value={status} />
        <div className="flex gap-2">
          <button className="rounded border border-slate-300 bg-white px-3 py-1 text-xs text-slate-700 hover:bg-slate-100">
            Approve
          </button>
          <button className="rounded border border-slate-300 bg-white px-3 py-1 text-xs text-slate-700 hover:bg-slate-100">
            Reject
          </button>
        </div>
      </div>
    </ListRow>
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
