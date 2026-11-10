import { TriangleAlert, RefreshCw } from "lucide-react";

// Reusable error card for any failed data fetch.
// <ErrorState message="..." onRetry={reload} />
export default function ErrorState({
  title = "Something went wrong",
  message = "We couldn't load the data. Please try again.",
  onRetry,
  retryLabel = "Try again",
  className = "",
}) {
  return (
    <div
      role="alert"
      className={`mx-auto flex max-w-xl flex-col items-center rounded-[var(--radius-3xl)] border border-red-500/30 bg-[var(--bg-surface-glass)] p-[var(--padding-card)] text-center shadow-[var(--shadow-panel)] backdrop-blur-[var(--backdrop-blur)] ${className}`}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-[var(--radius-full)] bg-red-500/10 text-red-400">
        <TriangleAlert size={28} />
      </div>

      <h3 className="mt-[var(--spacing-4)] text-[var(--font-size-xl)] font-[var(--font-weight-semibold)] text-[var(--text-primary)]">
        {title}
      </h3>

      <p className="mt-[var(--spacing-2)] text-[var(--font-size-sm)] text-[var(--text-secondary)]">
        {message}
      </p>

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-[var(--spacing-4)] inline-flex items-center gap-2 rounded-[var(--radius-2xl)] bg-[var(--color-cyan-400)] px-4 py-2 text-[var(--font-size-sm)] font-[var(--font-weight-semibold)] text-slate-900 transition-opacity hover:opacity-90"
        >
          <RefreshCw size={16} />
          {retryLabel}
        </button>
      )}
    </div>
  );
}
