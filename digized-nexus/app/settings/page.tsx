import PageShell from "@/src/components/layout/PageShell";
import Badge from "@/src/components/ui/Badge";
import DetailSection from "@/src/components/ui/DetailSection";
import {
  getAgents,
  getApprovals,
  getIncidents,
} from "@/src/lib/data-access";

export default function SettingsPage() {
  const agents = getAgents();
  const incidents = getIncidents();
  const approvals = getApprovals();

  const activeAgents = agents.filter((agent) => agent.status === "active").length;
  const openIncidents = incidents.filter(
    (incident) => incident.status !== "resolved",
  ).length;
  const pendingApprovals = approvals.filter(
    (approval) => approval.status === "pending",
  ).length;

  return (
    <PageShell
      title="Settings"
      subtitle="Configure system preferences and defaults."
    >
      <div className="space-y-8">
        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Agent coverage
            </div>
            <div className="mt-2 flex items-center gap-3">
              <div className="text-2xl font-semibold text-slate-900">
                {activeAgents}/{agents.length}
              </div>
              <Badge type="status" value="active" />
            </div>
            <p className="mt-2 text-sm text-slate-600">
              Agents currently running with mock default behavior enabled.
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Incident watch
            </div>
            <div className="mt-2 flex items-center gap-3">
              <div className="text-2xl font-semibold text-slate-900">
                {openIncidents}
              </div>
              <Badge type="status" value={openIncidents > 0 ? "open" : "resolved"} />
            </div>
            <p className="mt-2 text-sm text-slate-600">
              Non-resolved incidents that may be affected by alert and routing
              settings.
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Approval queue
            </div>
            <div className="mt-2 flex items-center gap-3">
              <div className="text-2xl font-semibold text-slate-900">
                {pendingApprovals}
              </div>
              <Badge type="status" value="pending" />
            </div>
            <p className="mt-2 text-sm text-slate-600">
              Pending decisions currently relying on the configured notification
              defaults.
            </p>
          </div>
        </section>

        <section className="rounded-lg border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-slate-900">General</h2>
          <p className="mt-1 text-sm text-slate-500">
            Basic system configuration.
          </p>
          <div className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">
                System Name
              </label>
              <input
                type="text"
                defaultValue="Digized Nexus"
                className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-slate-500 focus:outline-none"
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Theme
              </label>
              <select
                className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-slate-500 focus:outline-none"
                disabled
              >
                <option>Light</option>
                <option>Dark</option>
              </select>
            </div>
          </div>
        </section>

        <section className="rounded-lg border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-slate-900">Agents</h2>
          <p className="mt-1 text-sm text-slate-500">
            Default agent behavior settings.
          </p>
          <div className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Default Timeout (seconds)
              </label>
              <input
                type="number"
                defaultValue="300"
                className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-slate-500 focus:outline-none"
                disabled
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                defaultChecked
                className="h-4 w-4 rounded border-slate-300 text-slate-600 focus:ring-slate-500"
                disabled
              />
              <label className="ml-2 block text-sm text-slate-700">
                Auto-restart failed agents
              </label>
            </div>
          </div>
        </section>

        <section className="rounded-lg border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-slate-900">
            Notifications
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Alert and notification preferences.
          </p>
          <div className="mt-6 space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                defaultChecked
                className="h-4 w-4 rounded border-slate-300 text-slate-600 focus:ring-slate-500"
                disabled
              />
              <label className="ml-2 block text-sm text-slate-700">
                Email alerts for high-severity incidents
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Slack Webhook URL
              </label>
              <input
                type="url"
                placeholder="https://hooks.slack.com/..."
                className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-slate-500 focus:outline-none"
                disabled
              />
            </div>
          </div>
        </section>

        <DetailSection title="Operational context">
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Operating mode
              </div>
              <p className="mt-2 text-sm font-medium text-slate-900">
                Internal cockpit prototype
              </p>
              <p className="mt-1 text-sm text-slate-600">
                Current settings remain mock-only and are presented as read-only
                defaults.
              </p>
            </div>

            <div>
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Last config review
              </div>
              <p className="mt-2 text-sm font-medium text-slate-900">
                2026-04-20 09:30
              </p>
              <p className="mt-1 text-sm text-slate-600">
                Baseline defaults were checked against current incident and
                approval activity.
              </p>
            </div>

            <div>
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Alert routing
              </div>
              <p className="mt-2 text-sm font-medium text-slate-900">
                Email enabled for high-severity incidents
              </p>
              <p className="mt-1 text-sm text-slate-600">
                Secondary notification channels are present as placeholders for a
                future integration layer.
              </p>
            </div>
          </div>
        </DetailSection>
      </div>
    </PageShell>
  );
}
