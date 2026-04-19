import Link from "next/link";
import PageShell from "@/src/components/layout/PageShell";
import Badge from "@/src/components/ui/Badge";
import { agents } from "@/src/lib/data/agents";
import { approvals } from "@/src/lib/data/approvals";
import { incidents } from "@/src/lib/data/incidents";
import { outputs } from "@/src/lib/data/outputs";

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
  const latestIncidentOutput =
    [...outputs]
      .filter((output) => output.linkedIncidentIds.includes(latestIncident.id))
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))[0] ?? null;
  const pendingApprovalItems = approvals.slice(0, 3).map((approval) => {
    const linkedOutput =
      [...outputs]
        .filter((output) => output.linkedApprovalIds.includes(approval.id))
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt))[0] ?? null;

    return {
      ...approval,
      linkedOutput,
    };
  });
  const recentOutputs = [...outputs]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 3);

  return (
    <PageShell
      title="Dashboard"
      subtitle="This is the initial dashboard skeleton. Use this space for key metrics and quick links."
    >
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Link
          href="/agents"
          className="rounded-lg border border-slate-200 bg-slate-50 p-5 shadow-sm transition hover:border-slate-300 hover:bg-white"
        >
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Active agents
          </div>
          <div className="mt-3 text-3xl font-semibold text-slate-900">
            {totalAgents}
          </div>
        </Link>
        <Link
          href="/incidents"
          className="rounded-lg border border-slate-200 bg-slate-50 p-5 shadow-sm transition hover:border-slate-300 hover:bg-white"
        >
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Open incidents
          </div>
          <div className="mt-3 text-3xl font-semibold text-slate-900">
            {openIncidents}
          </div>
        </Link>
        <Link
          href="/approvals"
          className="rounded-lg border border-slate-200 bg-slate-50 p-5 shadow-sm transition hover:border-slate-300 hover:bg-white"
        >
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Pending approvals
          </div>
          <div className="mt-3 text-3xl font-semibold text-slate-900">
            {pendingApprovals}
          </div>
        </Link>
        <Link
          href="/incidents"
          className="rounded-lg border border-slate-200 bg-slate-50 p-5 shadow-sm transition hover:border-slate-300 hover:bg-white"
        >
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            High-severity incidents
          </div>
          <div className="mt-3 text-3xl font-semibold text-slate-900">
            {errorsToday}
          </div>
        </Link>
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
            <Link href={`/incidents/${latestIncident.id}`}>
              <Badge type="severity" value={latestIncident.severity} />
            </Link>
          </div>

          <div className="mt-6 space-y-4">
            <div>
              <Link
                href={`/incidents/${latestIncident.id}`}
                className="text-sm font-semibold text-slate-700 hover:text-slate-900"
              >
                {latestIncident.title}
              </Link>
              <div className="mt-2 text-sm leading-6 text-slate-600">
                {latestIncident.summary}
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Link
                href={`/incidents/${latestIncident.id}`}
                className="rounded-2xl bg-slate-50 p-4 hover:bg-slate-100"
              >
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Status
                </div>
                <div className="mt-2">
                  <Badge type="status" value={latestIncident.status} />
                </div>
              </Link>
              <Link
                href={`/incidents/${latestIncident.id}`}
                className="rounded-2xl bg-slate-50 p-4 hover:bg-slate-100"
              >
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Source
                </div>
                <div className="mt-2 text-sm font-semibold text-slate-900">
                  {latestIncident.source}
                </div>
              </Link>
            </div>
            {latestIncidentOutput ? (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Related output
                </div>
                <Link
                  href={`/outputs/${latestIncidentOutput.id}`}
                  className="mt-2 block text-sm font-semibold text-slate-900 hover:text-slate-700"
                >
                  {latestIncidentOutput.title}
                </Link>
                <div className="mt-1 text-sm text-slate-600">
                  Agent:{" "}
                  <Link
                    href={`/agents/${latestIncidentOutput.relatedAgentId}`}
                    className="underline"
                  >
                    {latestIncidentOutput.relatedAgent}
                  </Link>{" "}
                  · {latestIncidentOutput.createdAt}
                </div>
              </div>
            ) : null}
          </div>

          <div className="mt-6">
            <Link
              href={`/incidents/${latestIncident.id}`}
              className="text-sm font-semibold text-slate-700 underline"
            >
              Open incident details
            </Link>
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
            {pendingApprovalItems.map((approval) => (
              <div
                key={approval.id}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <Link
                      href="/approvals"
                      className="text-sm font-semibold text-slate-900 hover:text-slate-700"
                    >
                      {approval.actionTitle}
                    </Link>
                    <div className="mt-1 text-sm text-slate-600">
                      Requested by {approval.requestedBy}
                    </div>
                  </div>
                  <Badge type="status" value={approval.status} />
                </div>
                <div className="mt-3 flex items-center justify-between gap-4 text-sm text-slate-600">
                  <div>
                    Related incident:{" "}
                    {approval.incidentId ? (
                      <Link
                        href={`/incidents/${approval.incidentId}`}
                        className="underline"
                      >
                        {approval.relatedIncident}
                      </Link>
                    ) : (
                      approval.relatedIncident
                    )}
                  </div>
                  <Badge type="severity" value={approval.severity} />
                </div>
                {approval.linkedOutput ? (
                  <div className="mt-3 text-sm text-slate-600">
                    Related output:{" "}
                    <Link
                      href={`/outputs/${approval.linkedOutput.id}`}
                      className="underline"
                    >
                      {approval.linkedOutput.title}
                    </Link>
                  </div>
                ) : null}
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

      <section className="mt-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Recent outputs
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Recent reports and analyses connected to live cockpit activity.
            </p>
          </div>
          <Link
            href="/outputs"
            className="text-sm font-semibold text-slate-700 underline"
          >
            View all outputs
          </Link>
        </div>

        <div className="mt-6 space-y-4">
          {recentOutputs.map((output) => (
            <div
              key={output.id}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Link
                    href={`/outputs/${output.id}`}
                    className="text-sm font-semibold text-slate-900 hover:text-slate-700"
                  >
                    {output.title}
                  </Link>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-slate-600">
                    <Badge type="status" value={output.type} />
                    <span>
                      Agent:{" "}
                      <Link
                        href={`/agents/${output.relatedAgentId}`}
                        className="underline"
                      >
                        {output.relatedAgent}
                      </Link>
                    </span>
                    <span>{output.createdAt}</span>
                  </div>
                </div>
                <Link
                  href={`/outputs/${output.id}`}
                  className="text-sm text-slate-500 underline"
                >
                  Open
                </Link>
              </div>
              <p className="mt-3 text-sm text-slate-700">{output.preview}</p>
              <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-slate-600">
                {output.linkedIncidentIds[0] ? (
                  <Link
                    href={`/incidents/${output.linkedIncidentIds[0]}`}
                    className="underline"
                  >
                    View linked incident
                  </Link>
                ) : null}
                {output.linkedApprovalIds[0] ? (
                  <Link
                    href={`/approvals/${output.linkedApprovalIds[0]}`}
                    className="underline"
                  >
                    View linked approval
                  </Link>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
