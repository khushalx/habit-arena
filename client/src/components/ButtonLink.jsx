function ButtonLink({
  children,
  className = '',
  href,
  navigate,
  variant = 'primary',
}) {
  const variants = {
    primary:
      'bg-emerald-400 text-zinc-950 shadow-lg shadow-emerald-950/30 hover:bg-emerald-300',
    secondary:
      'border border-white/12 bg-white/[0.04] text-zinc-100 hover:bg-white/[0.08]',
    ghost: 'text-zinc-300 hover:text-white',
  }

  return (
    <a
      className={`inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-semibold transition ${variants[variant]} ${className}`}
      href={href}
      onClick={(event) => {
        event.preventDefault()
        navigate(href)
      }}
    >
      {children}
    </a>
  )
}

export default ButtonLink
