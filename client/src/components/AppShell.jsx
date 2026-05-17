import ButtonLink from './ButtonLink.jsx'
import Logo from './Logo.jsx'

function AppShell({ children, currentPath, navigate }) {
  const links = [
    { href: '/', label: 'Home' },
    { href: '/dashboard', label: 'Dashboard' },
  ]

  return (
    <main className="min-h-screen overflow-hidden bg-zinc-950 text-zinc-50">
      <div className="absolute inset-0 -z-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.16),transparent_32%),radial-gradient(circle_at_80%_20%,rgba(244,63,94,0.12),transparent_30%),linear-gradient(180deg,#09090b_0%,#0b0b0f_46%,#101010_100%)]" />
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 py-5 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between gap-4 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 backdrop-blur">
          <a
            className="flex items-center gap-3"
            href="/"
            onClick={(event) => {
              event.preventDefault()
              navigate('/')
            }}
          >
            <Logo />
            <span className="hidden text-sm font-bold tracking-wide text-white min-[430px]:inline">
              Habit Arena
            </span>
          </a>

          <nav className="hidden items-center gap-2 sm:flex">
            {links.map((link) => (
              <a
                className={`rounded-md px-3 py-2 text-sm transition ${
                  currentPath === link.href
                    ? 'bg-white/10 text-white'
                    : 'text-zinc-400 hover:text-white'
                }`}
                href={link.href}
                key={link.href}
                onClick={(event) => {
                  event.preventDefault()
                  navigate(link.href)
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ButtonLink
              className="max-[420px]:hidden"
              href="/login"
              navigate={navigate}
              variant="ghost"
            >
              Login
            </ButtonLink>
            <ButtonLink href="/signup" navigate={navigate}>
              Sign up
            </ButtonLink>
          </div>
        </header>

        {children}
      </div>
    </main>
  )
}

export default AppShell
