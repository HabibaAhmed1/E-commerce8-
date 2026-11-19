import { useCallback, useEffect, useMemo, useState } from "react";
import "./productsList.css";
import EditProduct from "./editProduct";

const API_BASE = "https://koda-store-api.onrender.com/api/v1";

const SAMPLE_PRODUCTS = [
  {
    _id: "prod-1",
    name: "Apple Watch Series 10 - Nexis Edition",
    shortDescription:
      "46mm Jet Black Aluminum, Wide-Angle OLED, Sleep Apnea Detection, S10 SiP",
    description:
      "Thinnest Apple Watch ever with a larger wide-angle OLED display, faster charging, and advanced health sensors.",
    price: 429,
    discountPrice: 399,
    stock: 27,
    sku: "WRC-APL-S10-46",
    category: "electronics",
    subcategory: "wearables",
    brand: "apple",
    tags: ["wearable", "smartwatch", "apple", "fitness"],
    featured: false,
    active: true,
    images: [],
  },
  {
    _id: "prod-2",
    name: "Valve Steam Deck OLED 512GB",
    shortDescription:
      '7.4" 90Hz HDR OLED Display, 6nm AMD APU, Faster Wi-Fi 6E, 50Wh Battery.',
    description:
      "Your Steam Library anywhere with stunning HDR visuals, striking blacks, faster download speeds, and longer battery endurance.",
    price: 549,
    discountPrice: 529,
    stock: 0,
    sku: "GAM-VALVE-DECK512",
    category: "electronics",
    subcategory: "gaming",
    brand: "valve",
    tags: ["gaming", "handheld", "pc", "steam"],
    featured: true,
    active: true,
    images: [],
  },
  {
    _id: "prod-3",
    name: "Nintendo Switch OLED Model",
    shortDescription:
      "7-inch OLED Screen, 64GB Internal Storage, Enhanced Audio, Wide Adjustable Stand",
    description:
      "Play at home on the TV or on-the-go with a vibrant 7-inch OLED screen and rich audio.",
    price: 349.99,
    discountPrice: 329.99,
    stock: 32,
    sku: "GAM-NIN-SWOLED",
    category: "electronics",
    subcategory: "gaming",
    brand: "nintendo",
    tags: ["gaming", "console", "nintendo", "switch"],
    featured: true,
    active: true,
    images: [],
  },
  {
    _id: "prod-4",
    name: "Xbox Series X 1TB Console",
    shortDescription:
      "12 Teraflops of Raw Graphic Processing Power, 4K Gaming up to 120 FPS",
    description:
      "Experience next-gen speed and performance with Xbox Velocity Architecture and 4K gaming.",
    price: 499.99,
    discountPrice: 469.99,
    stock: 15,
    sku: "GAM-MS-XBSX1TB",
    category: "electronics",
    subcategory: "gaming",
    brand: "microsoft",
    tags: ["gaming", "console", "xbox", "microsoft"],
    featured: false,
    active: true,
    images: [],
  },
  {
    _id: "prod-5",
    name: "Apple AirPods Pro 2 (USB-C) - Nexis Edition",
    shortDescription:
      "Up to 2x more Active Noise Cancellation, Adaptive Audio, MagSafe Case with Speaker",
    description:
      "Upgraded with the H2 chip for smarter noise cancellation and superior 3D sound. Dust, sweat, and water resistant with USB-C convenience.",
    price: 249,
    discountPrice: 199,
    stock: 64,
    sku: "AUD-AIRPODSPRO-2-NX-17",
    category: "electronics",
    subcategory: "audio",
    brand: "apple",
    tags: ["audio", "earbuds", "apple", "airpods", "anc"],
    featured: true,
    active: true,
    images: [],
  },
  {
    _id: "prod-6",
    name: "Sony WF-1000XM5 True Wireless Earbuds - Nexis Edition",
    shortDescription:
      "The Best Truly Wireless Noise Canceling Earbuds, Integrated Processor V2, LDAC",
    description:
      "Crystal-clear calls, studio-grade wireless audio, and industry-leading noise cancellation.",
    price: 299.99,
    discountPrice: 249.99,
    stock: 36,
    sku: "AUD-SNY-WFXM5",
    category: "electronics",
    subcategory: "audio",
    brand: "sony",
    tags: ["audio", "earbuds", "sony", "anc"],
    featured: true,
    active: true,
    images: [],
  },
];

function extractProductsArray(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.products)) return payload.products;
  if (Array.isArray(payload?.data?.products)) return payload.data.products;
  return [];
}

function getProductId(item) {
  return item?._id || item?.id || "";
}

function getProductImage(item) {
  const raw = Array.isArray(item?.images)
    ? item.images[0]
    : item?.image || item?.thumbnail || "";
  if (!raw) return "";
  if (typeof raw === "string") return raw;
  return raw.url || raw.secure_url || raw.imageUrl || raw.path || "";
}

function getProductStock(item) {
  const val = item?.stock ?? item?.quantity ?? item?.count ?? 0;
  const num = Number(val);
  return Number.isNaN(num) ? 0 : num;
}

function getProductPrice(item) {
  const val = item?.price ?? 0;
  const num = Number(val);
  return Number.isNaN(num) ? 0 : num;
}

function getProductDiscount(item) {
  const raw = item?.discountPrice ?? item?.salePrice ?? "";
  if (raw === "" || raw === null || raw === undefined) return null;
  const num = Number(raw);
  return Number.isNaN(num) ? null : num;
}

function getProductTags(item) {
  if (Array.isArray(item?.tags)) {
    return item.tags.map((t) => String(t).trim()).filter(Boolean);
  }
  if (typeof item?.tags === "string") {
    return item.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
  }
  return [];
}

function formatMetaLine(item) {
  const cat =
    typeof item?.category === "string"
      ? item.category
      : item?.category?.name || "";
  const sub =
    typeof item?.subcategory === "string"
      ? item.subcategory
      : item?.subcategory?.name || "";
  const brand =
    typeof item?.brand === "string" ? item.brand : item?.brand?.name || "";

  return [cat, sub, brand]
    .filter(Boolean)
    .map((part) => String(part).toUpperCase())
    .join(" • ");
}

async function tryLoadAxios() {
  try {
    const mod = await import("axios");
    return mod?.default || null;
  } catch {
    return null;
  }
}

function ProductsList({ onOpenEditProduct, onOpenAddProduct }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [usingFallback, setUsingFallback] = useState(false);

  const [searchInput, setSearchInput] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [stockFilter, setStockFilter] = useState("all");
  const [featuredOnly, setFeaturedOnly] = useState(false);

  const [editingProduct, setEditingProduct] = useState(null);
  const [viewingProduct, setViewingProduct] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError("");
    setUsingFallback(false);

    try {
      let data = null;

      const axiosLib = await tryLoadAxios();
      if (axiosLib) {
        try {
          const axRes = await axiosLib.get(`${API_BASE}/products`);
          data = axRes?.data;
        } catch {
          data = null;
        }
      }

      if (!data) {
        const res = await fetch(`${API_BASE}/products`);
        if (!res.ok) {
          throw new Error(`Failed to fetch products (${res.status})`);
        }
        data = await res.json();
      }

      setProducts(extractProductsArray(data));
    } catch (err) {
      const msg = err?.message || "Network or CORS error";
      if (
        msg.toLowerCase().includes("failed to fetch") ||
        msg.toLowerCase().includes("network") ||
        msg.toLowerCase().includes("cors")
      ) {
        setProducts(SAMPLE_PRODUCTS);
        setUsingFallback(true);
        setNotice(
          "Showing sample products due to browser CORS restriction on localhost."
        );
      } else {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const stats = useMemo(() => {
    const total = products.length;
    const featured = products.filter((p) => Boolean(p?.featured)).length;
    const inStock = products.filter((p) => getProductStock(p) > 0).length;
    const outOfStock = products.filter((p) => getProductStock(p) <= 0).length;
    return { total, featured, inStock, outOfStock };
  }, [products]);

  const filteredProducts = useMemo(() => {
    const q = appliedSearch.trim().toLowerCase();

    return products.filter((item) => {
      const name = String(item?.name || item?.title || "").toLowerCase();
      const desc = String(
        item?.shortDescription || item?.description || ""
      ).toLowerCase();
      const meta = formatMetaLine(item).toLowerCase();
      const stock = getProductStock(item);

      const matchesSearch =
        !q || name.includes(q) || desc.includes(q) || meta.includes(q);
      const matchesStock =
        stockFilter === "all" ||
        (stockFilter === "in" && stock > 0) ||
        (stockFilter === "out" && stock <= 0);
      const matchesFeatured = !featuredOnly || Boolean(item?.featured);

      return matchesSearch && matchesStock && matchesFeatured;
    });
  }, [products, appliedSearch, stockFilter, featuredOnly]);

  function handleSearchSubmit(e) {
    e.preventDefault();
    setAppliedSearch(searchInput);
  }

  function handleEditClick(item) {
    const id = getProductId(item);
    if (typeof onOpenEditProduct === "function") {
      onOpenEditProduct(id);
      return;
    }
    setEditingProduct(item);
  }

  async function handleConfirmDelete() {
    if (!deletingProduct) return;
    const id = getProductId(deletingProduct);
    setDeleting(true);
    setDeleteError("");

    try {
      if (usingFallback || String(id).startsWith("prod-")) {
        setProducts((prev) => prev.filter((p) => getProductId(p) !== id));
        setNotice("Product deleted from catalog.");
        setDeletingProduct(null);
        return;
      }

      const token = localStorage.getItem("token");
      const headers = {};
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const res = await fetch(`${API_BASE}/products/${id}`, {
        method: "DELETE",
        headers,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.message || "Failed to delete product.");
      }

      setProducts((prev) => prev.filter((p) => getProductId(p) !== id));
      setNotice("Product deleted successfully.");
      setDeletingProduct(null);
    } catch (err) {
      setDeleteError(err.message || "Could not delete product.");
    } finally {
      setDeleting(false);
    }
  }

  if (editingProduct) {
    const id = getProductId(editingProduct);
    return (
      <div className="koda-products-wrap">
        <EditProduct
          productId={id}
          initialProduct={editingProduct}
          onBack={() => setEditingProduct(null)}
          onSaved={(updated) => {
            if (updated) {
              setProducts((prev) =>
                prev.map((item) =>
                  getProductId(item) === id ? { ...item, ...updated } : item
                )
              );
            }
            setNotice("Product updated successfully.");
            if (!usingFallback) {
              fetchProducts();
            }
          }}
        />
      </div>
    );
  }

  return (
    <div className="koda-products-wrap">
      <div className="koda-top-header-card">
        <div className="koda-header-left">
          <div className="koda-header-icon">🛍</div>
          <div>
            <span className="koda-eyebrow">PRODUCT DASHBOARD</span>
            <h1>Products</h1>
          </div>
        </div>

        <button
          type="button"
          className="koda-add-btn"
          onClick={() => {
            if (typeof onOpenAddProduct === "function") {
              onOpenAddProduct();
            } else {
              fetchProducts();
            }
          }}
        >
          + Add Product
        </button>
      </div>

      {notice && (
        <div className="koda-notice-bar">
          <span>{notice}</span>
          <button type="button" onClick={() => setNotice("")}>
            ×
          </button>
        </div>
      )}

      <div className="koda-stats-grid">
        <div className="koda-stat-box">
          <div className="koda-stat-icon cyan">🛍</div>
          <strong>{stats.total}</strong>
          <span>Total</span>
        </div>

        <div className="koda-stat-box">
          <div className="koda-stat-icon amber">☆</div>
          <strong>{stats.featured}</strong>
          <span>Featured</span>
        </div>

        <div className="koda-stat-box">
          <div className="koda-stat-icon green">↗</div>
          <strong>{stats.inStock}</strong>
          <span>In Stock</span>
        </div>

        <div className="koda-stat-box">
          <div className="koda-stat-icon rose">⊗</div>
          <strong>{stats.outOfStock}</strong>
          <span>Out of Stock</span>
        </div>
      </div>

      <form className="koda-search-card" onSubmit={handleSearchSubmit}>
        <div className="koda-search-input-wrap">
          <span>🔍</span>
          <input
            type="text"
            placeholder="Search products..."
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
              if (e.target.value === "") setAppliedSearch("");
            }}
          />
        </div>

        <button
          type="button"
          className="koda-filter-btn"
          onClick={() => setShowFilters((prev) => !prev)}
        >
          ☰ Filters
        </button>

        <button type="submit" className="koda-search-submit-btn">
          🔍 Search
        </button>
      </form>

      {showFilters && (
        <div className="koda-filters-drawer">
          <select
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value)}
          >
            <option value="all">All Stock Status</option>
            <option value="in">In Stock</option>
            <option value="out">Out of Stock</option>
          </select>

          <label className="koda-filter-check">
            <input
              type="checkbox"
              checked={featuredOnly}
              onChange={(e) => setFeaturedOnly(e.target.checked)}
            />
            <span>Featured only</span>
          </label>
        </div>
      )}

      {loading ? (
        <div className="koda-empty-card">Loading products...</div>
      ) : error ? (
        <div className="koda-empty-card">
          <p>{error}</p>
          <button
            type="button"
            className="koda-search-submit-btn"
            onClick={fetchProducts}
          >
            Retry
          </button>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="koda-empty-card">No matching products found.</div>
      ) : (
        <div className="koda-cards-grid">
          {filteredProducts.map((item, index) => {
            const id = getProductId(item) || `item-${index}`;
            const imgUrl = getProductImage(item);
            const stock = getProductStock(item);
            const price = getProductPrice(item);
            const discount = getProductDiscount(item);
            const tags = getProductTags(item);
            const metaLine = formatMetaLine(item);

            return (
              <article key={id} className="koda-product-card">
                <div className="koda-card-media">
                  {imgUrl ? (
                    <img
                      src={imgUrl}
                      alt={item?.name || item?.title || "Product"}
                    />
                  ) : (
                    <div className="koda-card-no-img">
                      <span>{item?.name || "Product Image"}</span>
                    </div>
                  )}

                  {item?.featured && (
                    <span className="koda-badge-featured">☆ Featured</span>
                  )}

                  <span
                    className={`koda-badge-stock ${
                      stock > 0 ? "in-stock" : "out-stock"
                    }`}
                  >
                    {stock > 0 ? `${stock} in stock` : "Out of Stock"}
                  </span>
                </div>

                <div className="koda-card-body">
                  <h2 className="koda-card-title">
                    {item?.name || item?.title || "Untitled Product"}
                  </h2>

                  {metaLine && <div className="koda-card-meta">{metaLine}</div>}

                  <p className="koda-card-desc">
                    {item?.shortDescription || item?.description || ""}
                  </p>

                  <div className="koda-card-price-row">
                    <strong className="koda-price-main">${price}</strong>
                    {discount !== null && (
                      <span className="koda-price-sub">-${discount} off</span>
                    )}
                  </div>

                  {tags.length > 0 && (
                    <div className="koda-card-tags">
                      {tags.slice(0, 5).map((tag) => (
                        <span key={tag} className="koda-card-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="koda-card-actions">
                    <button
                      type="button"
                      className="koda-btn-ghost"
                      onClick={() => setViewingProduct(item)}
                    >
                      👁 View
                    </button>

                    <button
                      type="button"
                      className="koda-btn-ghost"
                      onClick={() => handleEditClick(item)}
                    >
                      ✎ Edit
                    </button>

                    <button
                      type="button"
                      className="koda-btn-ghost"
                      onClick={() => handleEditClick(item)}
                    >
                      ⚡ Quick Edit
                    </button>

                    <button
                      type="button"
                      className="koda-btn-delete"
                      onClick={() => {
                        setDeleteError("");
                        setDeletingProduct(item);
                      }}
                    >
                      🗑 Delete
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {viewingProduct && (
        <div
          className="koda-modal-backdrop"
          onClick={() => setViewingProduct(null)}
        >
          <div
            className="koda-modal-box"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>{viewingProduct?.name || viewingProduct?.title}</h3>
            <p className="koda-card-desc">
              {viewingProduct?.description ||
                viewingProduct?.shortDescription ||
                "No additional description."}
            </p>
            <div className="koda-modal-foot">
              <button
                type="button"
                className="koda-btn-ghost"
                onClick={() => setViewingProduct(null)}
              >
                Close
              </button>
              <button
                type="button"
                className="koda-search-submit-btn"
                onClick={() => {
                  const target = viewingProduct;
                  setViewingProduct(null);
                  handleEditClick(target);
                }}
              >
                Edit Product
              </button>
            </div>
          </div>
        </div>
      )}

      {deletingProduct && (
        <div
          className="koda-modal-backdrop"
          onClick={() => !deleting && setDeletingProduct(null)}
        >
          <div
            className="koda-modal-box"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Delete Product</h3>
            <p className="koda-card-desc">
              Are you sure you want to delete{" "}
              <strong>
                {deletingProduct?.name ||
                  deletingProduct?.title ||
                  "this product"}
              </strong>
              ?
            </p>
            {deleteError && <p className="koda-modal-err">{deleteError}</p>}
            <div className="koda-modal-foot">
              <button
                type="button"
                className="koda-btn-ghost"
                disabled={deleting}
                onClick={() => setDeletingProduct(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="koda-btn-delete"
                disabled={deleting}
                onClick={handleConfirmDelete}
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductsList;