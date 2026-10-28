import {
  ShoppingBag,
  Clock,
  DollarSign,
  ShoppingCart,
  Package,
  Users,
} from "lucide-react";
import StatCard from "./StatCard";

const defaultStats = [
  {
    title: "Total Orders",
    value: "367",
    subtitle: "All orders received",
    icon: ShoppingBag,
    gradient: "var(--gradient-orders)",
  },
  {
    title: "Pending Orders",
    value: "11",
    subtitle: "Awaiting action",
    icon: Clock,
    gradient: "var(--gradient-pending)",
  },
  {
    title: "Revenue",
    value: "$385,668.73",
    subtitle: "Total gross revenue",
    icon: DollarSign,
    gradient: "var(--gradient-revenue)",
  },
  {
    title: "This Month",
    value: "$601.56",
    subtitle: "Monthly sales target",
    icon: ShoppingCart,
    gradient: "var(--gradient-brand)",
  },
  {
    title: "Top Product",
    value: "Modern Floor Lamp",
    subtitle: "51 sold",
    icon: Package,
    gradient: "var(--gradient-products)",
  },
  {
    title: "Users",
    value: "2",
    subtitle: "Registered customers",
    icon: Users,
    gradient: "linear-gradient(135deg, #64748b 0%, #334155 100%)",
  },
];

export default function StatsGrid({ stats = defaultStats }) {
  return (
    <div className="grid gap-[var(--spacing-6)] sm:grid-cols-2 xl:grid-cols-3">
      {stats.map((stat, idx) => (
        <StatCard key={idx} {...stat} />
      ))}
    </div>
  );
}
