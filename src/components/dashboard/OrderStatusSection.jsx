const defaultStatuses = [
  {
    label: "Pending",
    value: 11,
    bgClass: "bg-[var(--status-pending-bg)]",
    textClass: "text-[var(--status-pending-text)]",
    borderClass: "border-[var(--status-pending-border)]",
  },
  {
    label: "Processing",
    value: 24,
    bgClass: "bg-[var(--status-processing-bg)]",
    textClass: "text-[var(--status-processing-text)]",
    borderClass: "border-[var(--status-processing-border)]",
  },
  {
    label: "Confirmed",
    value: 25,
    bgClass: "bg-[var(--status-processing-bg)]",
    textClass: "text-[var(--status-processing-text)]",
    borderClass: "border-[var(--status-processing-border)]",
  },
  {
    label: "Shipped",
    value: 45,
    bgClass: "bg-[var(--status-shipped-bg)]",
    textClass: "text-[var(--status-shipped-text)]",
    borderClass: "border-[var(--status-shipped-border)]",
  },
  {
    label: "Delivered",
    value: 108,
    bgClass: "bg-[var(--status-delivered-bg)]",
    textClass: "text-[var(--status-delivered-text)]",
    borderClass: "border-[var(--status-delivered-border)]",
  },
  {
    label: "Cancelled",
    value: 144,
    bgClass: "bg-[var(--status-cancelled-bg)]",
    textClass: "text-[var(--status-cancelled-text)]",
    borderClass: "border-[var(--status-cancelled-border)]",
  },
];

export default function OrderStatusSection({ statuses = defaultStatuses }) {
  return (
    <section className="rounded-[var(--radius-3xl)] border border-[var(--border-app)] bg-[var(--bg-surface-glass)] p-[var(--padding-card)] shadow-[var(--shadow-panel)] backdrop-blur-[var(--backdrop-blur)]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[var(--font-size-xs)] uppercase tracking-[var(--tracking-kicker)] text-[var(--color-cyan-400)] font-[var(--font-weight-semibold)]">
            Order Status
          </p>
          <h3 className="mt-[var(--spacing-1)] text-[var(--font-size-xl)] font-[var(--font-weight-semibold)] text-[var(--text-primary)]">
            Live fulfillment breakdown
          </h3>
        </div>
        <span className="rounded-[var(--radius-full)] bg-[var(--status-delivered-bg)] px-[var(--padding-badge-x)] py-[var(--padding-badge-y)] text-[var(--font-size-xs)] font-[var(--font-weight-medium)] text-[var(--status-delivered-text)] border border-[var(--status-delivered-border)]">
          Updated from API
        </span>
      </div>

      {/* Status Cards Grid */}
      <div className="mt-[var(--spacing-4)] grid gap-[var(--spacing-4)] sm:grid-cols-2 lg:grid-cols-3">
        {statuses.map((item) => (
          <article
            key={item.label}
            className={`rounded-[var(--radius-3xl)] border p-[var(--padding-subcard)] ${item.bgClass} ${item.borderClass}`}
          >
            <p className={`text-[var(--font-size-xs)] uppercase tracking-[var(--tracking-badge)] font-[var(--font-weight-semibold)] ${item.textClass}`}>
              {item.label}
            </p>
            <p className={`mt-[var(--spacing-3)] text-[var(--font-size-3xl)] font-[var(--font-weight-bold)] ${item.textClass}`}>
              {item.value}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
