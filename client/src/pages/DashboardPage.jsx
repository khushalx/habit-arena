import AppShell from '../components/AppShell.jsx'

function DashboardPage({ currentPath, navigate }) {
  const stats = [
    { label: 'Active battles', value: '0' },
    { label: 'Current streak', value: '0' },
    { label: 'Losses avoided', value: '0' },
  ]

  return (
    <AppShell currentPath={currentPath} navigate={navigate}>
      <section className="py-12 sm:py-16">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-300">
              Dashboard
            </p>
            <h1 className="mt-3 text-4xl font-black text-white sm:text-5xl">
              Your arena is quiet.
            </h1>
          </div>
          <button
            className="rounded-md border border-white/12 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-zinc-300"
            disabled
            type="button"
          >
            New battle coming soon
          </button>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {stats.map((stat) => (
            <div
              className="rounded-lg border border-white/10 bg-white/[0.04] p-5"
              key={stat.label}
            >
              <p className="text-sm text-zinc-400">{stat.label}</p>
              <p className="mt-3 text-4xl font-black text-white">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-lg border border-white/10 bg-white/[0.04] p-6">
          <h2 className="text-2xl font-bold text-white">Next build steps</h2>
          <div className="mt-5 grid gap-3">
            {['Supabase auth', 'Create battle flow', 'Daily check-ins'].map(
              (item) => (
                <div
                  className="flex items-center justify-between rounded-md border border-white/10 bg-zinc-950/70 p-4"
                  key={item}
                >
                  <span className="font-medium text-zinc-200">{item}</span>
                  <span className="rounded-md bg-zinc-800 px-3 py-1 text-xs font-semibold text-zinc-400">
                    Later
                  </span>
                </div>
              ),
            )}
          </div>
        </div>
      </section>
    </AppShell>
  )
}

export default DashboardPage
