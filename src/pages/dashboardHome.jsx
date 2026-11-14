import { useEffect, useState } from "react";

import OverviewBanner from "../components/dashboard/OverviewBanner";
import StatsGrid from "../components/dashboard/StatsGrid";
import OrderStatusSection from "../components/dashboard/OrderStatusSection";
import RevenueChart from "../components/dashboard/RevenueChart";
import TopProductsSection from "../components/dashboard/TopProductsSection";
import RecentOrdersSection from "../components/dashboard/RecentOrdersSection";
import DashboardSkeleton from "../components/dashboard/DashboardSkeleton";
import ErrorState from "../components/ui/ErrorState";
import { getDashboardStats } from "../api/dashboard.api";

export default function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await getDashboardStats();
        if (cancelled) return;
        
        const dashboardData = response.data?.dashboard;
        if (!dashboardData) {
          throw new Error("Dashboard data was not found in the API response.");
        }
        setDashboard(dashboardData);
      } catch (err) {
        if (cancelled) return;
        console.error("Dashboard Error:", err);
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to load dashboard data."
        );
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchDashboardData();

    return () => {
      cancelled = true;
    };
  }, [reloadKey]);

  const handleRetry = () => {
    setError("");
    setLoading(true);
    setReloadKey((key) => key + 1);
  };

  if (loading) return <DashboardSkeleton />;

  if (error) {
    return (
      <ErrorState
        title="Couldn't load the dashboard"
        message={error}
        onRetry={handleRetry}
      />
    );
  }

  if (!dashboard) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-sm text-slate-500">
          No dashboard data available.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6 p-8">
      <OverviewBanner />

      <StatsGrid stats={dashboard} />

      <RevenueChart dashboard={dashboard} />

      <div className="grid gap-[var(--spacing-6)] xl:grid-cols-[1.1fr_0.9fr]">
        <OrderStatusSection ordersByStatus={dashboard.ordersByStatus || {}} />

        <TopProductsSection
          products={dashboard.topProducts || []}
        />
      </div>

      <RecentOrdersSection
        orders={dashboard.recentOrders || []}
      />
    </div>
  );
}