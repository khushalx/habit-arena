function PlaceholderCard({ eyebrow, title, description, children }) {
  return (
    <section className="mx-auto flex w-full max-w-xl flex-1 items-center py-16 sm:py-20">
      <div className="w-full rounded-lg border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/30 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">
          {eyebrow}
        </p>
        <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
          {title}
        </h1>
        <p className="mt-4 leading-7 text-zinc-300">{description}</p>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  )
}

export default PlaceholderCard
