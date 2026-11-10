import { Skeleton, SkeletonCard } from "../ui/Skeleton";

// Title + subtitle used at the top of every section card.
function SectionHeaderSkeleton() {
  return (
    <div className="space-y-[var(--spacing-2)]">
      <Skeleton className="h-3 w-24" />
      <Skeleton className="h-5 w-48" />
    </div>
  );
}

// Matches StatCard
export function StatCardSkeleton() {
  return (
    <SkeletonCard>
      <div className="flex items-start justify-between gap-[var(--spacing-3)]">
        <div className="space-y-[var(--spacing-3)]">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-3 w-28" />
        </div>
        <Skeleton className="h-12 w-12 shrink-0 rounded-[var(--radius-2xl)]" />
      </div>
    </SkeletonCard>
  );
}

// Matches OverviewBanner
export function BannerSkeleton() {
  return (
    <SkeletonCard>
      <Skeleton className="h-3 w-28" />
      <Skeleton className="mt-[var(--spacing-2)] h-7 w-72 max-w-full" />
      <Skeleton className="mt-[var(--spacing-2)] h-4 w-96 max-w-full" />
    </SkeletonCard>
  );
}

// Matches RevenueChart
export function ChartSkeleton() {
  return (
    <SkeletonCard>
      <SectionHeaderSkeleton />
      <Skeleton className="mt-[var(--spacing-4)] h-72 w-full" />
    </SkeletonCard>
  );
}

// Matches OrderStatusSection
export function OrderStatusSkeleton({ items = 6 }) {
  return (
    <SkeletonCard>
      <SectionHeaderSkeleton />
      <div className="mt-[var(--spacing-4)] grid gap-[var(--spacing-4)] sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: items }, (_, i) => (
          <Skeleton key={i} className="h-24 rounded-[var(--radius-3xl)]" />
        ))}
      </div>
    </SkeletonCard>
  );
}

// Generic list (TopProductsSection, RecentOrdersSection)
export function ListSectionSkeleton({ items = 4, showImage = false }) {
  return (
    <SkeletonCard>
      <SectionHeaderSkeleton />
      <div className="mt-[var(--spacing-4)] space-y-[var(--spacing-3)]">
        {Array.from({ length: items }, (_, i) => (
          <div
            key={i}
            className="flex items-center gap-[var(--spacing-3)] rounded-[var(--radius-2xl)] border border-[var(--border-app)] p-[var(--spacing-3)]"
          >
            {showImage && <Skeleton className="h-12 w-12 shrink-0" />}
            <div className="flex-1 space-y-[var(--spacing-2)]">
              <Skeleton className="h-4 w-40 max-w-full" />
              <Skeleton className="h-3 w-28 max-w-full" />
            </div>
            <Skeleton className="h-5 w-16" />
          </div>
        ))}
      </div>
    </SkeletonCard>
  );
}

// Full-page placeholder: same layout as the loaded dashboard.
export default function DashboardSkeleton() {
  return (
    <div
      className="space-y-[var(--spacing-6)]"
      role="status"
      aria-busy="true"
      aria-label="Loading dashboard"
    >
      <BannerSkeleton />

      <div className="grid gap-[var(--spacing-6)] sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }, (_, i) => (
          <StatCardSkeleton key={i} />
        ))}
      </div>

      <ChartSkeleton />

      <div className="grid gap-[var(--spacing-6)] xl:grid-cols-[1.1fr_0.9fr]">
        <OrderStatusSkeleton />
        <ListSectionSkeleton showImage />
      </div>

      <ListSectionSkeleton />
    </div>
  );
}
