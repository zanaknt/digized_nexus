import { activities } from "@/src/lib/data/activity";
import { agents } from "@/src/lib/data/agents";
import { approvals } from "@/src/lib/data/approvals";
import { incidents } from "@/src/lib/data/incidents";
import { outputs } from "@/src/lib/data/outputs";
import { projects } from "@/src/lib/data/projects";
import { servers } from "@/src/lib/data/servers";

export function getActivities() {
  return activities;
}

export function getAgents() {
  return agents;
}

export function findAgentById(id: string) {
  return agents.find((agent) => agent.id === id);
}

export function getApprovals() {
  return approvals;
}

export function findApprovalById(id: string) {
  return approvals.find((approval) => approval.id === id);
}

export function getIncidents() {
  return incidents;
}

export function findIncidentById(id: string) {
  return incidents.find((incident) => incident.id === id);
}

export function getOutputs() {
  return outputs;
}

export function findOutputById(id: string) {
  return outputs.find((output) => output.id === id);
}

export function getProjects() {
  return projects;
}

export function findProjectById(id: string) {
  return projects.find((project) => project.id === id);
}

export function getServers() {
  return servers;
}

export function findServerById(id: string) {
  return servers.find((server) => server.id === id);
}
