import PageShell from "@/src/components/layout/PageShell";

export default function SettingsPage() {
  return (
    <PageShell
      title="Settings"
      subtitle="Configure system preferences and defaults."
    >
      <div className="space-y-8">
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
      </div>
    </PageShell>
  );
}
