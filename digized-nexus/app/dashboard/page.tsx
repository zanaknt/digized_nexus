import PageShell from "@/src/components/layout/PageShell";

const kpis = [
  { title: "Active Agents", value: "12" },
  { title: "Open Incidents", value: "5" },
  { title: "Pending Approvals", value: "3" },
  { title: "Errors Today", value: "1" },
];

export default function DashboardPage() {
  return (
    <PageShell
      title="Dashboard"
      subtitle="This is the initial dashboard skeleton. Use this space for key metrics and quick links."
    >
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <div
            key={kpi.title}
            className="rounded-lg border border-slate-200 bg-slate-50 p-5 shadow-sm"
          >
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              {kpi.title}
            </div>
            <div className="mt-3 text-3xl font-semibold text-slate-900">
              {kpi.value}
            </div>
          </div>
        ))}
      </section>
    </PageShell>
  );
}
