
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
<<<<<<< HEAD
    let cancelled = false;

    const fetchDashboardData = async () => {
      try {
        const response = await getDashboardStats();
        if (cancelled) return;
        setDashboard(response.data.dashboard);
      } catch (err) {
        if (cancelled) return;
        console.error("Dashboard Error:", err);
        setError(
          err.response?.data?.message ||
            (err.response
              ? "The server returned an error while loading the dashboard."
              : "Network error. Check your connection and try again.")
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
=======
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
>>>>>>> f2789fa1e18e52359d8f8e48c98ec715403940e3

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

<<<<<<< HEAD
      <RevenueChart dashboard={dashboard} />

      <div className="grid gap-[var(--spacing-6)] xl:grid-cols-[1.1fr_0.9fr]">
        <OrderStatusSection ordersByStatus={dashboard.ordersByStatus} />
=======
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <OrderStatusSection
          ordersByStatus={dashboard.ordersByStatus || {}}
        />
>>>>>>> f2789fa1e18e52359d8f8e48c98ec715403940e3

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
