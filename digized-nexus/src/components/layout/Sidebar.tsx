export default function Sidebar() {
  return (
    <aside className="w-56 min-h-screen border-r border-slate-200 bg-white p-4">
      <div className="text-sm font-semibold text-slate-900">Digized Nexus</div>
      <nav className="mt-6 space-y-3 text-sm text-slate-700">
        <a
          href="/dashboard"
          className="block rounded px-2 py-1 hover:bg-slate-100"
        >
          Dashboard
        </a>
        <a
          href="/agents"
          className="block rounded px-2 py-1 hover:bg-slate-100"
        >
          Agents
        </a>
        <a
          href="/incidents"
          className="block rounded px-2 py-1 hover:bg-slate-100"
        >
          Incidents
        </a>
        <a
          href="/approvals"
          className="block rounded px-2 py-1 hover:bg-slate-100"
        >
          Approvals
        </a>
        <a
          href="/activity"
          className="block rounded px-2 py-1 hover:bg-slate-100"
        >
          Activity
        </a>
        <a
          href="/settings"
          className="block rounded px-2 py-1 hover:bg-slate-100"
        >
          Settings
        </a>
        <a
          href="/outputs"
          className="block rounded px-2 py-1 hover:bg-slate-100"
        >
          Outputs
        </a>
      </nav>
    </aside>
  );
}
