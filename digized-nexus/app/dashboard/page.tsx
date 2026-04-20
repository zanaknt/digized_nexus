import Link from "next/link";
import PageShell from "@/src/components/layout/PageShell";
import Badge from "@/src/components/ui/Badge";
import {
  getAgents,
  getApprovals,
  getIncidents,
  getOutputs,
} from "@/src/lib/data-access";

function getNewestByCreatedAt<T extends { createdAt: string }>(items: T[]) {
  return [...items].sort((a, b) => b.createdAt.localeCompare(a.createdAt))[0];
}

export default function DashboardPage() {
  const agents = getAgents();
  const approvals = getApprovals();
  const incidents = getIncidents();
  const outputs = getOutputs();
  const metrics = [
    {
      href: "/agents",
      label: "Active agents",
      value: agents.length,
    },
    {
      href: "/incidents",
      label: "Open incidents",
      value: incidents.filter((incident) => incident.status === "open").length,
    },
    {
      href: "/approvals",
      label: "Pending approvals",
      value: approvals.filter((approval) => approval.status === "pending")
        .length,
    },
    {
      href: "/incidents",
      label: "High-severity incidents",
      value: incidents.filter((incident) => incident.severity === "high")
        .length,
    },
  ];
  const latestIncident = getNewestByCreatedAt(incidents);
  const latestIncidentOutput =
    getNewestByCreatedAt(
      outputs.filter((output) =>
        output.linkedIncidentIds.includes(latestIncident.id),
      ),
    ) ?? null;
  const pendingApprovalItems = approvals.slice(0, 3).map((approval) => {
    const linkedOutput =
      getNewestByCreatedAt(
        outputs.filter((output) => output.linkedApprovalIds.includes(approval.id)),
      ) ?? null;

    return {
      ...approval,
      linkedOutput,
    };
  });
  const recentOutputs = [...outputs].sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt),
  );

  return (
    <PageShell
      title="Dashboard"
      subtitle="This is the initial dashboard skeleton. Use this space for key metrics and quick links."
    >
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <Link
            key={metric.label}
            href={metric.href}
            className="rounded-2xl border border-[var(--shell-border)] bg-[var(--panel-subtle)] p-5 shadow-[var(--shell-shadow)] transition hover:bg-[var(--panel-background)]"
          >
            <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--shell-muted)]">
              {metric.label}
            </div>
            <div className="mt-4 text-3xl font-semibold text-[var(--shell-foreground)]">
              {metric.value}
            </div>
            <div className="mt-4 text-xs font-medium text-[var(--shell-muted)]">
              Open workspace
            </div>
          </Link>
        ))}
      </section>

      <section className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-[var(--shell-border)] bg-[var(--panel-background)] p-6 shadow-[var(--shell-shadow)]">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--shell-muted)]">
                Incident overview
              </div>
              <h2 className="mt-2 text-lg font-semibold text-[var(--shell-foreground)]">
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
                className="text-base font-semibold text-[var(--shell-foreground)] hover:text-slate-700"
              >
                {latestIncident.title}
              </Link>
              <div className="mt-3 text-sm leading-6 text-slate-600">
                {latestIncident.summary}
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Link
                href={`/incidents/${latestIncident.id}`}
                className="rounded-2xl border border-[var(--shell-border)] bg-[var(--panel-subtle)] p-4 hover:bg-[var(--panel-hover)]"
              >
                <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--shell-muted)]">
                  Status
                </div>
                <div className="mt-2">
                  <Badge type="status" value={latestIncident.status} />
                </div>
              </Link>
              <Link
                href={`/incidents/${latestIncident.id}`}
                className="rounded-2xl border border-[var(--shell-border)] bg-[var(--panel-subtle)] p-4 hover:bg-[var(--panel-hover)]"
              >
                <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--shell-muted)]">
                  Source
                </div>
                <div className="mt-2 text-sm font-semibold text-[var(--shell-foreground)]">
                  {latestIncident.source}
                </div>
              </Link>
            </div>
            {latestIncidentOutput ? (
              <div className="rounded-2xl border border-[var(--shell-border)] bg-[var(--panel-subtle)] p-4">
                <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--shell-muted)]">
                  Related output
                </div>
                <Link
                  href={`/outputs/${latestIncidentOutput.id}`}
                  className="mt-3 block text-sm font-semibold text-[var(--shell-foreground)] hover:text-slate-700"
                >
                  {latestIncidentOutput.title}
                </Link>
                <div className="mt-2 text-sm text-slate-600">
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

        <div className="rounded-2xl border border-[var(--shell-border)] bg-[var(--panel-background)] p-6 shadow-[var(--shell-shadow)]">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--shell-muted)]">
              Review queue
            </div>
            <h2 className="mt-2 text-lg font-semibold text-[var(--shell-foreground)]">
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
                className="rounded-2xl border border-[var(--shell-border)] bg-[var(--panel-subtle)] p-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <Link
                      href="/approvals"
                      className="text-sm font-semibold text-[var(--shell-foreground)] hover:text-slate-700"
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
              className="inline-flex items-center rounded-xl bg-[var(--shell-foreground)] px-4 py-2 text-sm font-semibold text-[var(--panel-background)] hover:opacity-90"
            >
              Review all approvals
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-6 rounded-2xl border border-[var(--shell-border)] bg-[var(--panel-background)] p-6 shadow-[var(--shell-shadow)]">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--shell-muted)]">
              Analysis feed
            </div>
            <h2 className="mt-2 text-lg font-semibold text-[var(--shell-foreground)]">
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
          {recentOutputs.slice(0, 3).map((output) => (
            <div
              key={output.id}
              className="rounded-2xl border border-[var(--shell-border)] bg-[var(--panel-subtle)] p-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Link
                    href={`/outputs/${output.id}`}
                    className="text-sm font-semibold text-[var(--shell-foreground)] hover:text-slate-700"
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
