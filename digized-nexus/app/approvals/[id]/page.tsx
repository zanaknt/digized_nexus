import Link from "next/link";
import PageShell from "@/src/components/layout/PageShell";
import Badge from "@/src/components/ui/Badge";
import MockApprovalActions from "@/src/components/approvals/MockApprovalActions";
import DetailSection from "@/src/components/ui/DetailSection";
import {
  findApprovalById,
  findIncidentById,
} from "@/src/lib/data-access";

export default function ApprovalDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const approval = findApprovalById(params.id);

  if (!approval) {
    return (
      <PageShell title="Approval not found">
        <p className="text-sm text-slate-600">No approval matches that ID.</p>
        <Link
          href="/approvals"
          className="mt-4 inline-block text-sm text-slate-700 underline"
        >
          Back to approvals
        </Link>
      </PageShell>
    );
  }

  const relatedIncident = findIncidentById(approval.incidentId) ?? null;

  return (
    <PageShell
      title={approval.actionTitle}
      subtitle={`Requested by ${approval.requestedBy} · Status: ${approval.status}`}
    >
      <div className="space-y-6">
        <DetailSection title="Overview">
          <div className="mt-4 grid gap-4 text-sm text-slate-700 sm:grid-cols-3">
            <div>
              <div className="font-semibold text-slate-900">Status</div>
              <div className="mt-1">
                <MockApprovalActions
                  initialStatus={approval.status}
                  showHelperText
                />
              </div>
            </div>
            <div>
              <div className="font-semibold text-slate-900">Severity</div>
              <div className="mt-1">
                <Badge type="severity" value={approval.severity} />
              </div>
            </div>
            <div>
              <div className="font-semibold text-slate-900">Requested by</div>
              <div className="mt-1">{approval.requestedBy}</div>
            </div>
            <div>
              <div className="font-semibold text-slate-900">Created at</div>
              <div className="mt-1">{approval.createdAt}</div>
            </div>
          </div>
        </DetailSection>

        <DetailSection title="Related incident">
          {relatedIncident ? (
            <div className="mt-3">
              <Link
                href={`/incidents/${relatedIncident.id}`}
                className="font-medium text-slate-900 hover:text-slate-700"
              >
                {relatedIncident.title}
              </Link>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-slate-600">
                <Badge type="status" value={relatedIncident.status} />
                <Badge type="severity" value={relatedIncident.severity} />
                <span>{relatedIncident.source}</span>
              </div>
            </div>
          ) : (
            <p className="mt-3 text-sm text-slate-600">
              No related incident available.
            </p>
          )}
        </DetailSection>

        <DetailSection title="Rationale">
          <p className="mt-3 text-sm leading-6 text-slate-700">
            {approval.rationale}
          </p>
        </DetailSection>

        <DetailSection title="Suggested action">
          <p className="mt-3 text-sm leading-6 text-slate-700">
            {approval.decisionNote}
          </p>
        </DetailSection>

        <Link href="/approvals" className="text-sm text-slate-700 underline">
          Back to approvals
        </Link>
      </div>
    </PageShell>
  );
}
