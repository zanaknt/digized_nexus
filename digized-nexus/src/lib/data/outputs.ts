export const outputs = [
  {
    id: "output-1",
    title: "Heartbeat Report",
    type: "report",
    relatedAgent: "Orion",
    relatedEntity: "Node-3",
    createdAt: "2026-04-19 08:45",
    preview: "All systems operational. No anomalies detected in the last hour.",
    fullContent:
      "Heartbeat checks completed successfully across monitored nodes. Node-3 recovered after a brief timeout window, and no sustained anomalies were detected in the last hour. Recommended next step: continue standard monitoring cadence and verify the next scheduled heartbeat cycle.",
    linkedIncidentIds: ["incident-1"],
    linkedApprovalIds: ["approval-1"],
  },
  {
    id: "output-2",
    title: "Sync Analysis",
    type: "analysis",
    relatedAgent: "Nova",
    relatedEntity: "Data Pipeline",
    createdAt: "2026-04-18 22:30",
    preview: "Lag detected in replication. Recommended: increase buffer size.",
    fullContent:
      "Replication lag was observed during the last sync cycle, with queue depth rising above the normal operating threshold. Analysis suggests the primary bottleneck is downstream buffer saturation during peak ingest periods. Recommended next step: increase buffer size and re-run the delayed pipeline segment.",
    linkedIncidentIds: ["incident-2"],
    linkedApprovalIds: ["approval-2"],
  },
  {
    id: "output-3",
    title: "Alert Log",
    type: "log",
    relatedAgent: "Vega",
    relatedEntity: "Monitoring System",
    createdAt: "2026-04-18 21:45",
    preview: "Rule evaluation failed. Retrying in 5 minutes.",
    fullContent:
      "Alert rule evaluation failed during a transient outage affecting the rule service. Retry was scheduled automatically after five minutes, and subsequent checks indicate the service recovered. Recommended next step: confirm rule integrity and reset the affected rule if failures continue.",
    linkedIncidentIds: ["incident-3"],
    linkedApprovalIds: ["approval-3"],
  },
  {
    id: "output-4",
    title: "Performance Summary",
    type: "report",
    relatedAgent: "Nova",
    relatedEntity: "Global Metrics",
    createdAt: "2026-04-18 20:00",
    preview: "Average response time: 120ms. Peak load handled successfully.",
    fullContent:
      "System performance remained within expected thresholds during the observed window. Average response time measured 120ms, and peak load scenarios completed without critical degradation. Recommended next step: continue tracking capacity trends before the next reporting interval.",
    linkedIncidentIds: [],
    linkedApprovalIds: [],
  },
];
