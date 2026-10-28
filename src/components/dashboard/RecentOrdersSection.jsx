const defaultOrders = [
  {
    id: 1,
    customer: "Customer",
    item: "Facilis nihil qui in • Oct 27, 2026",
    status: "confirmed",
    price: "$340.70",
    statusClass: "bg-[var(--status-delivered-bg)] text-[var(--status-delivered-text)] border-[var(--status-delivered-border)]",
  },
  {
    id: 2,
    customer: "Customer",
    item: "GoPro HERO12 Black Action Camera • Oct 20, 2026",
    status: "returned",
    price: "$5,639.57",
    statusClass: "bg-[var(--status-processing-bg)] text-[var(--status-processing-text)] border-[var(--status-processing-border)]",
  },
  {
    id: 3,
    customer: "Customer",
    item: "new Charge • Oct 18, 2026",
    status: "confirmed",
    price: "$52.80",
    statusClass: "bg-[var(--status-delivered-bg)] text-[var(--status-delivered-text)] border-[var(--status-delivered-border)]",
  },
  {
    id: 4,
    customer: "Customer",
    item: "Anker Prime 200W Power Bank (20,000mAh) - Nexis Edition • Oct 4, 2026",
    status: "delivered",
    price: "$300.78",
    statusClass: "bg-[var(--status-delivered-bg)] text-[var(--status-delivered-text)] border-[var(--status-delivered-border)]",
  },
  {
    id: 5,
    customer: "Customer",
    item: "Anker Prime 200W Power Bank (20,000mAh) - Nexis Edition • Oct 4, 2026",
    status: "delivered",
    price: "$300.78",
    statusClass: "bg-[var(--status-delivered-bg)] text-[var(--status-delivered-text)] border-[var(--status-delivered-border)]",
  },
];

export default function RecentOrdersSection({ orders = defaultOrders }) {
  return (
    <section className="rounded-[var(--radius-3xl)] border border-[var(--border-app)] bg-[var(--bg-surface-glass)] p-[var(--padding-card)] shadow-[var(--shadow-panel)] backdrop-blur-[var(--backdrop-blur)]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[var(--font-size-xs)] uppercase tracking-[var(--tracking-kicker)] text-[var(--color-cyan-400)] font-[var(--font-weight-semibold)]">
            Recent Orders
          </p>
          <h3 className="mt-[var(--spacing-1)] text-[var(--font-size-xl)] font-[var(--font-weight-semibold)] text-[var(--text-primary)]">
            Latest customer activity
          </h3>
        </div>
        <span className="rounded-[var(--radius-full)] bg-[var(--status-processing-bg)] px-[var(--padding-badge-x)] py-[var(--padding-badge-y)] text-[var(--font-size-xs)] font-[var(--font-weight-medium)] text-[var(--status-processing-text)] border border-[var(--status-processing-border)]">
          {orders.length} orders
        </span>
      </div>

      {/* Orders List */}
      <div className="mt-[var(--spacing-4)] space-y-[var(--spacing-3)]">
        {orders.map((order) => (
          <article
            key={order.id}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-[var(--spacing-3)] rounded-[var(--radius-2xl)] border border-[var(--border-app)] bg-[var(--bg-surface-secondary)] p-[var(--padding-subcard)] transition-colors duration-200 hover:border-[var(--color-cyan-400)]"
          >
            <div>
              <p className="text-[var(--font-size-sm)] font-[var(--font-weight-semibold)] text-[var(--text-primary)]">
                {order.customer}
              </p>
              <p className="text-[var(--font-size-xs)] text-[var(--text-secondary)] mt-0.5">
                {order.item}
              </p>
            </div>

            <div className="flex items-center gap-[var(--spacing-4)] self-end sm:self-center">
              <span
                className={`rounded-[var(--radius-full)] px-[var(--padding-badge-x)] py-[var(--padding-badge-y)] text-[var(--font-size-xs)] font-[var(--font-weight-medium)] border capitalize ${order.statusClass}`}
              >
                {order.status}
              </span>
              <p className="text-[var(--font-size-sm)] font-[var(--font-weight-bold)] text-[var(--text-primary)] min-w-[5rem] text-right">
                {order.price}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
