
const statusStyles = {
  pending: {
    bgClass: "bg-[var(--status-pending-bg)]",
    textClass: "text-[var(--status-pending-text)]",
    borderClass: "border-[var(--status-pending-border)]",
  },
  processing: {
    bgClass: "bg-[var(--status-processing-bg)]",
    textClass: "text-[var(--status-processing-text)]",
    borderClass: "border-[var(--status-processing-border)]",
  },
  confirmed: {
    bgClass: "bg-[var(--status-processing-bg)]",
    textClass: "text-[var(--status-processing-text)]",
    borderClass: "border-[var(--status-processing-border)]",
  },
  shipped: {
    bgClass: "bg-[var(--status-shipped-bg)]",
    textClass: "text-[var(--status-shipped-text)]",
    borderClass: "border-[var(--status-shipped-border)]",
  },
  delivered: {
    bgClass: "bg-[var(--status-delivered-bg)]",
    textClass: "text-[var(--status-delivered-text)]",
    borderClass: "border-[var(--status-delivered-border)]",
  },
  cancelled: {
    bgClass: "bg-[var(--status-cancelled-bg)]",
    textClass: "text-[var(--status-cancelled-text)]",
    borderClass: "border-[var(--status-cancelled-border)]",
  },
};

export default function OrderStatusSection({ ordersByStatus = [] }) {
  const statuses = Array.isArray(ordersByStatus)
    ? ordersByStatus
    : Object.entries(ordersByStatus).map(([status, value]) => ({
        _id: status,
        count: value,
      }));

  return (
    <section className="rounded-[var(--radius-3xl)] border border-[var(--border-app)] bg-[var(--bg-surface-glass)] p-[var(--padding-card)] shadow-[var(--shadow-panel)] backdrop-blur-[var(--backdrop-blur)]">

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

      <div className="mt-[var(--spacing-4)] grid gap-[var(--spacing-4)] sm:grid-cols-2 lg:grid-cols-3">

        {statuses.map((item, index) => {
          const label = item._id || item.status || item.label || "Unknown";
          const key = label.toLowerCase();
          const styles = statusStyles[key] || {
            bgClass: "bg-gray-100",
            textClass: "text-gray-700",
            borderClass: "border-gray-200",
          };

          const value = item.count ?? item.total ?? item.value ?? 0;

          return (
            <article
              key={key + index}
              className={`rounded-[var(--radius-3xl)] border p-[var(--padding-subcard)] ${styles.bgClass} ${styles.borderClass}`}
            >
              <p className={`text-[var(--font-size-xs)] uppercase tracking-[var(--tracking-badge)] font-[var(--font-weight-semibold)] ${styles.textClass}`}>
                {label}
              </p>

              <p className={`mt-[var(--spacing-3)] text-[var(--font-size-3xl)] font-[var(--font-weight-bold)] ${styles.textClass}`}>
                {value}
              </p>
            </article>
          );
        })}

      </div>
    </section>
  );
}
