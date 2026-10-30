const defaultProducts = [
  {
    id: 1,
    name: "Modern Floor Lamp",
    sales: "51 units sold • $4,029.00",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=120&q=80",
  },
  {
    id: 2,
    name: "Air Fryer XL",
    sales: "34 units sold • $4,726.00",
    image: "https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=120&q=80",
  },
  {
    id: 3,
    name: "Nike Men's Air Max Torch Shoes",
    sales: "31 units sold • $310.00",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=120&q=80",
  },
  {
    id: 4,
    name: "Logitech MX Master 3S Wireless Mouse",
    sales: "30 units sold • $2,580.00",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=120&q=80",
  },
  {
    id: 5,
    name: "iPhone 17 Pro Max Orange",
    sales: "25 units sold • $1,500.00",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=120&q=80",
  },
];

export default function TopProductsSection({ products = defaultProducts }) {
  return (
    <section className="rounded-[var(--radius-3xl)] border border-[var(--border-app)] bg-[var(--bg-surface-glass)] p-[var(--padding-card)] shadow-[var(--shadow-panel)] backdrop-blur-[var(--backdrop-blur)]">
      {/* Header */}
      <div>
        <p className="text-[var(--font-size-xs)] uppercase tracking-[var(--tracking-kicker)] text-[var(--color-cyan-400)] font-[var(--font-weight-semibold)]">
          Top Products
        </p>
        <h3 className="mt-[var(--spacing-1)] text-[var(--font-size-xl)] font-[var(--font-weight-semibold)] text-[var(--text-primary)]">
          Best sellers
        </h3>
      </div>

      {/* Product List */}
      <div className="mt-[var(--spacing-4)] space-y-[var(--spacing-3)]">
        {products.map((product) => (
          <article
            key={product.id}
            className="flex items-center gap-[var(--spacing-3)] rounded-[var(--radius-2xl)] border border-[var(--border-app)] bg-[var(--bg-surface-secondary)] p-[var(--spacing-3)] transition-colors duration-200 hover:border-[var(--color-cyan-400)]"
          >
            <img
              src={product.image}
              alt={product.name}
              className="h-12 w-12 rounded-[var(--radius-xl)] object-cover bg-slate-800 shrink-0"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[var(--font-size-sm)] font-[var(--font-weight-semibold)] text-[var(--text-primary)]">
                {product.name}
              </p>
              <p className="text-[var(--font-size-xs)] text-[var(--text-secondary)] mt-0.5">
                {product.sales}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
