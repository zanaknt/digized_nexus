"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import PageShell from "@/src/components/layout/PageShell";
import Badge from "@/src/components/ui/Badge";
import { getIncidents } from "@/src/lib/data-access";
import type {
  IncidentSeverity,
  IncidentStatus,
} from "@/src/lib/models";

const severityOptions: Array<IncidentSeverity | "all"> = [
  "all",
  "high",
  "medium",
  "low",
];

const statusOptions: Array<IncidentStatus | "all"> = [
  "all",
  "open",
  "investigating",
  "resolved",
];

const severityRank: Record<IncidentSeverity, number> = {
  high: 3,
  medium: 2,
  low: 1,
};

function IncidentRow({
  id,
  title,
  severity,
  status,
  source,
  createdAt,
}: {
  id: string;
  title: string;
  severity: string;
  status: string;
  source: string;
  createdAt: string;
}) {
  return (
    <Link
      href={`/incidents/${id}`}
      className="grid grid-cols-5 gap-4 border-b border-slate-200 px-4 py-3 text-sm text-slate-700 last:border-b-0 hover:bg-slate-100"
    >
      <div className="font-medium text-slate-900">{title}</div>
      <div>
        <Badge type="severity" value={severity} />
      </div>
      <div>
        <Badge type="status" value={status} />
      </div>
      <div>{source}</div>
      <div>{createdAt}</div>
    </Link>
  );
}

export default function IncidentsPage() {
  const incidents = getIncidents();
  const [severityFilter, setSeverityFilter] = useState<IncidentSeverity | "all">(
    "all",
  );
  const [statusFilter, setStatusFilter] = useState<IncidentStatus | "all">("all");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "severity">(
    "newest",
  );

  const visibleIncidents = useMemo(() => {
    return incidents
      .filter((incident) => {
        if (severityFilter !== "all" && incident.severity !== severityFilter) {
          return false;
        }

        if (statusFilter !== "all" && incident.status !== statusFilter) {
          return false;
        }

        return true;
      })
      .sort((left, right) => {
        if (sortBy === "oldest") {
          return left.createdAt.localeCompare(right.createdAt);
        }

        if (sortBy === "severity") {
          return severityRank[right.severity] - severityRank[left.severity];
        }

        return right.createdAt.localeCompare(left.createdAt);
      });
  }, [incidents, severityFilter, statusFilter, sortBy]);

  return (
    <PageShell
      title="Incidents"
      subtitle="A simple mock list of Digized Nexus incidents."
    >
      <div className="rounded-lg border border-slate-200 bg-slate-50">
        <div className="flex flex-col gap-3 border-b border-slate-200 px-4 py-3 text-sm text-slate-700 md:flex-row md:items-end md:justify-between">
          <div className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Showing {visibleIncidents.length} of {incidents.length} incidents
          </div>

          <div className="flex flex-col gap-3 md:flex-row">
            <label className="flex flex-col gap-1 text-xs font-medium uppercase tracking-wide text-slate-500">
              Severity
              <select
                value={severityFilter}
                onChange={(event) =>
                  setSeverityFilter(event.target.value as IncidentSeverity | "all")
                }
                className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-normal normal-case tracking-normal text-slate-700 outline-none transition focus:border-slate-300"
              >
                {severityOptions.map((option) => (
                  <option key={option} value={option}>
                    {option === "all" ? "All severities" : option}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-1 text-xs font-medium uppercase tracking-wide text-slate-500">
              Status
              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(event.target.value as IncidentStatus | "all")
                }
                className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-normal normal-case tracking-normal text-slate-700 outline-none transition focus:border-slate-300"
              >
                {statusOptions.map((option) => (
                  <option key={option} value={option}>
                    {option === "all" ? "All statuses" : option}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-1 text-xs font-medium uppercase tracking-wide text-slate-500">
              Sort
              <select
                value={sortBy}
                onChange={(event) =>
                  setSortBy(
                    event.target.value as "newest" | "oldest" | "severity",
                  )
                }
                className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-normal normal-case tracking-normal text-slate-700 outline-none transition focus:border-slate-300"
              >
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
                <option value="severity">Highest severity</option>
              </select>
            </label>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-4 border-b border-slate-200 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
          <div>Title</div>
          <div>Severity</div>
          <div>Status</div>
          <div>Source</div>
          <div>Created at</div>
        </div>

        {visibleIncidents.map((incident) => (
          <IncidentRow key={incident.id} {...incident} />
        ))}
      </div>
    </PageShell>
  );
}
