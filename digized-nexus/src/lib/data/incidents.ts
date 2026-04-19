import type { Incident } from "@/src/lib/models";

export const incidents: Incident[] = [
  {
    id: "incident-1",
    title: "Agent heartbeat missing",
    severity: "high",
    status: "open",
    source: "Monitoring",
    createdAt: "2026-04-19 09:12",
    summary:
      "Orion did not report a heartbeat on schedule, indicating a possible monitoring gap.",
    suggestedAction:
      "Verify agent connectivity and restart the monitoring service if necessary.",
    linkedAgentId: "agent-1",
    timeline: [
      {
        id: "incident-1-event-1",
        type: "detected",
        timestamp: "2026-04-19 09:12",
        actor: "Monitoring",
        note: "Heartbeat was not received on schedule for Orion.",
      },
      {
        id: "incident-1-event-2",
        type: "assigned",
        timestamp: "2026-04-19 09:15",
        actor: "Ops Team",
        note: "Assigned to monitoring operations for immediate review.",
      },
      {
        id: "incident-1-event-3",
        type: "reviewed",
        timestamp: "2026-04-19 09:18",
        actor: "On-call operator",
        note: "Connectivity and recent agent logs were checked.",
      },
      {
        id: "incident-1-event-4",
        type: "status updated",
        timestamp: "2026-04-19 09:20",
        actor: "Ops Team",
        note: "Status remains open pending agent restart confirmation.",
      },
    ],
  },
  {
    id: "incident-2",
    title: "Data sync delay",
    severity: "medium",
    status: "investigating",
    source: "Sync Service",
    createdAt: "2026-04-19 08:45",
    summary: "Data replication lag was detected across the sync pipeline.",
    suggestedAction:
      "Inspect the sync queue and review error logs for delayed jobs.",
    linkedAgentId: "agent-2",
    timeline: [
      {
        id: "incident-2-event-1",
        type: "detected",
        timestamp: "2026-04-19 08:45",
        actor: "Sync Service",
        note: "Replication lag threshold was exceeded during pipeline execution.",
      },
      {
        id: "incident-2-event-2",
        type: "assigned",
        timestamp: "2026-04-19 08:48",
        actor: "Data Team",
        note: "Assigned to the data pipeline owner for triage.",
      },
      {
        id: "incident-2-event-3",
        type: "reviewed",
        timestamp: "2026-04-19 08:52",
        actor: "Nova",
        note: "Diagnostic output reviewed and queue backlog confirmed.",
      },
      {
        id: "incident-2-event-4",
        type: "status updated",
        timestamp: "2026-04-19 08:55",
        actor: "Data Team",
        note: "Status moved to investigating while rerun approval is pending.",
      },
    ],
  },
  {
    id: "incident-3",
    title: "Alert rule failed",
    severity: "low",
    status: "resolved",
    source: "Alerts",
    createdAt: "2026-04-18 22:30",
    summary:
      "An alert rule evaluation failed due to a temporary rule service outage.",
    suggestedAction:
      "Confirm the rule service is healthy and re-run the affected alerts.",
    linkedAgentId: "agent-3",
    timeline: [
      {
        id: "incident-3-event-1",
        type: "detected",
        timestamp: "2026-04-18 22:30",
        actor: "Alerts",
        note: "Rule evaluation failure was detected during routine checks.",
      },
      {
        id: "incident-3-event-2",
        type: "assigned",
        timestamp: "2026-04-18 22:32",
        actor: "Alerts Team",
        note: "Assigned to the alerting owner for validation.",
      },
      {
        id: "incident-3-event-3",
        type: "reviewed",
        timestamp: "2026-04-18 22:36",
        actor: "Vega",
        note: "Retry logs reviewed and service recovery confirmed.",
      },
      {
        id: "incident-3-event-4",
        type: "status updated",
        timestamp: "2026-04-18 22:40",
        actor: "Alerts Team",
        note: "Incident marked resolved after validation of the rule service.",
      },
    ],
  },
];
