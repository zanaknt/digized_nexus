export const approvals = [
  {
    id: "approval-1",
    incidentId: "incident-1",
    actionTitle: "Restart monitoring agent",
    relatedIncident: "Agent heartbeat missing",
    severity: "medium",
    requestedBy: "Ops Team",
    status: "pending",
  },
  {
    id: "approval-2",
    incidentId: "incident-2",
    actionTitle: "Re-run sync pipeline",
    relatedIncident: "Data sync delay",
    severity: "high",
    requestedBy: "Data Team",
    status: "pending",
  },
  {
    id: "approval-3",
    incidentId: "incident-3",
    actionTitle: "Reset alert rule",
    relatedIncident: "Alert rule failed",
    severity: "low",
    requestedBy: "Alerts Team",
    status: "pending",
  },
];
