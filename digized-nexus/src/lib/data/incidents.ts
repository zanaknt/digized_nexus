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
  },
];
