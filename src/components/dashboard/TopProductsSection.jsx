
export default function TopProductsSection({ products = [] }) {
  const formatPrice = (price) => {
    return `$${Number(price || 0).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <section className="rounded-[var(--radius-3xl)] border border-[var(--border-app)] bg-[var(--bg-surface-glass)] p-[var(--padding-card)] shadow-[var(--shadow-panel)] backdrop-blur-[var(--backdrop-blur)]">

      <div>
        <p className="text-[var(--font-size-xs)] uppercase tracking-[var(--tracking-kicker)] text-[var(--color-cyan-400)] font-[var(--font-weight-semibold)]">
          Top Products
        </p>

        <h3 className="mt-[var(--spacing-1)] text-[var(--font-size-xl)] font-[var(--font-weight-semibold)] text-[var(--text-primary)]">
          Best sellers
        </h3>
      </div>

      <div className="mt-[var(--spacing-4)] space-y-[var(--spacing-3)]">

        {products.length > 0 ? (
          products.map((product, index) => {
            const name =
              product.name ||
              product.title ||
              product.productName ||
              "Product";

            const image =
              product.image ||
              product.imageUrl ||
              product.thumbnail ||
              product.images?.[0] ||
              product.product?.image ||
              "";

            const sales =
              product.totalSold ??
              product.sold ??
              product.quantitySold ??
              product.sales ??
              0;

            const revenue =
              product.totalRevenue ??
              product.revenue ??
              product.total ??
              0;

            return (
              <article
                key={product._id || product.id || index}
                className="flex items-center gap-[var(--spacing-3)] rounded-[var(--radius-2xl)] border border-[var(--border-app)] bg-[var(--bg-surface-secondary)] p-[var(--spacing-3)] transition-colors duration-200 hover:border-[var(--color-cyan-400)]"
              >
                {image ? (
                  <img
                    src={image}
                    alt={name}
                    className="h-12 w-12 rounded-[var(--radius-xl)] object-cover bg-slate-800 shrink-0"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                ) : (
                  <div className="h-12 w-12 rounded-[var(--radius-xl)] bg-slate-200 shrink-0 flex items-center justify-center">
                    <span className="text-xs text-slate-500">No image</span>
                  </div>
                )}

                <div className="min-w-0 flex-1">
                  <p className="truncate text-[var(--font-size-sm)] font-[var(--font-weight-semibold)] text-[var(--text-primary)]">
                    {name}
                  </p>

                  <p className="text-[var(--font-size-xs)] text-[var(--text-secondary)] mt-0.5">
                    {sales} units sold • {formatPrice(revenue)}
                  </p>
                </div>
              </article>
            );
          })
        ) : (
          <p className="text-center text-[var(--text-secondary)] py-6">
            No products available.
          </p>
        )}

      </div>
    </section>
  );
}
