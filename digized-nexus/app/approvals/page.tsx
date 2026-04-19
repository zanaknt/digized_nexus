import Link from "next/link";
import PageShell from "@/src/components/layout/PageShell";
import Badge from "@/src/components/ui/Badge";
import ListRow from "@/src/components/ui/ListRow";
import MockApprovalActions from "@/src/components/approvals/MockApprovalActions";
import { getApprovals } from "@/src/lib/data-access";

function ApprovalRow({
  id,
  actionTitle,
  relatedIncident,
  severity,
  requestedBy,
  status,
}: {
  id: string;
  actionTitle: string;
  relatedIncident: string;
  severity: string;
  requestedBy: string;
  status: string;
}) {
  return (
    <ListRow className="grid grid-cols-[2.2fr_1.2fr_0.9fr_1fr_1.5fr] gap-4 py-3">
      <Link
        href={`/approvals/${id}`}
        className="font-medium text-slate-900 hover:text-slate-700"
      >
        {actionTitle}
      </Link>
      <div>{relatedIncident}</div>
      <div>
        <Badge type="severity" value={severity} />
      </div>
      <div>{requestedBy}</div>
      <div>
        <MockApprovalActions initialStatus={status} />
      </div>
    </ListRow>
  );
}

export default function ApprovalsPage() {
  const approvals = getApprovals();

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
