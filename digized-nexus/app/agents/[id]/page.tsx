import PageShell from "@/src/components/layout/PageShell";
import Link from "next/link";
import Badge from "@/src/components/ui/Badge";
import DetailSection from "@/src/components/ui/DetailSection";
import {
  getActivities,
  findAgentById,
  getIncidents,
  getOutputs,
} from "@/src/lib/data-access";

export default function AgentDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const agent = findAgentById(params.id);

  if (!agent) {
    return (
      <PageShell title="Agent not found">
        <p className="text-sm text-slate-600">No agent matches that ID.</p>
        <Link
          href="/agents"
          className="mt-4 inline-block text-sm text-slate-700 underline"
        >
          Back to agents
        </Link>
      </PageShell>
    );
  }

  const linkedIncidents = getIncidents().filter((incident) =>
    agent.linkedIncidentIds.includes(incident.id),
  );
  const recentActivity = getActivities()
    .filter(
      (activity) =>
        activity.relatedEntityType === "agent" && activity.relatedEntityId === agent.id,
    )
    .sort((a, b) => b.timestamp.localeCompare(a.timestamp))
    .slice(0, 4);
  const relatedOutputs = getOutputs()
    .filter((output) => output.relatedAgentId === agent.id)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  const openIncidentCount = linkedIncidents.filter(
    (incident) => incident.status !== "resolved",
  ).length;

  return (
    <PageShell
      title={agent.name}
      subtitle={`Role: ${agent.role} · Status: ${agent.status}`}
    >
      <div className="space-y-6">
        <section className="rounded-2xl border border-[var(--shell-border)] bg-[var(--panel-background)] p-5 shadow-[var(--shell-shadow)]">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--shell-muted)]">
                Agent workspace
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <div className="text-2xl font-semibold text-[var(--shell-foreground)]">
                  {agent.name}
                </div>
                <Badge type="status" value={agent.status} />
              </div>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                {agent.description}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:min-w-[420px] lg:flex-1">
              <div className="rounded-xl border border-[var(--shell-border)] bg-[var(--panel-subtle)] px-4 py-3">
                <div className="text-xs font-semibold uppercase tracking-wide text-[var(--shell-muted)]">
                  Role
                </div>
                <div className="mt-2 text-sm font-medium text-[var(--shell-foreground)]">
                  {agent.role}
                </div>
              </div>

              <div className="rounded-xl border border-[var(--shell-border)] bg-[var(--panel-subtle)] px-4 py-3">
                <div className="text-xs font-semibold uppercase tracking-wide text-[var(--shell-muted)]">
                  Last run
                </div>
                <div className="mt-2 text-sm font-medium text-[var(--shell-foreground)]">
                  {agent.lastRun}
                </div>
              </div>

              <div className="rounded-xl border border-[var(--shell-border)] bg-[var(--panel-subtle)] px-4 py-3">
                <div className="text-xs font-semibold uppercase tracking-wide text-[var(--shell-muted)]">
                  Active incidents
                </div>
                <div className="mt-2 text-sm font-medium text-[var(--shell-foreground)]">
                  {openIncidentCount}
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="grid gap-6 xl:grid-cols-[1.35fr_0.95fr]">
          <div className="space-y-6">
            <DetailSection title="Recent outputs">
              {relatedOutputs.length ? (
                <div className="mt-4 space-y-3">
                  {relatedOutputs.map((output) => (
                    <article
                      key={output.id}
                      className="rounded-xl border border-[var(--shell-border)] bg-[var(--panel-background)] px-4 py-4"
                    >
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div className="min-w-0">
                          <Link
                            href={`/outputs/${output.id}`}
                            className="text-sm font-semibold text-[var(--shell-foreground)] hover:text-slate-700"
                          >
                            {output.title}
                          </Link>
                          <p className="mt-2 text-sm leading-6 text-slate-600">
                            {output.preview}
                          </p>
                        </div>

                        <div className="flex shrink-0 flex-wrap items-center gap-2">
                          <Badge type="status" value={output.type} />
                          <span className="text-xs text-[var(--shell-muted)]">
                            {output.createdAt}
                          </span>
                        </div>
                      </div>

                      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-[var(--shell-muted)]">
                        <span>Related entity: {output.relatedEntity}</span>
                        {output.linkedIncidentIds.length ? (
                          <span>
                            Linked incidents: {output.linkedIncidentIds.length}
                          </span>
                        ) : null}
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <p className="mt-3 text-sm text-slate-600">No recent outputs.</p>
              )}
            </DetailSection>

            <DetailSection title="Related incidents">
              {linkedIncidents.length ? (
                <div className="mt-4 space-y-3">
                  {linkedIncidents.map((incident) => (
                    <article
                      key={incident.id}
                      className="rounded-xl border border-[var(--shell-border)] bg-[var(--panel-background)] px-4 py-4"
                    >
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div className="min-w-0">
                          <Link
                            href={`/incidents/${incident.id}`}
                            className="text-sm font-semibold text-[var(--shell-foreground)] hover:text-slate-700"
                          >
                            {incident.title}
                          </Link>
                          <p className="mt-2 text-sm leading-6 text-slate-600">
                            {incident.summary}
                          </p>
                        </div>

                        <div className="flex shrink-0 flex-wrap items-center gap-2">
                          <Badge type="status" value={incident.status} />
                          <Badge type="severity" value={incident.severity} />
                        </div>
                      </div>

                      <div className="mt-3 text-xs text-[var(--shell-muted)]">
                        Source: {incident.source} · Created: {incident.createdAt}
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <p className="mt-3 text-sm text-slate-600">No linked incidents.</p>
              )}
            </DetailSection>
          </div>

          <div className="space-y-6">
            <DetailSection title="Current status">
              <div className="mt-4 space-y-4">
                <div className="rounded-xl border border-[var(--shell-border)] bg-[var(--panel-background)] px-4 py-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wide text-[var(--shell-muted)]">
                        Workspace state
                      </div>
                      <div className="mt-2 text-sm font-medium text-[var(--shell-foreground)]">
                        {agent.name} is currently {agent.status}
                      </div>
                    </div>
                    <Badge type="status" value={agent.status} />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    Last recorded execution was at {agent.lastRun}. This surface
                    is ready for future run logs and terminal workflows.
                  </p>
                </div>

                <div className="rounded-xl border border-[var(--shell-border)] bg-[var(--panel-background)] px-4 py-4 text-sm text-slate-600">
                  <div className="font-semibold text-[var(--shell-foreground)]">
                    Linked outputs
                  </div>
                  <div className="mt-2">{relatedOutputs.length} recent items</div>
                </div>
              </div>
            </DetailSection>

            <DetailSection title="Recent activity">
              {recentActivity.length ? (
                <div className="mt-4 space-y-3">
                  {recentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="rounded-xl border border-[var(--shell-border)] bg-[var(--panel-background)] px-4 py-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-sm font-semibold text-[var(--shell-foreground)]">
                            {activity.title}
                          </div>
                          <div className="mt-1 text-sm text-slate-600">
                            {activity.relatedEntity}
                          </div>
                        </div>
                        <div className="text-xs text-[var(--shell-muted)]">
                          {activity.timestamp}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-3 text-sm text-slate-600">
                  No recent activity for this agent.
                </p>
              )}
            </DetailSection>
          </div>
        </div>

        <section className="rounded-2xl border border-dashed border-[var(--shell-border)] bg-[var(--panel-subtle)] px-5 py-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--shell-muted)]">
                Future execution dock
              </div>
              <div className="mt-2 text-sm font-semibold text-[var(--shell-foreground)]">
                Reserved for terminal, logs, and command output
              </div>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                This workspace will support agent execution surfaces in a future
                step. The current page remains focused on operational context,
                outputs, and incident linkage.
              </p>
            </div>

            <div className="grid gap-2 text-xs text-[var(--shell-muted)] sm:grid-cols-3 lg:min-w-[360px]">
              <div className="rounded-xl border border-[var(--shell-border)] bg-[var(--panel-background)] px-3 py-3">
                Terminal
              </div>
              <div className="rounded-xl border border-[var(--shell-border)] bg-[var(--panel-background)] px-3 py-3">
                Logs
              </div>
              <div className="rounded-xl border border-[var(--shell-border)] bg-[var(--panel-background)] px-3 py-3">
                Output stream
              </div>
            </div>
          </div>
        </section>

        <Link href="/agents" className="text-sm text-slate-700 underline">
          Back to agents
        </Link>
      </div>
    </PageShell>
  );
}
