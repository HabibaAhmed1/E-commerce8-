
import {
  ShoppingBag,
  Clock,
  DollarSign,
  ShoppingCart,
  Package,
  Users,
} from "lucide-react";

import StatCard from "./StatCard";

export default function StatsGrid({ stats }) {
  // Prevent errors if dashboard data is not loaded
  if (!stats) return null;

  // Extract dashboard data
  const orders = stats.orders || {};
  const revenue = stats.revenue || {};
  const topProducts = stats.topProducts || [];

  // Get top product
  const topProduct = topProducts[0] || {};

  const dashboardStats = [
    {
      title: "Total Orders",
      value: orders.totalOrders ?? orders.total ?? 0,
      subtitle: "All orders received",
      icon: ShoppingBag,
      gradient: "var(--gradient-orders)",
    },
    {
      title: "Pending Orders",
      value: orders.pendingOrders ?? orders.pending ?? 0,
      subtitle: "Awaiting action",
      icon: Clock,
      gradient: "var(--gradient-pending)",
    },
    {
      title: "Revenue",
      value: revenue.totalRevenue ?? revenue.total ?? 0,
      subtitle: "Total gross revenue",
      icon: DollarSign,
      gradient: "var(--gradient-revenue)",
    },
    {
      title: "This Month",
      value: revenue.monthlyRevenue ?? revenue.thisMonth ?? 0,
      subtitle: "Monthly sales",
      icon: ShoppingCart,
      gradient: "var(--gradient-brand)",
    },
    {
      title: "Top Product",
      value: topProduct.name ?? topProduct.title ?? "No products",
      subtitle: `${topProduct.totalSold ?? topProduct.sold ?? 0} sold`,
      icon: Package,
      gradient: "var(--gradient-products)",
    },
    {
      title: "Users",
      value: stats.totalUsers ?? stats.users ?? 0,
      subtitle: "Registered customers",
      icon: Users,
      gradient: "linear-gradient(135deg, #64748b 0%, #334155 100%)",
    },
  ];

  return (
    <div className="grid gap-[var(--spacing-6)] sm:grid-cols-2 xl:grid-cols-3">
      {dashboardStats.map((stat, idx) => (
        <StatCard key={idx} {...stat} />
      ))}
    </div>
  );
}
