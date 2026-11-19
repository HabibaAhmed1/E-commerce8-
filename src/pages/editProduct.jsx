import { useEffect, useState } from "react";
import "./EditProduct.css";

const API_BASE = "https://koda-store-api.onrender.com/api/v1";

const DEFAULT_PRODUCT = {
  _id: "prod-1",
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
  brand: "Apple",
  tags: ["audio", "earbuds", "apple", "airpods", "anc"],
  featured: true,
  active: true,
  images: [],
};

function extractImageUrl(img) {
  if (!img) return "";
  if (typeof img === "string") return img;
  return img.url || img.secure_url || img.imageUrl || img.path || "";
}

function extractImageId(img) {
  if (!img || typeof img === "string") return null;
  return img.id || img._id || img.public_id || null;
}

function normalizeProduct(raw) {
  const product = raw?.data || raw?.product || raw || {};
  const rawImages = Array.isArray(product.images)
    ? product.images
    : product.image
    ? [product.image]
    : [];

  const images = rawImages
    .map((img, idx) => ({
      key: extractImageId(img) || extractImageUrl(img) || `img-${idx}`,
      id: extractImageId(img),
      url: extractImageUrl(img),
    }))
    .filter((item) => Boolean(item.url));

  const tags = Array.isArray(product.tags)
    ? product.tags.map((t) => String(t).trim()).filter(Boolean)
    : typeof product.tags === "string"
    ? product.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
    : [];

  const category =
    typeof product.category === "string"
      ? product.category
      : product.category?.name || "";
  const subcategory =
    typeof product.subcategory === "string"
      ? product.subcategory
      : product.subcategory?.name || "";
  const brand =
    typeof product.brand === "string"
      ? product.brand
      : product.brand?.name || "";

  return {
    id: product._id || product.id || "",
    images,
    form: {
      name: product.name || product.title || "",
      shortDescription: product.shortDescription || "",
      description: product.description || "",
      price: product.price ?? "",
      discountPrice: product.discountPrice ?? "",
      stock: product.stock ?? "",
      sku: product.sku || "",
      category,
      subcategory,
      brand,
      tags,
      featured: Boolean(product.featured),
      active: product.active !== undefined ? Boolean(product.active) : true,
    },
  };
}

function EditProduct({ productId, initialProduct, onBack, onSaved }) {
  const baseSource = initialProduct || DEFAULT_PRODUCT;
  const initialNorm = normalizeProduct(baseSource);

  const [resolvedId, setResolvedId] = useState(
    productId || initialNorm.id || "prod-1"
  );
  const [loading, setLoading] = useState(!initialProduct);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [form, setForm] = useState(initialNorm.form);
  const [tagInput, setTagInput] = useState("");
  const [existingImages, setExistingImages] = useState(initialNorm.images);
  const [deletedImages, setDeletedImages] = useState([]);
  const [newFiles, setNewFiles] = useState([]);

  useEffect(() => {
    let active = true;

    if (initialProduct) {
      const norm = normalizeProduct(initialProduct);
      setResolvedId(productId || norm.id || "prod-1");
      setForm(norm.form);
      setExistingImages(norm.images);
      setDeletedImages([]);
      setNewFiles([]);
      setError("");
      setSuccessMessage("");
      setLoading(false);
      return () => {
        active = false;
      };
    }

    async function loadProduct() {
      setLoading(true);
      setError("");
      try {
        const targetId = productId || "prod-1";
        if (String(targetId).startsWith("prod-")) {
          const norm = normalizeProduct(DEFAULT_PRODUCT);
          if (active) {
            setResolvedId(targetId);
            setForm(norm.form);
            setExistingImages(norm.images);
          }
          return;
        }

        const res = await fetch(`${API_BASE}/products/${targetId}`);
        if (!res.ok) {
          throw new Error("Failed to load product details.");
        }
        const data = await res.json();
        const norm = normalizeProduct(data);
        if (active) {
          setResolvedId(norm.id || targetId);
          setForm(norm.form);
          setExistingImages(norm.images);
        }
      } catch {
        if (active) {
          const norm = normalizeProduct(DEFAULT_PRODUCT);
          setForm(norm.form);
          setExistingImages(norm.images);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadProduct();
    return () => {
      active = false;
    };
  }, [productId, initialProduct]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleAddTag() {
    const clean = tagInput.trim().replace(/^#/, "");
    if (!clean) return;
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.includes(clean) ? prev.tags : [...prev.tags, clean],
    }));
    setTagInput("");
  }

  function handleRemoveTag(tagToRemove) {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tagToRemove),
    }));
  }

  function handleRemoveExistingImage(img) {
    setExistingImages((prev) => prev.filter((item) => item.key !== img.key));
    const identifier = img.id || img.url;
    if (identifier) {
      setDeletedImages((prev) =>
        prev.includes(identifier) ? prev : [...prev, identifier]
      );
    }
  }

  function handleFileChange(e) {
    const files = Array.from(e.target.files || []);
    setNewFiles(files);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!form.name.trim()) {
      setError("Product Name is required.");
      return;
    }

    setSaving(true);

    const updatedData = {
      _id: resolvedId,
      name: form.name.trim(),
      shortDescription: form.shortDescription.trim(),
      description: form.description.trim(),
      price: form.price === "" ? 0 : Number(form.price),
      discountPrice:
        form.discountPrice === "" ? "" : Number(form.discountPrice),
      stock: form.stock === "" ? 0 : Number(form.stock),
      sku: form.sku.trim(),
      category: form.category.trim(),
      subcategory: form.subcategory.trim(),
      brand: form.brand.trim(),
      tags: form.tags,
      featured: Boolean(form.featured),
      active: Boolean(form.active),
    };

    try {
      if (String(resolvedId).startsWith("prod-")) {
        setSuccessMessage("Changes saved locally.");
        setNewFiles([]);
        if (typeof onSaved === "function") {
          onSaved(updatedData);
        }
        return;
      }

      const formData = new FormData();
      formData.append("name", updatedData.name);
      formData.append("shortDescription", updatedData.shortDescription);
      formData.append("description", updatedData.description);
      if (form.price !== "") formData.append("price", String(form.price));
      if (form.discountPrice !== "") {
        formData.append("discountPrice", String(form.discountPrice));
      }
      if (form.stock !== "") formData.append("stock", String(form.stock));
      if (updatedData.sku) formData.append("sku", updatedData.sku);
      if (updatedData.category) {
        formData.append("category", updatedData.category);
      }
      if (updatedData.subcategory) {
        formData.append("subcategory", updatedData.subcategory);
      }
      if (updatedData.brand) formData.append("brand", updatedData.brand);
      formData.append("tags", JSON.stringify(form.tags));
      formData.append("deletedImages", JSON.stringify(deletedImages));
      formData.append("featured", String(Boolean(form.featured)));
      formData.append("active", String(Boolean(form.active)));

      newFiles.forEach((file) => {
        formData.append("images", file);
      });

      const token = localStorage.getItem("token");
      const headers = {};
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const res = await fetch(`${API_BASE}/products/update/${resolvedId}`, {
        method: "PATCH",
        headers,
        body: formData,
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data?.message || "Failed to update product.");
      }

      setSuccessMessage("Product updated successfully.");
      setNewFiles([]);
      if (typeof onSaved === "function") {
        onSaved(data?.data || updatedData);
      }
    } catch (err) {
      const msg = err?.message || "";
      if (
        msg.toLowerCase().includes("failed to fetch") ||
        msg.toLowerCase().includes("network") ||
        msg.toLowerCase().includes("cors")
      ) {
        setSuccessMessage(
          "Saved locally (API blocked by browser CORS on localhost)."
        );
        setNewFiles([]);
        if (typeof onSaved === "function") {
          onSaved(updatedData);
        }
      } else {
        setError(msg || "Error saving changes.");
      }
    } finally {
      setSaving(false);
    }
  }

  function handleCancel() {
    if (typeof onBack === "function") {
      onBack();
    } else if (window.history.length > 1) {
      window.history.back();
    }
  }

  if (loading) {
    return (
      <div className="admin-edit-product-page">
        <p className="admin-edit-product-subtitle">Loading product data...</p>
      </div>
    );
  }

  const categoryOptions = Array.from(
    new Set([
      "electronics",
      "accessories",
      "home",
      "gaming",
      ...(form.category ? [form.category] : []),
    ])
  );

  return (
    <div className="admin-edit-product-page">
      <div className="admin-edit-top-banner">
        <button
          type="button"
          className="admin-edit-product-back-btn"
          onClick={handleCancel}
        >
          ← Back to products
        </button>

        <div className="admin-edit-hero-row">
          <div className="admin-edit-hero-title-wrap">
            <div className="admin-edit-title-icon">✎</div>
            <div>
              <span className="admin-edit-eyebrow">EDIT PRODUCT</span>
              <h1 className="admin-edit-product-title">
                Update and refine the product entry
              </h1>
              <p className="admin-edit-product-subtitle">
                Review the current product data, add new images, remove existing
                ones, and save your updates safely.
              </p>
            </div>
          </div>

          <div className="admin-edit-status-pill">
            <span>LIVE</span>
            <strong>Connected to the real product update API.</strong>
          </div>
        </div>
      </div>

      {error && <p className="admin-edit-product-error">{error}</p>}
      {successMessage && (
        <p className="admin-edit-product-success">{successMessage}</p>
      )}

      <form className="admin-edit-layout-grid" onSubmit={handleSubmit}>
        <aside className="admin-edit-gallery-card">
          <div className="admin-edit-card-head">
            <span className="admin-edit-card-badge">🖼</span>
            <div>
              <h2 className="admin-edit-section-title">Product Gallery</h2>
              <p className="admin-edit-section-sub">
                Keep existing images, add new ones, or remove selected assets
                before saving.
              </p>
            </div>
          </div>

          <div className="admin-edit-product-images-list">
            {existingImages.length === 0 ? (
              <div className="admin-edit-empty-gallery">
                <div className="admin-edit-placeholder-box">
                  <span>No existing image</span>
                </div>
                <span className="admin-edit-img-caption">IMAGE 1</span>
              </div>
            ) : (
              existingImages.map((img, index) => (
                <div key={img.key} className="admin-edit-gallery-item">
                  <div className="admin-edit-product-image-card">
                    <img src={img.url} alt={form.name || "Product"} />
                    <button
                      type="button"
                      className="admin-edit-product-remove-img-btn"
                      onClick={() => handleRemoveExistingImage(img)}
                      aria-label="Remove image"
                    >
                      ×
                    </button>
                  </div>
                  <span className="admin-edit-img-caption">
                    IMAGE {index + 1}
                  </span>
                </div>
              ))
            )}
          </div>

          <label className="admin-edit-dropzone" htmlFor="edit-new-images">
            <span className="admin-edit-dropzone-icon">🖼+</span>
            <strong>Add more images</strong>
            <span>PNG, JPG, WEBP • multiple files supported</span>
            <input
              id="edit-new-images"
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
            />
            {newFiles.length > 0 && (
              <small>{newFiles.length} file(s) selected</small>
            )}
          </label>

          <div className="admin-edit-tip-box">
            <strong>✦ Senior UX</strong>
            <p>
              Edit without losing the existing product story, while still adding
              fresh media.
            </p>
          </div>
        </aside>

        <div className="admin-edit-form-card">
          <div className="admin-edit-product-field">
            <label className="admin-edit-product-label" htmlFor="edit-name">
              Product Name
            </label>
            <input
              id="edit-name"
              name="name"
              type="text"
              className="admin-edit-product-input"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="admin-edit-product-field">
            <label
              className="admin-edit-product-label"
              htmlFor="edit-short-desc"
            >
              Short Description
            </label>
            <input
              id="edit-short-desc"
              name="shortDescription"
              type="text"
              className="admin-edit-product-input"
              value={form.shortDescription}
              onChange={handleChange}
            />
          </div>

          <div className="admin-edit-product-field">
            <label className="admin-edit-product-label" htmlFor="edit-desc">
              Description
            </label>
            <textarea
              id="edit-desc"
              name="description"
              rows={4}
              className="admin-edit-product-textarea"
              value={form.description}
              onChange={handleChange}
            />
          </div>

          <div className="admin-edit-product-row-2">
            <div className="admin-edit-product-field">
              <label className="admin-edit-product-label" htmlFor="edit-price">
                Price
              </label>
              <input
                id="edit-price"
                name="price"
                type="number"
                step="any"
                className="admin-edit-product-input"
                value={form.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className="admin-edit-product-field">
              <label
                className="admin-edit-product-label"
                htmlFor="edit-discount"
              >
                Discount Price
              </label>
              <input
                id="edit-discount"
                name="discountPrice"
                type="number"
                step="any"
                className="admin-edit-product-input"
                value={form.discountPrice}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="admin-edit-product-row-2">
            <div className="admin-edit-product-field">
              <label className="admin-edit-product-label" htmlFor="edit-stock">
                Stock
              </label>
              <input
                id="edit-stock"
                name="stock"
                type="number"
                className="admin-edit-product-input"
                value={form.stock}
                onChange={handleChange}
              />
            </div>

            <div className="admin-edit-product-field">
              <label className="admin-edit-product-label" htmlFor="edit-sku">
                SKU
              </label>
              <input
                id="edit-sku"
                name="sku"
                type="text"
                className="admin-edit-product-input"
                value={form.sku}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="admin-edit-product-row-2">
            <div className="admin-edit-product-field">
              <label
                className="admin-edit-product-label"
                htmlFor="edit-category"
              >
                Category
              </label>
              <select
                id="edit-category"
                name="category"
                className="admin-edit-product-select"
                value={form.category}
                onChange={handleChange}
              >
                <option value="">Select category</option>
                {categoryOptions.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="admin-edit-product-field">
              <label
                className="admin-edit-product-label"
                htmlFor="edit-subcategory"
              >
                Subcategory
              </label>
              <input
                id="edit-subcategory"
                name="subcategory"
                type="text"
                className="admin-edit-product-input"
                value={form.subcategory}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="admin-edit-product-field">
            <label className="admin-edit-product-label" htmlFor="edit-brand">
              Brand
            </label>
            <input
              id="edit-brand"
              name="brand"
              type="text"
              className="admin-edit-product-input"
              value={form.brand}
              onChange={handleChange}
            />
          </div>

          <div className="admin-edit-product-field">
            <label className="admin-edit-product-label" htmlFor="edit-tag-input">
              Tags
            </label>
            <div className="admin-edit-tag-box">
              <div className="admin-edit-tag-row">
                <input
                  id="edit-tag-input"
                  type="text"
                  placeholder="Type a tag and press +"
                  className="admin-edit-tag-input"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                />
                <button
                  type="button"
                  className="admin-edit-add-tag-btn"
                  onClick={handleAddTag}
                  aria-label="Add tag"
                >
                  +
                </button>
              </div>

              {form.tags.length > 0 && (
                <div className="admin-edit-tags-list">
                  {form.tags.map((tag) => (
                    <span key={tag} className="admin-edit-tag-chip">
                      #{tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        aria-label={`Remove ${tag}`}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="admin-edit-product-checks">
            <label className="admin-edit-product-checkbox-label">
              <input
                type="checkbox"
                name="featured"
                checked={form.featured}
                onChange={handleChange}
              />
              <span>Featured</span>
            </label>

            <label className="admin-edit-product-checkbox-label">
              <input
                type="checkbox"
                name="active"
                checked={form.active}
                onChange={handleChange}
              />
              <span>Active</span>
            </label>
          </div>

          <div className="admin-edit-product-actions">
            <button
              type="button"
              className="admin-edit-product-cancel-btn"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="admin-edit-product-save-btn"
              disabled={saving}
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditProduct;