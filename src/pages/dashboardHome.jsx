import { useEffect, useState } from "react";

import OverviewBanner from "../components/dashboard/OverviewBanner";
import StatsGrid from "../components/dashboard/StatsGrid";
import OrderStatusSection from "../components/dashboard/OrderStatusSection";
import RevenueChart from "../components/dashboard/RevenueChart";
import TopProductsSection from "../components/dashboard/TopProductsSection";
import RecentOrdersSection from "../components/dashboard/RecentOrdersSection";
import DashboardSkeleton from "../components/dashboard/DashboardSkeleton";
import { getDashboardStats } from "../api/dashboard.api";

export default function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
  const fetchDashboardData = async () => {
    try {
      const response = await getDashboardStats();

      console.log("Dashboard API Response:", response);
      console.log("Response Data:", response.data);
      setDashboard(response.data.dashboard);
    } catch (error) {
      console.error("Dashboard Error:", error);
      console.log("Status:", error.response?.status);
      console.log("Error Data:", error.response?.data);
      setError(error.response?.data?.message || "Failed to load dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  fetchDashboardData();
}, []);

  if (loading) return <DashboardSkeleton />;

  if (error) return <p>{error}</p>;

  if (!dashboard) return <p>No dashboard data available.</p>;

  return (
    <div className="space-y-[var(--spacing-6)]">
      <OverviewBanner />

      <StatsGrid stats={dashboard} />

      <RevenueChart dashboard={dashboard} />

      <div className="grid gap-[var(--spacing-6)] xl:grid-cols-[1.1fr_0.9fr]">
        <OrderStatusSection ordersByStatus={dashboard.ordersByStatus} />

        <TopProductsSection products={dashboard.topProducts} />
      </div>

      <RecentOrdersSection orders={dashboard.recentOrders} />
    </div>
  );
}