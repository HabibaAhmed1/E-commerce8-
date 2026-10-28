export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  gradient = "var(--gradient-brand)",
}) {
  return (
    <article className="group relative overflow-hidden rounded-[var(--radius-3xl)] border border-[var(--border-app)] bg-[var(--bg-surface-glass)] p-[var(--padding-card)] shadow-[var(--shadow-panel)] backdrop-blur-[var(--backdrop-blur)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-2xl)]">
      {/* Top Accent Gradient Line */}
      <div
        className="absolute left-0 top-0 h-1 w-full"
        style={{ backgroundImage: gradient }}
      />

      {/* Ambient Radial Glow */}
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-10 blur-3xl transition-opacity duration-300 group-hover:opacity-20"
        style={{ backgroundImage: gradient }}
      />

      {/* Header: Title and Icon */}
      <div className="flex items-start justify-between gap-[var(--spacing-3)]">
        <div>
          <p className="text-[var(--font-size-sm)] font-[var(--font-weight-medium)] text-[var(--text-secondary)]">
            {title}
          </p>
          <p className="mt-[var(--spacing-3)] text-[var(--font-size-3xl)] font-[var(--font-weight-bold)] text-[var(--text-primary)]">
            {value}
          </p>
          <p className="mt-[var(--spacing-1)] text-[var(--font-size-xs)] text-[var(--text-muted)]">
            {subtitle}
          </p>
        </div>

        {/* Icon Container with Gradient */}
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--radius-2xl)] text-white shadow-[var(--shadow-md)]"
          style={{ backgroundImage: gradient }}
        >
          {Icon && <Icon size={22} />}
        </div>
      </div>
    </article>
  );
}
