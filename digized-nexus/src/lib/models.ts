export type AgentStatus = "active" | "idle" | "error";
export type IncidentSeverity = "low" | "medium" | "high";
export type IncidentStatus = "open" | "investigating" | "resolved";
export type IncidentTimelineEventType =
  | "detected"
  | "assigned"
  | "reviewed"
  | "status updated";
export type ApprovalStatus = "pending" | "approved" | "rejected";
export type OutputType = "report" | "analysis" | "log";
export type ProjectStatus = "active" | "idle";
export type ServerStatus = "active" | "idle" | "error";

export type Agent = {
  id: string;
  name: string;
  role: string;
  status: AgentStatus;
  lastRun: string;
  description: string;
  recentOutputs: string[];
  linkedIncidentIds: string[];
};

export type Incident = {
  id: string;
  title: string;
  severity: IncidentSeverity;
  status: IncidentStatus;
  source: string;
  createdAt: string;
  summary: string;
  suggestedAction: string;
  linkedAgentId: string;
  timeline: {
    id: string;
    type: IncidentTimelineEventType;
    timestamp: string;
    actor: string;
    note: string;
  }[];
};

export type Approval = {
  id: string;
  incidentId: string;
  actionTitle: string;
  relatedIncident: string;
  createdAt: string;
  severity: IncidentSeverity;
  requestedBy: string;
  status: ApprovalStatus;
  rationale: string;
  decisionNote: string;
};

export type Output = {
  id: string;
  title: string;
  type: OutputType;
  relatedAgentId: string;
  relatedAgent: string;
  relatedEntity: string;
  createdAt: string;
  preview: string;
  fullContent: string;
  linkedIncidentIds: string[];
  linkedApprovalIds: string[];
};

export type Project = {
  id: string;
  name: string;
  status: ProjectStatus;
  owner: string;
  linkedAgentIds: string[];
  linkedIncidentIds: string[];
  recentOutputIds: string[];
  relatedServerId: string;
  description: string;
};

export type Server = {
  id: string;
  name: string;
  environment: string;
  status: ServerStatus;
  uptime: string;
  linkedProjectIds: string[];
  recentIncidentIds: string[];
  recentActivityIds: string[];
  description: string;
};
