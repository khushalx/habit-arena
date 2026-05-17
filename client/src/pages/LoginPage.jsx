import AppShell from '../components/AppShell.jsx'
import PlaceholderCard from '../components/PlaceholderCard.jsx'

function LoginPage({ currentPath, navigate }) {
  return (
    <AppShell currentPath={currentPath} navigate={navigate}>
      <PlaceholderCard
        description="The login screen is ready for Supabase auth in a later week. For now, it shows the shape of the flow without sending credentials anywhere."
        eyebrow="Auth placeholder"
        title="Welcome back"
      >
        <form className="grid gap-4">
          <input
            className="rounded-md border border-white/10 bg-zinc-950 px-4 py-3 text-zinc-100 outline-none placeholder:text-zinc-600"
            disabled
            placeholder="Email"
            type="email"
          />
          <input
            className="rounded-md border border-white/10 bg-zinc-950 px-4 py-3 text-zinc-100 outline-none placeholder:text-zinc-600"
            disabled
            placeholder="Password"
            type="password"
          />
          <button
            className="rounded-md bg-zinc-700 px-4 py-3 font-semibold text-zinc-300"
            disabled
            type="button"
          >
            Login coming soon
          </button>
        </form>
      </PlaceholderCard>
    </AppShell>
  )
}

export default LoginPage
