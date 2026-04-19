import Link from "next/link";
import PageShell from "@/src/components/layout/PageShell";
import Badge from "@/src/components/ui/Badge";
import DetailSection from "@/src/components/ui/DetailSection";
import { approvals } from "@/src/lib/data/approvals";
import { incidents } from "@/src/lib/data/incidents";
import { outputs } from "@/src/lib/data/outputs";
import { projects } from "@/src/lib/data/projects";

export default function OutputDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const output = outputs.find((item) => item.id === params.id);

  if (!output) {
    return (
      <PageShell title="Output not found">
        <p className="text-sm text-slate-600">No output matches that ID.</p>
        <Link
          href="/outputs"
          className="mt-4 inline-block text-sm text-slate-700 underline"
        >
          Back to outputs
        </Link>
      </PageShell>
    );
  }

  const relatedProject =
    projects.find((project) => project.recentOutputIds.includes(output.id)) ??
    null;
  const linkedIncidents = incidents.filter((incident) =>
    output.linkedIncidentIds.includes(incident.id),
  );
  const linkedApprovals = approvals.filter((approval) =>
    output.linkedApprovalIds.includes(approval.id),
  );

  return (
    <PageShell
      title={output.title}
      subtitle={`Type: ${output.type} · Agent: ${output.relatedAgent}`}
    >
      <div className="space-y-6">
        <DetailSection title="Overview">
          <div className="mt-4 grid gap-4 text-sm text-slate-700 sm:grid-cols-3">
            <div>
              <div className="font-semibold text-slate-900">Type</div>
              <div className="mt-1">
                <Badge type="status" value={output.type} />
              </div>
            </div>
            <div>
              <div className="font-semibold text-slate-900">Related agent</div>
              <div className="mt-1">{output.relatedAgent}</div>
            </div>
            <div>
              <div className="font-semibold text-slate-900">Created at</div>
              <div className="mt-1">{output.createdAt}</div>
            </div>
            <div>
              <div className="font-semibold text-slate-900">
                Related project or entity
              </div>
              <div className="mt-1">
                {relatedProject ? relatedProject.name : output.relatedEntity}
              </div>
            </div>
          </div>
        </DetailSection>

        <DetailSection title="Full preview">
          <p className="mt-3 text-sm leading-6 text-slate-700">
            {output.fullContent}
          </p>
        </DetailSection>

        <DetailSection title="Linked incidents">
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
        </DetailSection>

        <DetailSection title="Linked approvals">
          {linkedApprovals.length ? (
            <ul className="mt-3 space-y-2">
              {linkedApprovals.map((approval) => (
                <li
                  key={approval.id}
                  className="rounded-md border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-slate-900">
                      {approval.actionTitle}
                    </span>
                    <Badge type="status" value={approval.status} />
                    <Badge type="severity" value={approval.severity} />
                  </div>
                  <div className="mt-1 text-slate-600">
                    Requested by {approval.requestedBy} · Related incident:{" "}
                    {approval.relatedIncident}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-slate-600">No linked approvals.</p>
          )}
        </DetailSection>

        <Link href="/outputs" className="text-sm text-slate-700 underline">
          Back to outputs
        </Link>
      </div>
    </PageShell>
  );
}
