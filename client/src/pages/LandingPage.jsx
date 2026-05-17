import AppShell from '../components/AppShell.jsx'
import ButtonLink from '../components/ButtonLink.jsx'

function LandingPage({ currentPath, navigate }) {
  const steps = [
    'Match with a rival',
    'Check in daily',
    'Miss once and lose',
  ]

  return (
    <AppShell currentPath={currentPath} navigate={navigate}>
      <section className="grid flex-1 items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-rose-300">
            PvP accountability
          </p>
          <h1 className="mt-5 max-w-3xl text-5xl font-black leading-[1.02] text-white sm:text-6xl lg:text-7xl">
            Win your habit battle or land on the wall.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
            Habit Arena turns daily consistency into a head-to-head contest.
            Two players commit to the same habit for N days. The first missed
            check-in loses.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/signup" navigate={navigate}>
              Start a battle
            </ButtonLink>
            <ButtonLink href="/login" navigate={navigate} variant="secondary">
              Login
            </ButtonLink>
          </div>
        </div>

        <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/30">
          <div className="rounded-md border border-white/10 bg-zinc-950/90 p-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <p className="text-sm text-zinc-400">Current duel</p>
                <h2 className="mt-1 text-2xl font-bold text-white">
                  30 days of training
                </h2>
              </div>
              <span className="whitespace-nowrap rounded-md bg-rose-400 px-3 py-1 text-xs font-bold text-zinc-950">
                Day 12
              </span>
            </div>

            <div className="mt-5 grid gap-3">
              {steps.map((step, index) => (
                <div
                  className="flex items-center gap-3 rounded-md border border-white/10 bg-white/[0.03] p-4"
                  key={step}
                >
                  <div className="grid h-8 w-8 place-items-center rounded-md bg-emerald-400 font-bold text-zinc-950">
                    {index + 1}
                  </div>
                  <span className="font-medium text-zinc-100">{step}</span>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-md border border-amber-300/20 bg-amber-300/10 p-4">
              <p className="text-sm font-semibold text-amber-200">
                Public shame wall
              </p>
              <p className="mt-2 text-sm leading-6 text-zinc-300">
                Losses will be shown here once battles and check-ins are built.
              </p>
            </div>
          </div>
        </div>
      </section>
    </AppShell>
  )
}

export default LandingPage
