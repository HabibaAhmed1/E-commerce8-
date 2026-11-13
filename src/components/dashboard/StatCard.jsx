
export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  gradient = "var(--gradient-brand)",
}) {
  return (
    <article className="group relative flex min-h-[164px] w-full overflow-hidden rounded-[24px] border border-slate-200/80 bg-white p-6 shadow-[0_10px_18px_rgba(15,23,42,0.10)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* Top Gradient Line */}
      <div
        className="absolute left-0 top-0 h-1 w-full"
        style={{ background: gradient }}
      />

      {/* Ambient Glow */}
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-10 blur-3xl transition-opacity duration-300 group-hover:opacity-20"
        style={{ background: gradient }}
      />

      {/* Card Content */}
      <div className="relative flex w-full items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <p className="mt-3 break-words text-[30px] font-bold leading-tight tracking-tight text-slate-900">
            {value}
          </p>

          <p className="mt-2 text-xs text-slate-400">
            {subtitle}
          </p>
        </div>

        {/* Icon */}
        <div
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-white shadow-md transition-transform duration-300 group-hover:scale-105"
          style={{ background: gradient }}
        >
          {Icon && <Icon size={25} strokeWidth={2} />}
        </div>
      </div>
    </article>
  );
}
