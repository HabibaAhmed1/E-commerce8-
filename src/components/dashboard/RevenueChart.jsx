import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const DAYS = 7;

const pad = (n) => String(n).padStart(2, "0");

// Normalize to YYYY-MM-DD. API dates like "2026-11-08" are used as-is
// (no timezone shift); full timestamps use the local calendar day.
const dayKey = (date) => {
  if (typeof date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(date)) return date;
  const d = new Date(date);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

// Build the last 7 days (oldest -> newest), filling missing days with 0.
function buildLast7Days(dashboard) {
  const revenue = dashboard?.revenue || {};
  const source =
    dashboard?.revenueLast7Days ||
    dashboard?.dailyRevenue ||
    dashboard?.last7DaysRevenue ||
    revenue.last7Days ||
    revenue.daily ||
    revenue.dailyRevenue ||
    null;

  const totals = new Map();

  if (Array.isArray(source)) {
    source.forEach((item) => {
      const date = item._id || item.date || item.day;
      const value = item.revenue ?? item.total ?? item.amount ?? item.value ?? 0;
      if (date) totals.set(dayKey(date), (totals.get(dayKey(date)) || 0) + Number(value));
    });
  } else {
    // Fallback: derive from the recent orders returned by the API.
    (dashboard?.recentOrders || []).forEach((order) => {
      if (!order.createdAt) return;
      const value = order.totalPrice ?? order.totalAmount ?? order.total ?? 0;
      const key = dayKey(order.createdAt);
      totals.set(key, (totals.get(key) || 0) + Number(value));
    });
  }

  const today = new Date();
  return Array.from({ length: DAYS }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - (DAYS - 1 - i));
    return {
      day: d.toLocaleDateString("en-US", { weekday: "short", day: "numeric" }),
      revenue: totals.get(dayKey(d)) || 0,
    };
  });
}

export default function RevenueChart({ dashboard }) {
  const data = buildLast7Days(dashboard);

  return (
    <section className="rounded-[var(--radius-3xl)] border border-[var(--border-app)] bg-[var(--bg-surface-glass)] p-[var(--padding-card)] shadow-[var(--shadow-panel)] backdrop-blur-[var(--backdrop-blur)]">
      <p className="text-[var(--font-size-xs)] uppercase tracking-[var(--tracking-kicker)] text-[var(--color-cyan-400)] font-[var(--font-weight-semibold)]">
        Revenue
      </p>
      <h3 className="mt-[var(--spacing-1)] text-[var(--font-size-xl)] font-[var(--font-weight-semibold)] text-[var(--text-primary)]">
        Last 7 days
      </h3>

      <div className="mt-[var(--spacing-4)] h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} />
            <YAxis
              stroke="#94a3b8"
              fontSize={12}
              tickFormatter={(v) => `$${v}`}
            />
            <Tooltip
              formatter={(v) => [`$${Number(v).toLocaleString()}`, "Revenue"]}
              contentStyle={{
                background: "#0f172a",
                border: "1px solid #334155",
                borderRadius: 12,
                color: "#e2e8f0",
              }}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#22d3ee"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
