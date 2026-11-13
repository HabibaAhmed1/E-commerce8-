
import { useEffect, useState } from "react";

import OverviewBanner from "../components/dashboard/OverviewBanner";
import StatsGrid from "../components/dashboard/StatsGrid";
import OrderStatusSection from "../components/dashboard/OrderStatusSection";
import TopProductsSection from "../components/dashboard/TopProductsSection";
import RecentOrdersSection from "../components/dashboard/RecentOrdersSection";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { getDashboardStats } from "../api/dashboard.api";

export default function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getDashboardStats();

        console.log("Dashboard API Response:", response.data);

        const dashboardData = response.data?.dashboard;

        if (!dashboardData) {
          throw new Error("Dashboard data was not found in the API response.");
        }

        setDashboard(dashboardData);
      } catch (err) {
        console.error("Dashboard Error:", err);

        setError(
          err.response?.data?.message ||
          err.message ||
          "Failed to load dashboard data."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] w-full flex-col items-center justify-center gap-5">
        <LoadingSpinner size="lg" />
        <p className="text-sm font-medium text-slate-500">
          Loading dashboard...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center p-6">
        <div className="w-full max-w-lg rounded-3xl border border-red-200 bg-white p-8 text-center shadow-lg">
          <h2 className="mb-2 text-lg font-bold text-slate-800">
            Couldn't load dashboard
          </h2>
          <p className="text-sm text-red-600">{error}</p>
        </div>
      </div>
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

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <OrderStatusSection
          ordersByStatus={dashboard.ordersByStatus || {}}
        />

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
