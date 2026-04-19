import type { Approval } from "@/src/lib/models";

export const approvals: Approval[] = [
  {
    id: "approval-1",
    incidentId: "incident-1",
    actionTitle: "Restart monitoring agent",
    relatedIncident: "Agent heartbeat missing",
    createdAt: "2026-04-19 09:20",
    severity: "medium",
    requestedBy: "Ops Team",
    status: "pending",
    rationale:
      "Monitoring coverage is degraded until the stalled agent resumes reporting consistently.",
    decisionNote:
      "Approve if the restart can be completed within the current maintenance window.",
  },
  {
    id: "approval-2",
    incidentId: "incident-2",
    actionTitle: "Re-run sync pipeline",
    relatedIncident: "Data sync delay",
    createdAt: "2026-04-19 08:55",
    severity: "high",
    requestedBy: "Data Team",
    status: "pending",
    rationale:
      "The delayed pipeline run is blocking downstream data freshness for analytics consumers.",
    decisionNote:
      "Approve after confirming the queue backlog is stable and no duplicate jobs will be introduced.",
  },
  {
    id: "approval-3",
    incidentId: "incident-3",
    actionTitle: "Reset alert rule",
    relatedIncident: "Alert rule failed",
    createdAt: "2026-04-18 22:40",
    severity: "low",
    requestedBy: "Alerts Team",
    status: "pending",
    rationale:
      "The failed rule needs a controlled reset to restore normal alert evaluation behavior.",
    decisionNote:
      "Approve if the rule definition has been verified and recent alerts have been reviewed for impact.",
  },
];
