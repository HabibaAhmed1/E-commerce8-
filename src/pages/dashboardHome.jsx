import OverviewBanner from "../components/dashboard/OverviewBanner";
import StatsGrid from "../components/dashboard/StatsGrid";
import OrderStatusSection from "../components/dashboard/OrderStatusSection";
import TopProductsSection from "../components/dashboard/TopProductsSection";
import RecentOrdersSection from "../components/dashboard/RecentOrdersSection";

export default function Dashboard() {
  return (
    <div className="space-y-[var(--spacing-6)]">
      {/* 1. Welcome / Overview Banner */}
      <OverviewBanner />

      {/* 2. Top Metric Stat Cards Grid */}
      <StatsGrid />

      {/* 3. Middle Split Row (Fulfillment breakdown + Best sellers) */}
      <div className="grid gap-[var(--spacing-6)] xl:grid-cols-[1.1fr_0.9fr]">
        <OrderStatusSection />
        <TopProductsSection />
      </div>

      {/* 4. Recent Orders Table / List */}
      <RecentOrdersSection />
    </div>
  );
}
