import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, X, Loader2, Plus } from 'lucide-react';
import { toast } from 'react-toastify';

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [tagInput, setTagInput] = useState('');

  // تفاصيل الفورم مطابقة لـ API الـ Backend
  const [formData, setFormData] = useState({
    name: '',
    shortDescription: '',
    description: '',
    price: '',
    discountPrice: '',
    stock: '',
    sku: '',
    category: '',
    subcategory: '',
    brand: '',
    tags: [],
    featured: false,
    isActive: true,
  });

  // تخزين الصور القديمة (التي تحتوي على url و public_id)
  const [existingImages, setExistingImages] = useState([]);
  // مصفوفة لتخزين الـ public_id للصورة القديمة اللي اليوزر هيحذفها
  const [deletedImageIds, setDeletedImageIds] = useState([]);
  // الصور الجديدة اللي اليوزر هيرفعها من جهازه (Files)
  const [newImages, setNewImages] = useState([]);

  // 1. جلب بيانات المنتج باستخدام الـ ID
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        // استبدلي بالرابط الحقيقي للـ API بتاعكم
        const response = await fetch(`https://your-api-domain.com/products/${id}`);
        if (!response.ok) throw new Error('Failed to fetch product data');
        
        const data = await response.json();
        // الـ Response المتوقع حسب الـ Schema: data.product
        const product = data.product || data;

        setFormData({
          name: product.name || '',
          shortDescription: product.shortDescription || '',
          description: product.description || '',
          price: product.price || '',
          discountPrice: product.discountPrice || '',
          stock: product.stock || '',
          sku: product.sku || '',
          category: product.category || '',
          subcategory: product.subcategory || '',
          brand: product.brand || '',
          tags: product.tags || [],
          featured: product.featured || false,
          isActive: product.isActive ?? true,
        });

        // حفظ الصور القديمة (كل صورة عبارة عن object فيه url و public_id)
        setExistingImages(product.images || []);
      } catch (error) {
        toast.error('Error loading product details!');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleAddTag = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(tagInput.trim())) {
        setFormData((prev) => ({ ...prev, tags: [...prev.tags, tagInput.trim()] }));
      }
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  // حذف صورة قديمة وتسجيل الـ public_id الخاص بها لإرساله للباك إند
  const handleRemoveExistingImage = (imageObj, index) => {
    if (imageObj.public_id) {
      setDeletedImageIds((prev) => [...prev, imageObj.public_id]);
    }
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setNewImages((prev) => [...prev, ...files]);
  };

  const handleRemoveNewImage = (index) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
  };

  // 2. إرسال التعديلات باستخدام PATCH و multipart/form-data
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const dataToSend = new FormData();
      
      // إلحاق البيانات النصية والأرقام
      Object.keys(formData).forEach((key) => {
        if (key === 'tags') {
          // الـ API يتطلب الـ tags كـ JSON array as string
          dataToSend.append('tags', JSON.stringify(formData.tags));
        } else {
          dataToSend.append(key, formData[key]);
        }
      });

      // إلحاق الـ public_ids للصور المراد حذفها كـ JSON string
      if (deletedImageIds.length > 0) {
        dataToSend.append('deletedImages', JSON.stringify(deletedImageIds));
      }

      // إلحاق الصور الجديدة الملفات الفعلية
      newImages.forEach((file) => {
        dataToSend.append('images', file);
      });

      // إرسال الطلب بـ PATCH بناءً على الـ API Endpoint
      const response = await fetch(`https://your-api-domain.com/products/update/${id}`, {
        method: 'PATCH',
        // ملاحظة: لا نضيف 'Content-Type' يدويًا مع FormData لأن المتصفح يحددها تلقائياً مع الـ boundary
        body: dataToSend,
      });

      if (!response.ok) throw new Error('Failed to update product');

      toast.success('Product updated successfully!');
      navigate('/dashboard/products');
    } catch (error) {
      toast.error('Failed to update product');
      console.error(error);
    } finally {
      submitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] text-slate-400">
        <Loader2 className="w-10 h-10 animate-spin text-cyan-400 mb-3" />
        <p className="text-sm font-medium">Loading product data...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Header Info */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-5">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/dashboard/products')}
            className="p-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white transition"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Edit Product</span>
            <h1 className="text-2xl font-bold text-white mt-0.5">Update and refine the product entry</h1>
            <p className="text-sm text-slate-400">Review the current product data, add new images, remove existing ones, and save your updates safely.</p>
          </div>
        </div>
        <div className="hidden lg:block px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-right">
          <span className="block text-[10px] text-cyan-400 font-bold uppercase">Live</span>
          <span className="text-xs text-slate-300">Connected to the real product update API.</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Product Gallery & Management (5 Cols) */}
        <div className="lg:col-span-5 space-y-6 bg-slate-900/60 border border-slate-800/80 p-6 rounded-3xl backdrop-blur-xl">
          <div>
            <h3 className="text-base font-bold text-white mb-1">Product Gallery</h3>
            <p className="text-xs text-slate-400">Keep existing images, add new ones, or remove selected assets before saving.</p>
          </div>

          <div className="space-y-4">
            {/* Existing Images */}
            {existingImages.map((img, idx) => (
              <div key={`exist-${idx}`} className="relative group rounded-2xl overflow-hidden border border-slate-700 bg-slate-950 h-56">
                <img src={img.url} alt="Product view" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => handleRemoveExistingImage(img, idx)}
                  className="absolute top-3 right-3 bg-red-600/90 hover:bg-red-600 text-white p-2 rounded-xl shadow-lg transition"
                >
                  <X size={16} />
                </button>
                <span className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md text-slate-200 text-xs font-bold px-2.5 py-1 rounded-lg">
                  IMAGE {idx + 1}
                </span>
              </div>
            ))}

            {/* New Uploaded Images Previews */}
            {newImages.map((file, idx) => (
              <div key={`new-${idx}`} className="relative group rounded-2xl overflow-hidden border border-cyan-500/50 bg-slate-950 h-56">
                <img src={URL.createObjectURL(file)} alt="New preview" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => handleRemoveNewImage(idx)}
                  className="absolute top-3 right-3 bg-red-600/90 hover:bg-red-600 text-white p-2 rounded-xl shadow-lg transition"
                >
                  <X size={16} />
                </button>
                <span className="absolute bottom-3 left-3 bg-cyan-500 text-slate-950 text-xs font-bold px-2.5 py-1 rounded-lg">
                  NEW ASSET
                </span>
              </div>
            ))}

            {/* Upload Box */}
            <label className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-slate-700 hover:border-cyan-500 rounded-2xl cursor-pointer bg-slate-900/40 hover:bg-slate-900 transition">
              <Upload className="w-7 h-7 text-slate-400 mb-2" />
              <span className="text-sm font-medium text-slate-300">Add more images</span>
              <span className="text-xs text-slate-500 mt-0.5">PNG, JPG, WEBP • multiple files supported</span>
              <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
          </div>
        </div>

        {/* Right Column: Fields & Details (7 Cols) */}
        <div className="lg:col-span-7 space-y-5 bg-slate-900/60 border border-slate-800/80 p-6 rounded-3xl backdrop-blur-xl">
          
          {/* Product Name */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Product Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500 transition"
            />
          </div>

          {/* Short Description */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Short Description</label>
            <input
              type="text"
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleInputChange}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500 transition"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Description</label>
            <textarea
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleInputChange}
              required
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500 transition resize-none"
            />
          </div>

          {/* Price & Discount */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                step="0.01"
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500 transition"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Discount Price</label>
              <input
                type="number"
                name="discountPrice"
                value={formData.discountPrice}
                onChange={handleInputChange}
                step="0.01"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500 transition"
              />
            </div>
          </div>

          {/* Stock & SKU */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Stock</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500 transition"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">SKU</label>
              <input
                type="text"
                name="sku"
                value={formData.sku}
                onChange={handleInputChange}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500 transition"
              />
            </div>
          </div>

          {/* Category & Subcategory */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Category</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500 transition"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Subcategory</label>
              <input
                type="text"
                name="subcategory"
                value={formData.subcategory}
                onChange={handleInputChange}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500 transition"
              />
            </div>
          </div>

          {/* Brand */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Brand</label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleInputChange}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500 transition"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Tags</label>
            <div className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 space-y-2">
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag, idx) => (
                  <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 text-xs font-medium text-slate-200">
                    #{tag}
                    <button type="button" onClick={() => handleRemoveTag(tag)} className="text-slate-400 hover:text-red-400">
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleAddTag}
                  placeholder="Type a tag and press +"
                  className="w-full bg-transparent text-sm text-white focus:outline-none placeholder:text-slate-600"
                />
                <button type="button" onClick={() => { if(tagInput.trim()) { setFormData(p => ({...p, tags: [...p.tags, tagInput.trim()]})); setTagInput(''); }}} className="p-1.5 bg-cyan-500 text-slate-950 rounded-lg hover:bg-cyan-400 transition">
                  <Plus size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Checkboxes */}
          <div className="flex items-center gap-6 pt-2">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleInputChange}
                className="w-4 h-4 rounded border-slate-700 bg-slate-950 text-cyan-500 focus:ring-cyan-500"
              />
              <span className="text-sm font-medium text-slate-300">Featured</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleInputChange}
                className="w-4 h-4 rounded border-slate-700 bg-slate-950 text-cyan-500 focus:ring-cyan-500"
              />
              <span className="text-sm font-medium text-slate-300">Active</span>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-800">
            <button
              type="button"
              onClick={() => navigate('/dashboard/products')}
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium rounded-xl transition text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex items-center gap-2 px-7 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl transition text-sm shadow-lg shadow-cyan-500/25 disabled:opacity-50"
            >
              {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
              Save Changes
            </button>
          </div>

        </div>

      </form>
    </div>
  );
}