export default function OverviewBanner({
  kicker = "Admin overview",
  title = "Real-time commerce health",
  description = "Monitor your storefront with AI-style clarity and live API metrics.",
}) {
  return (
    <div className="rounded-[var(--radius-3xl)] border border-[var(--border-app)] bg-[var(--bg-surface-glass)] p-[var(--padding-card)] shadow-[var(--shadow-panel)] backdrop-blur-[var(--backdrop-blur)]">
      <p className="text-[var(--font-size-xs)] uppercase tracking-[var(--tracking-kicker)] text-[var(--color-cyan-400)] font-[var(--font-weight-semibold)]">
        {kicker}
      </p>
      <h2 className="mt-[var(--spacing-2)] text-[var(--font-size-2xl)] font-[var(--font-weight-semibold)] text-[var(--text-primary)]">
        {title}
      </h2>
      <p className="mt-[var(--spacing-2)] text-[var(--font-size-base)] text-[var(--text-secondary)]">
        {description}
      </p>
    </div>
  );
}
