// Base building block for every loading placeholder.
// Size/shape are controlled with Tailwind classes via `className`,
// e.g. <Skeleton className="h-4 w-24" />  or  <Skeleton className="h-12 w-12 rounded-full" />
export function Skeleton({ className = "" }) {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse rounded-[var(--radius-xl)] bg-[var(--bg-surface-secondary)] ${className}`}
    />
  );
}

// Card shell with the same look as the real dashboard sections.
export function SkeletonCard({ className = "", children }) {
  return (
    <div
      className={`rounded-[var(--radius-3xl)] border border-[var(--border-app)] bg-[var(--bg-surface-glass)] p-[var(--padding-card)] shadow-[var(--shadow-panel)] backdrop-blur-[var(--backdrop-blur)] ${className}`}
    >
      {children}
    </div>
  );
}

export default Skeleton;
