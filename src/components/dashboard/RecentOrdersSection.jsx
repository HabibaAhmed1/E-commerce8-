
const getStatusClass = (status) => {
  const styles = {
    confirmed:
      "bg-[var(--status-delivered-bg)] text-[var(--status-delivered-text)] border-[var(--status-delivered-border)]",
    delivered:
      "bg-[var(--status-delivered-bg)] text-[var(--status-delivered-text)] border-[var(--status-delivered-border)]",
    returned:
      "bg-[var(--status-processing-bg)] text-[var(--status-processing-text)] border-[var(--status-processing-border)]",
    pending:
      "bg-[var(--status-processing-bg)] text-[var(--status-processing-text)] border-[var(--status-processing-border)]",
    processing:
      "bg-[var(--status-processing-bg)] text-[var(--status-processing-text)] border-[var(--status-processing-border)]",
    cancelled:
      "bg-red-100 text-red-700 border-red-200",
  };

  return styles[status?.toLowerCase()] ||
    "bg-gray-100 text-gray-700 border-gray-200";
};

export default function RecentOrdersSection({ orders = [] }) {
  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getCustomerName = (order) => {
    const customer = order.user || order.customer;

    if (typeof customer === "string") {
      return customer;
    }

    return (
      customer?.name ||
      customer?.username ||
      customer?.email ||
      "Customer"
    );
  };

  const getProductName = (order) => {
    const product = order.items?.[0]?.product ||
      order.items?.[0];

    return (
      product?.name ||
      product?.title ||
      order.item ||
      "Order"
    );
  };

  const getPrice = (order) => {
    const price = order.totalPrice ??
      order.totalAmount ??
      order.total ??
      order.price ??
      0;

    return `$${Number(price).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <section className="rounded-[var(--radius-3xl)] border border-[var(--border-app)] bg-[var(--bg-surface-glass)] p-[var(--padding-card)] shadow-[var(--shadow-panel)] backdrop-blur-[var(--backdrop-blur)]">

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

      <div className="mt-[var(--spacing-4)] space-y-[var(--spacing-3)]">
        {orders.length > 0 ? (
          orders.map((order, index) => {
            const status = order.status || "pending";

            return (
              <article
                key={order._id || order.id || index}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-[var(--spacing-3)] rounded-[var(--radius-2xl)] border border-[var(--border-app)] bg-[var(--bg-surface-secondary)] p-[var(--padding-subcard)] transition-colors duration-200 hover:border-[var(--color-cyan-400)]"
              >
                <div>
                  <p className="text-[var(--font-size-sm)] font-[var(--font-weight-semibold)] text-[var(--text-primary)]">
                    {getCustomerName(order)}
                  </p>

                  <p className="text-[var(--font-size-xs)] text-[var(--text-secondary)] mt-0.5">
                    {getProductName(order)}
                    {" • "}
                    {formatDate(order.createdAt || order.date)}
                  </p>
                </div>

                <div className="flex items-center gap-[var(--spacing-4)] self-end sm:self-center">
                  <span
                    className={`rounded-[var(--radius-full)] px-[var(--padding-badge-x)] py-[var(--padding-badge-y)] text-[var(--font-size-xs)] font-[var(--font-weight-medium)] border capitalize ${getStatusClass(status)}`}
                  >
                    {status}
                  </span>

                  <p className="text-[var(--font-size-sm)] font-[var(--font-weight-bold)] text-[var(--text-primary)] min-w-[5rem] text-right">
                    {getPrice(order)}
                  </p>
                </div>
              </article>
            );
          })
        ) : (
          <p className="text-center text-[var(--text-secondary)] py-6">
            No recent orders available.
          </p>
        )}
      </div>
    </section>
  );
}
