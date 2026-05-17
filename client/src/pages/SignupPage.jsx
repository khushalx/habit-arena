import AppShell from '../components/AppShell.jsx'
import PlaceholderCard from '../components/PlaceholderCard.jsx'

function SignupPage({ currentPath, navigate }) {
  return (
    <AppShell currentPath={currentPath} navigate={navigate}>
      <PlaceholderCard
        description="Signup will connect to Supabase auth after the core app structure is stable. No account is created from this screen yet."
        eyebrow="Auth placeholder"
        title="Create your arena profile"
      >
        <form className="grid gap-4">
          <input
            className="rounded-md border border-white/10 bg-zinc-950 px-4 py-3 text-zinc-100 outline-none placeholder:text-zinc-600"
            disabled
            placeholder="Display name"
            type="text"
          />
          <input
            className="rounded-md border border-white/10 bg-zinc-950 px-4 py-3 text-zinc-100 outline-none placeholder:text-zinc-600"
            disabled
            placeholder="Email"
            type="email"
          />
          <button
            className="rounded-md bg-zinc-700 px-4 py-3 font-semibold text-zinc-300"
            disabled
            type="button"
          >
            Signup coming soon
          </button>
        </form>
      </PlaceholderCard>
    </AppShell>
  )
}

export default SignupPage
