import Link from "next/link";
import PageShell from "@/src/components/layout/PageShell";
import Badge from "@/src/components/ui/Badge";
import { agents } from "@/src/lib/data/agents";
import { approvals } from "@/src/lib/data/approvals";
import { incidents } from "@/src/lib/data/incidents";

export default function DashboardPage() {
  const totalAgents = agents.length;
  const openIncidents = incidents.filter(
    (incident) => incident.status === "open",
  ).length;
  const pendingApprovals = approvals.filter(
    (approval) => approval.status === "pending",
  ).length;
  const errorsToday = incidents.filter(
    (incident) => incident.severity === "high",
  ).length;
  const latestIncident = [...incidents].sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt),
  )[0];

  return (
    <PageShell
      title="Dashboard"
      subtitle="This is the initial dashboard skeleton. Use this space for key metrics and quick links."
    >
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-5 shadow-sm">
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Active agents
          </div>
          <div className="mt-3 text-3xl font-semibold text-slate-900">
            {totalAgents}
          </div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-5 shadow-sm">
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Open incidents
          </div>
          <div className="mt-3 text-3xl font-semibold text-slate-900">
            {openIncidents}
          </div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-5 shadow-sm">
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Pending approvals
          </div>
          <div className="mt-3 text-3xl font-semibold text-slate-900">
            {pendingApprovals}
          </div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-5 shadow-sm">
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            High-severity incidents
          </div>
          <div className="mt-3 text-3xl font-semibold text-slate-900">
            {errorsToday}
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Latest incident
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Quick details from the most recent issue.
              </p>
            </div>
            <Badge type="severity" value={latestIncident.severity} />
          </div>

          <div className="mt-6 space-y-4">
            <div>
              <div className="text-sm font-semibold text-slate-700">
                {latestIncident.title}
              </div>
              <div className="mt-2 text-sm leading-6 text-slate-600">
                {latestIncident.summary}
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Status
                </div>
                <div className="mt-2">
                  <Badge type="status" value={latestIncident.status} />
                </div>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Source
                </div>
                <div className="mt-2 text-sm font-semibold text-slate-900">
                  {latestIncident.source}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Pending approvals
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Actions waiting for review from the operations team.
            </p>
          </div>

          <div className="mt-6 space-y-4">
            {approvals.slice(0, 3).map((approval) => (
              <div
                key={approval.id}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-sm font-semibold text-slate-900">
                      {approval.actionTitle}
                    </div>
                    <div className="mt-1 text-sm text-slate-600">
                      Requested by {approval.requestedBy}
                    </div>
                  </div>
                  <Badge type="status" value={approval.status} />
                </div>
                <div className="mt-3 flex items-center justify-between gap-4 text-sm text-slate-600">
                  <div>Related incident: {approval.relatedIncident}</div>
                  <Badge type="severity" value={approval.severity} />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <Link
              href="/approvals"
              className="inline-flex items-center rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Review all approvals
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
