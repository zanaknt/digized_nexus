export const agents = [
  {
    id: "agent-1",
    name: "Orion",
    role: "Monitoring",
    status: "active",
    lastRun: "2026-04-19 08:45",
    description: "Observes system health and reports missing heartbeats.",
    recentOutputs: [
      "Heartbeat event received from node-3.",
      "Processed 110 health checks.",
      "No anomaly detected in the last hour.",
    ],
    linkedIncidentIds: ["incident-1"],
  },
  {
    id: "agent-2",
    name: "Nova",
    role: "Analysis",
    status: "idle",
    lastRun: "2026-04-18 22:30",
    description: "Analyzes event data and generates diagnostics summaries.",
    recentOutputs: [
      "Completed analysis for the sync lag case.",
      "Generated performance report.",
    ],
    linkedIncidentIds: ["incident-2"],
  },
  {
    id: "agent-3",
    name: "Vega",
    role: "Alerting",
    status: "error",
    lastRun: "2026-04-19 07:12",
    description:
      "Triggers alerts when rules are violated and pushes notifications.",
    recentOutputs: [
      "Alert rule evaluation failed.",
      "Notification send retry scheduled.",
    ],
    linkedIncidentIds: ["incident-3"],
  },
];
